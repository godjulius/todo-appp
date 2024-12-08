/* eslint-disable @typescript-eslint/no-explicit-any */
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  get(key: string): string | null {
    return this.storage.getItem(key);
  }

  setObject(key: string, value: any): void {
    if (!value) {
      return;
    }
    this.storage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string): any {
    const value = this.storage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error(`Error parsing JSON for key "${key}"`, error);
        return null;
      }
    }
    return null;
  }

  getValue<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (error) {
        console.error(`Error parsing JSON for key "${key}"`, error);
        return null;
      }
    }
    return null;
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  get length(): number {
    return this.storage.length;
  }

  get isStorageEmpty(): boolean {
    return this.length === 0;
  }
}
