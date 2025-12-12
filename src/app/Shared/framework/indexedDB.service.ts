import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
const DB_NAME = 'StaffDB';
const STORE_NAME = 'StaffStore';
@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private dbCache: Map<string, Promise<IDBPDatabase>> = new Map();

  constructor() {}

  private async initializeDB(dbName: string, storeName: string): Promise<IDBPDatabase> {
    if (!this.dbCache.has(dbName)) {
      const dbPromise = openDB(dbName, 2, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
          }
        },
      });
      this.dbCache.set(dbName, dbPromise);
    }
    return this.dbCache.get(dbName) as Promise<IDBPDatabase>;
  }

  // Save data to a specific store in a specific database
  async save(dbName: string, storeName: string, key: string, data: any): Promise<void> {
    const db = await this.initializeDB(dbName, storeName);
    const existingRecord = await db.get(storeName, key);
    if (!existingRecord) {
      await db.put(storeName, { id: key, value: data });
    } else {
      console.log('dublicate data');
    }
  }
  async saveform(dbName: string, storeName: string, key: string, data: any): Promise<void> {
    const db = await this.initializeDB(dbName, storeName);
    await db.put(storeName, { id: key, value: data });
  }
  // Get data from a specific store in a specific database
  async get(dbName: string, storeName: string, key: string): Promise<any> {
    const db = await this.initializeDB(dbName, storeName);
    const result = await db.get(storeName, key);
    return result?.value;
  }

  // Delete data from a specific store in a specific database
  async delete(dbName: string, storeName: string, key: string): Promise<void> {
    const db = await this.initializeDB(dbName, storeName);
    await db.delete(storeName, key);
  }

  // Clear all data from a specific store in a specific database
  async clear(dbName: string, storeName: string): Promise<void> {
    const db = await this.initializeDB(dbName, storeName);
    await db.clear(storeName);
  }

  // Delete an entire database
  async deleteDatabase(dbName: string): Promise<void> {
    if (this.dbCache.has(dbName)) {
      this.dbCache.delete(dbName);
    }
    await indexedDB.deleteDatabase(dbName);
  }
}
