import { Injectable } from "@angular/core";
import {HttpClient } from "@angular/common/http"
import { AuthResponse, User } from "src/app/shared/components/interfaces";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('TokenExp'))
    if(new Date() > expDate) {
      this.logout();
      return null
    }
    return localStorage.getItem('Token')
  }

  login(user: User) : Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken)
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: AuthResponse | null) {
    if(response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('Token', response.idToken);
      localStorage.setItem('TokenExp', expDate.toString())
    } else {
      localStorage.clear()
    }

  }
}
