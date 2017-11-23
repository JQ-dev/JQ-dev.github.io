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
        url: "https://www.datos.gov.co/resource/5dxb-tkam.json",
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

WDC.prototype.CrearEsquemaEducacion = function(tiposDatos){
	var columnas = [
		{ id:"Sexo", alias: "Sexo", dataType: tiposDatos.string },
		{ id:"Nacimiento", alias: "Nacimiento", dataType: tiposDatos.int },
		{ id:"MunicipioNacimiento", alias: "Municipio de Nacimiento", dataType: tiposDatos.string },
		{ id:"MunicipioResidencia", alias: "Municipio de Residencia", dataType: tiposDatos.string },
		{ id:"Barrio", alias: "Barrio", dataType: tiposDatos.string },
		{ id:"Estrato", alias: "Estrato", dataType: tiposDatos.int },
		{ id:"EstadoCivil", alias: "Estado Civil", dataType: tiposDatos.string },
		{ id:"EPS", alias: "EPS", dataType: tiposDatos.string },
		{ id:"Hijos", alias: "Hijos", dataType: tiposDatos.int },
		{ id:"PersonasACargo", alias: "Personas a Cargo", dataType: tiposDatos.int },
		{ id:"MedioTransporte", alias: "Medio de Transporte", dataType: tiposDatos.string },
		{ id:"Ruta", alias: "Ruta", dataType: tiposDatos.string },
		{ id:"Programa", alias: "Programa", dataType: tiposDatos.string },
		{ id:"Labora", alias: "Labora", dataType: tiposDatos.string },
		{ id:"Salario", alias: "Salario", dataType: tiposDatos.string },
		{ id:"TipoEmpresa", alias: "Tipo Empresa", dataType: tiposDatos.string },
		{ id:"TipoContrato", alias: "Tipo Contrato", dataType: tiposDatos.string },
		{ id:"TipoVinculacion", alias: "Tipo Vinculación", dataType: tiposDatos.string },
		{ id:"TipoHorario", alias: "Tipo Horario", dataType: tiposDatos.string },
		{ id:"CampoLaboral", alias: "Campo Laboral", dataType: tiposDatos.string },
		{ id:"GrupoEtnico", alias: "Grupo Etnico", dataType: tiposDatos.string },
		{ id:"DiscapacidadFisica", alias: "Discapacidad Físisca", dataType: tiposDatos.string },
		{ id:"Discapacidad", alias: "Discapacidad", dataType: tiposDatos.string },
		{ id:"VictinaConflicto", alias: "Victina Conflicto", dataType: tiposDatos.string },
		{ id:"DesplazadoViolencia", alias: "Desplazado Violencia", dataType: tiposDatos.string },
		{ id:"DesvinculadoConflicto", alias: "Desvinculado Conflicto", dataType: tiposDatos.string }
	];		

	var tabla = {
		id: "Educacion",
		name: "Fichaje Sicosocial Estudiantes del Politécnico Colombiano Jaime Isaza Cadavid",
		columns: columnas
	};

	return tabla;
}

WDC.prototype.CrearDatosEducacion = function(){
	var tablaDatos = [];
	var _table = {};
	$.each(this.getRespuesta().respuesta, function(index, item){
		_table["Sexo"] 					= item["sexo"];
		_table["Nacimiento"] 			= item["nacimiento"];
		_table["MunicipioNacimiento"]	= item["municipio_de_nacimiento"];
		_table["MunicipioResidencia"] 	= item["municipio_de_residencia"];
		_table["Barrio"] 				= item["barrio"];
		_table["Estrato"] 				= item["estrato"];
		_table["EstadoCivil"] 			= item["estado_civil"];
		_table["EPS"] 					= item["eps"];
		_table["Hijos"] 				= item["hijos"];
		_table["PersonasACargo"] 		= item["personas_a_cargo"];
		_table["MedioTransporte"] 	= item["medio_de_transporte"];
		_table["Ruta"] 					= item["ruta"];
		_table["Programa"] 				= item["programa"];
		_table["Labora"] 				= item["labora"];
		_table["Salario"] 				= item["salario"];
		_table["TipoEmpresa"] 			= item["tipo_empresa"];
		_table["TipoContrato"] 			= item["tipo_contrato"];
		_table["TipoVinculacion"] 		= item["tipo_vinculaci_n"];
		_table["TipoHorario"] 			= item["tipo_horario"];
		_table["CampoLaboral"] 			= item["campo_laboral"];
		_table["GrupoEtnico"] 			= item["grupo_etnico"];
		_table["DiscapacidadFisica"] 	= item["discapacidad_f_sica"];
		_table["Discapacidad"] 			= item["discapacidad"];
		_table["VictinaConflicto"] 		= item["victima_conflicto"];
		_table["DesplazadoViolencia"] 	= item["desplazado_violencia"];
		_table["DesvinculadoConflicto"]	= item["desvinculado_conflicto"];
		
		tablaDatos.push(_table);
		_table = {};
	});

	return tablaDatos;
}