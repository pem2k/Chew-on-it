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

function addFriend (button) {
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
			location.reload();
		} else
			alert(`(${res.status}): ${res.statusText}`);
	});
}

function removeFriend (button) {
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
			location.reload();
		} else
			alert(`(${res.status}): ${res.statusText}`);
	});
}

function editProfile(button) {
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
	event.target.disabled = true;
    const textArea = document.querySelector(`#comment-${id}`);
	if (textArea.value == "") {
		event.target.disabled = false;
		return;
	}
try{
    const post = await fetch("/messages", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ review_id: id, message_contents: textArea.value})
    })
	location.reload();
}catch(err){if(err){console.log(err)}}

event.target.disabled = false;
}
