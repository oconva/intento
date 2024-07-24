import {
  type IRSEndpointResponse,
  type EndpointName,
  type IRSEndpointConfig,
  getServerEndpointConfig,
} from './endpoints/endpoints';
import {
  type IRSData,
  type APIKeyRecord,
  type IntentDataAttribute,
  type IntentData,
  type DataSource,
} from './data-sources/data-sources';
import {
  type InMemoryDataSourceConfig,
  InMemoryDataSource,
} from './data-sources/in-memory-data-source';
import {
  type FirestoreDataSourceConfig,
  FirestoreDataSource,
} from './data-sources/firestore-data-source';
import {type SupportedLLMModels, type ModelTemperature} from './models/models';
import {
  irsOutputSchema,
  getIRSOutputSchema,
  type IRSOutput,
  parseIRSOutput,
  parseIRSOutputAsync,
  getIRSPrompt,
  getQueryExpansionPrompt,
} from './prompts/prompts';
import {runIRSServer} from './server/irs';

/**
 * Modules to export.
 */
export {
  // Endpoints
  type IRSEndpointResponse,
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
  // Prompts
  irsOutputSchema,
  getIRSOutputSchema,
  type IRSOutput,
  parseIRSOutput,
  parseIRSOutputAsync,
  getIRSPrompt,
  getQueryExpansionPrompt,
  // Server
  runIRSServer,
};
