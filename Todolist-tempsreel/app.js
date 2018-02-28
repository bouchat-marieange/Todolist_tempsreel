// Chargement des différents modules
var app = require('express')(); //Charge Express
var server = require('http').createServer(app); // Création du serveur
var io = require('socket.io').listen(server); // Charge de socket.io
var ent = require('ent'); //Charge module ent pour éviter échange JavaScript malicieux en échappant caractère HTML (sécurité équivalente à htmlentities en PHP)

// Définition des variables
var todolist = []; // stockage de la todolist dans une variable coté serveur

// Définition des routes et des redirections avec Express
// Affichage de la todolist et du formulaire
app.get('/todo', function(req, res) {
  res.render('todo.ejs', {todolist: todolist});
});

// On redirige vers la todolist si la page demandée n'est pas trouvée
app.use(function(req, res, next) {
  res.redirect('/todo');
});

// Echanges serveur socket.io

// On se connecte
io.sockets.on('connection', function(socket) {

  //On envoie la liste dès la connection d'un utilisateur
  socket.emit('listeActuelle', todolist);

  //Quand un utilisateur ajoute une tâche à la liste
  socket.on('ajout', function(nouvelleTache) {
    nouvelleTache = ent.encode(nouvelleTache); // On utilise ent pour sécurisé le texte entré par l'utilisateur
    todolist.push(nouvelleTache); // On ajoute la nouvelle tâche au tableau(todolist) stocké sur le serveur
    io.sockets.emit('listeActuelle', todolist); // On envoie la liste mise à jour à tous le monde (l'utilisateur qui a ajouter la tâche ainsi que tous les utilisateurs connectés)
  });

  //Quand un utilisateur supprime une tâche de la liste
  socket.on('suppression', function(index) {
    todolist.splice(index, 1); // On supprime de la todolist (tableau) la tâche correspondant à l'index grâce à la méthode splice
    io.sockets.emit('listeActuelle', todolist); // On envoie la liste mise à jour avec la suppresion de l'élément à tous les utlisateurs (celui qui a effectuer la suppression et tous ceux qui sont connectés)
  });

});

server.listen(8080); // On écoute le serveur sur le port 8080
