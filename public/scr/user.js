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
			alert(`(${res.status}): ${res.statusText}`);
	});
});

function toggleFriend (button) {
	if (button.classList.contains("btn-success")) {
		button.disabled = true;
		fetch("/follow/", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {

			}
		}).then(res => {
			button.disabled = false;
			if (res.status !== 200) {
				button.classList.add("btn-danger");
				button.classList.remove("btn-success");
				button.textContent = "Remove";
			} else
				alert(`(${res.status}): ${res.statusText}`);
		});
	} else {
		button.disabled = true;
		fetch("/unfollow/", {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {

			}
		}).then(res => {
			button.disabled = false;
			if (res.status !== 200) {
				button.classList.add("btn-success");
				button.classList.remove("btn-danger");
				button.textContent = "Add";
			} else
				alert(`(${res.status}): ${res.statusText}`);
		});
	}
}

function editProfile(button) {
	const editFirst = document.querySelector("#editFirst").value;
	const editLast = document.querySelector("#editLast").value;
	fetch("/users/", {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			first_name: editFirst,
			last_name: editLast
		})
	}).then(res => {
		if (res.status == 200)
			location.reload();
		else
			alert(`(${res.status}): ${res.statusText}`);
	});
}