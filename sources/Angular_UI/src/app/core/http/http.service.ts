import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EvaluateResponse } from '../../shared/models/evaluate-response.model';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    uploadDataset(file): Observable<EvaluateResponse> {
        const url = environment.uploadUri;
        console.log(url);
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<EvaluateResponse>(url, formData);
    }
}
