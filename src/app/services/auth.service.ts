import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../models/usuario.mode';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  authUserInfo(){
    this.auth.authState.subscribe(fuser => {
      //console.log(fuser);
    })
  }

  register(name: string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password)
            .then( ({user}) => {
              const User = new Usuario(user.uid, name, user.email);
              return this.firestore.doc(`${user.uid}/usuario`).set({...User})
            })
  }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoff(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map( fuser => fuser != null)
    );
  }
}
