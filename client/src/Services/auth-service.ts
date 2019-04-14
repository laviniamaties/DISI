import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from '../Models/IUser';

export default class AuthService {
  private static isLoginSubject = new BehaviorSubject<boolean>(AuthService.hasToken());

  private static hasToken(): boolean {
    return !!sessionStorage.getItem('loggedUser');
  }

  public static login(user: IUser): void {
    debugger
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
    this.isLoginSubject.next(true);
  }

  public static logout(): void {
    sessionStorage.removeItem('loggedUser');
    this.isLoginSubject.next(false);
  }

  public static isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public static getAuthenticatedUser(): IUser{
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}
