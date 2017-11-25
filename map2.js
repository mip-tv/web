var layer_mapnik;
var layer_markers;
var markers = [];

function drawmap() {
    map = new OpenLayers.Map("map");
    map.addLayer(new OpenLayers.Layer.OSM());
    epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
    projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)
    var lonLat = new OpenLayers.LonLat(-0.1279688, 51.5077286).transform(epsg4326, projectTo);
    var zoom = 14;
    map.setCenter(lonLat, zoom);
    var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
    var controls = {
        selector: new OpenLayers.Control.SelectFeature(vectorLayer, {
            onSelect: createPopup,
            onUnselect: destroyPopup
        })
    };
    map.addControl(controls['selector']);
    controls['selector'].activate();
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
    map.addLayer(vectorLayer);
}

function newMarker(lon, lat, ip, name, hitCount, num) {
    var size = new OpenLayers.Size(hitCount, hitCount);
    var marker = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lon, lat).transform(epsg4326, projectTo), {
        lat: lat,
        lon: lon,
        ip: ip,
        hitCount: hitCount,
        name: name
    }, {
        externalGraphic: 'img/marker icon2.png',
        graphicHeight: hitCount,
        graphicWidth: hitCount,
        graphicXOffset: -(size.w / 2),
        graphicYOffset: -size.h
    });
    //
    vectorLayer.addFeatures(marker);
    var markerClick = function(evt) {
        if (this.popup == null) {
            this.popup = feature.createPopup(feature.closeBox);
            map.addPopup(this.popup);
            this.popup.show();
        } else {
            this.popup.toggle();
        }
        OpenLayers.Event.stop(evt);
    };
    return marker;
}
var controls = {
    selector: new OpenLayers.Control.SelectFeature(vectorLayer, {
        onSelect: createPopup,
        onUnselect: destroyPopup
    })
};

function createPopup(feature) {
    feature.popup = new OpenLayers.Popup.FramedCloud("pop", feature.geometry.getBounds().getCenterLonLat(), null, '<div class="markerContent">' + feature.attributes.description + '</div>', null, true, function() {
        controls['selector'].unselectAll();
    });
    //feature.popup.closeOnMove = true;
    map.addPopup(feature.popup);
}

function destroyPopup(feature) {
    feature.popup.destroy();
    feature.popup = null;
}
map.addControl(controls['selector']);
controls['selector'].activate();

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