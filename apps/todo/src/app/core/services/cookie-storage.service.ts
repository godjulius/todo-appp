import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieStorageService {
  constructor() {}
  // Các hàm cookie
  updateCookie(name: string, value: string, days: number) {
    const cookie = this.getCookie(name);
    if (cookie) {
      const date = new Date();
      date.setTime(date.getTime() + days * 86400000); // thiết lập thời gian hết hạn
      const expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + '; path=/;';
    } else {
      this.setCookie(name, value, days); // thiết lập cookie mới
    }
  }

  setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 86400000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  getCookie(name: string): string | null {
    const cname = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return '';
  }

  deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
