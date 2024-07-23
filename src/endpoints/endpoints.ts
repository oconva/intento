import z from "zod";
import {
  DataSource,
  getIntentDataAsString,
} from "../data-sources/data-sources";
import { SupportedLLMModels } from "../models/models";
import { ModelConfig, SupportedModels } from "@oconva/qvikchat/models";
import { getIRSPrompt } from "../prompts/prompts";
import { APIKeyStatus, InMemoryAPIKeyStore } from "@oconva/qvikchat/auth";
import { DefineChatEndpointConfig } from "@oconva/qvikchat/endpoints";

// EndpointNameSchema is a schema for the endpoint name.
export const EndpointNameSchema = z
  .string()
  .min(1)
  .regex(/^[^\s]+$/);

// EndpointName is the type definition for the endpoint name.
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
 * @property {model.queryReformulationModel} - The query reformulation model configuration.
 * @property {model.queryReformulationModel.name} - The query reformulation model name.
 * @property {model.queryReformulationModel.config} - The query reformulation model configuration.
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
    queryReformulationModel?: {
      name: SupportedLLMModels;
      config?: ModelConfig;
    };
    responseEvaluationModel?: {
      name: SupportedLLMModels;
      config?: ModelConfig;
    };
  };
};

export const getIRSEndpointConfig = (
  config: IRSEndpointConfig
): DefineChatEndpointConfig => {
  // Define the IRS endpoint
  // Get IRS data
  const irsData = config.dataSource.getIRSData();
  // Get IRS prompt using IRS data
  const irsPrompt = getIRSPrompt({
    details: irsData.project_description,
    intents: config.dataSource
      .getIntentsData()
      .map((intent) => getIntentDataAsString(intent)),
  });
  // Get API keys data
  const apiKeysData = config.dataSource.getAPIKeysData();
  // Initialize the api key store
  const apiKeyStore = new InMemoryAPIKeyStore();
  // Add API keys to the api key store
  apiKeysData.forEach((apiKeyData) => {
    apiKeyStore.addKey(apiKeyData.key, {
      endpoints: apiKeyData.endpoints,
      status: apiKeyData.status as APIKeyStatus,
      uid: apiKeyData.uid,
    });
  });

  // Define the endpoint configurations
  const endpointConfig: DefineChatEndpointConfig = {
    endpoint: config.endpoint,
    responseType: "json",
    verbose: config.verbose,
    chatAgentConfig: {
      systemPrompt: irsPrompt,
      model: config.model?.primaryModel?.name as SupportedModels,
      modelConfig: config.model?.primaryModel?.config,
    },
  };

  // Define the endpoint configurations with authentication
  const endpointConfigWithAuth: DefineChatEndpointConfig = {
    ...endpointConfig,
    enableAuth: true,
    apiKeyStore,
  };

  // return the endpoint configurations
  return config.enableAuth ? endpointConfigWithAuth : endpointConfig;
};
