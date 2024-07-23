import { APIKeyRecord, DataSource, IntentData, IRSData } from "./data-sources";
import { app, AppOptions, initializeApp } from "firebase-admin";

/**
 * Configuration for the FirestoreDataSource class.
 */
export interface FirestoreDataSourceConfig {
  config: AppOptions;
  irsId: string;
  collections: {
    irs: string;
    intents: string;
    apiKeys: string;
  };
}

/**
 * Represents a Cloud Firestore data source that implements the DataSource interface.
 */
export class FirestoreDataSource implements DataSource {
  private irsId: string;
  private apiKeysCollectionName: string;
  private firebaseConfig: AppOptions;
  private firebaseApp: app.App;

  /**
   * Creates an instance of FirestoreDataSource.
   * @param config - The configuration for the data source.
   */
  constructor(config: FirestoreDataSourceConfig) {
    this.irsId = config.irsId;
    this.apiKeysCollectionName = config.collections.apiKeys;
    this.firebaseConfig = config.config;
    this.firebaseApp = initializeApp(config.config);
  }

  /**
   * Retrieves the IRS data for the specified id.
   * @returns The IRS data.
   * @throws Error if IRS data is not found for the specified id.
   */
  async getIRSData(): Promise<IRSData> {
    return {
      id: this.irsId,
      name: "",
      description: "",
      project_description: "",
      status: "inactive",
      last_update: "",
      usage_limit_tokens: 0,
      version: "",
      api_keys: [],
      intents: [],
    };
  }

  /**
   * Retrieves the intents data for the specified IRS id.
   * @returns The intents data.
   * @throws Error if intents data is not found for the specified IRS id.
   */
  async getIntentsData(): Promise<IntentData[]> {
    return [];
  }

  /**
   * Retrieves the API keys data for the specified IRS id.
   * @returns The API keys data.
   * @throws Error if API keys data is not found for the specified IRS id.
   */
  async getAPIKeysData(): Promise<APIKeyRecord[]> {
    return [];
  }

  getAPIKeysCollectionName(): string {
    return this.apiKeysCollectionName;
  }

  getFirebaseConfig(): AppOptions {
    return this.firebaseConfig;
  }

  getFirebaseAppInstance(): app.App {
    return this.firebaseApp;
  }
}
