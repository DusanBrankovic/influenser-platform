export class CookieService {
  static get(key: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  }

  static set(key: string, value: string, days: number = 7): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
  }

  static remove(key: string): void {
    this.set(key, '', -1);
  }
}