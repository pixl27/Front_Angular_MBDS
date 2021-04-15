import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Assignment } from '../assignments/assignment.model';
import { Matiere } from '../matieres/matiere.model';

import { LoggingService } from './logging.service';
import { assignmentsGeneres } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[];
  matieres:Matiere[];
  matid : Matiere;
  constructor(private loggingService:LoggingService, private http:HttpClient) { 
    this.getMatieres()
    .subscribe(matieres => {
        this.matieres = matieres as Matiere[]
    })
  }

  //uri = "http://localhost:8010/api/assignments";
  uri = "https://backendmdbs.herokuapp.com/api/assignments"
  urimatiere = "https://backendmdbs.herokuapp.com/api/matieres"

  getMatieres():Observable<Matiere[]> {
    console.log("Dans le service de gestion des matieres...")
    //return of(this.matieres);
    return this.http.get<Matiere[]>(this.urimatiere);
  }

  getMatiere(id:string):Observable<Matiere> {
    return this.http.get<Matiere>(this.urimatiere + "/" + id)
  }

  getAssignments():Observable<Assignment[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {

    return this.http.get<Assignment[]>(this.uri+"?page="+page + "&limit="+limit ,{headers: new HttpHeaders({'x-access-token': localStorage.getItem("usertoken")})}).pipe(
      // traitement 1
      map(a => {
       
     
          for (let value of a["docs"]) {
          //  console.log( this.getMatiere('df').subscribe())
          for (let i = 0; i < this.matieres.length; i++) {
          if(value.matiere == this.matieres[i]._id) {
            value.matiereimage = this.matieres[i].img;
            value.profimage = this.matieres[i].imgprof;
          }
          }
           // console.log(value.id);
          }
    //      console.log(eventItem);
     
      return a;
      })
    );

  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getAssignmentsAsPromise():Promise<Assignment[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  getAssignment(id:number):Observable<Assignment> {
    //let assignementCherche = this.assignments.find(a => a.id === id);

    //return of(assignementCherche);

    return this.http.get<Assignment>(this.uri + "/" + id)
    .pipe(
      // traitement 1
      map(a => {
        for (let i = 0; i < this.matieres.length; i++) {
          if(a.matiere == this.matieres[i]._id) {
            a.nommatiere = this.matieres[i].nom;
            a.matiereimage = this.matieres[i].img;
            a.profimage = this.matieres[i].imgprof;
            a.nomprof = this.matieres[i].nomprof;
          }
          }
    
        return a;
      }),
      tap(a => {
        console.log("TRACE DANS TAP : j'ai reçu " + a.nom);
      }),
      /*
      filter(a => {
        return (a.rendu)
      })
      */
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  generateId():number {
    return Math.round(Math.random()*100000);
  }

  addAssignment(assignment:Assignment):Observable<any> {
    assignment.id = this.generateId();
    //this.loggingService.log(assignment.nom, " a été ajouté");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajouté !");*/

    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment ):Observable<any> {
    // besoin de ne rien faire puisque l'assignment passé en paramètre
    // est déjà un élément du tableau

    //let index = this.assignments.indexOf(assignment);

    //console.log("updateAssignment l'assignment passé en param est à la position " + index + " du tableau");
    this.loggingService.log(assignment.nom, " a été modifié");

    return this.http.put(this.uri, assignment,{headers: new HttpHeaders({'x-access-token': localStorage.getItem("usertoken")})});
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    /*
    let index = this.assignments.indexOf(assignment);

    this.assignments.splice(index, 1);
    */


    this.loggingService.log(assignment.nom, " a été supprimé");

    return this.http.delete(this.uri + "/" + assignment._id);

  }

  peuplerBD() {
    assignmentsGeneres.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.matiere = a.matiere
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarque = a.remarque;
      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    })
  }

  // autre version qui permet de récupérer un subscribe une fois que tous les inserts
  // ont été effectués
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment = [];

    assignmentsGeneres.forEach((a) => {
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.matiere = a.matiere
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarque = a.remarque;
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }
}
