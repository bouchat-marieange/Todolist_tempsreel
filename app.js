// Chargement des différents modules

var app = require('express')(); //Charge Express
var server = require('http').createServer(app); // Création du serveur
var io = require('socket.io').listen(server);// Charge de socket.io
var ent = require('ent'); //Charge module ent pour éviter échange JavaScript malicieux en échappant caractère HTML (sécurité équivalente à htmlentities en PHP)

//Définition des variables
// Variable globale contenant un tableau reprenant toutes les tâches de la todolist
var todolist = [];
// var index;

// Définition des routes et des redirections avec Express
//On affiche la todolist et le formulaire avec express en récupérant la vue todo.ejs.
// On attribue le nom de todolist au contenu de la variable todolist (tableau)
app.get('/', function(req, res) {
    res.render('todo.ejs', {todolist: todolist});
});

// On redirige vers la todolist si la page demandée n'est pas trouvée */
app.use(function(req, res, next){
    res.redirect('/');
 });


// Echanges serveur socket.io
// On se connecte
io.sockets.on('connection', function(socket) {

  //On envoie tout de suite aux utilisateurs connectés la dernière version de la liste
  socket.emit('listeActuelle', todolist);

  //Quand un utilisateur ajoute une tâche à la liste
  socket.on('ajout', function(nouvelleTache) {
      nouvelleTache = ent.encode(nouvelleTache);
      todolist.push(nouvelleTache);
      socket.broadcast.emit('ajout', {nouvelleTache: nouvelleTache});
  });

  //Quand un utilisateur supprime une tâche de la liste
  socket.on('suppression', function(index){
      todolist.splice(index, 1);
      io.sockets.emit('listeACtuelle', todolist);
  });

});

server.listen(8080);
