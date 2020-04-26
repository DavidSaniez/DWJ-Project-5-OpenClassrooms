import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, AppConfig} from '../../app-config/app-config.module';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,) {
    // public jwtHelper: JwtHelperService
  }

  private currentUserSubject = new BehaviorSubject<User>(null);

/*  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);*/
  // }

  login(email: string, password: string) {
    this.httpClient.get(`${this.config.laravelEndpoint}sanctum/csrf-cookie `).subscribe(() => {
      this.httpClient.post(`${this.config.laravelEndpoint}login`, {email, password}).subscribe(() => {
        this.getUser();
      });
    });
  }

  register(name: string, email: string, password: string, password_confirmation: string) {
    this.httpClient.post(`${this.config.laravelEndpoint}register`, {
      name,
      email,
      password,
      password_confirmation
    }).subscribe((d) => {
      this.getUser();
    });
  }

  getUser() {
    this.httpClient.get(`${this.config.laravelEndpoint}api/user`).subscribe((user: User) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    });
  }

  logout() {
    this.httpClient.post(`${this.config.laravelEndpoint}logout`, {}).subscribe(() => {
      this.currentUserSubject.next(null);
    });
  }

  getCurrentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }
}
