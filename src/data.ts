import * as IRS from "../data/irs/irs.json";
import * as INTENTS from "../data/irs/intents.json";

export type IRSDataType = typeof IRS;

export const getIRSData = () => IRS;

export const getDataAttributes = (
  dataAttributes: {
    [key: string]: string | boolean;
    id: string;
    name: string;
    description: string;
    type: string;
    required: boolean;
  }[]
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

export const getNewIntent = ({
  id,
  intent_code,
  name,
  description,
  examples,
  primary_identifying_keywords,
  data_attributes,
}: {
  id: string;
  intent_code: string;
  name: string;
  description: string;
  examples: string[];
  primary_identifying_keywords: string[];
  data_attributes: {
    [key: string]: string | boolean;
    id: string;
    name: string;
    description: string;
    type: string;
    required: boolean;
  }[];
}): string => {
  return `
  {
    "id": "${id}",
    "intent_code": "${intent_code}",
    "name": "${name}",
    "description": "${description}",
    "examples": ${examples.join(",")},
    "primary_identifying_keywords": ${primary_identifying_keywords.join(",")},
    "data_attributes": ${getDataAttributes(data_attributes)}
  }
  `;
};

export const getIRSIntents = (intentIds: string[]): string[] => {
  return INTENTS.filter((intent) => intentIds.includes(intent.id)).map(
    (intent) => getNewIntent(intent)
  );
};
