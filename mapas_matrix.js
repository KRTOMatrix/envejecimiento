//////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [38.5, 5],
		zoom: 5,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});

///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="100px" height="53px" ></img></a>';
	 return div;
	};
	title1.addTo(map);
//Logo Mayor_sig	
var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/mayor_sig.png" width="80px" height="53px" ></img></a>';
	 return div;
	};
	title3.addTo(map); 

//Logo Mayor_sig	
var title2 = L.control({position: 'bottomright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div','info2');
	 div.innerHTML +=
	 '<a><img src="images/Logo_DemoS.png" width="80px" height="53px" ></img></a>';
	 return div;
	};
	title2.addTo(map); 

///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2018 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2018 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.5,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);

///////////Otras funcionalidades
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[38.5, 5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////
//Porcentaje de personas mayores de 65 años 2017
function getColor1(a) {
	return a > 75 ? '#8F0A0B' :
	a > 60 ? '#FF5500' :
	a > 45 ? '#FFAA01' :
	a > 30 ? '#FFD380' :    
	a > 15 ? '#FEFF73' :
	'#D2FFBE';
};
function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.P65),
		weight: 0.5,
		opacity: 0.5,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.7
	};
};
function popup1(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT) {
		layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT+" "+"</strong><br>Porcentaje de personas mayores: "+feature.properties.P65.toString().replace(".",",")+"%",{pane: 'popups1'});
	};
};
var geojson1 = L.geoJson(mayorsig, {
	style: style1,
	onEachFeature: popup1
});
	
