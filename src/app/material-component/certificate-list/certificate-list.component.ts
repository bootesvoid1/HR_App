import { Component, OnInit } from '@angular/core';
import { Certificate } from '../Certificate/certificate.model';
import { CertificateService } from '../Certificate/certificate.service';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent implements OnInit {
  certificates: Certificate[] = [];

  constructor(private certificateService: CertificateService) {}

  ngOnInit() {
    this.fetchCertificates();
  }

  fetchCertificates() {
    this.certificateService.getCertificates()
      .subscribe(
        (certificates) => {
          this.certificates = certificates;
        },
        (error) => {
          console.error('Failed to fetch certificates:', error);
        }
      );
  }


  removeCertificate(certificate: Certificate) {
    const index = this.certificates.indexOf(certificate);
    if (index !== -1) {
      this.certificates.splice(index, 1);
    }
  }
}
