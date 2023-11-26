  import { Component, Inject, OnInit } from '@angular/core';
  import { Certificate } from '../Certificate/certificate.model';
  import { CertificateService } from '../../services/certificate.service';
import {MatDialog } from '@angular/material/dialog';
import { ModifyCertificateComponent } from './modify-certificate/modify-certificate.component';


  @Component({
    selector: 'app-certificate-list',
    templateUrl: './certificate-list.component.html',
    styleUrls: ['./certificate-list.component.scss']
  })
  export class CertificateListComponent implements OnInit {
    certificates: Certificate[] = [];
    public certificate: Certificate = new Certificate('','','',0,new Date(),'');
    displayedColumns: string[] = ['candidateName', 'courseName', 'creditHours', 'endDate', 'actions'];




    constructor(private certificateService: CertificateService, public dialog: MatDialog){}

    ngOnInit() {
      this.getCertificate()
      // this.fetchCertificates();

    }

    // fetchCertificates() {
    //   this.certificateService.getUpdatedCertificates()
    //     .subscribe(
    //       (certificates) => {

    //         this.certificates =certificates;
    //       },
    //       (error) => {
    //         console.error('Failed to fetch certificates:', error);
    //       }
    //     );
    // }

   removeCertificate(certificate: Certificate) {
  this.certificateService.deleteCertificate(certificate).subscribe({
    next: (res: any) => {
      console.log(res);
    },
    error: (err: any) => {
      console.error("Error deleting certificate:", err);

    },
    complete :()=>{
      this.getCertificate()

    }

  });



      }

    getCertificate(){
      return this.certificateService.getCertificates().subscribe({
        next : (res:any)=>{
          console.log(res.certificates);
          this.certificates = res.certificates

        }
      })
    }
    modifyCertificate(certificate: Certificate) {
      console.log(certificate);
      const dialogRef = this.dialog.open(ModifyCertificateComponent, {
        width: '600px',
        data: { certificate  }
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.getCertificate()

          console.log(result);

         /* this.certificateService.updateCertificates(result).subscribe(res => {
          this.getCertificate();});*/

        } else {


          console.log('Dialog closed without result');
        }
      });
    }
    generatePDF(certificate : Certificate){
      console.log(certificate);
      this.certificateService.createPDF(certificate);
    }

  }
