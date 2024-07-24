import {
  setupGenkit,
  runServer,
  SetupGenkitConfig,
} from '@oconva/qvikchat/genkit';
import {defineChatEndpoint} from '@oconva/qvikchat/endpoints';
import {StartServerParamsType} from '@oconva/qvikchat/config';
import {
  getServerEndpointConfig,
  IRSEndpointConfig,
} from '../endpoints/endpoints';

/**
 * Method to run the IRS server.
 * It will perform the following steps in order:
 * 1. setup Genkit - will use the provided configuration or default configuration.
 * 2. define IRS endpoints - will use the provided endpoint configurations to define endpoints.
 * 3. run server - will use the provided or default server configuration to start the server.
 * @param endpointConfigs an array containing IRS endpoint configurations for the server to define before starting.
 * @param genkitConfig optional configuration for the Genkit framework, e.g., plugins etc.
 * @param serverConfig optional configuration for the server.
 */
export async function runIRSServer({
  endpointConfigs,
  genkitConfig,
  serverConfig,
}: {
  endpointConfigs: IRSEndpointConfig[];
  genkitConfig?: SetupGenkitConfig;
  serverConfig?: StartServerParamsType;
}) {
  // Setup Genkit
  setupGenkit(genkitConfig);

  // Define endpoints using the provided configurations
  for (const endpointConfig of endpointConfigs) {
    defineChatEndpoint(await getServerEndpointConfig(endpointConfig));
  }

  // Run server
  runServer(serverConfig);
}
