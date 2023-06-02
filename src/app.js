import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from '../utils.js';
import { chatRoute } from './routes/chat.route.js';

const app = express();
const menssages = []

//seteo para usar json, y recibir datos complejos por url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set handlebars- 
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
//a mis views las procesas con esto
app.set('view engine', 'handlebars');

//seteo uso de la carpeta public
app.use(express.static(__dirname + '/public'));

//uso la ruta que quiero para el chat
app.use('/', chatRoute)
//escucho el puerto 8080 del server
const webServer = app.listen('8080', () => {
    console.log("Open server, port  '8080'")
});

//inicializo socket.io
const io = new Server(webServer);

//eventos de socket.io
io.on('connection', (socket) => {

    //envio los mensajes a el cliente que se conecto
    socket.emit('messages', menssages)

    //recibo los mensajes de los clientes conectados
    socket.on('message', (msj) => {
        //lo pusheo al array 

        menssages.push(msj);

        //se los envio a todos los sockets conectados
        io.emit('draw', menssages);
    })

})
