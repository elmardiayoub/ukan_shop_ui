import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8082/api/auth/login';
  private createUserUrl = 'http://localhost:8082/api/register/create';
  private forgetPasswordUrl = 'http://localhost:8082/api/register/forget-password';


  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, {
      email,
      password
    });
  }

  createUser(email: string, phoneNumber: string, password: string, firstName: string, lastName: string): Observable<any> {
    const requestBody = {
      email,
      phoneNumber,
      password,
      firstName,
      lastName
    };

    return this.http.post(this.createUserUrl, requestBody);
  }

  resetPassword(email: string): Observable<any> {
    const requestBody = {
      email
    };

    return this.http.post(this.forgetPasswordUrl, requestBody);
  }

  private setSession(authResult: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', authResult.access_token);
      localStorage.setItem('refresh_token', authResult.refresh_token);
      localStorage.setItem('token_type', authResult.token_type);
    }
  }

  getAccessToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('access_token') : null;
  }

  getRefreshToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('refresh_token') : null;
  }

  getTokenType(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token_type') : null;
  }
}
