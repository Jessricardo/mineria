var iniciaApp = function(){
	var occurrence = function (array) {
        "use strict";
        var result = {};
        if (array instanceof Array) { // Check if input is array.
            array.forEach(function (v, i) {
                if (!result[v]) { // Initial object property creation.
                    result[v] = [i]; // Create an array for that property.
                } else { // Same occurrences found.
                    result[v].push(i); // Fill the array.
                }
            });
        }
        return result;
    };
	var construir = function(){
		$("#inputs").fadeOut("fast",function(){
			//Creación de cabeceras
			$("#tabla tbody").append("<tr>");
			for (i = 1; i <= $("#txtColumnas").val(); i++) { 
    			$("#tabla tbody").append("<th>Columna "+i+"</th>");
			}
			$("#tabla tbody").append("</tr>");
			//Creación de renglones
			for (r = 1; r <= $("#txtRenglones").val(); r++) { 
    			$("#tabla tbody").append("<tr>");
				for (z = 1; z <= $("#txtColumnas").val(); z++) { 
    				$("#tabla tbody").append("<td> <input type='text' id='td"+r+z+"' placeholder='Valor'> </td>");
				}
				$("#tabla tbody").append("</tr>");
			}
			

			$("#tabla").fadeIn("fast");
			$("#btnArbol").fadeIn("fast");
		});
	}
	var capturar = function(){
		var iMax = $("#txtRenglones").val();
		var jMax = $("#txtColumnas").val();
		matriz = new Array();
		for (i=1;i<=iMax;i++) {
			matriz[i]=new Array();
 			for (j=1;j<=jMax;j++) {
 		 		matriz[i][j]=$("#td"+i+j).val();
 			}
		}
		ultimacolumna = $("#txtColumnas").val();
		ultimorenglon = $("#txtRenglones").val();
		iteracion(matriz);
	}
	function iteracion(matriz){
		var entriopiaGlobal = 0;
		var columnaclase = new Array();
		//Creación del arreglo de la última columna
		for (j=1;j<=ultimorenglon;j++) {
 			columnaclase[j] = matriz[j][ultimacolumna];
 		}
 		//Calcular la entriopia global
 		var x = occurrence(columnaclase);
		$.each(x, function( index, value ) {
			if(value.length==ultimorenglon){
				alert("¡Todos cumplen con la condición!");
			}else{
				var y = value.length/ultimorenglon;
				entriopiaGlobal = entriopiaGlobal - (y*(Math.log2(y)));
			}
		});

		//Calculo por columnas
		entriopiaColumnas = new Array();
		entriopiaColumnas[0]=777;
		//--Separación por columna
		for(actual=1;actual<ultimacolumna;actual++){
			var columna = new Array();
			for (j=1;j<=ultimorenglon;j++) {
	 			columna[j] = matriz[j][actual];
	 		}
	 		var entriopiaColumna = 0;
	 		var jsonColumna = occurrence(columna);
			$.each(jsonColumna, function( index2, value2 ) {
				//Separar por valores
				var arrayNuevo = new Array();
				$.each(value2, function( index3, value3 ) {
					arrayNuevo[index3+1] = columnaclase[value3];
				});
				//Entriopia por valor
				var entriopiaColumnaValor = 0;
				var jsonColumnaValor = occurrence(arrayNuevo);
				$.each(jsonColumnaValor, function( index4, value4 ) {
					if(value4.length==value2.length){
						entriopiaColumnaValor = entriopiaColumnaValor - 0;
					}else{
						var yz = value4.length/value2.length;
						entriopiaColumnaValor = entriopiaColumnaValor - (yz*(Math.log2(yz)));
					}
				});
				entriopiaColumna= entriopiaColumna + ((value2.length/ultimorenglon)*entriopiaColumnaValor);
			});
			entriopiaColumnas[actual] = entriopiaColumna;
		}
		alert("Columna #"+entriopiaColumnas.indexOf(Math.min.apply(Math, entriopiaColumnas)));
	}
	$("#btnConstruir").on("click",construir);
	$("#btnArbol").on("click",capturar);
}
$(document).on("ready", iniciaApp);