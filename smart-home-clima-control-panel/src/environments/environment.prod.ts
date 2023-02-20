export const environment = {
	production: true,
	hmr: false,
	http: {
		apiUrl: 'http://localhost:8080/api/smarthomeclima/',
	},
	mqtt: {
		server: 'localhost',
		protocol: "ws",
		port: 8081
	},
  	name: 'smart-home-clima-panel',
  	appTitle: 'SmartHomeClimaControlPanel-Prod',

  	environmentPrefix: 'smarthomeclimacontrolpanel_prod'
};