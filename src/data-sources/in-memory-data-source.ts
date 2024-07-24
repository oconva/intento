import {APIKeyRecord, DataSource, IntentData, IRSData} from './data-sources';

/**
 * Configuration for the InMemoryDataSource class.
 */
export type InMemoryDataSourceConfig = {
  irsId: string;
  files: {
    irsData: IRSData[];
    intentsData: IntentData[];
    apiKeysData: APIKeyRecord[];
  };
};

/**
 * Represents an in-memory data source that implements the DataSource interface.
 */
export class InMemoryDataSource implements DataSource {
  private irsId: string;
  private irsData: IRSData[];
  private intentsData: IntentData[];
  private apiKeysData: APIKeyRecord[];

  /**
   * Creates an instance of InMemoryDataSource.
   * @param config - The configuration for the data source.
   */
  constructor(config: InMemoryDataSourceConfig) {
    this.irsId = config.irsId;
    this.irsData = config.files.irsData;
    this.intentsData = config.files.intentsData;
    this.apiKeysData = config.files.apiKeysData;
  }

  /**
   * Retrieves the IRS data for the specified id.
   * @returns The IRS data.
   * @throws Error if IRS data is not found for the specified id.
   */
  getIRSData(): IRSData {
    const data = this.irsData.find((irsData) => irsData.id === this.irsId);
    if (!data) {
      throw new Error(`IRS data not found for id: ${this.irsId}`);
    }
    return data;
  }

  /**
   * Retrieves the intents data for the specified IRS id.
   * @returns The intents data.
   * @throws Error if intents data is not found for the specified IRS id.
   */
  getIntentsData(intentIds: string[]): IntentData[] {
    const data = this.intentsData.filter((intentData) =>
      intentIds.includes(intentData.id)
    );
    if (!data) {
      throw new Error(`Intents data not found for IRS id: ${this.irsId}`);
    }
    return data;
  }

  /**
   * Retrieves the API keys data for the specified IRS id.
   * @returns The API keys data.
   * @throws Error if API keys data is not found for the specified IRS id.
   */
  getAPIKeysData(apiKeys: string[]): APIKeyRecord[] {
    const data = this.apiKeysData.filter((apiKeyData) =>
      apiKeys.includes(apiKeyData.key)
    );
    if (!data) {
      throw new Error(`API keys data not found for IRS id: ${this.irsId}`);
    }
    return data;
  }
}
