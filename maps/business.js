function initialize() {
    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
          var place = autocomplete.getPlace();
          document.getElementById('city2').value = place.name;
          document.getElementById('cityLat').value = place.geometry.location.lat();
          document.getElementById('cityLng').value = place.geometry.location.lng();
          console.log(place)

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
            <h5><a href= "${place.website}">Visit their Website!</a></h5>
          </div>
        </div>
          `

        const request = {
            location: new google.maps.LatLng(document.getElementById('cityLat').value, document.getElementById('cityLng').value),
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
            console.log(results)
            results.filter(result => result.rating)
                    .sort((a, b) => a.rating > b.rating ? -1 : 1)
                    .slice(0,3)
                    .forEach(result => {
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
//(47.8786488, -122.1536335)
// const request = {
//     location: new google.maps.LatLng(document.getElementById('cityLat').value, document.getElementById('cityLng').value),
//     radius: 5000,
//     type: ['restaurant']
// };

// const results = [];
// const places = document.getElementById('places');
// const service = new google.maps.places.PlacesService(places);

// const callback = (response, status, pagination) => {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         results.push(...response);
//     }

//     if (pagination.hasNextPage) {
//         setTimeout(() => pagination.nextPage(), 2000);
//     } else {
//         displayResults();
//     }
// }

// // const displayResults = () => {
// //     console.log(results)
// //     results.filter(result => result.rating)
// //             .sort((a, b) => a.rating > b.rating ? -1 : 1)
// //                 console.log(results)
// //             for (var i=0; i<3; i++) {
// //             // .forEach(result => {
// //                 $("#restaurantName1").append("<h4 class='center-align' style='color:#E9C46A;'>"+results[i].name+"</h4>");
// //                 $("#restaurantAddress1").append("<h6 class='center-align' style='color:#F4A261;'>"+results[i].vicinity+"</h6>");
// //             };
// // }; <li>${result.name} - ${result.rating} - ${result.vicinity}</li>

// const displayResults = () => {
//     console.log(results)
//     results.filter(result => result.rating)
//             .sort((a, b) => a.rating > b.rating ? -1 : 1)
//             .slice(0,3)
//             .forEach(result => {
//                 places.innerHTML +=
//                 `<div class="card rounded-0" style="min-height: 25vh">
//                     <div class="card-header rounded-0 bg-recessed text-center">
//                         <h3 class="card-title" id="restaurantName1"> ${result.name} </h3>
//                     </div>
//                     <div class="card-body bg-highlight">
//                         <h5 id="restaurantAddress1"> ${result.vicinity} </h5>
//                     </div>
//                 </div>
//                 `
                
//             });
// };

// service.nearbySearch(request, callback);