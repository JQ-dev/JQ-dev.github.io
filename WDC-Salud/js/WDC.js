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
        url: "https://www.datos.gov.co/resource/g8ey-qutd.json",
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

WDC.prototype.CrearEsquemaSalud = function(tiposDatos){
	var columnas = [
		{ id:"Anio", alias: "Año", dataType: tiposDatos.int },
		{ id:"CodEAS", alias: "Cod EAS", dataType: tiposDatos.string },
		{ id:"NombreEAS", alias: "Nombre EAS", dataType: tiposDatos.string },
		{ id:"TipoUsuario", alias: "Tipo Usuario", dataType: tiposDatos.string },
		{ id:"Edad", alias: "Edad", dataType: tiposDatos.string },
		{ id:"TipoEdad", alias: "Tipo Edad", dataType: tiposDatos.string },
		{ id:"Sexo", alias: "Sexo", dataType: tiposDatos.string },
		{ id:"CodDepartamento", alias: "Cod departamento", dataType: tiposDatos.string },
		{ id:"CodMunicipio", alias: "Cod municipio", dataType: tiposDatos.string },
		{ id:"Zona", alias: "Zona", dataType: tiposDatos.string },
		{ id:"CodIPS", alias: "Cod IPS", dataType: tiposDatos.string },
		{ id:"NombreInstitucion", alias: "Nombre Institucion", dataType: tiposDatos.string },
		{ id:"CodConsulta", alias: "Cod Consulta", dataType: tiposDatos.string },
		{ id:"FinalidadConsulta", alias: "Finalidad Consulta", dataType: tiposDatos.string },
		{ id:"CausaExterna", alias: "Causa Externa", dataType: tiposDatos.string },
		{ id:"CodDxPrincipal", alias: "Cod Dx Principal ", dataType: tiposDatos.string },
		{ id:"NombreDx", alias: "Nombre Dx", dataType: tiposDatos.string },
		{ id:"TipoDxPrincipal", alias: "Tipo Dx Principal", dataType: tiposDatos.string },
		{ id:"Servicio", alias: "Servicio", dataType: tiposDatos.string },
		{ id:"TotalAtenciones", alias: "Total atenciones", dataType: tiposDatos.int }
	];		

	var tabla = {
		id: "Salud",
		name: "Atenciones en Consulta Externa - Municipio de Medellín 2016",
		columns: columnas
	};
	
	return tabla;
}

WDC.prototype.CrearDatosSalud = function(){
	var tablaDatos = [];
	var _table = {};
	$.each(this.getRespuesta().respuesta, function(index, item){
		_table["Anio"] 				= item["a_o"];
		_table["CodEAS"] 			= item["cod_eas"];
		_table["NombreEAS"]			= item["nombre_eas"];
		_table["TipoUsuario"] 		= item["tipo_usuario"];
		_table["Edad"] 				= item["edad"];
		_table["TipoEdad"] 			= item["tipo_edad"];
		_table["Sexo"] 				= item["sexo"];
		_table["CodDepartamento"] 	= item["cod_departamento"];
		_table["CodMunicipio"] 		= item["cod_municipio"];
		_table["Zona"] 				= item["zona"];
		_table["CodIPS"] 			= item["cod_ips"];
		_table["NombreInstitucion"]	= item["nombre_institucion"];
		_table["CodConsulta"] 		= item["cod_consulta"];
		_table["FinalidadConsulta"]	= item["finalidad_consulta"];
		_table["CausaExterna"] 		= item["causa_externa"];
		_table["CodDxPrincipal"] 	= item["cod_dx_principal"];
		_table["NombreDx"] 			= item["nombre_dx"];
		_table["TipoDxPrincipal"] 	= item["tipo_dx_principal"];
		_table["Servicio"] 			= item["servicio"];
		_table["TotalAtenciones"] 	= item["total_atenciones"];
		
		tablaDatos.push(_table);
		_table = {};
	});
	
	return tablaDatos;
}