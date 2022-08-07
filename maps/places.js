let map = null
/* const request = {
    location: new google.maps.LatLng(47.8786488, -122.1536335),
    radius: 5000,
    type: ['restaurant']
};

const results = [];
const places = document.getElementById('places');
const service = new google.maps.places.PlacesService(places);

const callback = (response, status, pagination) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        results.push(...response);
    }

    if (pagination.hasNextPage) {
        setTimeout(() => pagination.nextPage(), 2000);
    } else {
        displayResults();
    }
}

const displayResults = () => {
    results.filter(result => result.rating)
            .sort((a, b) => a.rating > b.rating ? -1 : 1)
            .forEach(result => {
                places.innerHTML += `<li>${result.name} - ${result.rating}</li>`;
            });
}

service.nearbySearch(request, callback); */

function initMap(){
    let location = new Object();
    navigator.geolocation.getCurrentPosition(function(pos){
        location.lat = pos.coords.latitude;
        location.long = pos.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: location.lat, lng: location.long},
            zoom: 15
        });
        getRestaurants(location);
    });
}

function getRestaurants(location) {
    var seattle = new google.maps.LatLng(location.lat, location.long)
    var request = {
        location: seattle,
        radius: '1500',
        type: ['restaurant']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i=0; i < results.length; i++) {
            var place = results[i];
            let price = createPrice(place.price_level);
            let content = `<h3>${place.name}</h3>
            <h4>${place.vicinity}</h4>
            <p>Price: ${price}<br/> 
            Rating: ${place.rating}`;

            var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name
            });

            var infowindow = new google.maps.InfoWindow ({
                content: content
            });

            bindInfoWindow(marker, map, infowindow, content);
            marker.setMap(map);
        }
    }
}

function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function(){
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
}

function createPrice(level){
    if (level !="" && level != null) {
        let out = "";
        for (var x=0; x < level; x++){
            out += "$";
        }
        return out;
    } else {
        return "?";
    }
}