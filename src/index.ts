import { setupGenkit, runServer } from "@oconva/qvikchat/genkit";
import { defineChatEndpoint } from "@oconva/qvikchat/endpoints";
import { getIRSPrompt } from "./prompt";
import { getTestAPIKeyStore } from "./auth";

// Setup Genkit
setupGenkit();

// define the IRS endpoint
defineChatEndpoint({
  endpoint: "query",
  responseType: "json",
  enableAuth: true,
  apiKeyStore: getTestAPIKeyStore(),
  chatAgentConfig: {
    systemPrompt: getIRSPrompt(),
  },
});

// Run server
runServer();
