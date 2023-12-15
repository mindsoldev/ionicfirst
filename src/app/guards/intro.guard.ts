import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { INTRO_KEY, StorageService } from '../services/storage.service';
import { AppModule, testMode } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(
    private router: Router,
    private storage: StorageService) {}

  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await this.storage.getStorage(INTRO_KEY);
    console.log(INTRO_KEY, ": ", hasSeenIntro.value);
    if (hasSeenIntro && hasSeenIntro.value == 'true') {
      if (testMode) {
        this.storage.setStorage(INTRO_KEY, "false");
      }
      return true;
    } else {
      this.router.navigateByUrl('intro', {replaceUrl: true});
      return true;
    }
  }
}
