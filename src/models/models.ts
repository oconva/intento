import z from "zod";

/**
 * SupportedLLMModels is the list of supported LLM models.
 */
export type SupportedLLMModels = "gemini15flash" | "gemini15pro" | "gpt4o";

// ModelTemperatureSchema is a schema for the model temperature.
export const ModelTemperatureSchema = z.number().min(0).max(1);

/**
 * ModelTemperature is the type definition for the model temperature.
 */
export type ModelTemperature = z.infer<typeof ModelTemperatureSchema>;
