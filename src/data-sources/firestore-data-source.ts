import { APIKeyRecord, DataSource, IntentData, IRSData } from "./data-sources";
import { app, AppOptions, initializeApp } from "firebase-admin";

/**
 * Can either provide configurations to initialize a new Firebase app or use an existing Firebase app instance.
 */
export type FirebaseConfig =
  | {
      firebaseConfig: AppOptions;
    }
  | {
      firebaseApp: app.App;
    };

/**
 * Configuration for the FirestoreDataSource class.
 */
export type FirestoreDataSourceConfig = {
  irsId: string;
  collections: {
    irs: string;
    intents: string;
    apiKeys: string;
  };
} & FirebaseConfig;

/**
 * Represents a Cloud Firestore data source that implements the DataSource interface.
 */
export class FirestoreDataSource implements DataSource {
  private irsId: string;
  private collections: {
    irs: string;
    intents: string;
    apiKeys: string;
  };
  private firebaseConfig?: AppOptions;
  private firebaseApp: app.App;

  /**
   * Creates an instance of FirestoreDataSource.
   * @param config - The configuration for the data source.
   */
  constructor(config: FirestoreDataSourceConfig) {
    this.irsId = config.irsId;
    this.collections = config.collections;
    this.firebaseConfig =
      "firebaseConfig" in config ? config.firebaseConfig : undefined;
    this.firebaseApp =
      "firebaseApp" in config
        ? config.firebaseApp
        : initializeApp(config.firebaseConfig);
  }

  /**
   * Retrieves the IRS data for the specified id.
   * @returns The IRS data.
   * @throws Error if IRS data is not found for the specified id.
   */
  async getIRSData(): Promise<IRSData> {
    const docRef = this.firebaseApp
      .firestore()
      .collection(this.collections.irs)
      .doc(this.irsId);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      throw new Error("IRS data not found for the specified id.");
    }
    return docSnapshot.data() as IRSData;
  }

  /**
   * Retrieves the intents data for the given list if intent IDs.
   * @param intentIds - IDs of the intents to retrieve.
   * @returns The intents data.
   * @throws Error if intents data is not found for the specified IRS id.
   */
  async getIntentsData(intentIds: string[]): Promise<IntentData[]> {
    if (!intentIds || intentIds.length === 0) {
      throw new Error("No intent IDs provided.");
    }

    // Fetch each intent document using the provided IDs
    const intentsCollection = this.firebaseApp
      .firestore()
      .collection(this.collections.intents);
    const intentsDataPromises = intentIds.map((intentId) =>
      intentsCollection.doc(intentId).get()
    );
    const intentsSnapshots = await Promise.all(intentsDataPromises);

    // Extract and return the data from each document snapshot
    const intentsData = intentsSnapshots.map((snapshot) => {
      if (!snapshot.exists) {
        throw new Error(`Intent data not found for id: ${snapshot.id}`);
      }
      return snapshot.data() as IntentData; // Assuming IntentData is the correct type for the intent documents
    });

    return intentsData;
  }

  /**
   * Retrieves the API keys data for the given list of API keys.
   * @param apiKeys - API keys to retrieve.
   * @returns The API keys data.
   * @throws Error if API keys data is not found for the specified IRS id.
   */
  async getAPIKeysData(apiKeys: string[]): Promise<APIKeyRecord[]> {
    if (!apiKeys || apiKeys.length === 0) {
      throw new Error("No API keys provided.");
    }

    // Fetch each API key document using the provided keys
    const apiKeysCollection = this.firebaseApp
      .firestore()
      .collection(this.collections.apiKeys);
    const apiKeysDataPromises = apiKeys.map((apiKey) =>
      apiKeysCollection.doc(apiKey).get()
    );
    const apiKeysSnapshots = await Promise.all(apiKeysDataPromises);

    // Extract and return the data from each document snapshot
    const apiKeysData = apiKeysSnapshots.map((snapshot) => {
      if (!snapshot.exists) {
        throw new Error(`API key data not found for key: ${snapshot.id}`);
      }
      return snapshot.data() as APIKeyRecord; // Assuming APIKeyRecord is the correct type for the API key documents
    });

    return apiKeysData;
  }

  /**
   * Method to get the collection name for API keys data.
   * @returns The collection name for API keys.
   */
  getAPIKeysCollectionName(): string {
    return this.collections.apiKeys;
  }

  /**
   * Method to get the Firebase app configuration.
   * @returns The Firebase app configuration.
   */
  getFirebaseConfig(): AppOptions | undefined {
    return this.firebaseConfig;
  }

  /**
   * Method to get the Firebase app instance.
   * @returns The Firebase app instance.
   */
  getFirebaseAppInstance(): app.App {
    return this.firebaseApp;
  }
}
