import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder,FormGroup , Validators} from '@angular/forms';
import { Matiere } from 'src/app/matieres/matiere.model';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;

  // pour le formulaire
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
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

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
      secondCtrl: ['', Validators.required],
      secondCtrl2: ['', Validators.compose(
        [Validators.min(0), Validators.max(20)])],
      secondCtrl3: ['']


    });
    
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignmentById();
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;

      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.auteur = assignment.auteur;
      this.note = assignment.note;
      this.remarque = assignment.remarque;
      this.matiere = assignment.matiere;

    });
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
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu)) return;

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.auteur =    this.auteur 
    this.assignment.note =   this.note 
    this.assignment.remarque = this.remarque 
    this.assignment.matiere =  this.matiere 

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })

  }
}
