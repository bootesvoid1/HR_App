import { Component,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Certificate } from './certificate.model';
import { jsPDF } from 'jspdf';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  certificateData!: Certificate;

  onSubmit(form: NgForm) {
    if (form.valid) {
      const ID = uuidv4();
      this.certificateData = new Certificate(
        ID,
        form.value.candidateName,
        form.value.courseName,
        form.value.creditHours,
        form.value.endDate,
        form.value.notes
      );
      this.createPDF();
    } else {
      console.error('Form is invalid. Please check your input.');
    }
  }

  createPDF() {
    if (this.certificateData) {
      const pdf = new jsPDF();
      const imgData = '/assets/images/logo (1).png';
      pdf.addImage(imgData, 'JPEG', 40, 10, 120, 40);


      const data = [
        ['Candidate Name', this.certificateData.candidateName],
        ['Course Name', this.certificateData.courseName],
        ['Credit Hours', this.certificateData.creditHours.toString()],
        ['End Date', this.certificateData.endDate.toString()],
        ['Notes', this.certificateData.notes]
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

      pdf.save(this.certificateData.candidateName + '.pdf');
    } else {
      console.error('Certificate data is missing. Please submit the form first.');
    }
  }
}
