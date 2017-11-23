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
        url: "https://www.datos.gov.co/resource/friq-8e38.json",
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

WDC.prototype.CrearEsquemaSeguridad = function(tiposDatos){
	var columnas = [
		{ id:"OBJECTID", alias: "OBJECTID", dataType: tiposDatos.string },
		{ id:"RADICADO", alias: "RADICADO", dataType: tiposDatos.string },
		{ id:"FECHA", alias: "FECHA", dataType: tiposDatos.string },
		{ id:"HORA", alias: "HORA", dataType: tiposDatos.string },
		{ id:"DIA", alias: "DIA", dataType: tiposDatos.string },
		{ id:"CLASE", alias: "CLASE", dataType: tiposDatos.string },
		{ id:"DIRECCION", alias: "DIRECCION", dataType: tiposDatos.string },
		{ id:"TIPOGEOCOD", alias: "TIPO_GEOCOD", dataType: tiposDatos.string },
		{ id:"GRAVEDAD", alias: "GRAVEDAD", dataType: tiposDatos.string },
		{ id:"BARRIO", alias: "BARRIO", dataType: tiposDatos.string },
		{ id:"COMUNA", alias: "COMUNA", dataType: tiposDatos.string },
		{ id:"DISENO", alias: "DISENO", dataType: tiposDatos.string }
	];		

	var tabla = {
		id: "Seguridad",
		name: "Accidentalidad Vial Municipio de Medellín 2016",
		columns: columnas
	};
	
	return tabla;
}

WDC.prototype.CrearDatosSeguridad = function(){
	var tablaDatos = [];
	var _table = {};
	$.each(this.getRespuesta().respuesta, function(index, item){
		_table["OBJECTID"] 		= item["objectid"];
		_table["RADICADO"] 		= item["radicado"];
		_table["FECHA"]			= item["fecha"];
		_table["HORA"] 			= item["hora"];
		_table["DIA"] 			= item["dia"];
		_table["CLASE"] 		= item["clase"];
		_table["DIRECCION"] 	= item["direccion"];
		_table["TIPOGEOCOD"]	= item["tipo_geocod"];
		_table["GRAVEDAD"] 		= item["gravedad"];
		_table["BARRIO"] 		= item["barrio"];
		_table["COMUNA"] 		= item["comuna"];
		_table["DISENO"] 		= item["diseno"];
		
		tablaDatos.push(_table);
		_table = {};
	});
	
	return tablaDatos;
}