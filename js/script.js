const tipo = {
    BOMBA: "bomba",
    DESACTIVAR: "desactivar",
    SALTAR: "saltar",
    PUNTOS: "puntos",
};

class Carta {
    constructor(tipo, img, puntos = 0) {
        this.tipo = tipo;
        this.img = img;
        this.puntos = puntos;
    }
}

class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.cartas = [];
        this.eliminado = false;
        this.turno = false;
    }

    contarCartas() {
        return this.cartas.length;
    }

    sumarPuntos() {
        let p = 0;
        this.cartas.forEach(carta => {
            p += carta.puntos;
        });
        return p;
    }

    cartasTurno() {
        let c = 0;
        this.cartas.forEach(carta => {
            if (carta.tipo === tipo.SALTAR) {
                c++;
            }
        });
        return c;
    }

    usarCartaTurno() {
        const index = this.cartas.findIndex(carta => carta.tipo === tipo.SALTAR);
        if (index !== -1) {
            this.cartas.splice(index, 1);
            return true;
        }
        return false;
    }

    cartasDesactivacion() {
        let c = 0;
        this.cartas.forEach(carta => {
            if (carta.tipo === tipo.DESACTIVAR) {
                c++;
            }
        });
        return c;
    }

    usarCartaDesactivacion() {
        const index = this.cartas.findIndex(carta => carta.tipo === tipo.DESACTIVAR);
        if (index !== -1) {
            this.cartas.splice(index, 1);
            return true;
        }
        return false;
    }

    eliminarJugador() {
        this.eliminado = true;
    }
}

class Deck {
    constructor() {
        this.cartas = [];
    }

    init() {
        for (let i = 0; i < 60; i++) {
            if (i < 6) {
                this.cartas.push(new Carta(tipo.BOMBA, "../img/bomba/bomba.png"));
            } else if (i < 12) {
                this.cartas.push(new Carta(tipo.DESACTIVAR, "../img/herramienta/herramienta.png"));
            } else if (i < 22) {
                this.cartas.push(new Carta(tipo.SALTAR, "../img/pasarTurno/pasarTurno.png"));
            } else {
                let puntos = Math.floor(Math.random() * 10) + 1;
                let numeroRobot = ("0" + Math.floor(Math.random() * 20 + 1)).slice(-2);
                this.cartas.push(new Carta(tipo.PUNTOS, `../img/card/robot_${numeroRobot}.png`, puntos));
            }
        }
    }

    barajar() {
        const cantidadDeIntercambios = this.cartas.length;
        for (let i = 0; i < cantidadDeIntercambios; i++) {
            let index1 = Math.floor(Math.random() * this.cartas.length);
            let index2 = Math.floor(Math.random() * this.cartas.length);

            let temp = this.cartas[index1];
            this.cartas[index1] = this.cartas[index2];
            this.cartas[index2] = temp;
        }
    }

    robar(jugador) {
        if (this.cartas.length === 0) {
            console.log("No hay cartas en el mazo.");
            return;
        }

        let carta = this.cartas[0];
        this.cartas.shift();

        document.getElementById("imgCartaRobada").src = carta.img;

        if (carta.tipo === tipo.BOMBA) {
            if (jugador.cartasDesactivacion() > 0) {
                console.log(`${jugador.nombre} ha robado una bomba, pero tenía una carta de desactivación!`);
                jugador.usarCartaDesactivacion();
            } else {
                console.log(`${jugador.nombre} ha robado una bomba y no tiene cartas de desactivación. ¡Ha sido eliminado!`);
                jugador.eliminarJugador();
                this.actualizarEstadisticasJugador(jugador);
                return;
            }
        } else {
            jugador.cartas.push(carta);
        }

        descartadas.push(carta);

        this.actualizarEstadisticasJugador(jugador);
    }

    actualizarEstadisticasJugador(jugador) {
        let id = jugador.nombre;
        if (jugador.eliminado) {
            document.getElementById(`${id}NumCartas`).textContent = `❌ Eliminado`;
            document.getElementById(`${id}Puntos`).textContent = '';
            document.getElementById(`${id}saltoTurno`).textContent = '';
            document.getElementById(`${id}Desactivacion`).textContent = '';
        } else {
            document.getElementById(`${id}NumCartas`).textContent = `⚪️ Número de cartas: ${jugador.contarCartas()}`;
            document.getElementById(`${id}Puntos`).textContent = `⚪️ Puntos totales: ${jugador.sumarPuntos()}`;
            document.getElementById(`${id}saltoTurno`).textContent = `⚪️ Cartas salto turno: ${jugador.cartasTurno()}`;
            document.getElementById(`${id}Desactivacion`).textContent = `⚪️ Cartas desactivación: ${jugador.cartasDesactivacion()}`;
        }
    }
}

let descartadas = [];

function mostrarDescartadas() {
    const listaDescarte = document.getElementById("listaDescarte");
    listaDescarte.innerHTML = '';
    let t = "";
    descartadas.forEach(c => {
        if (c.tipo === tipo.BOMBA) {
            t = "Bomba";
        } else if (c.tipo === tipo.DESACTIVAR) {
            t = "Desactivación";
        } else if (c.tipo === tipo.SALTAR) {
            t = "Saltar Turno";
        } else {
            t = "Puntos";
        }

        const nuevaCarta = document.createElement("li");
        nuevaCarta.textContent = "Carta del tipo " + t;
        listaDescarte.appendChild(nuevaCarta);
    });
}

function verificarGanador() {
    const jugadores = [J1, J2, J3];
    const jugadoresActivos = jugadores.filter(jugador => !jugador.eliminado);

    if (jugadoresActivos.length === 1) {
        alert(`¡${jugadoresActivos[0].nombre} ha ganado la partida!`);
        deshabilitarBotones();
    }
}

function deshabilitarBotones() {
    document.getElementById("btnRobar").disabled = true;
    document.getElementById("btnPasar").disabled = true;
}

let DECK = new Deck();
DECK.init();
DECK.barajar();

let J1 = new Jugador("J1");
let J2 = new Jugador("J2");
let J3 = new Jugador("J3");

let turnoActual = J1;

document.getElementById("btnRobar").onclick = function () {
    if (!turnoActual.eliminado) {
        DECK.robar(turnoActual);
        mostrarDescartadas();
        cambiarTurno();
        verificarGanador();
    } else {
        console.log(`${turnoActual.nombre} está eliminado y no puede robar.`);
    }
};

document.getElementById("btnPasar").onclick = function () {
    if (!turnoActual.eliminado) {
        if (turnoActual.cartasTurno() > 0) {
            turnoActual.usarCartaTurno();
            console.log(`${turnoActual.nombre} ha pasado su turno.`);
            DECK.actualizarEstadisticasJugador(turnoActual);
            cambiarTurno();
            verificarGanador();
        } else {
            alert(`${turnoActual.nombre} no tiene cartas de salto de turno y no puede pasar.`);
        }
    } else {
        alert(`${turnoActual.nombre} está eliminado y no puede pasar.`);
    }
};

function cambiarTurno() {
    if (turnoActual === J1) {
        turnoActual = J2;
    } else if (turnoActual === J2) {
        turnoActual = J3;
    } else {
        turnoActual = J1;
    }

    if (turnoActual.eliminado) {
        cambiarTurno();
    }
}
