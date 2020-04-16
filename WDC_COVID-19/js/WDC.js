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
        url: "https://www.datos.gov.co/resource/gt2j-8ykr.json",
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

WDC.prototype.CrearEsquemaCOVID = function(tiposDatos){
	var columnas = [
		{ id:"id_de_caso", alias: "ID", dataType: tiposDatos.integer },
		{ id:"fecha_de_diagn_stico", alias: "FECHA", dataType: tiposDatos.string },
		{ id:"ciudad_de_unicaci_n", alias: "CIUD", dataType: tiposDatos.string },
		{ id:"departamento", alias: "DPTO", dataType: tiposDatos.string },
		{ id:"atenci_n", alias: "ATEN", dataType: tiposDatos.string },
		{ id:"edad", alias: "EDAD", dataType: tiposDatos.string },
		{ id:"sexo", alias: "SEXO", dataType: tiposDatos.string },
		{ id:"tipo", alias: "TIPO", dataType: tiposDatos.string },
		{ id:"pa_s_de_procedencia", alias: "PROCED", dataType: tiposDatos.string }
	];		

	var tabla = {
		id: "COVID-19",
		name: "Casos COVID-19 en Colombia",
		columns: columnas
	};
	
	return tabla;
}

WDC.prototype.CrearDatosCOVID= function(){
	var tablaDatos = [];
	var _table = {};
	$.each(this.getRespuesta().respuesta, function(index, item){
		_table["ID"] 		= item["id_de_caso"];
		_table["FECHA"] 		= item["fecha_de_diagn_stico"];
		_table["CIUD"]			= item["ciudad_de_unicaci_n"];
		_table["DPTO"] 			= item["departamento"];
		_table["ATEN"] 			= item["atenci_n"];
		_table["EDAD"] 		= item["edad"];
		_table["SEXO"] 	= item["sexo"];
		_table["TIPO"]	= item["tipo"];
		_table["PROC"] 		= item["pa_s_de_procedencia"];
		
		tablaDatos.push(_table);
		_table = {};
	});
	
	return tablaDatos;
}
