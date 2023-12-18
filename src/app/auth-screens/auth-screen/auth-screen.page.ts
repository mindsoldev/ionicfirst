import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.page.html',
  styleUrls: ['./auth-screen.page.scss'],
})
export class AuthScreenPage implements OnInit {

  segmentValue: string = "1";

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }

}
