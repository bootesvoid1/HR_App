import { Routes } from '@angular/router';
import { CertificateComponent } from './Certificate/certificate.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserListComponent } from '../user-list/user-list.component';


export const MaterialRoutes: Routes = [
  {
    path: 'certificate',
    component: CertificateComponent
  },
  {
    path: 'certificateList',
    component: CertificateListComponent
  },
  {
    path: 'userList',
    component: UserListComponent
  },

];
