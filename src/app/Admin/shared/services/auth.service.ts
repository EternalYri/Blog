import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse } from "@angular/common/http"
import { AuthResponse, User } from "src/app/shared/components/interfaces";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()

export class AuthService {

  public error$: Subject<string>  = new Subject<string>()

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
      tap(this.setToken),
      catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError (error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch(message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Данный адрес не найден')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Неверный пароль')
      break
    }
    return throwError(error);
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
