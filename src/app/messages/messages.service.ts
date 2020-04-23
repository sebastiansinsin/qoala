import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messageSubject = new BehaviorSubject<string>('');
  public messageObserver = this.messageSubject.asObservable();

  constructor() { }

  add(message: string) {
    this.messageSubject.next(message);
  }

  clear() {
    this.messageSubject.next('');
  }
}
