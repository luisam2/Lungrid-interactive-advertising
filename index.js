const express = require('express');
const expressApp = express();
const PORT = 5000 || process.env.PORT;
//Bring the socket.io module
const {Server} = require('socket.io');
//Create a httpServer
const httpServer = expressApp.listen(PORT);
//Create a new instance of Socket.io Server
const io = new Server(httpServer);

const staticController = express.static('public-controller');
const staticDisplay = express.static('public-display');

expressApp.use('/controller', staticController);
expressApp.use('/display', staticDisplay);

/*
Set the ioServer to listen to new connections
Set the socket to listen to an event and the message from controller
Broadcast the message to the display
*/

//PRIMER LLAMADO PAra  MOVIMIENTO DE LAS FLECHAS "DIRECTION"

//EVENTUS

// aqui se escuchan las conexiones  
  io.on('connection', (socket) => {
    // esta pendiente si un socket manda alguna info
      socket.on('direction',(clientPosition) =>{
        //si envia info imprimala y enviela a los otros socket
          console.log(clientPosition);
          //envia la info
          io.emit('direction',clientPosition); //RECIBE EL EVENTO Y LA EMITE USER-START GAME ETC
      })

      socket.on('user', (userName) =>{
        console.log(userName);
        io.emit('user', userName);
      } )

      //el servidor recibe la info del booleano win verdadero
      socket.on('startGame', (game) =>{
        console.log(game);
        io.emit('startGame', game);
      })


      socket.on('win',(isWin) =>{
        console.log(isWin);
        io.emit('win', isWin);
      })

    console.log('a user connected');
  });
