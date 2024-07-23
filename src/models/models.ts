import z from "zod";

export type SupportedLLMModels = "gemini15flash" | "gemini15pro" | "gpt4o";

export const ModelTemperatureSchema = z.number().min(0).max(1);

export type ModelTemperature = z.infer<typeof ModelTemperatureSchema>;
