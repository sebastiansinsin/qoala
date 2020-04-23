import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessagesService } from '@app/messages/messages.service';

import { Documents } from '@app/documents';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private url = 'https://randomuser.me/api/?results=';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) { }

  getDocuments(rows: number = 10): Observable<any> {
    const url = this.url + rows;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError('getDocuments', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}
