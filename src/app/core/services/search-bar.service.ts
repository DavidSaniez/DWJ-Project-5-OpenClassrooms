import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private isOpen = new BehaviorSubject<boolean>(false);


  constructor() {
  }

  open() {
    this.isOpen.next(true);
  }

  getIsOpen(): Observable<boolean> {
    return this.isOpen.asObservable();
  }

}
