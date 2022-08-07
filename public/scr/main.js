// Search stuff goes here.
const reviewButton = document.querySelector("#addReview");

reviewButton.addEventListener("click", addReview);

function addReview(event) {
    event.preventDefault();

	const restaurantName = document.querySelector("#restaurantName").value;
	const restaurantAddress = document.querySelector("#restaurantAddress").value;
    let restaurantScore = [];
        $('.calculate').click(_ => {
        restaurantScore = [];
        $("#restaurantScore input[type='checkbox']:checked").each((_, {value}) => {
            restaurantScore.push(value);
        });
        
        console.log(restaurantScore);
        });
	const restaurantReview = document.querySelector("#restaurantReview").value;

	fetch("/reviews", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			restaurant_name: restaurantName,
			restaurant_address: restaurantAddress,
			restaurant_score: restaurantScore,
			restaurant_review: restaurantReview,
		})
	}).then(res => {
		if (res.status == 200)
			location.reload();
		else
			alert(`(${res.status}): POOP${res.statusText}`);
	});
}