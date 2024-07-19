import {
  defineChatEndpoint,
  getChatEndpointRunner,
} from "@oconva/qvikchat/endpoints";
import { setupGenkit } from "@oconva/qvikchat/genkit";
import { getIRSPrompt, irsOutputSchema } from "../prompt";
import { getInMemoryAPIKeyStore } from "../auth";

/**
 * Integration tests for IRS (Intent Recognition Service).
 */
describe("IRS Test", () => {
  // Setup Genkit
  beforeAll(() => {
    setupGenkit();
  });

  // Tests to be performed
  // Set to true to run the test
  const Tests = {
    confirm_irs_working: true,
  };

  // default test timeout
  const defaultTimeout = 10000; // 10 secondss

  if (Tests.confirm_irs_working)
    test(
      "Confirm IRS is working as expected",
      async () => {
        // define the IRS endpoint
        const endpoint = defineChatEndpoint({
          endpoint: "query",
          responseType: "json",
          enableAuth: true,
          apiKeyStore: getInMemoryAPIKeyStore(),
          chatAgentConfig: {
            systemPrompt: getIRSPrompt(),
          },
        });

        // Test API key and user id
        const testKey = "a5zwhp0YlcRVkpnOXchIkL1lrmf0MPg24POM0kO6HcM=";
        const testUID = "DI2UZuaTWjQPzVCRjzPW";

        const response = await getChatEndpointRunner()(
          endpoint,
          {
            query: "add 4 litres of milk",
            uid: testUID,
          },
          {
            withLocalAuthContext: {
              key: testKey,
            },
          }
        );
        expect(response).toBeDefined();

        // should not contain error
        if ("error" in response) {
          throw new Error(
            `Error in response. Response: ${JSON.stringify(response)}`
          );
        }

        // parse response
        const parseRes = irsOutputSchema.safeParse(response.response);

        // check if the response is as expected
        expect(parseRes.success).toBe(true);

        // get parsed data
        const parsedData = parseRes.data;

        // parsed data shouldn't be undefined
        if (parsedData === undefined) {
          throw new Error("parsed data is undefined");
        }

        // code should be defined
        expect(parsedData.code).toBeDefined();
        // code should "intent-recognized"
        expect(parsedData.code).toBe("intent-recognized");

        // output should be defined
        expect(parsedData.output).toBeDefined();
        // output should have intent_code
        expect("intent_code" in parsedData.output).toBe(true);
        // intent_code should be "add-item"
        if ("intent_code" in parsedData.output) {
          expect(parsedData.output.intent_code).toBe("add-item");
          // output should have data
          expect(parsedData.output.data).toBeDefined();
          // data should be as expected
          expect(parsedData.output.data).toEqual({
            item_name: "milk",
            item_quantity: "4",
            item_quantity_unit: "litres",
            item_expiry_date: null,
          });
        }
      },
      defaultTimeout
    );
});
