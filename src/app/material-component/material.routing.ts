import { Routes } from '@angular/router';
import { CertificateComponent } from './Certificate/certificate.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';


export const MaterialRoutes: Routes = [
  {
    path: 'certificate',
    component: CertificateComponent
  },
  {
    path: 'certificateList',
    component: CertificateListComponent
  },

];
