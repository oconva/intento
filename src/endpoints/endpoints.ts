import z from 'zod';
import {DataSource, getIntentDataAsString} from '../data-sources/data-sources';
import {SupportedLLMModels} from '../models/models';
import {ModelConfig, SupportedModels} from '@oconva/qvikchat/models';
import {
  getIRSPrompt,
  irsOutputSchema,
  type IRSOutput,
} from '../prompts/prompts';
import {
  APIKeyStatus,
  FirestoreAPIKeyStore,
  InMemoryAPIKeyStore,
} from '@oconva/qvikchat/auth';
import {ChatEndpointConfig} from '@oconva/qvikchat';
import {FirestoreDataSource} from '../data-sources/firestore-data-source';

/**
 * IRSEndpointResponse is the response for the IRS endpoint.
 */
export type IRSEndpointResponse = {
  result: {response: IRSOutput};
};

/**
 * EndpointNameSchema is a schema for the endpoint name.
 */
export const EndpointNameSchema = z
  .string()
  .min(1)
  .regex(/^[^\s]+$/);

/**
 * EndpointName is the type definition for the endpoint name.
 */
export type EndpointName = z.infer<typeof EndpointNameSchema>;

/**
 * IRSEndpointConfig is the configuration for the IRS endpoint.
 *
 * @property {endpoint} - The endpoint name.
 * @property {dataSource} - The data source.
 * @property {enableAuth} - The flag to enable authentication.
 * @property {verbose} - The flag to enable verbose response.
 * @property {model} - The model configuration.
 * @property {model.primaryModel} - The primary model configuration.
 * @property {model.primaryModel.name} - The primary model name.
 * @property {model.primaryModel.config} - The primary model configuration.
 * @property {model.queryExpansionModel} - The query expansion model configuration.
 * @property {model.queryExpansionModel.name} - The query expansion model name.
 * @property {model.queryExpansionModel.config} - The query expansion model configuration.
 * @property {model.responseEvaluationModel} - The response evaluation model configuration.
 * @property {model.responseEvaluationModel.name} - The response evaluation model name.
 * @property {model.responseEvaluationModel.config} - The response evaluation model configuration.
 *
 * @remarks This configuration is used to define the IRS endpoint.
 */
export type IRSEndpointConfig = {
  endpoint: EndpointName;
  dataSource: DataSource;
  enableAuth?: boolean;
  verbose?: boolean;
  model?: {
    primaryModel?: {
      name: SupportedLLMModels;
      config?: ModelConfig;
    };
    queryExpansionModel?: {
      name: SupportedLLMModels;
      config?: ModelConfig;
    };
    responseEvaluationModel?: {
      name: SupportedLLMModels;
      config?: ModelConfig;
    };
  };
};

/**
 * Method to get API key store based on the data source.
 * @param config IRS endpoint configurations
 * @returns Either FirestoreAPIKeyStore or InMemoryAPIKeyStore
 */
async function getAPIKeyStore(
  config: IRSEndpointConfig,
  apiKeys: string[]
): Promise<FirestoreAPIKeyStore | InMemoryAPIKeyStore> {
  // check if data source is Firestore
  if (config.dataSource instanceof FirestoreDataSource) {
    // configure API key store
    return new FirestoreAPIKeyStore({
      firebaseApp: config.dataSource.getFirebaseAppInstance(),
      collectionName: config.dataSource.getAPIKeysCollectionName(),
    });
  } else {
    // Initialize the api key store
    const apiKeyStore = new InMemoryAPIKeyStore();
    // Get API keys data
    const apiKeysData = await config.dataSource.getAPIKeysData(apiKeys);
    // Add API keys to the api key store
    for (const apiKeyData of apiKeysData) {
      apiKeyStore.addKey(apiKeyData.key, {
        endpoints: apiKeyData.endpoints,
        status: apiKeyData.status as APIKeyStatus,
        uid: apiKeyData.uid,
      });
    }
    // return the api key store
    return apiKeyStore;
  }
}

/**
 * Method to get the chat endpoint configurations to setup a server endpoint for an intent recognition service.
 * @param config IRS endpoint configurations.
 * @returns Chat endpoint configurations for configuring a server endpoint.
 */
export const getServerEndpointConfig = async (
  config: IRSEndpointConfig
): Promise<ChatEndpointConfig> => {
  // Get the IRS data
  const irsData = await config.dataSource.getIRSData();
  // Get IRS prompt using IRS data and intents data
  const irsPrompt = getIRSPrompt({
    details: irsData.project_description,
    intents: (await config.dataSource.getIntentsData(irsData.intents)).map(
      (intent) => getIntentDataAsString(intent)
    ),
  });

  // Define the endpoint configurations
  const endpointConfig: ChatEndpointConfig = {
    endpoint: config.endpoint,
    systemPrompt: irsPrompt,
    outputSchema: {
      format: 'json',
      schema: z.object({
        response: irsOutputSchema,
      }),
    },
    modelConfig: {
      name: config.model?.primaryModel?.name as SupportedModels,
      ...config.model?.primaryModel?.config,
    },
    verbose: config.verbose,
  };

  // Define the endpoint configurations with authentication
  const endpointConfigWithAuth: ChatEndpointConfig = {
    ...endpointConfig,
    enableAuth: true,
    apiKeyStore: await getAPIKeyStore(config, irsData.api_keys),
  };

  // return the endpoint configurations
  return config.enableAuth ? endpointConfigWithAuth : endpointConfig;
};
