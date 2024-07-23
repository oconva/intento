import {
  setupGenkit,
  runServer,
  SetupGenkitConfig,
} from "@oconva/qvikchat/genkit";
import {
  defineChatEndpoint,
  DefineChatEndpointConfig,
} from "@oconva/qvikchat/endpoints";
import { StartServerParamsType } from "@oconva/qvikchat/config";
import {
  type EndpointName,
  type IRSEndpointConfig,
  getServerEndpointConfig,
} from "./endpoints/endpoints";
import {
  type IRSData,
  type APIKeyRecord,
  type IntentDataAttribute,
  type IntentData,
  type DataSource,
} from "./data-sources/data-sources";
import {
  type InMemoryDataSourceConfig,
  InMemoryDataSource,
} from "./data-sources/in-memory-data-source";
import {
  type FirestoreDataSourceConfig,
  FirestoreDataSource,
} from "./data-sources/firestore-data-source";
import {
  type SupportedLLMModels,
  type ModelTemperature,
} from "./models/models";

/**
 * Method to run the IRS server.
 * It will perform the following steps in order:
 * 1. setup Genkit - will use the provided configuration or default configuration.
 * 2. define chat endpoints - will use the provided endpoint configurations to define chat endpoints.
 * 3. run server - will use the provided or default server configuration to start the server.
 * @param endpointConfigs an array containing chat endpoint configurations for the server to define before starting.
 * @param genkitConfig optional configuration for the Genkit framework, e.g., plugins etc.
 * @param serverConfig optional configuration for the server.
 */
export function runIRSServer({
  endpointConfigs,
  genkitConfig,
  serverConfig,
}: {
  endpointConfigs: DefineChatEndpointConfig[];
  genkitConfig?: SetupGenkitConfig;
  serverConfig?: StartServerParamsType;
}) {
  // Setup Genkit
  setupGenkit(genkitConfig);

  // Define endpoints
  for (const endpointConfig of endpointConfigs) {
    defineChatEndpoint(endpointConfig);
  }

  // Run server
  runServer(serverConfig);
}

/**
 * Modules to export.
 */
export {
  // Endpoints
  type EndpointName,
  type IRSEndpointConfig,
  getServerEndpointConfig,
  // Data sources
  type IRSData,
  type APIKeyRecord,
  type IntentDataAttribute,
  type IntentData,
  type DataSource,
  type InMemoryDataSourceConfig,
  InMemoryDataSource,
  type FirestoreDataSourceConfig,
  FirestoreDataSource,
  // Models
  type SupportedLLMModels,
  type ModelTemperature,
};
