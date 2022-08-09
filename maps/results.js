function addReview() {
    var data = $('#reviewModal').serializeArray();
    for(i in data){
        console.log(data[i]);
    }  
};
//     var restaurantName = $("#restaurantName").val();
//     var restaurantAddress = $("#restaurantAddress").val();
//     let restaurantScore = [];
//     $('.calculate').click(_ => {
//     restaurantScore = [];
//     $("#restaurantScore input[type='checkbox']:checked").each((_, {value}) => {
//         restaurantScore.push(value);
//     });
    
//     console.log(restaurantScore);
//     });
//     var restaurantReview = $("#restaurantReview").val();


const request = {
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
    console.log(results)
    results.filter(result => result.rating)
            .sort((a, b) => a.rating > b.rating ? -1 : 1)
                console.log(results)
            for (var i=0; i<5; i++) {
            // .forEach(result => {
                places.innerHTML += `<li>${results[i].name} - ${results[i].rating} - ${results[i].vicinity}</li>`;
            };
};


service.nearbySearch(request, callback);
