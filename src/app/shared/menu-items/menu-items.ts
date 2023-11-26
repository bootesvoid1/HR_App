import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [

  { state: 'certificate', type: 'link', name: 'certificates', icon: 'crop_7_5' },
  { state: 'certificateList', type: 'link', name: 'Condidates List', icon: 'view_comfy' },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
