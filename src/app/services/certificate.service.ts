import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Certificate } from '../material-component/Certificate/certificate.model';
import jsPDF from 'jspdf';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private certificates: Certificate[] = [];
  private UpdatedCertificates = new Subject<Certificate[]>();
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUpdatedCertificates() {
    return this.UpdatedCertificates.asObservable();
  }

  // getCertificates() {
  //   const url = `${this.apiUrl}/certificates`;

  //   this.http.get<{ message: string; certificates: Certificate[] }>(url).subscribe(
  //     (certificateData) => {
  //       console.log(certificateData.message);
  //       this.certificates = certificateData.certificates;
  //       this.UpdatedCertificates.next([...this.certificates]);
  //     },
  //     (error) => {
  //       console.error('Failed to fetch certificates:', error);
  //     }
  //   );
  // };

  storeCertificateData(data: any) {
    return this.http.post(`${this.apiUrl}/certificates`,data)

    // const url = `${this.apiUrl}/api/certificates`;
    //   this.http.post<{message: string}>(url, data).subscribe((responseData)=>{
    //   console.log(responseData.message);
    //   this.certificates.push(data);
    //   this.UpdatedCertificates.next([...this.certificates]);

    //  });
  }
  getCertificates(){
    return this.http.get(`${this.apiUrl}/certificates`)


  }
 deleteCertificate(certificate: any){
  return this.http.delete(`${this.apiUrl}/certificates/${certificate._id}`)

 }
 updateCertificate(id: string, updatedData: any) {

  return this.http.put(`${this.apiUrl}/certificates/${id}`, updatedData);
 }
 createPDF(certificate :Certificate) {

  const pdf = new jsPDF();
  const imgData = '/assets/images/logo (1).png';
  pdf.addImage(imgData, 'JPEG', 40, 10, 120, 40);


  const data = [
    ['Candidate Name', certificate.candidateName],
    ['Course Name', certificate.courseName],
    ['Credit Hours', certificate.creditHours.toString()],
    ['End Date', moment(certificate.endDate.toString()).format('DD/MM/YYYY ')],
    ['Notes', certificate.notes]
  ];


  let yPos = 60;
  const cellWidth = 90;


  data.forEach(row => {
    pdf.setDrawColor(0);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(10, yPos, cellWidth, 15, 'F');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(row[0], 15, yPos + 10);
    pdf.text(row[1], 105, yPos + 10);
    yPos += 15;
  });

  pdf.save(certificate.candidateName + '.pdf');
}
}


