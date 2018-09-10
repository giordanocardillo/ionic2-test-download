import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { FileEntry, FileOpener, Transfer, SocialSharing } from 'ionic-native';
import * as MimeTypes from 'mime-types';

declare var cordova: any;
declare const window: any;

@Injectable()
export class FileService {

  constructor(private platform: Platform, private http: Http) {
  }

  download(fileURL: string): Promise<FileEntry> {
    // IMPORTANT the cordova-plugin-file-transfer v2.0.6 works on Android but is bugged on iOS
    // therefore on iOS use the v2.0.19
    if (!this.platform.is('cordova')) {
      return Promise.reject('Not on a mobile platform');
    }
    console.info('Downloading')
    const fileTransfer = new Transfer();
    const storagePath = this.getStoragePath();
    return fileTransfer.download(fileURL, storagePath + 'article.pdf', true) as Promise<FileEntry>;
  }

  open(fileURI: string): Promise<any> | Window {
    if (!this.platform.is('cordova')) {
      return window.open(fileURI, '_system');
    }
    console.info('Opening');
    const fileMimeType = this.getMimeType(fileURI);
    console.info(FileOpener);
    console.info(FileOpener.open, fileURI, fileMimeType);
    return FileOpener.open(fileURI, fileMimeType)
  }

  downloadAndOpen(fileURL: string): Promise<any> | undefined {
    if (!this.platform.is('mobile')) {
      return Promise.reject('Not on a mobile platform');
    }
    console.info('Download and open');
    this.download(fileURL)
      .then((downloaded) => {
        return this.open(downloaded.toURL());
      })
    /*return new Promise<any>((resolve, reject) => {

      // cordova.plugins.DownloadManager.enqueue({ uri: 'http://new.ecostampa.net/imm2pdf/Image.aspx?imgatt=8HH3HC&imganno=2018&imgkey=B1UVUGG7R7K5L&tiplink=5', title: 'Titolo articolo', description: 'Download articolo in corso', visibleInDownloadsUi: true, mimeType: 'application/pdf', destinationUri: cordova.file.externalRootDirectory + 'Download/Titolo articolo.pdf', notificationVisibility: 1 }, console.log)
      /*cordova.plugins.DownloadManager.download(fileURL,
        (d) => { console.info(d); resolve(d) },
        (err) => { console.error(err); reject(err) });*/

    // })*/
  }

  share(fileURI: string) {
    SocialSharing.share(null, null, fileURI);
  }

  downloadAndShare(fileURL: string) {
    if (!this.platform.is('mobile')) {
      return Promise.reject('Not on a mobile platform');
    }
    this.download(fileURL).then((downloaded) => {
      return this.share(downloaded.toURL());
    });
  }

  checkExistence(fileURL: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.head(encodeURI(fileURL))
        .subscribe(() => resolve(), () => reject())
    })
  }

  getMimeType(fileURI: string): string {
    return MimeTypes.lookup(fileURI);
  }

  private getStoragePath(): string {
    if (this.platform.is('android')) {
      return cordova.file.externalRootDirectory + 'Download/';
    }
    if (this.platform.is('ios')) {
      return cordova.file.documentsDirectory;
    }

    return cordova.file.cacheDirectory;
  }

}
