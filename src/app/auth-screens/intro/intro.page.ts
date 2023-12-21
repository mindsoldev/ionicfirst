import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { INTRO_KEY, StorageService } from 'src/app/services/storage.service';
import { ElementRef, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  public swiperModules = [IonicSlides];

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  private swiperInstance: any;
  swiper?: Swiper;

  constructor(
    private router: Router,
    private storage: StorageService) { }

  ngOnInit() {
  }

  async goToLogin() {
    await this.storage.setStorage(INTRO_KEY, 'true');
    this.router.navigateByUrl('/auth-screen', {replaceUrl: true});
  }

  swiperReady() {
    this.swiper = this.swiperInstance?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

}
