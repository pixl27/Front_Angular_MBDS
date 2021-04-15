import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Matiere } from 'src/app/matieres/matiere.model';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  matiere = '';
  auteur = '';
  note = null;
  remarque = null;
  listeMatieres = [];
  dateDeRendu = null;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  matiereview:Matiere;
  showmatiereview= false;
  constructor(private assignmentsService:AssignmentsService,
              private router:Router,private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.assignmentsService.getMatieres()
    .subscribe(matieres => {
        this.listeMatieres = matieres as Matiere[]
    })
    
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      firstCtrl2: ['', Validators.required],
      firstCtrl3: ['', Validators.required]

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  easter(event){

    if(this.dateDeRendu.getTime() == new Date("03/11/2021").getTime()){
      let audio = new Audio();
      audio.src = "../../assets/image/easteregg.mp3";
      audio.load();
      audio.play();
    }
 
  }

  onChange(deviceValue) {
    
    this.assignmentsService.getMatiere(this.matiere).subscribe((matiere) => {
      this.matiereview = matiere;
      console.log(this.matiereview.nomprof)
     this.show();
     
    });

 
}
  
  show() {
    this.showmatiereview = true;

  }

  onSubmit(event) {
    console.log(this.nom + " " + this.matiere);
    
    if((!this.nom) || (!this.dateDeRendu)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.auteur = this.auteur;
    nouvelAssignment.matiere = this.matiere;
    nouvelAssignment.note = null;
    nouvelAssignment.remarque = "";

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home"]);
      });
    
  }

}
