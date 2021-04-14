import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Application de gestion des assignments';
  public estConnecte = false;
  constructor(private authService:AuthService, private router:Router,
              private assignmentsService:AssignmentsService) {}
ngOnInit(){
 let tokenuser =  localStorage.getItem("usertoken");
 if(tokenuser != null){
  this.estConnecte = true
}
else {
  this.estConnecte = false
}
}
  login() {
    // si je suis pas loggé, je me loggue, sinon, si je suis
    // loggé je me déloggue et j'affiche la page d'accueil

    if(this.estConnecte) {
      this.authService.logOut();
      this.router.navigate(["/login"]);
    } else {
      // je ne suis pas loggé, je me loggue
      this.estConnecte = false;
      this.router.navigate(["/login"]);

    }
  }

  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
        this.router.navigate(["/home"], {replaceUrl:true});
      })
  }
}
