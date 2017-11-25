var map;
var layer_mapnik;
var layer_markers;
var markers = [];

function drawmap() {
    // Popup und Popuptext mit evtl. Grafik
    var popuptext = "<font color=\"black\"><b>Thomas Heiles<br>Stra&szlig;e 123<br>54290 Trier</b></font>";
    OpenLayers.Lang.setCode('de');
    // Position und Zoomstufe der Karte
    var lon = 6.641389;
    var lat = 49.756667;
    map = new OpenLayers.Map('map', {
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar()
        ],
        maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
        numZoomLevels: 18,
        maxResolution: 156543,
        units: 'meters'
    });
    layer_mapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
    layer_markers = new OpenLayers.Layer.Markers("Address", {
        projection: new OpenLayers.Projection("EPSG:4326"),
        visibility: true,
        displayInLayerSwitcher: false
    });
    map.addLayers([layer_mapnik, layer_markers]);
    /*var controls = {
        selector: new OpenLayers.Control.SelectFeature(vectorLayer, {
            onSelect: createPopup,
            onUnselect: destroyPopup
        })
    };
    map.addControl(controls['selector']);
    controls['selector'].activate();*/
    //
    var testData = {
        servers: [{
            lat: 6.641389,
            lon: 49.756667,
            ip: "172.0.0.1",
            hitCount: 40,
            name: "Den Google"
        }, {
            lat: 12.641389,
            lon: 31.756667,
            ip: "172.0.0.1",
            hitCount: 70,
            name: "Am Ballen"
        }],
        clientLocation: {
            lat: 52.506513,
            lon: 13.364279
        }
    }
    incomingData(testData);
}

function incomingData(data) {
    // servers[], clientLocation   Are stored in data
    //lat, lon, ip, hitCount, name   Are stored in each server
    var zoom = 7;
    var cL = data.clientLocation; //Stands for "client Location"
    jumpTo(cL.lon, cL.lat, zoom);
    for (var i = 0; i < data.servers.length; i++) {
        var cS = data.servers[i]; //Stands for "currently selected Server"
        var marker = newMarker(cS.lat, cS.lon, cS.ip, cS.name, cS.hitCount, i); //nth-child is always +1 greater
        markers.push(marker);
        layer_markers.addMarker(marker);
    }
}

function newMarker(lon, lat, ip, name, hitCount, num) {
    var size = new OpenLayers.Size(hitCount, hitCount);
    var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
    var icon = new OpenLayers.Icon('marker icon2.png', size, offset);
    var ll = new OpenLayers.LonLat(Lon2Merc(lon), Lat2Merc(lat));
    var feature = new OpenLayers.Feature(layer_markers, ll);
    feature.closeBox = true;
    feature.popupClass = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
        minSize: new OpenLayers.Size(300, 180)
    });
    feature.data.popupContentHTML = "<b>" + ip + "<br/>" + name + "<br/>" + hitCount + "</b> times retrieved";
    feature.data.overflow = "hidden";
    var marker = new OpenLayers.Marker(ll);
    marker.icon = icon;
    marker.feature = feature;
    var markerClick = function(evt) {
        if (this.popup == null) {
            this.popup = this.createPopup(this.closeBox);
            map.addPopup(this.popup);
            this.popup.show();
        } else {
            this.popup.toggle();
        }
        OpenLayers.Event.stop(evt);
    };
    return marker;
}

function jumpTo(lon, lat, zoom) {
    var x = Lon2Merc(lon);
    var y = Lat2Merc(lat);
    map.setCenter(new OpenLayers.LonLat(x, y), zoom);
    return false;
}

function Lon2Merc(lon) {
    return 20037508.34 * lon / 180;
}

function Lat2Merc(lat) {
    var PI = 3.14159265358979323846;
    lat = Math.log(Math.tan((90 + lat) * PI / 360)) / (PI / 180);
    return 20037508.34 * lat / 180;
}
/*function getCycleTileURL(bounds) {
   var res = this.map.getResolution();
   var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
   var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
   var z = this.map.getZoom();
   var limit = Math.pow(2, z);

   if (y < 0 || y >= limit)
   {
     return null;
   }
   else
   {
     x = ((x % limit) + limit) % limit;

     return this.url + z + "/" + x + "/" + y + "." + this.type;
   }
}*/