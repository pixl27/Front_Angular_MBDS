# Front_Angular_MBDS
Front end angular du projet MBDS

# Projet Angular / Node MDBS Madagascar 2021

#Développeurs:
	- RAKOTONDRAZAKA Ny Toky Mahery N°27
	- RAZAKANDRAINY Aina N°57

#Données:
	- 500 assignments
	- 2 matières
	
#Lien Github:
	- Backend: https://github.com/pixl27/Backend_Node_Mbds
	- Frontend: https://github.com/pixl27/Front_Angular_MBDS
	
#Lien Heroku:
	- Backend: https://backendmdbs.herokuapp.com/
	- Frontend: https://frontenda2021.herokuapp.com/

#Contribution:
	- Gestion de login/password avec JWT (access token & refresh token)
	-sécurité sur les API (ex: getAssignments et updateAssignments)
	- Ajout de nouvelles collections et propriétés: 
		=> Collections: Matieres
		=> Propriétés: Auteur, Matière, image de la matière, nom du prof , photo du prof, note, remarques
	- Assignment sous forme d'une Material Card
	- Liste - pagination - detail assignment - Supprimer et modifier
	- Notation des devoirs non rendu par Drag & Drop 
	- Formulaire de type Stepper : Ajout - Modification
	-  Onglet Rendu et Non rendu
	- Notification (sur la page login en cas d'érreur)
	- Validation des forms 
	- Données générées par Moockaroo (https://www.mockaroo.com/)
	- Petite Easter Egg en rapport avec la fin de notre cours (11 Mars 2021)
	- Hébergement sur Heroku.com

#Utilisation en locale:
	- Backend:
		=> Télécharger le zip du projet git
		=> Extraire le fichier zip dans un dossier
		=> Executer la commande dans le dossier du projet : npm install
		=> Pour lancer, executer la commande : node server
	- Frontend:
		=> Télécharger le zip du projet git
		=> extraire le fichier zip dans un dossier
		=> executer la commande dans le dossier du projet : npm install
		=> pour lancer, executer la commande : ng serve

#Vidéo démo:
	.
		
#Login:
	- Admin:
			.username: root
			.Mot de passe: root
		=> accès à toutes les fonctionnalités

#Collections:
	- Assignments: _id - matiere - nom - auteur - rendu - dateDeRendu - note - remarques
	- Matieres: _id - nom - image - nomprof - imageprof


#Architecture:
[API]
	- Technologie: nodeJs 

[ANGULAR]
	- Technologie: Angular (typescript)

	- Pages disponibles:
		=> login
		=> liste des assignments: rendu - non rendu (Drag & Drop)
		=> assignment detail & suppression assignment
		=> ajout assignment
		=> edit assignment
		
#Sources:
	- Pour la conception du projet , nous l'avant fait avec le groupe 7 et on a partagé certaint des tutos ci-dessous (néanmoins je vous rassure , nous n'avons pas fait de pompage)
	- JWT & http interceptor : 
		=> https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
	- Card, pagination, Stepper, onglet, notification , Drag & Drop
		=> https://material.angular.io/
	- CRUD:
		=> https://github.com/micbuffa/MBDS_Madagascar2021_frontend
	- Données de test: 
		=> https://www.mockaroo.com/
	- Design :
		=> https://material.angular.io/
		=> https://getbootstrap.com/
		=> https://demos.creative-tim.com/now-ui-dashboard-angular/#/user-profile
	    => https://www.youtube.com/watch?v=dlBb1Z_8FiI&t=614s (Template AminLTE3)
		
