const submitButton = document.querySelector("button[type=\"submit\"]");

submitButton.addEventListener("click", login);

function login(event) {
	event.preventDefault();

	console.log("WHoohoo");
}