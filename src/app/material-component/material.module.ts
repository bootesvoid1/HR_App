import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialRoutes } from './material.routing';
import { CertificateComponent } from './Certificate/certificate.component';

import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { ModifyCertificateComponent } from './certificate-list/modify-certificate/modify-certificate.component';





@NgModule({
  declarations: [
    CertificateComponent,
    CertificateListComponent,
    ModifyCertificateComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,


  ],
  providers: [],
})
export class MaterialComponentsModule {}
