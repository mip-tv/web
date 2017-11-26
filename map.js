var map;
var layer_mapnik;
var layer_markers;
var markers = [];

function drawmap() {
    $.ajax({
        type: 'GET',
        url: '/v1/locations/daily?date='+Date.now(),
		dataType: 'json',
        success: (data) => {
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

            incomingData(data);
        }
    });

}

function incomingData(data) {
    // servers[], clientLocation   Are stored in data
    //lat, lon, ip, hitCount, name   Are stored in each server
    var zoom = 1;
    var cL = {
        lat: 52.506513,
        long: 13.364279
    };
	var sum = data.sum;
	var locations = data.locations;
    jumpTo(cL.long, cL.lat, zoom);
    for (var i = 0; i < locations.length; i++) {
        var cS = locations[i]; //Stands for "currently selected Server"
        var marker = newMarker(cS.loc.long, cS.loc.lat, "0.0.0.0", "cS.name", cS.cnt, sum, locations.length, i); //nth-child is always +1 greater
        markers.push(marker);
        layer_markers.addMarker(marker);
    }
}

function newMarker(lon, lat, ip, name, hitCount, sum, length, num) {
	hitCount = Math.max(10, Math.min(100, hitCount / sum * length)) * 2;
    var size = new OpenLayers.Size(hitCount, hitCount);
    var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
    var icon = new OpenLayers.Icon('marker.png', size, offset);
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
