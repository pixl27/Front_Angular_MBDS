import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Assignment } from '../assignments/assignment.model';
import { Matiere } from '../matieres/matiere.model';

import { LoggingService } from './logging.service';
import { assignmentsGeneres } from './data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin = true;

  constructor(private loggingService:LoggingService, private http:HttpClient) { 
   
  }
  uri = "https://backendmdbs.herokuapp.com/api/user"
/*
  logIn(login, password) {
    // typiquement, acceptera en paramètres un login et un password
    // vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
    // si login/password non valides, positionner à false;

    if (login === 'admin') this.admin = true;

    this.loggedIn = true;
  }
*/
logIn(username, password):Observable<any> {
  return this.http.post<any>(this.uri , { username, password }).pipe(map(resultat => {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    let tokenuser = JSON.stringify(resultat["token"]).replace(/['"]+/g, '');
    localStorage.setItem('usertoken', tokenuser);

    return resultat;
}));
}
  logOut() {
   localStorage.removeItem("usertoken")
  }

  // exemple d'utilisation :
  // isAdmin.then(admin => { console.log("administrateur : " + admin);})
  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }
}
