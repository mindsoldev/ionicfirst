import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { StorageService } from '../storage.service';

export const user_key = 'food_delivery_user_id';

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
      const registeredUser = await createUserWithEmailAndPassword(this._fireAuth, formValue.email,formValue.password);
      console.log('registered user: ', registeredUser);
      const uid = registeredUser.user.uid;
      const dataRef = doc(this._firestore, `users/${uid}`);
      const data = {
        email: formValue.email,
        username: formValue.username,
      }
      setDoc(dataRef, data);
      await this.storage.setStorage(user_key, uid);
      return registeredUser.user.uid;
    } catch (error) {
      throw(error);
    }

  }

  async login(formValue: any) {
    try {
      const response = await signInWithEmailAndPassword(this._fireAuth, formValue.email,formValue.password);
      console.log('login user: ', response);
      if (response?.user) {
        const uid = response.user.uid;
        await this.storage.setStorage(user_key, uid);
        return uid;
      } else {
        return false;
      }
    } catch (error) {
      throw(error);
    }
  }
  
  checkAuth() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this._fireAuth, user => {
        if (user) resolve(true);
        return reject(false);
      })  
    })
  }

  async logout() {
    try {
      await signOut(this._fireAuth);
      await this.storage.removeStorage('food_delivery_user_id');
      return true;
    } catch (error) {
      throw(error);
    }
  }
}
