import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent  implements OnInit {

  @Input() restaurant: any;

  constructor() { 
    // this.restaurant = { id: '1' };
  }

  ngOnInit() {}

  getCuisines(data: string[]) {
    return data.join(', ');
  }
}
