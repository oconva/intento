import { setupGenkit, runServer } from "@oconva/qvikchat/genkit";
import { defineChatEndpoint } from "@oconva/qvikchat/endpoints";
import { getIRSPrompt } from "./prompt";
import { getIRSData } from "./data";
import { getTestAPIKeyStore } from "./auth";

// Setup Genkit
setupGenkit();

// define the IRS endpoint
defineChatEndpoint({
  endpoint: "query",
  enableAuth: true,
  apiKeyStore: getTestAPIKeyStore(),
  chatAgentConfig: {
    systemPrompt: getIRSPrompt(getIRSData()),
  },
});

// Run server
runServer();
