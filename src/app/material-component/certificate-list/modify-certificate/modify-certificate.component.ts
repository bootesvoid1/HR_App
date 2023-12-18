import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CertificateListComponent } from '../certificate-list.component';
import { Certificate } from '../../Certificate/certificate.model';
import { CertificateService } from '../../../services/certificate.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-modify-certificate',
  templateUrl: './modify-certificate.component.html',
  styleUrls: ['./modify-certificate.component.scss']
})
export class ModifyCertificateComponent implements OnInit{
  public certificate: any = new Certificate('','','',0,new Date(),'');
  public certificates: Certificate[] = [];
  constructor(private _snackBar: MatSnackBar,public fb: FormBuilder,public certificateService: CertificateService,
    public dialogRef: MatDialogRef<CertificateListComponent>,@Inject(MAT_DIALOG_DATA)
    public data: { certificates: Certificate[], certificate: Certificate }) {

    if (data){
      // console.log(data)

    this.certificates = data.certificates;
    this.certificate = { ...data.certificate };}
    // console.log(this.certificate)
  }
  public certificateForm: FormGroup=this.createBluePrint(this.data);





  ngOnInit() {

  }

  onSubmit() {
    if (this.certificateForm.valid) {
      if(this.certificateForm.dirty){
        this.certificate = { ...this.certificate, ...this.certificateForm.value };
        this.certificateService.updateCertificate(this.certificate._id,this.certificate).subscribe({
          next : res=>{


          },
          error : err=>{
            this.dialogRef.close();
            // console.log(err);
          },
          complete :()=>{
            this.dialogRef.close({message : 'Modified successfully' });

            console.log('complete');
          }

        }

        );
      }else{
        this.openSnackBar()
      }

    }
 }

  onCancel():void {
     this.dialogRef.close();
  }
  createBluePrint(data?:any){
    // console.log(data,'here')
    return this.fb.group({
     candidateName: [data && data.certificate  && data.certificate.candidateName ?data.certificate.candidateName : '',[Validators.required]  ],
     courseName : [data && data.certificate && data.certificate.courseName ?data.certificate.courseName : ''  ],
     creditHours:[data && data.certificate && data.certificate.creditHours ?data.certificate.creditHours : ''  ],
     endDate  : [data &&  data.certificate && data.certificate.endDate ?data.certificate.endDate : ''  ],
     notes :[data && data.certificate  && data.certificate.notes ?data.certificate.notes : ''  ],
   })

  }
  openSnackBar() {
    this._snackBar.open('Certificate unchanged','Alert');
  }
}








