import * as API_KEYS from "../data/irs/api-keys.json";
import { APIKeyStatus, InMemoryAPIKeyStore } from "@oconva/qvikchat/auth";

/**
 * Method to get an in-memory API Key store with API keys loaded from api-keys.json
 * @returns InMemoryAPIKeyStore - Returns an in-memory API Key store
 */
export const getInMemoryAPIKeyStore = () => {
  // Initialize a test API store
  // Create an in-memory API Key store
  const inMemoryAPIKeyStore = new InMemoryAPIKeyStore();

  // Add the API keys to the store
  API_KEYS.forEach((apiKey) => {
    inMemoryAPIKeyStore.addKey(apiKey.key, {
      uid: apiKey.uid,
      status: apiKey.status as APIKeyStatus,
      endpoints: "all", // endpoints to allow access to
    });
  });

  return inMemoryAPIKeyStore;
};
