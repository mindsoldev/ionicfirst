import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  form!: FormGroup;
  type: boolean = true;
  isLoading!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    ) { 
    this.initForm();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]})
    })
  }

  changeType() {
    this.type = !this.type;
  }

  onSubmit() {
    if (!this.form.valid) {
      console.log('Form not valid!');
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.authService.register(this.form.value).then((data) =>{
      console.log('redistered data: ', data);
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
      this.isLoading = false;
      this.form.reset();
    })
    .catch(e => {
      console.log(e);
      this.isLoading = false;
      let msg = 'Could not sign up, please try again.';
      if (e.code == 'auth/email-already-in-use') {
        msg = 'Email is already in use. try signup with other email id';
      }
      this.showAlert(msg);
    })

  }
  
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Authentication Failed',
      message,
      buttons: ['OK'],
    })

    await alert.present();
  }

}

