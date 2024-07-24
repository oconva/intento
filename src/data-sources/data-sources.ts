import z from "zod";

/**
 * IRSDataSchema is a schema for the IRS data.
 *
 * @remarks This schema is used to validate the IRS data.
 *
 * @property {id} - The id of the IRS data.
 * @property {name} - The name of the IRS data.
 * @property {description} - The description of the IRS data.
 * @property {project_description} - The project description of the IRS data.
 * @property {version} - The version of the IRS data.
 * @property {last_update} - The last update of the IRS data.
 * @property {status} - The status of the IRS data.
 * @property {usage_limit_tokens} - The usage limit tokens of the IRS data.
 * @property {api_keys} - The api keys of the IRS data.
 * @property {intents} - The intents of the IRS data.
 *
 * @link https://intento.pkural.ca/data#irs-data | IRS Data
 */
export const IRSDataSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  project_description: z.string(),
  version: z.string(),
  last_update: z.string(),
  status: z.enum(["active", "inactive"]),
  usage_limit_tokens: z.nullable(z.number()),
  api_keys: z.array(z.string()),
  intents: z.array(z.string()),
});

/**
 * IRSDataType is the type definition for the IRS data.
 *
 * @property {id} - The id of the IRS data.
 * @property {name} - The name of the IRS data.
 * @property {description} - The description of the IRS data.
 * @property {project_description} - The project description of the IRS data.
 * @property {version} - The version of the IRS data.
 * @property {last_update} - The last update of the IRS data.
 * @property {status} - The status of the IRS data.
 * @property {usage_limit_tokens} - The usage limit tokens of the IRS data.
 * @property {api_keys} - The api keys of the IRS data.
 * @property {intents} - The intents of the IRS data.
 *
 * @link https://intento.pkural.ca/data#irs-data | IRS Data
 */
export type IRSData = z.infer<typeof IRSDataSchema>;

/**
 * APIKeyRecordSchema is a schema for the API key record.
 *
 * @remarks This schema is used to validate the API key record.
 *
 * @property {key} - Unique identifier for the API key record.
 * @property {irs_id} - ID of the intent recognition service this API key is associated with.
 * @property {uid} - User Id of the user who has access to this API key.
 * @property {name} - Optional, The name of the API key record.
 * @property {description} - Optional, The description of the API key record.
 * @property {last_used} - Tracking the last time this API key was used.
 * @property {status} - The status of the API key record - active or inactive.
 * @property {endpoints} - The endpoints that this API key can access.
 * @property {usage_limit_tokens} - Maximum number of tokens this API key can be used for.
 *
 * @link https://intento.pkural.ca/data#api-keys-data | API Keys Data
 */
export const APIKeyRecordSchema = z.object({
  key: z.string().min(1),
  irs_id: z.string().min(1),
  uid: z.string().min(1),
  name: z.string().optional(),
  description: z.string().optional(),
  last_used: z.string(),
  status: z.enum(["active", "inactive"]),
  endpoints: z.literal("all").or(z.array(z.string().min(1))),
  usage_limit_tokens: z.number().optional(),
});

/**
 * APIKeyRecordType is the type definition for the API key record.
 *
 * @property {key} - Unique identifier for the API key record.
 * @property {irs_id} - ID of the intent recognition service this API key is associated with.
 * @property {uid} - User Id of the user who has access to this API key.
 * @property {name} - Optional, The name of the API key record.
 * @property {description} - Optional, The description of the API key record.
 * @property {last_used} - Tracking the last time this API key was used.
 * @property {status} - The status of the API key record - active or inactive.
 * @property {endpoints} - The endpoints that this API key can access.
 * @property {usage_limit_tokens} - Maximum number of tokens this API key can be used for.
 *
 * @link https://intento.pkural.ca/data#api-keys-data | API Keys Data
 */
export type APIKeyRecord = z.infer<typeof APIKeyRecordSchema>;

/**
 * IntentDataAttributeSchema is a schema for the intent data attribute.
 */
