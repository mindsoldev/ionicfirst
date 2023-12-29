import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Geolocation } from '@capacitor/geolocation';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit, AfterContentChecked {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  loc = 'Locating...';
  banners: any[any] = [];
  categories: any[any] = [];
  favorites: any[any] = [];
  offers: any[any] = [];
  nearby: any[any] = [];

  // swiper parameterShadows
  cssMode!: boolean;
  autoPlay: any;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
    // this.banners.push({banner: 'assets/dishes/11.jpeg'});
    // this.banners.push({banner: 'assets/dishes/1.jpg'});
    // this.banners.push({banner: 'assets/dishes/cab.jpg'});
    // this.banners.push({banner: 'assets/dishes/craw.jpg'});
    // this.banners.push({banner: 'assets/dishes/10.jpeg'});

    this.banners = [
      {banner: 'assets/dishes/11.jpeg'},
      {banner: 'assets/dishes/1.jpg'},
      {banner: 'assets/dishes/cab.jpg'},
    ];

    this.categories = [      
      { id: 1, name: 'North Indian', image: 'assets/dishes/nan.jpg' },
      { id: 2, name: 'Italian', image: 'assets/dishes/pasta.jpg' },
      { id: 3, name: 'Chowmein', image: 'assets/dishes/chowmein.jpg' },
      { id: 4, name: 'South Indian', image: 'assets/dishes/dosa.jpg' },
      { id: 5, name: 'Mexican', image: 'assets/dishes/dol.jpg' },
    ];

    this.favorites = [
      {
        id: '1',
        cover: 'assets/dishes/restaurant.jpg',
        name: 'Stayfit',
        cuisines: [
          'Indian',
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 120,
        latitude: 0,
        longitude: 0
      },
      {
        id: '2',
        cover: 'assets/dishes/2.jpg',
        name: 'Stayfit1',
        cuisines: [
          'Italian',
          'Mexican',
          'Chinese'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.1,
        price: 95
      },
      {
        id: '3',
        cover: 'assets/dishes/3.jpg',
        name: 'Kolkata Roll',
        cuisines: [
          'Italian',
          'Mexican'
        ],
        rating: 4,
        delivery_time: 25,
        distance: 3.0,
        price: 110
      },
    ];

    this.offers = [
      {
        id: '1',
        cover: 'assets/dishes/3.jpg',
        name: 'Kolkata Roll',
        cuisines: [
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.8,
        price: 112
      },
      {
        id: '2',
        cover: 'assets/dishes/2.jpg',
        name: 'Stayfit1',
        cuisines: [
          'Italian',
          'Mexican',
          'Chinese'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.2,
        price: 89
      },
      {
        id: '3',
        cover: 'assets/dishes/restaurant.jpg',
        name: 'Stayfit',
        cuisines: [
          'Indian',
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 3.5,
        price: 125,
        latitude: 0,
        longitude: 0
      },
    ];

    this.nearby = [
      {
        id: '1',
        cover: 'assets/dishes/restaurant.jpg',
        name: 'Stayfit',
        cuisines: [
          'Indian',
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 1.5,
        price: 99,
        latitude: 0,
        longitude: 0
      },
      {
        id: '2',
        cover: 'assets/dishes/2.jpg',
        name: 'Stayfit1',
        cuisines: [
          'Italian',
          'Mexican',
          'Chinese'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.1,
        price: 120
      },
      {
        id: '3',
        cover: 'assets/dishes/3.jpg',
        name: 'Kolkata Roll',
        cuisines: [
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100
      },
    ];

    this.getCurrentLocation();
  }

  swiperBeforeInit() {
    this.cssMode = true;
    this.autoPlay = {delay: 100};
  }

  swiperReady() {
    console.log("after init");
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ngAfterContentChecked(): void {
    // console.log("swiperRef: ", this.swiperRef);
    // let swiperParams = this.swiperRef?.nativeElement.swiperParams;
    // console.log("swiper: ", this.swiper);
    // console.log("cssMode: ", swiperParams);
  }

  onSwiper(event: any) {}

  onSlideChange() {}

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
      this.loc = `Lat.: ${coordinates.coords.latitude}, long.: ${coordinates.coords.longitude}`;
    } catch (e) {
      console.log(e);
      this.openPopover();
    }
  }

  openPopover() {
    const ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            left: 5
          };
        }
      }
    };
    this.presentPopover(ev);
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'custom-popover',
      event: ev,
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log(`Popover dismissed with data: ${data}`);
    if (data) {
      this.requestGeolocationPermission();
    } else {
      this.loc = 'Karol Bagh, Delhi';
    }
  }

  async requestGeolocationPermission() {
    try {
      const status = await Geolocation.requestPermissions();
      console.log(status);
      if (status?.location == 'granted') this.getCurrentLocation();
      else this.loc = 'Karol Bagh, Delhi';
    } catch (e) {
      console.log(e);
    }
  }

}
