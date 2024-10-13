# Juego de Cartas - Bombas y Desactivación

Este es un juego de cartas basado en bombas, desactivación, y puntos. Cada jugador debe robar cartas de un mazo y gestionar sus recursos estratégicamente para evitar ser eliminado y acumular la mayor cantidad de puntos.

## Descripción del Proyecto

El juego consiste en un mazo de cartas donde los jugadores deben robar en su turno. Las cartas pueden ser de diferentes tipos:

- **Bomba**: Si un jugador roba una bomba y no tiene una carta de desactivación, es eliminado del juego.
- **Desactivación**: Permite al jugador desactivar una bomba si la roba, evitando ser eliminado.
- **Saltar Turno**: El jugador puede utilizar esta carta para saltar su turno.
- **Puntos**: Cartas que suman puntos al total de un jugador. El jugador con más puntos al final del juego gana si no ha sido eliminado.

El juego continúa hasta que solo quede un jugador en pie, momento en el cual se declarará un ganador y los botones del juego se deshabilitarán.

## Reglas del Juego

1. **Turno de los jugadores**: Cada jugador, en su turno, roba una carta del mazo. 
2. **Cartas Bomba**: Si un jugador roba una carta Bomba y no tiene una carta de desactivación, es eliminado del juego.
3. **Cartas de Desactivación**: Estas cartas permiten desactivar una bomba cuando es robada.
4. **Saltar Turno**: Permite al jugador pasar su turno sin robar.
5. **Cartas de Puntos**: Las cartas de puntos otorgan un número aleatorio de puntos, entre 1 y 10.
6. **Ganador**: El último jugador que quede sin ser eliminado gana. 

## Características

- Barajado del mazo de cartas al inicio.
- Visualización de las cartas robadas por el jugador actual.
- Actualización automática de las estadísticas del jugador (número de cartas, puntos, cartas de desactivación y cartas de saltar turno).
- Lista de cartas descartadas en cada ronda.
- Verificación de ganador cuando solo queda un jugador activo.

## Instrucciones de Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/juego-cartas-bombas.git
