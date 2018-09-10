import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TransitionsPage } from '../pages/transitions/transitions';
import { BackPage } from '../pages/back/back';
import { DownloadPage } from '../pages/download/download';
import { TabsPage } from '../pages/tabs/tabs';
import { SliderPage } from '../pages/slider/slider';
import { FileService } from '../file.service';
import { UbiSlide } from '../components/ubi-slide/ubi-slide';
import { UbiSlider } from '../components/ubi-slider/ubi-slider';

@NgModule({
  declarations: [
    MyApp,
    TransitionsPage,
    DownloadPage,
    TabsPage,
    BackPage,
    SliderPage,
    UbiSlide,
    UbiSlider
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TransitionsPage,
    DownloadPage,
    TabsPage,
    BackPage,
    SliderPage
  ],
  providers: [
    FileService
  ]
})
export class AppModule { }
