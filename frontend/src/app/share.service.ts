import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http: HttpClient) { }

  // share(formBody): Observable<any> {
  //   return this.http.post<any>('/share', formBody).pipe(
  //     tap((result: any) => console.log(`sharing... (Ng call Express)`)),
  //     catchError(this.handleError<any>())
  //   )
  // }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error)
  //     return of(result as T)
  //   }
  // }

  share (uploadData : any) {
    console.log('>>upload',uploadData);
    const data = new FormData();
    data.set('imageData',uploadData.imageData)
    data.set('comments',uploadData.comments)
    data.set('title',uploadData.title)
    data.set('username',uploadData.username)
    data.set('password',uploadData.password)
    return this.http.post('/share', data)
      .toPromise()
  }

}
