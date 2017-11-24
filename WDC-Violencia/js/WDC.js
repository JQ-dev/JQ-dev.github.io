function WDC(){	
	var respuesta = {};

    this.setRespuesta = function (_respuesta) {
        respuesta = _respuesta;
    }

    this.getRespuesta = function () {
        return respuesta;
    }
}

WDC.prototype.ConsultarDatos = function(){
	var self = this;
    $.ajax({
        type: "GET",
        url: "https://www.datos.gov.co/resource/e78u-4wux.json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            self.setRespuesta({ valido: true, respuesta: response });
        },
        error: function (response) {
            self.setRespuesta({ valido: false, respuesta: response });
        }
    });
}

WDC.prototype.CrearEsquemaViolencia = function(tiposDatos){
	var columnas = [
		{ id:"Fecha", alias: "Fecha", dataType: tiposDatos.datetime },
		{ id:"Departamento", alias: "Departamento", dataType: tiposDatos.string },
		{ id:"Municipio", alias: "Municipio", dataType: tiposDatos.string },
		{ id:"Dia", alias: "Día", dataType: tiposDatos.string },
		{ id:"Hora", alias: "Hora", dataType: tiposDatos.datetime },
		{ id:"Barrio", alias: "Barrio", dataType: tiposDatos.string },
		{ id:"Zona", alias: "Zona", dataType: tiposDatos.string },
		{ id:"ClaseSitio", alias: "Clase de sitio", dataType: tiposDatos.string },
		{ id:"ArmaEmpleada", alias: "Arma empleada", dataType: tiposDatos.string },
		{ id:"MovilAgresor", alias: "Móvil Agresor", dataType: tiposDatos.string },
		{ id:"MovilVictima", alias: "Móvil Victima", dataType: tiposDatos.string },
		{ id:"Edad", alias: "Edad", dataType: tiposDatos.string },
		{ id:"Sexo", alias: "Sexo", dataType: tiposDatos.string },
		{ id:"EstadoCivil", alias: "Estado civil", dataType: tiposDatos.string },
		{ id:"PaisNacimiento", alias: "País de nacimiento", dataType: tiposDatos.string },
		{ id:"ClaseEmpleado", alias: "Clase de empleado", dataType: tiposDatos.string },
		{ id:"Profesion", alias: "Profesión", dataType: tiposDatos.string },
		{ id:"Escolaridad", alias: "Escolaridad", dataType: tiposDatos.string },
		{ id:"CodigoDANE", alias: "Código DANE", dataType: tiposDatos.int },
		{ id:"Cantidad", alias: "Cantidad", dataType: tiposDatos.int }
	];		

	var tabla = {
		id: "Violencia",
		name: "Violencia intrafamiliar 2017",
		columns: columnas
	};
	
	return tabla;
}

WDC.prototype.CrearDatosViolencia = function(){
	var tablaDatos = [];
	var _table = {};
	$.each(this.getRespuesta().respuesta, function(index, item){
		_table["Fecha"] 			= item["fecha"];
		_table["Departamento"] 		= item["departamento"];
		_table["Municipio"]			= item["municipio"];
		_table["Dia"] 				= item["d_a"];
		_table["Hora"] 				= item["hora"];
		_table["Barrio"] 			= item["barrio"];
		_table["Zona"] 				= item["zona"];
		_table["ClaseSitio"] 		= item["clase_de_sitio"];
		_table["ArmaEmpleada"] 		= item["arma_empleada"];
		_table["MovilAgresor"] 		= item["m_vil_agresor"];
		_table["MovilVictima"] 		= item["m_vil_victima"];
		_table["Edad"] 				= item["edad"];
		_table["Sexo"] 				= item["sexo"];
		_table["EstadoCivil"] 		= item["estado_civil"];
		_table["PaisNacimiento"]	= item["pa_s_de_nacimiento"];
		_table["ClaseEmpleado"]		= item["clase_de_empleado"];
		_table["Profesion"] 		= item["profesi_n"];
		_table["Escolaridad"] 		= item["escolaridad"];
		_table["CodigoDANE"] 		= item["c_digo_dane"];
		_table["Cantidad"] 			= item["cantidad"];
		
		tablaDatos.push(_table);
		_table = {};
	});
	
	return tablaDatos;
}