document.querySelector("#logout").addEventListener("click", () => {
	fetch("/users/logout", {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => {
		if (res.status == 200)
			location.reload();
		else
			alert(`(${res.status}): POOP${res.statusText}`);
	});
});