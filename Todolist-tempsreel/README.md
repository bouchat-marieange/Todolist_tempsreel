# Todolist partagée (websocket - Express - EJS)

Todolist partagée avec Node.js - Express (gestion des routes) - EJS (Vue)

## Installation

1. Décompresser le dossier
2. Se placer avec le terminal dans le dossier et taper la commande "npm install" pour installer les dépendances et le dossier node_modules (indiquées dans le fichier package.json)
3. Une fois les dépendances installées, taper dans le terminal la commande "node app.js"
4. Se rendre dans votre navigateur et ouvrir plusieurs fenêtres à l'adresse "localhost:8080" pour simuler l'usage par plusieurs utilisateurs simultanés.

## Fonctionnalités

Todolist basic permettant d'ajouter ou de supprimer des tâches dans une liste via un formulaire.

Cette todolist est partagée par plusieurs utilisateurs capable de pouvoir la modifier en ajoutant ou en supprimant des tâches dans la liste. Les modifications effectuées par l'un des utilisateurs se répercutent sur la todolist de tous les autres utilisateurs connectés.

Les fonctionnalités attendues sont:

* Quand un client se connecte, il récupère la dernière Todolist connue du serveur
* Quand un client ajoute une tâche, celle-ci est immédiatement répercutée chez les autres clients
* Quand un client supprime une tâche, celle-ci est immédiatement supprimée chez les autres clients
