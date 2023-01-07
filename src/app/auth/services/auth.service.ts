import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string) {

    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp) {
            localStorage.setItem('token', resp.token!)
          }
        }),
        map(valid => valid.ok),
        catchError(error => of(error.error.msg))
      )

  }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp) {
            localStorage.setItem('token', resp.token!)
          }
        }),
        map(valid => valid.ok),
        catchError(error => of(error.error.msg))
      )
  }

  validateToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {

          console.log('VALIDATETOKEN', resp.token);

          localStorage.setItem('token', resp.token!)
          this._user = {
            name: resp.name!,
            id: resp.userId!,
            email: resp.email!
          }

          return resp.ok;
        }),
        catchError(error => of(false))
      )
  }

  logout() {
    localStorage.clear();
  }
}
