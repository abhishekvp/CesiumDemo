
var provider = new Cesium.WebMapTileServiceImageryProvider({
url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?TIME=2015-03-22",
layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
style: "",
format: "image/jpeg",
tileMatrixSetID: "GoogleMapsCompatible_Level9",
maximumLevel: 9,
tileWidth: 256,
tileHeight: 256,
tilingScheme: new Cesium.WebMercatorTilingScheme()
});
var viewer = new Cesium.Viewer("cesiumContainer", {
animation: false, // Only showing one day in this demo
baseLayerPicker: false, // Only showing one layer in this demo
timeline: false, // Only showing one day in this demo
imageryProvider: provider, // The layer being shown
//sceneMode : Cesium.SceneMode.COLUMBUS_VIEW
});

var CalipsoData = {
  "0": {
        "img": "/CesiumDemo/CALIPSOData/0.png",
        "coordinates": [
            78.34,
            48.92,
            72.23,
            35.42,
            66.65,
            27.8,
            60.85,
            22.88,
            54.94,
            19.35,
            48.87,
            16.62,
            42.95,
            14.38,
            36.9,
            12.47,
            30.88,
            10.79
        ]
    },
    "1": {
        "img": "/CesiumDemo/CALIPSOData/1.png",
        "coordinates": [
            30.83,
            10.78,
            24.74,
            9.23,
            18.65,
            7.8,
            12.54,
            6.23,
            6.42,
            5.1,
            0.31,
            3.8,
            -5.8,
            2.5,
            -11.91,
            1.18,
            -17.97,
            -0.17
        ]
    },
       "2": {
        "img": "/CesiumDemo/CALIPSOData/2.png",
        "coordinates": [
            79.44,
            152.18,
            81.79,
            116.30,
            80.13,
            77.58,
            75.79,
            56.04,
            70.48,
            44.95,
            64.81,
            38.40,
            58.97,
            34.01,
            53.04,
            30.77,
            47.10,
            28.23
        ]
    },
};

var scene = viewer.scene;

var CALIPSOdata0 = viewer.entities.add({
    name : 'CALIPSO Data 0',
    id : '0',
    wall : {
      
     positions : Cesium.Cartesian3.fromDegreesArray(CalipsoData["0"].coordinates), 
        maximumHeights : [ 2000000,2000000, 2000000, 2000000,2000000,2000000, 2000000,2000000,2000000],
        
       material : CalipsoData["0"].img,
       show: false
}
});

      
var CALIPSOdata1 = viewer.entities.add({
    name : 'CALIPSO Data 1',
    id : '1',
    wall : {
           positions : Cesium.Cartesian3.fromDegreesArray(CalipsoData["1"].coordinates),


        maximumHeights : [ 2000000,2000000, 2000000, 2000000,2000000,2000000, 2000000,2000000,2000000],
        material : CalipsoData["1"].img,
        show: false
    }
});

var CALIPSOdata2 = viewer.entities.add({
    name : 'CALIPSO Data 2',
    id : '2',
    wall : {
           positions : Cesium.Cartesian3.fromDegreesArray(CalipsoData["2"].coordinates),


        maximumHeights : [ 2000000,2000000, 2000000, 2000000,2000000,2000000, 2000000,2000000,2000000],
        material : CalipsoData["2"].img,
        show: false

    }
});

    var entity = viewer.entities.add({
        label : {
            show : false
        }
    });


var ellipsoid = scene.globe.ellipsoid;
     handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
        if (cartesian) {
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

            entity.position = cartesian;
            entity.label.show = true;
            entity.label.text = '(' + longitudeString + ', ' + latitudeString + ')';
            //Logic to decide which Lidar Profile to show
            var dist0 = Math.acos(Math.sin(latitudeString) * Math.sin(CalipsoData["0"].coordinates[0]) + Math.cos(latitudeString) * Math.cos(CalipsoData["0"].coordinates[0]) * Math.cos(Math.abs(longitudeString - CalipsoData["0"].coordinates[1]))) * 6371;
            var dist1 = Math.acos(Math.sin(latitudeString) * Math.sin(CalipsoData["1"].coordinates[0]) + Math.cos(latitudeString) * Math.cos(CalipsoData["1"].coordinates[0]) * Math.cos(Math.abs(longitudeString - CalipsoData["1"].coordinates[1]))) * 6371;
            var dist2 = Math.acos(Math.sin(latitudeString) * Math.sin(CalipsoData["2"].coordinates[0]) + Math.cos(latitudeString) * Math.cos(CalipsoData["2"].coordinates[0]) * Math.cos(Math.abs(longitudeString - CalipsoData["2"].coordinates[1]))) * 6371;
            var minDist = Math.min(dist0,dist1,dist2);
            console.log("Min. Distance = "+minDist+"km.");
            if(minDist == dist0){
                CALIPSOdata0.wall.show = true;
                CALIPSOdata1.wall.show = false;
                CALIPSOdata2.wall.show = false;
              }
            else if (minDist == dist1){
                CALIPSOdata1.wall.show = true;
                CALIPSOdata2.wall.show = false;
                CALIPSOdata0.wall.show = false;
              }
            else {
                CALIPSOdata2.wall.show = true;
                CALIPSOdata1.wall.show = false;
                CALIPSOdata0.wall.show = false;
              }


        } else {
            entity.label.show = false;
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
