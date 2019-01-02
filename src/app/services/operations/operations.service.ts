import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http:Http) { }

  postRequest(url: string, data?: any){ return this.http.post(url, data); }

  getRequest(url: string){ return this.http.get(url).pipe(map((res: Response) => res.json())); }
}
