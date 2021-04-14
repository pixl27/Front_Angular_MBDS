import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from '../matieres/matiere.model';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag
} from "@angular/cdk/drag-drop";
declare let $: any;

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments:Assignment[];
  assignmentsR:Assignment[];
  assignmentsNR:Assignment[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  img: string;
 iddrag:String;
  @ViewChild('content') content: any;
  done = [];
  assignment:Assignment;
  note:number
  nom = '';
  matiere = '';
  auteur = '';
  dateRendu = null;
  remarque = null;
  // on injecte le service de gestion des assignments
  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
    console.log('AVANT AFFICHAGE');
    //

    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;

      this.getAssignments();
    });
      console.log("getAssignments() du service appelé");
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        let id = JSON.stringify(event.container.data[event.currentIndex]["id"]).replace(/['"]+/g, '')
                      
                        $(this.content.nativeElement).modal('show');
                        this.iddrag = id;  
                        this.getAssignmentById()
   
                      }
  }

  getAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
    .subscribe(data => {
      this.assignmentsR = [];
      this.assignmentsNR = [];
      this.assignments = [];
      this.assignments = data.docs;

      for(let i=0;i<this.assignments.length;i++){
        if(this.assignments[i].rendu){
          this.assignmentsR.push(this.assignments[i]);
        }
        else{
          this.assignmentsNR.push(this.assignments[i]);
        }
    }

      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    });
  }
  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.iddrag;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {

      this.assignment = assignment;

      this.nom = assignment.nom;
      this.dateRendu = assignment.dateDeRendu;
      this.auteur = assignment.auteur;
      this.note = assignment.note;
      this.remarque = assignment.remarque;
      this.matiere = assignment.matiere;

    });
  }
  updatenote(event) {
    // on va modifier l'assignment
console.log(this.assignment)
    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateRendu;
    this.assignment.auteur =    this.auteur 
    this.assignment.note =   this.note
    this.assignment.remarque = this.remarque 
    this.assignment.matiere =  this.matiere 
    this.assignment.rendu = true;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log("drag et rendu");

        // et on navigue vers la page d'accueil
        window.location.reload();

      })

  }

  closemodal(){
    window.location.reload();

  }

  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message);
      })
  }


  premierePage() {
    this.router.navigate(['/home'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
    /*
    this.page = this.nextPage;
    this.getAssignments();*/
    this.router.navigate(['/home'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/home'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/home'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }
}
