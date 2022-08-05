const submitButton = document.querySelector("#loginSubmit");

submitButton.addEventListener("click", login);

async function login(event) {
	event.preventDefault();

	const loginEmail = document.querySelector("#loginUser").value;
	const loginPassword = document.querySelector("#loginPassword").value;

	const rawResponse = await fetch("/user/login", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email: loginEmail, password: loginPassword})
	});
	location.reload();
	// TODO:
	//	Check for errors/display message.
}