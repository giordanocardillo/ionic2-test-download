import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { FileEntry, FileOpener, Transfer, SocialSharing } from 'ionic-native';
import * as MimeTypes from 'mime-types';
import * as path from 'path';

declare var cordova: any;

@Injectable()
export class FileService {

  constructor(private platform: Platform, private http: Http) {
  }

  download(fileURL: string): Promise<FileEntry> {
    // IMPORTANT the cordova-plugin-file-transfer v2.0.3 works on Android but is bugged on iOS
    // therefore on iOS use the v2.0.19
    if (!this.platform.is('mobile')) {
      return Promise.reject('Not on a mobile platform');

    }
    const fileTransfer = new Transfer();
    const fileName = path.basename(fileURL);
    const storagePath = this.getStoragePath();
    return fileTransfer.download(fileURL, storagePath + fileName, true) as Promise<FileEntry>;
  }

  open(fileURI: string): Promise<any> | Window {
    if (!this.platform.is('mobile')) {
      return window.open(fileURI, '_system');
    }
    const fileMimeType = this.getMimeType(fileURI);
    return FileOpener.open(fileURI, fileMimeType);
  }

  downloadAndOpen(fileURL: string): Promise<any> | undefined {
    if (!this.platform.is('mobile')) {
      return Promise.reject('Not on a mobile platform');
    }
    this.download(fileURL).then((downloaded) => {
      return this.open(downloaded.toURL());
    });
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
      return cordova.file.externalCacheDirectory;
    }
    if (this.platform.is('ios')) {
      return cordova.file.tempDirectory;
    }

    return cordova.file.cacheDirectory;
  }

}
