import { InMemoryAPIKeyStore } from "@oconva/qvikchat/auth";

/**
 * Method to get a test API Key store
 * @returns InMemoryAPIKeyStore - Returns a test API Key store
 */
export const getTestAPIKeyStore = () => {
  // Initialize a test API store
  // Create an in-memory API Key store
  const inMemoryAPIKeyStore = new InMemoryAPIKeyStore();

  // Add an API Key to the store
  // Use this API Key and user-id for testing
  inMemoryAPIKeyStore.addKey(
    "a5zwhp0YlcRVkpnOXchIkL1lrmf0MPg24POM0kO6HcM=", // test API Key
    {
      uid: "DI2UZuaTWjQPzVCRjzPW",
      status: "active",
      endpoints: ["query"], // endpoints to allow access to
    }
  );

  return inMemoryAPIKeyStore;
};
