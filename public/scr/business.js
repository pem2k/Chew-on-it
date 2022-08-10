// Places API
function initialize() {
// Autocomplete Variables
    var input = document.getElementById('searchTextField');
    var options = {
      types: ['restaurant', 'bar', 'cafe' , 'meal_delivery', 'meal_takeaway']
    } 
// Autocomplete API
    var autocomplete = new google.maps.places.Autocomplete(input, options);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
          var place = autocomplete.getPlace();
          document.getElementById('city2').value = place.name;
          document.getElementById('cityLat').value = place.geometry.location.lat();
          document.getElementById('cityLng').value = place.geometry.location.lng();
//Render Business Input on Page
          businessPage.innerHTML +=`
        <div class="card rounded-0" style="min-height: 80vh">
          <div class="card-header rounded-0 bg-recessed text-center">
              <h2 class="card-title">${place.name}</h2>
          </div>
          <div class="card-body bg-highlight">  
            <h5> Address: ${place.vicinity}</h5>
            <h5> Phone Number: <a href= "${place.international_phone_number}">${place.international_phone_number}</a> </h5>
            <h5> Recent Review: </h5>
            <p>${place.reviews[0].text}</p>
            <h5> Find them here: </h5>
            <div id="map" ></div>
            <h5><a href= "${place.website}">Visit their Website!</a></h5>

          </div>
        </div>
          `
//Place API Request to find nearby restaurants
        const request = {
            location: new google.maps.LatLng(document.getElementById('cityLat').value, document.getElementById('cityLng').value),
            radius: 5000,
            type: ['restaurant']
        };
        
        const results = [];
        const places = document.getElementById('places');
        const service = new google.maps.places.PlacesService(places);

        const businessLocation = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          // The map, centered at businessLocation
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: businessLocation,
          });
        const marker = new google.maps.Marker({
            position: businessLocation, 
            map: map,
        });
        
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
//Rendering Nearby Restaurants sorted by score and placing markers on map
        const displayResults = () => {
            places.innerHTML += `<h2> Nearby Restaurants </h2>`
            console.log(results)
            console.log(results[i].geometry.location.lat())
            results.filter(result => result.rating)
                    .sort((a, b) => a.rating > b.rating ? -1 : 1)
                    .slice(0,3)
                    .forEach(result => {

                        const nearbyLocation = { lat: result.geometry.location.lat(), lng: result.geometry.location.lng() }
                        new google.maps.Marker({
                            position: nearbyLocation,
                            map: map,
                            icon: {url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"}
                        });

                        places.innerHTML +=
                        `<div class="card rounded-0" style="min-height: 25vh">
                            <div class="card-header rounded-0 bg-recessed text-center">
                                <h3 class="card-title" id="restaurantName1"> ${result.name} </h3>
                            </div>
                            <div class="card-body bg-highlight">
                                <h5 id="restaurantAddress1"> ${result.vicinity} </h5>
                            </div>
                        </div>
                        `
                        
                    });

        };
        service.nearbySearch(request, callback);
      });
      
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  // Initialize and add the map
function initMap() {
    // The location of businessLocation
    const businessLocation = { lat: -25.344, lng: 131.031 };
    // The map, centered at businessLocation
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: businessLocation,
    });
    // The marker, positioned at businessLocation
    const marker = new google.maps.Marker({
      position: businessLocation,
      map: map,
    });
  }
  
  window.initMap = initMap;