//Edad media de la poblacion 2017
function getColor2(a) {
	return a > 70 ? '#8F0A0B' :
	a > 60 ? '#FF5500' :
	a > 50 ? '#FFAA01' :
	a > 40 ? '#FEFF73' :
	'#D2FFBE';
};
function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.EM_2017),
		weight: 0.5,
		opacity: 0.5,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.7
	};
};
function popup2(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT) {
		layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT+"</strong><br>Edad poblacional media: "+
		feature.properties.EM_2017.toString().replace(".",",")+" años",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson2 = L.geoJson(mayorsig, {
	style: style2,
	onEachFeature: popup2
});												

//Porcentaje de personas mayores de 80 años 2017
function getColor3(a) {
	return a > 45 ? '#8F0A0B' :
	a > 30 ? '#FF5500' :
	a > 15 ? '#FFAA01' :
	a > 7.5 ? '#FEFF73' :  
	'#D2FFBE';
	};
function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.P80),
		weight: 0.5,
		opacity: 0.5,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.7
	};
};
function popup3(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT) {
	layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT+"</strong><br>Porcentaje de personas mayores de edad avanzada: "+
	feature.properties.P80.toString().replace(".",",")+"%",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson3 = L.geoJson(mayorsig, {
style: style3,
onEachFeature: popup3
});

//Número de mayores de 65 años (2017)
function getColor6(a) {
	return a > 25600 ? '#A80000' :
	a > 12800 ? '#FF5500' :
	a > 6400 ? '#FFAA01' :
	a > 3200 ? '#FFD380' :  
	a > 1600 ? '#FEFF73' :  
	a > 800 ? '#FFFFBE' :  
	a > 400 ? '#ADE9AD' :  
	a > 200 ? '#89CD66' :  
	a > 100 ? '#38A700' :  
	'#267300';
	};
function style6(feature) {
	return {
		fillColor: getColor6(feature.properties.POB65),
		weight: 0.5,
		opacity: 0.5,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.7
	};
};
function popup6(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT) {
	layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT+"</strong><br>Número de personas mayores: "+
	feature.properties.POB65.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson6 = L.geoJson(mayorsig, {
style: style6,
onEachFeature: popup6
});

//Envejecimiento y tamaño poblacional (2017)
function getColor7(a) {
	return a == '1pequenyoJoven' ? '#D2FFBE' :
	a == '2pequenyoEnvejecido' ? '#FFEBB0' :
	a == '3pequenyoMuyEnvejecido' ? '#FEBEBE' :
	a == '4intermedioJoven' ? '#98E500' :  
	a == '5intermedioEnvejecido' ? '#FFAA01' :  
	a == '6intermedioMuyEnvejecido' ? '#CD6667' :  
	a == '7grandeJoven' ? '#38A700' :  
	'#BF7401' ;
	};
function style7(feature) {
	return {
		fillColor: getColor7(feature.properties.integrado),
		weight: 0.5,
		opacity: 0.5,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.7
	};
};
function popup7(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT) {
	layer.bindPopup("<h3>"+feature.properties.NAMEUNIT+"</h3>Nº total habitantes: "+feature.properties.pob_tot_17.toLocaleString()+"<br>Proporción de mayores: "+feature.properties.P65.toString().replace(".",",")+"%",{pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT+"</strong><br><u>Click para más información",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson7 = L.geoJson(mayorsig, {
style: style7,
onEachFeature: popup7
});
///////////Definicion de las capas del mapa///////////
//Capas	
var mapa1 = L.layerGroup([geojson1]);
var mapa2 = L.layerGroup([geojson2]);
var mapa3 = L.layerGroup([geojson3]);
var mapa6 = L.layerGroup([geojson6]);
var mapa7 = L.layerGroup([geojson7]).addTo(map);


var baseLayers = {
		"Envejecimiento y tamaño poblacional (2017)": mapa7,
		"Porcentaje de personas mayores (2017)": mapa1,
		"Número de personas mayores (2017)": mapa6,
		"Edad poblacional media (2017)": mapa2,
		"Porcentaje de personas mayores de edad avanzada (2017)": mapa3,
		};
var overlays = {
		"<b>Límites de Comunidades Autónomas<b>": comunidades,
		"OpenStreetMap": osm,
							
	};
	
///////////Definicion del estilo de la leyenda de cada capa///////////
// leyenda mapa7		
var htmlLegend7 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em></h5><h4>"+ '<strong>Envejecimiento y tamaño poblacional de municipios de España (2017)</strong>'+"<\h4>",
			style: style7,
			layer: mapa7,
			elements: [{
				label:"<h5>"+  '<img src="images/leyenda9.png" width="190px" height="50px" ></img>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Pequeño y Joven'+"<\h5>",html: '',style: {'background-color': '#D2FFBE','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  'Pequeño y Envejecido'+"<\h5>",html: '',style: {'background-color': '#FFEBB0','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  'Pequeño y Muy envejecido'+"<\h5>",html: '',style: {'background-color': '#FEBEBE','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  'Intermedio y Joven'+"<\h5>",html: '',style: {'background-color': '#98E500','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  'Intermedio y Envejecido'+"<\h5>",html: '',style: {'background-color': '#FFAA01','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  'Intermedio y Muy envejecido'+"<\h5>",html: '',style: {'background-color': '#CD6667','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  'Grande y Joven'+"<\h5>",html: '',style: {'background-color': '#38A700','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  'Grande y Envejecido'+"<\h5>",html: '',style: {'background-color': '#BF7401','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				// label:"<h6>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h6>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '13px', 'border': 'black 1px solid'}}, { 
				label:"<h6>"+  'Fuente: Instituto Nacional de Estadística (2018)'+"<\h6>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend7);
 
// leyenda mapa6		
var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em></h5><h4>"+ '<strong>Número de personas mayores por municipios (2017)</strong>'+"<\h4><h4>Personas ≥ 65 años</h4>",
			style: style6,
			layer: mapa6,
			elements: [{
				label:"<h5>"+  'Unidades: número de personas mayores'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '0 - 100'+"<\h5>",html: '',style: {'background-color': '#267300','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '100,1 - 200'+"<\h5>",html: '',style: {'background-color': '#38A700','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '200,1 - 400'+"<\h5>",html: '',style: {'background-color': '#89CD66','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '400.1 - 800'+"<\h5>",html: '',style: {'background-color': '#ADE9AD','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '800,1 - 1.600'+"<\h5>",html: '',style: {'background-color': '#FFFFBE','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  '1.600,1 - 3.200'+"<\h5>",html: '',style: {'background-color': '#FEFF73','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  '3.200,1 - 6.400'+"<\h5>",html: '',style: {'background-color': '#FFD380','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  '6.400,1 - 12.800'+"<\h5>",html: '',style: {'background-color': '#FFAA01','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  '12.800,1 - 25.600'+"<\h5>",html: '',style: {'background-color': '#FF5500','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  '25.600,1 - 651.207'+"<\h5>",html: '',style: {'background-color': '#A80000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h6>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h6>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '13px', 'border': 'black 1px solid'}}, { 
				label:"<h6>"+  'Fuente: Instituto Nacional de Estadística (2018)'+"<\h6>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend6);
 
// leyenda mapa3		
var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em></h5><h4>"+ '<strong>Porcentaje de personas mayores de edad avanzada por municipios (2017)</strong>'+"<\h4><h4>Personas ≥ 80 años</h4>",
			style: style3,
			layer: mapa3,
			elements: [{
				label:"<h5>"+  'Unidades: Años'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '0 - 7,5'+"<\h5>",html: '',style: {'background-color': '#D2FFBE','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '7,51 - 15'+"<\h5>",html: '',style: {'background-color': '#FEFF73','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '15,1 - 30'+"<\h5>",html: '',style: {'background-color': '#FFAA01','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '30,1 - 45'+"<\h5>",html: '',style: {'background-color': '#FF5500','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '45,1 - 63,6'+"<\h5>",html: '',style: {'background-color': '#8F0A0B','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h6>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h6>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '13px', 'border': 'black 1px solid'}}, { 
				label:"<h6>"+  'Fuente: Instituto Nacional de Estadística (2018)'+"<\h6>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend3);  
// leyenda mapa2	

var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em></h5><h4>"+'<strong>Edad poblacional media (2017)'+"<\h4>",
			style: style2,
			layer: mapa2,
			elements: [{
				label:"<h5>"+  'Unidades: Años'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '31,5 - 40'+"<\h5>",html: '',style: {'background-color': '#D2FFBE','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '40,1 - 50'+"<\h5>",html: '',style: {'background-color': '#FEFF73','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '50,1 - 60'+"<\h5>",html: '',style: {'background-color': '#FFAA01','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '60,1 - 70'+"<\h5>",html: '',style: {'background-color': '#FF5500','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  '70,1 - 76,4'+"<\h5>",html: '',style: {'background-color': '#8F0A0B','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h6>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h6>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '13px', 'border': 'black 1px solid'}}, { 
				label:"<h6>"+  'Fuente: Instituto Nacional de Estadística (2018)'+"<\h6>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-leg end-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend2);
// leyenda mapa1	
var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em></h5><h4>"+ '<strong>Porcentaje de personas mayores por municipios (2017)</strong>'+"<\h4><h4>Personas ≥ 65 años</h4>",
			style: style1,
			layer: mapa1,
			elements: [{
				label:"<h5>"+  'Unidades: %'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '0 - 15'+"<\h5>",html: '',style: {'background-color': '#D2FFBE','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '15,1 - 30'+"<\h5>",html: '',style: {'background-color': '#FEFF73','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '30,1 - 45'+"<\h5>",html: '',style: {'background-color': '#FFD380','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '45,1 - 60'+"<\h5>",html: '',style: {'background-color': '#FFAA01','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  '60,1 - 75'+"<\h5>",html: '',style: {'background-color': '#FF5500','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  '75,1 - 84,6'+"<\h5>",html: '',style: {'background-color': '#8F0A0B','width': '40px','height': '13px', 'border': 'black 1px solid'}}, { 
				label:"<h6>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h6>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '13px', 'border': 'black 1px solid'}}, { 
				label:"<h6>"+  'Fuente: Instituto Nacional de Estadística (2018)'+"<\h6>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);
	
//Visualizar capas
L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright'}).addTo(map);


//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});