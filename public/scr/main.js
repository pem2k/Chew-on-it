document.querySelector("#logout").addEventListener("click", async () => {
	const rawResponse = await fetch("/user/logout", {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ msg: "Goodbye cruel world." })
	});

	if (rawResponse.status == 200)
		location.reload();
	else
		// TODO:
		//	Check for errors/display message.
		alert(rawResponse.status);
});
