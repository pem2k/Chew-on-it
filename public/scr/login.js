const loginButton = document.querySelector("#loginSubmit");
const signupButton = document.querySelector("#signupSubmit");
const loginError = document.querySelector("#loginError");
const signupError = document.querySelector("#signupError");

loginButton.addEventListener("click", login);
signupButton.addEventListener("click", signup);

function login(event) {
	event.preventDefault();

	const loginEmail = document.querySelector("#loginUser").value;
	const loginPassword = document.querySelector("#loginPassword").value;

	loginButton.disabled = true;

	fetch("/login", {
		method: 'POST',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({email: loginEmail, password: loginPassword})
	}).then(res => {
		loginButton.disabled = false;

		if (res.status == 200) {
			loginError.textContent = "";
			location.reload();
		} else
			loginError.textContent = `(${res.status}): ${res.statusText}`;
	});
}

function signup(event) {
	signupButton.disabled = true;

	const signupFirst = document.querySelector("#signupFirst").value;
	const signupLast = document.querySelector("#signupLast").value;
	const signupEmail = document.querySelector("#signupEmail").value;
	const signupPassword = document.querySelector("#signupPassword").value;
	const signupConfirm = document.querySelector("#signupPasswordConfirm").value;

	if (signupPassword != signupConfirm) {
		signupError.textContent = "ERROR: Passwords must match.";
		signupButton.disabled = false;
		return;
	}

	fetch("/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			first_name: signupFirst,
			last_name: signupLast,
			email: signupEmail,
			password: signupPassword,
			birthday: 0
		})
	}).then(res => {
		signupButton.disabled = false;

		if (res.status === 200) {
			signupError.textContent = "";
			location.reload();
		} else
			signupError.textContent = `(${res.status}): ${res.statusText}`;
	});
}