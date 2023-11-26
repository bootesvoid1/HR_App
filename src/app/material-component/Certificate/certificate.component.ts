import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Certificate } from './certificate.model';
import { jsPDF } from 'jspdf';
import { v4 as uuidv4 } from 'uuid';
import {CertificateService} from '../../services/certificate.service';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent  {
certificate: any;
generatePDF() {

}
  constructor(private myService:CertificateService,private fb : FormBuilder) {}
  certificateData!: Certificate;
  certificateForm : FormGroup = this.createBluePrint()
  saveCertificate(){
    if (this.certificateData) {
      this.myService.storeCertificateData(this.certificateData);
  }
}
  onSubmit() {
    console.log(this.certificateForm)
    let form  = this.certificateForm.value
    // if(this.certificateForm.valid){
    //   let form = this.certificateForm.value
    //   this.myService.storeCertificateData(form).subscribe({
    //     next : res =>{
    //       console.log('valid');
    //     },
    //     error : err=>{
    //       console.log('error');

    //     },
    //     complete : ()=>{
    //       console.log('finish');

    //     }
    //   })
    // }
    if (this.certificateForm.valid) {
      const ID = uuidv4();
      this.certificateData = new Certificate(
        ID,
        form.candidateName,
        form.courseName,
        form.creditHours,
        form.endDate,
        form.notes
      );
      this.saveCertificate;
        this.myService.createPDF(this.certificateData);
    } else {
      console.error('Form is invalid. Please check your input.');
    }
  }

  // createPDF() {

  //     const pdf = new jsPDF();
  //     const imgData = '/assets/images/logo (1).png';
  //     pdf.addImage(imgData, 'JPEG', 40, 10, 120, 40);


  //     const data = [
  //       ['Candidate Name', this.certificateData.candidateName],
  //       ['Course Name', this.certificateData.courseName],
  //       ['Credit Hours', this.certificateData.creditHours.toString()],
  //       ['End Date', this.certificateData.endDate.toString()],
  //       ['Notes', this.certificateData.notes]
  //     ];


  //     let yPos = 60;
  //     const cellWidth = 90;


  //     data.forEach(row => {
  //       pdf.setDrawColor(0);
  //       pdf.setFillColor(255, 255, 255);
  //       pdf.rect(10, yPos, cellWidth, 15, 'F');
  //       pdf.setFont('helvetica', 'normal');
  //       pdf.setFontSize(12);
  //       pdf.text(row[0], 15, yPos + 10);
  //       pdf.text(row[1], 105, yPos + 10);
  //       yPos += 15;
  //     });

  //     pdf.save(this.certificateData.candidateName + '.pdf');
  //   }

    createBluePrint(data?:any){
       return this.fb.group({
        candidateName: [data && data.candidateName ?data.candidateName : '',[Validators.required]  ],
        courseName : [data && data.courseName ?data.courseName : ''  ],
        creditHours:[data && data.creditHours ?data.creditHours : ''  ],
        endDate  : [data && data.endDate ?data.endDate : ''  ],
        notes :[data && data.notes ?data.notes : ''  ],
      })
    }
  }



