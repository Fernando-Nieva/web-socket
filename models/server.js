const express = require('express')
const cors = require('cors');
const { create } = require('domain');
const { createServer } = require('http');
const { Socket } = require('dgram');
const { socketCotroller } = require('../sockets/controller');


class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io=require('socket.io')(this.server);

        this.paths={}
        
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
        //Manejo de eventos por Sockets
        this.sockets();
    }

    middlewares(){

        //Cors
        this.app.use(cors());
      

        //Directorio publico
        this.app.use(express.static('public'));


    }


    routes(){
        
    }


    sockets(){
        this.io.on('connection',socketCotroller);
    }

    listen(){
        this.server.listen (this.port,()=> {
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}`);
        });    

    }
}


module.exports=Server;