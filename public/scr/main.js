// Search stuff goes here.

// const reviewButton = document.querySelector("#submitReview");

// reviewButton.addEventListener("click", addReview);



$("#submitReview").on("click", function(event) {
	event.preventDefault()
	console.log("working!")
    // let target = event.target
    // if(target.id != $("#submitReview")){return}
    fetch("/reviews", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			restaurant_name: $("#restaurantName").val(),
			restaurant_address: $("#restaurantAddress").val(),
			// restaurant_score: restaurantScore,
			content: $("#restaurantReview").val(),
			
		})
	}).then(res => {
		if (res.status == 200){
			location.reload();
		}
	});
})

// const addReview = function(event) {
//     event.preventDefault();


// 	const reviewPhoto = cldUrl1
// 	const restaurantName = $("#restaurantName").val();
// 	const restaurantAddress = $("#restaurantAddress").val();
//     // let restaurantScore = [];
//     //     $('.calculate').click(_ => {
//     //     restaurantScore = [];
//     //     $("#restaurantScore input[type='checkbox']:checked").each((_, {value}) => {
//     //         restaurantScore.push(value);
//     //     });
        
//     //     console.log(restaurantScore);
//     //     });
// 	const restaurantReview = $("#restaurantReview").val();

	
