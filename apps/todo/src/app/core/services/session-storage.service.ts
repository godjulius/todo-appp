/* eslint-disable @typescript-eslint/no-explicit-any */
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  storage: Storage;

  constructor() {
    this.storage = window.sessionStorage;
  }

  set(key: string, value: string): void {
    this.storage[key] = value;
  }

  get(key: string): string {
    return this.storage[key] || null;
  }

  setObject(key: string, value: any): void {
    if (!value) {
      return;
    }

    this.storage[key] = JSON.stringify(value);
  }

  getObject(key: string): any {
    if (this.storage[key]) {
      return JSON.parse(this.storage[key]);
    } else {
      return null;
    }
  }

  removeObject(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
