import { defineDotprompt } from "@genkit-ai/dotprompt";
import { z } from "zod";
import { getIRSIntents, getIRSData } from "./data";

// Output schema for IRS query
export const irsOutputSchema = z.union([
  z.object({
    code: z.literal("intent-recognized"),
    output: z.object({
      intent_code: z.string(),
      data: z.any(),
    }),
  }),
  z.object({
    code: z.literal("need-more-info"),
    output: z.object({
      data: z.object({
        missing_data: z.array(z.string()),
      }),
    }),
  }),
  z.object({
    code: z.literal("intent-not-recognized"),
    output: z.object({
      message: z.string(),
    }),
  }),
]);

/**
 * Method to get the IRS prompt given the IRS data
 * @param IRSData IRS data - The data for the IRS
 * @returns Prompt - to be used in IRS endpoint
 */
export const getIRSPrompt = () => {
  // get IRS data
  const IRSData = getIRSData();
  return _getIRSPrompt({
    details: IRSData.app_details,
    intents: getIRSIntents(IRSData.intents),
  });
};

/**
 * The intent recognition prompt to be used by the intent recognition service.
 */
const _getIRSPrompt = ({
  details,
  intents,
}: {
  details: string;
  intents: string[];
}) =>
  defineDotprompt(
    {
      name: "irsPrompt",
      input: {
        schema: z.object({
          query: z.string(),
        }),
      },
      output: {
        format: "json",
        schema: irsOutputSchema,
      },
    },
    `{{role "system"}}
You are an expert at recognizing the intent of the user given the user input text and the details of all available intents. This is the only task you need to perform.

Below is the order in which the information is given to you.

1. Details of the application that the user input and the intents are related to, so you can have a better understanding of the context in which the user has submitted the given input. This is enclosed in "<details></details>" tags.
2. Information of all possible intents. User input must be recognized and related to only one of these given intents. This is enclosed in "<intents></intents>" tags.
3. Instructions on the format of output that you need to produce. This is enclosed in "<output_schema></output_schema>" tags.
4. User input for which an appropriate intent needs to be identified. This is enclosed in "<user_input></user_input>.

Below are the details of all the available intents (enclosed in "<details></details>" tags). Following this section, is the user input (enclosed in "<user_input></user_input>" tags). 

<details>
${details}
</details>

<intents>
${intents}
</intents>

<output_schema>
If successful in recognizing an appropriate intent for the given user input, the output JSON must follow below schema:

{
  "code": "intent-recognized",
  "output": {
    "intent_code": "code of the recognized intent",
    "data": "extracted data attributes for the recognized intent as key-value pairs (use attribute IDs as keys). If no value, use null."
  }
}

If unable to recognize an appropriate intent for the given user input due to lack of enough information, the output JSON must follow below schema:

{
  "code": "need-more-info",
  "output": {
    "ir_id": "ID of the intent recognition request",
    "irs_id": "ID of the intent recognition service",
    "data": {
      "missing_data": ["list of missing data attributes (attribute IDs)"]
    }
  }
}
  
If an error occurs, or you fail to recognize intent for some reason other than the one mentioned above, the output JSON must follow below schema:

{
  "code": "intent-not-recognized",
  "output": {
    "message": "Unable to recognize intent from user input"
  }
}
</output_schema>


{{role "user"}}
<user_input>
{{query}}
</user_input>`
  );
