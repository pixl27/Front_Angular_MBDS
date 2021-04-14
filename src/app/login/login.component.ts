import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {FormBuilder, FormGroup , Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {AppComponent} from '../app.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: ''
  password: ''
  constructor(private authservice:AuthService,private _snackBar: MatSnackBar,
    private router:Router,private appcomponent:AppComponent) { }

  ngOnInit(): void {
    let token =  localStorage.getItem("usertoken");
    console.log(token);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

login(){
  console.log(
    this.authservice.logIn(this.username,this.password).subscribe( 
      data => {
        this.appcomponent.estConnecte = true,
        this.authservice.admin = true,
        this.router.navigate(["/home"]);

      },
      err => this.openSnackBar("Erreur de connexion","X")


    )
    );
}

}
