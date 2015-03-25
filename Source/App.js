
var provider = new Cesium.WebMapTileServiceImageryProvider({
url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?TIME=2013-06-15",
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
sceneMode : Cesium.SceneMode.COLUMBUS_VIEW
});

var CALIPSOdata1 = viewer.entities.add({
    name : 'CALIPSO Data 1',
    wall : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights([78.34,48.92, 2000000.0,
                                                               72.23, 35.42,2000000.0,
                                                               66.65,27.80, 2000000.0,
                                                               60.85,22.88, 2000000.0,
                                                               54.94,19.35, 2000000.0,
                                                               48.87,16.62, 2000000.0,
                                                               42.95,14.38, 2000000.0,
                                                               36.90,12.47, 2000000.0,
                                                               30.88,10.79, 2000000.0]),
        //minimumHeights : [100000.0, 100000.0, 100000.0, 100000.0],
        material : "../CALIPSO Data/1.png"
    }
});
var CALIPSOdata2 = viewer.entities.add({
    name : 'CALIPSO Data 2',
    wall : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights([30.83,10.78, 2000000.0,
                                                               24.74, 9.23,2000000.0,
                                                               18.65,7.80, 2000000.0,
                                                               12.54,6.23, 2000000.0,
                                                               6.42,5.10, 2000000.0,
                                                               0.31,3.80, 2000000.0,
                                                               -5.8,2.50, 2000000.0,
                                                               -11.91,1.18, 2000000.0,
                                                               -17.97,-0.17, 2000000.0]),
        //minimumHeights : [100000.0, 100000.0, 100000.0, 100000.0],
        material : "../CALIPSO Data/2.png"
    }
});


