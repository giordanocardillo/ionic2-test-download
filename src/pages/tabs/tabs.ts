import { Component } from '@angular/core';

import { DownloadPage } from '../download/download';
import { TransitionsPage } from '../transitions/transitions';
import { SliderPage } from '../slider/slider';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SliderPage;
  tab2Root: any = TransitionsPage;
  tab3Root: any = DownloadPage;

  constructor() {

  }
}
