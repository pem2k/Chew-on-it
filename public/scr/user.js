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
		fetch("/users/follow", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({ followed_id: button.dataset.friend })
		}).then(res => {
			button.disabled = false;
			if (res.status == 200) {
				button.classList.add("btn-danger");
				button.classList.remove("btn-success");
				button.textContent = "Remove";
				location.reload();
			} else
				alert(`(${res.status}): ${res.statusText}`);
		});
	} else {
		button.disabled = true;
		fetch("/users/unfollow", {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ followed_id: button.dataset.friend })
		}).then(res => {
			button.disabled = false;
			if (res.status == 200) {
				button.classList.add("btn-success");
				button.classList.remove("btn-danger");
				button.textContent = "Add";
				location.reload();
			} else
				alert(`(${res.status}): ${res.statusText}`);
		});
	}
}

function editProfile(button) {
	console.log("Editing...")
	button.disabled = true;
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
		button.disabled = false;
		if (res.status == 200)
			location.reload();
		else
			alert(`(${res.status}): ${res.statusText}`);
	});
}

async function addComment(event, id) {
    event.preventDefault();
    const textArea = document.querySelector(`#comment-${id}`);
    console.log(textArea.value);
try{
    const post = await fetch("/messages", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ review_id: id, message_contents: textArea.value})
    })
}catch(err){if(err){console.log(err)}}


}
