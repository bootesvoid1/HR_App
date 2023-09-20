import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from './certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  getCertificates() {
    const url = `${this.apiUrl}/certificates`;

    return this.http.get<Certificate[]>(url);
  }
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  storeCertificateData(data: Certificate): Observable<any> {
    const url = `${this.apiUrl}/certificates`;
    return this.http.post(url,data.id);
  }
}
