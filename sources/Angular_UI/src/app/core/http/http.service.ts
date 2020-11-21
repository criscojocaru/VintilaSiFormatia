import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { map, debounceTime, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StringResponse } from '../../shared/models/string-response';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private _reqOptionsArgs = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    constructor(private http: HttpClient, private pl: PlatformLocation) {
    }

    uploadDataset(file): Observable<Object> {
        const url = environment.uploadUri;
        console.log(url);
        return this.http.get<Object>(url, file);
    }
}
