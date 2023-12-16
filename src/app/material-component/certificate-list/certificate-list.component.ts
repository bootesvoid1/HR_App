  import { Component, Inject, OnInit, ViewChild } from '@angular/core';
  import { Certificate } from '../Certificate/certificate.model';
  import { CertificateService } from '../../services/certificate.service';
import {MatDialog } from '@angular/material/dialog';
import { ModifyCertificateComponent } from './modify-certificate/modify-certificate.component';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
  @Component({
    selector: 'app-certificate-list',
    templateUrl: './certificate-list.component.html',
    styleUrls: ['./certificate-list.component.scss']
  })
  export class CertificateListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    certificates: Certificate[] = [];
    public certificate: Certificate = new Certificate('','','',0,new Date(),'');
    displayedColumns: string[] = ['candidateName', 'courseName', 'creditHours', 'endDate', 'actions'];
    dataSource = new MatTableDataSource<Certificate>(this.certificates);



    constructor(private certificateService: CertificateService, public dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef){}

    ngOnInit() {
      this.getCertificate()
      // this.fetchCertificates();
      this.dataSource = new MatTableDataSource<Certificate>(this.certificates);
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
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
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (!filterValue) {
       this.dataSource.filter = '';
      }

      this.changeDetectorRef.detectChanges();
     }
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

      getCertificate() {
        return this.certificateService.getCertificates().subscribe({
          next: (res: any) => {
            console.log(res.certificates);
            this.certificates = res.certificates;
            this.dataSource = new MatTableDataSource<Certificate>(this.certificates);
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
