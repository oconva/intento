import { setupGenkit, runServer } from "@oconva/qvikchat/genkit";
import {
  defineChatEndpoint,
  DefineChatEndpointConfig,
} from "@oconva/qvikchat/endpoints";

export function runIRSServer({
  endpointConfigs,
}: {
  endpointConfigs: DefineChatEndpointConfig[];
}) {
  // Setup Genkit
  setupGenkit();

  // Define endpoints
  for (const endpointConfig of endpointConfigs) {
    defineChatEndpoint(endpointConfig);
  }

  // Run server
  runServer();
}
