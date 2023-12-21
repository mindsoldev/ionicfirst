import { Injectable } from '@angular/core';
// import { Plugins } from '@capacitor/core';
// const { Storage } = Plugins;
import { Preferences } from '@capacitor/preferences';

export const INTRO_KEY =  'intro-slides';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setStorage(key: any, value: any) {
    return Preferences.set({
      key,
      value
    });
  }

  getStorage(key: any) {
    var value: any = Preferences.get({key});
    console.log('getStorage: ', value);
    return value;
  }

  removeStorage(key: any) {
    return Preferences.remove({key});
  }
}
