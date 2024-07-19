import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import {
  catchError,
  debounceTime,
  map,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { LoginResult } from '../interface/LoginResult';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new Subject<LoginResult>();
  userInfo$ = this.user$.asObservable();
  constructor(private http: HttpClient) {}
  private readonly url = environment.backendAuthApiUrl;
  checkEmail(value: string): Observable<ValidationErrors | null> {
    return this.http.post(`${this.url}/check-email`, { email: value }).pipe(
      debounceTime(1000),
      map((data: any) => {
        if (data) {
          return { hasemail: true };
        }
        return null;
      })
    );
  }

  checkSignIn(logindetail: any): Observable<any> {
    // const { email, password } = logindetail;
    return this.http.post<LoginResult>(`${this.url}/signin`, logindetail).pipe(
      map((response: LoginResult) => {
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('role', response.role);
          localStorage.setItem('useremail', logindetail.email);
          this.user$.next(response);
        }
        return response;
      })
      //  catchError(this.handleError)
    );
  }

  registerUser(registerDetails: any): Observable<any> {
    // const { email, password } = logindetail;
    return this.http
      .post<LoginResult>(`${this.url}/signup`, registerDetails)
      .pipe(
        map((response: LoginResult) => {
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('role', response.role);
            this.user$.next(response);
          }
          return response;
        })
        // catchError(this.handleError)
      );
  }
  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   return throwError(new Error(error.statusText));
  // }
}