export const IntentDataAttributeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  type: z.string(),
  required: z.boolean(),
});

export type IntentDataAttribute = z.infer<typeof IntentDataAttributeSchema>;

/**
 * IntentDataSchema is a schema for the intent.
 *
 * @remarks This schema is used to validate the intent.
 *
 * Properties for managing intents (not used by LLM):
 * @property {id} - Unique identifier for the intent.
 * @property {irs_id} - ID of the intent recognition service this intent is associated with.
 * @property {uid} - ID of the user who has access to view and modify this intent.
 * @property {status} - The status of the intent - active or inactive. If inactive, the intent will not be used for intent recognition.
 * @property {last_update} - The last update of the intent.
 *
 * Properties for intent recognition (used by LLM):
 * @property {intent_code} - A unique code for the intent. This is the code that will be returned by the intent recognition service.
 * @property {name} - Name of the intent.
 * @property {description} - Short description of the intent.
 * @property {primary_identifying_keywords} - Primary identifying keywords of the intent.
 * @property {examples} - Examples of the intent.
 * @property {data_attributes} - Data attributes of the intent.
 *
 * @link https://intento.pkural.ca/data#intents-data | Intents Data
 */
export const IntentDataSchema = z.object({
  id: z.string().min(1),
  irs_id: z.string().min(1),
  uid: z.string().min(1),
  status: z.enum(["active", "inactive"]),
  last_update: z.string(),
  intent_code: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  primary_identifying_keywords: z.array(z.string()),
  examples: z.array(z.string()),
  data_attributes: z.array(IntentDataAttributeSchema),
});

/**
 * IntentType is the type definition for the intent.
 *
 * Properties for managing intents (not used by LLM):
 * @property {id} - Unique identifier for the intent.
 * @property {irs_id} - ID of the intent recognition service this intent is associated with.
 * @property {uid} - ID of the user who has access to view and modify this intent.
 * @property {status} - The status of the intent - active or inactive. If inactive, the intent will not be used for intent recognition.
 * @property {last_update} - The last update of the intent.
 *
 * Properties for intent recognition (used by LLM):
 * @property {intent_code} - A unique code for the intent. This is the code that will be returned by the intent recognition service.
 * @property {name} - Name of the intent.
 * @property {description} - Short description of the intent.
 * @property {primary_identifying_keywords} - Primary identifying keywords of the intent.
 * @property {examples} - Examples of the intent.
 * @property {data_attributes} - Data attributes of the intent.
 *
 * @link https://intento.pkural.ca/data#intents-data | Intents Data
 */
export type IntentData = z.infer<typeof IntentDataSchema>;

/**
 * DataSource is an interface for the data source.
 */
export interface DataSource {
  getIRSData(): Promise<IRSData> | IRSData;
  getIntentsData(intentIds: string[]): Promise<IntentData[]> | IntentData[];
  getAPIKeysData(apiKeys: string[]): Promise<APIKeyRecord[]> | APIKeyRecord[];
}

export const getDataAttributesAsString = (
  dataAttributes: IntentDataAttribute[]
): string => {
  let res = "";

  dataAttributes.forEach((dataAttribute) => {
    res += `
        {
            "id": "${dataAttribute.id}",
            "name": "${dataAttribute.name}",
            "description": "${dataAttribute.description}",
            "type": "${dataAttribute.type}",
            "required": ${dataAttribute.required}
        }
        `;
  });

  return res;
};

export const getIntentDataAsString = (intentData: IntentData): string => {
  return `
  {
    "id": "${intentData.id}",
    "intent_code": "${intentData.intent_code}",
    "name": "${intentData.name}",
    "description": "${intentData.description}",
    "examples": ${intentData.examples.join(",")},
    "primary_identifying_keywords": ${intentData.primary_identifying_keywords.join(",")},
    "data_attributes": ${getDataAttributesAsString(intentData.data_attributes)}
  }
  `;
};
