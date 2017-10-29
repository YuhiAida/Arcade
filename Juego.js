   
   var juego = {
    filas: [
      [],
      [],
      []
    ],
    espacioVacio: {
      fila: 2,
      columna: 2
    },
    crearPieza(numero, fila, columna) {
      var nuevoElemento = $("<div>");
      nuevoElemento.addClass("pieza");
      nuevoElemento.css({
        backgroundImage: "url(img/" + numero + ".jpeg )",
        top: fila * 200,
        left: columna * 200
      });

      return {
        el:nuevoElemento,
        numero:numero,
        filaInicial:fila,
        columnaInicial:columna,
      };
    },
    instalarPiezas(juegoEl){
      var counter = 1;
      for (var fila = 0; fila < 3; fila++) {
        for (var columna = 0; columna < 3; columna++) {
          if (fila == this.espacioVacio.fila && columna == this.espacioVacio.columna) {
            this.filas[fila][columna] = null;

          } else {

            var pieza = this.crearPieza(counter++, fila,columna);
            juegoEl.append(pieza.el);
            this.filas[fila][columna] = pieza;
          }
        }
      }
      return juegoEl;
    },
    moverFichaFilaColumna(ficha,fila,columna){
      ficha.el.css({
        top: fila * 200,
        left: columna * 200
      });
    },
    guardarEspacioVacio(fila,columna){
      this.espacioVacio.fila = fila;
      this.espacioVacio.columna = columna;

      this.filas[fila][columna] = null;
    },
     intercambiarPosicionConEspacioVacio(fila, columna){
    var ficha = this.filas[fila] && this.filas[fila][columna];
    if(ficha){
      this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
      this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
      this.guardarEspacioVacio(fila,columna);
    }
  },
    Abajo(){
    var filaOrigen = this.espacioVacio.fila-1;
    var columnaOrigen = this.espacioVacio.columna;

    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },
  Arriba(){
    var filaOrigen = this.espacioVacio.fila+1;
    var columnaOrigen = this.espacioVacio.columna;

    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },
  Derecha(){
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen = this.espacioVacio.columna-1;

    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },
  Izquierda(){
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen = this.espacioVacio.columna+1;

    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },
    chequearSiGano() {
      for (var f = 0; f < this.filas.length; f++) {
        for (var c = 0; c < this.filas.length; c++) {
          var ficha = this.filas[f][c];
          if (ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)) {
            return false;
          }
        }
      }
      return alert('Ganaste! OwO');
    },
    capturarTeclas() {
      var that = this;
      $(document).keydown(function(event) {
        switch (event.which) {
            case 37:
              that.Izquierda();
            break;

            case 38:
              that.Arriba();
            break;

            case 39:
              that.Derecha();
            break;

            case 40:
              that.Abajo();
            break;

          default:
            return;
        }
        that.chequearSiGano();
        event.preventDefault();
      });
    },
  mezclarFichas(veces){
    if(veces<=0){return;}

    var that = this;
    var funciones = ['Abajo','Arriba','Izquierda','Derecha'];
    var numeroRandom = Math.floor(Math.random() * 4);
    var nombreDeFuncion = funciones[numeroRandom];
    this[nombreDeFuncion]();

    setTimeout(function(){
      that.mezclarFichas(veces-1);
    },10);
  },
    iniciar: function(el) {
      this.instalarPiezas(el);
      this.mezclarFichas(200);
      this.capturarTeclas();
    }
  };
  $(function(){
    var elemento = $('#juego');
    juego.iniciar(elemento);
  });
