import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certificate } from './certificate.model';
import { v4 as uuidv4 } from 'uuid';
import { CertificateService } from '../../services/certificate.service';

@Component({
 selector: 'app-certificate',
 templateUrl: './certificate.component.html',
 styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
 certificate!: Certificate;
 certificateForm!: FormGroup;

 constructor(private certificateService: CertificateService, private fb: FormBuilder) {}

 ngOnInit(): void {
    this.certificateForm = this.createBlueprint();
 }

 createPDF(certificate: Certificate): void {
    this.certificateService.createPDF(certificate);
 }

 saveCertificate(): void {
    if (this.certificateForm.valid) {
      console.log(this.certificateForm.valid);
      const form = this.certificateForm.value;
      const ID = uuidv4();
      this.certificate = new Certificate(
        ID,
        form.candidateName,
        form.courseName,
        form.creditHours,
        form.endDate,
        form.notes
      );
      this.certificateService.storeCertificateData(this.certificate).subscribe({
        next: res => {
          console.log('valid certificate');
        },
        error: err => {
          console.log('error:' + err);
        },
        complete: () => {
          console.log('finish');
        }
      });
    }
 }

 private createBlueprint(data?: any): FormGroup {
    return this.fb.group({
      candidateName: [data && data.candidateName ? data.candidateName : '', [Validators.required]],
      courseName: [data && data.courseName ? data.courseName : ''],
      creditHours: [data && data.creditHours ? data.creditHours : ''],
      endDate: [data && data.endDate ? data.endDate : ''],
      notes: [data && data.notes ? data.notes : ''],
    });
 }
}


