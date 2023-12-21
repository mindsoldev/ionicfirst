import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {

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

  ngOnInit() {}

  initForm() {
    this.form = new FormGroup({
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
    this.authService.login(this.form.value).then((data) =>{
      console.log('logged in data: ', data);
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
      this.isLoading = false;
      this.form.reset();
    })
    .catch(e => {
      console.log(e);
      this.isLoading = false;
      let msg = 'Could not sign in, please try again.';
      if (e.code == 'auth/invalid-email') {
        msg = 'Incorrect email format. Please try again!';
      } else if (e.code == 'auth/invalid-credential') {
        msg = 'Incorrect email id or password. Please try again!';
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
