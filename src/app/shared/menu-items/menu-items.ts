import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [

  { state: 'certificate', type: 'link', name: 'certificates', icon: 'crop_7_5' },
  { state: 'certificateList', type: 'link', name: 'Certificate List', icon: 'view_comfy' },
  // { state: 'add-user', type: 'link', name: 'Add User', icon: 'perm_identity' },
  { state: 'userList', type: 'link', name: 'Manage Users', icon: 'supervised_user_circle' },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
