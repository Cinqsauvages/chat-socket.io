//inicio socket desde cliente
const socket = io();
//accedo a las etiquetas para dibujar y recolectar datos
let textBoard = document.getElementById('textBoard');
let inputMsj = document.getElementById('msj');
let alias = document.getElementById('alias');
let divText = document.getElementById('divText');
let divName = document.getElementById('divName');
let nombre;

//recolecto el alias del, usuario del chat;
alias.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (alias.value.trim().length > 0) {
            nombre = alias.value;
            alias.value = ''
            divName.classList.add('d-none');
            divText.classList.remove('d-none');
        }
    }
})


//este recolecta lo escrito en el input y debe ser enviado a socket
inputMsj.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let msj = inputMsj.value

        //evaluo que el mensaje no sea nulo y envio a el server
        if (msj.trim().length > 0) {
            socket.emit('message', { nombre, msj });
            inputMsj.value = '';
        }
    }
})


const drawBoard = (messages) => {
    //recibo un array de objetos.
    const html = messages.map((elem) => {
        return `
        <div class="container-sm ">

            <p><strong>${elem.nombre}</strong> : <em>${elem.msj}</em></p>

        </div>`
    }).join(''); //para convertir el array en string;

    textBoard.innerHTML = html;

}

//recibo los mensajes desde socket
socket.on('draw', (messages) => {
    drawBoard(messages);
})