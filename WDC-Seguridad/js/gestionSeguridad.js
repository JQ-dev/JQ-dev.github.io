(function(){
	var _wdc = new WDC();
	_wdc.ConsultarDatos();
	if(_wdc.getRespuesta().valido && _wdc.getRespuesta().respuesta){
		var connector = tableau.makeConnector();
		connector.getSchema = function(schemaCallback) {
			var table = _wdc.CrearEsquemaSeguridad(tableau.dataTypeEnum);
			schemaCallback([table]);
		};

		connector.getData = function(table, doneCallback){		
			table.appendRows(_wdc.CrearDatosSeguridad());
			doneCallback();
		};

		tableau.registerConnector(connector);
		connector.init = function(initCallback) {
			initCallback();
			tableau.submit();
		};
	}
})();