ko.bindingHandlers.googleMap = {
  init(mapDiv, valueAccessor) {
    let bindingData = ko.unwrap(valueAccessor()) || {},
      map = new google.maps.Map(mapDiv, {
        center: {
          lat: bindingData.centerX,
          lng: bindingData.centerY
        },
        zoom: bindingData.zoom
      }),
      markers = new Array(bindingData.markers.length);
      infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < bindingData.markers.length; i++) {
      marker = new google.maps.Marker({
        position: bindingData.markers[i].position,
        //animation: google.maps.Animation.BOUNCE,
        map: map,
        title: bindingData.markers[i].title
      });
      marker.addListener('click', function(){
          infowindow.setContent(this.title);
          infowindow.open(map, this);
      });
      markers[i] = marker;
    }
    // do some more stuff or hook into markers
    // you might want to subscribe to the markers collection 
    // if you make it an observable array
  }
};

var GoogleMapViewModel = function () {
  this.googleMapData = ko.observable({
    centerX: 43.372710,
    centerY: -8.399908,
    zoom: 17,
    markers: [{
      position: { lat: 43.372710, lng: -8.399908 },
      title: 'Museo de Belas Artes de Coruña'
    },
    {
      position: { lat: 43.372796, lng: -8.403536 },
      title: 'Praia do Orzán'
    },
    {
      position: { lat: 43.374943, lng: -8.403500 },
      title: 'Fonte dos Surfistas'
    },
    {
      position: { lat: 43.371660, lng: -8.397106 },
      title: 'Igrexa de San Xurxo'
    },
    {
      position: { lat: 43.370838, lng: -8.395949 },
      title: 'Plaza de María Pita'
    },
    {
      position: { lat: 43.371309, lng: -8.398522 },
      title: 'Parroquia San Nicolás'
    }
    ]
  });
}

ko.applyBindings(new GoogleMapViewModel());