import { InjectionToken } from '@angular/core';

export const LOCAL_API_URL = 'http://localhost:3000';
export const API_URL = new InjectionToken<string>('API URL', {
  providedIn: 'root',
  factory: () => LOCAL_API_URL,
});
