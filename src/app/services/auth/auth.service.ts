import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _fireAuth: Auth,
    private _firestore: Firestore,
    private storage: StorageService,
  ) { }

  async register(formValue: any) {
    try {
      const registeredUser = await createUserWithEmailAndPassword(getAuth(), formValue.email,formValue.password);
      console.log('registered user: ', registeredUser);
      const uid = registeredUser.user.uid;
      // const path = `users/${uid}`;
      // console.log('path: ', path);
      const dataRef = doc(this._firestore, `users/${uid}`);
      console.log('dataRef: ', dataRef);
      setDoc(dataRef, formValue);
      await this.storage.setStorage('food_delivery_user_id', uid);
      return registeredUser.user.uid;
    } catch (error) {
      throw(error);
    }

  }

  async login(formValue: any) {
    try {
      const response = await signInWithEmailAndPassword(getAuth(), formValue.email,formValue.password);
      console.log('login user: ', response);
      if (response?.user) {
        const uid = response.user.uid;
        await this.storage.setStorage('food_delivery_user_id', uid);
      } else {
        return false;
      }
    } catch (error) {
      throw(error);
    }
    return false;
  }
  
}
