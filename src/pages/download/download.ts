import { Component } from '@angular/core';
import { FileService } from '../../file.service'
import { Platform, ToastController } from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-download',
  templateUrl: 'download.html'
})
export class DownloadPage {

  constructor(
    private toastCtrl: ToastController,
    public platform: Platform,
    private fileService: FileService) {
  }

  checkExistence() {
    this.fileService.checkExistence('http://www.orimi.com/pdf-test.pdf')
      .then(() => { this.toastCtrl.create({message: 'Exists', duration: 3000}).present() })
      .catch(() => { this.toastCtrl.create({message: 'Doesn\'t exits', duration: 3000}).present() })
  }
  
  checkNotExistence() {
    this.fileService.checkExistence('http://www.orimi.com/pdf-testss.pdf')
      .then(() => { this.toastCtrl.create({message: 'Exists', duration: 3000}).present() })
      .catch(() => { this.toastCtrl.create({message: 'Doesn\'t exits', duration: 3000}).present() })
  }

  sharePDF(){
    const fileURL = 'http://www.orimi.com/pdf-test.pdf';
    this.fileService.share(fileURL);
  }
  

  openPDF(https = false) {
    this.platform.ready().then(() => {

      try {
        let fileURL = 'http://www.orimi.com/pdf-test.pdf';
        if (https) {
          fileURL = 'https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf';
        }

        this.fileService.downloadAndOpen(fileURL);
        /*const storageDirectory = this.platform.is('android') ? cordova.file.externalCacheDirectory : cordova.file.tempDirectory;
        const fileDownloadPath = storageDirectory + path.basename(fileURL);

        fileTransfer.download(encodeURI(fileURL), fileDownloadPath, true)
          .then((downloaded: FileEntry) => {
            console.info(downloaded);
            FileOpener.open(downloaded.toURL(), 'application/pdf')
              .catch((err) => {

                console.error(err);
              });
          }).catch((err) => {
            console.error("ERRORING");
            console.error(err);
          })*/
      } catch (err) {
        console.error(err);
      }
    });
  }
}
