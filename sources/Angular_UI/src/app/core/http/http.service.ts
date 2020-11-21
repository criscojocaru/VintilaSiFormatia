import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient, private pl: PlatformLocation) {
    }

    uploadDataset(file): Observable<Object> {
        const url = environment.uploadUri;
        console.log(url);
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<Object>(url, formData);
    }
}
