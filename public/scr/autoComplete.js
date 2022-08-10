const allUserArr = []

const usersAc = fetch("/users")
    .then((response) => response.json())
    .then((data) => {
        for(i = 0; i<data.length; i++){
            let currentObj = data[i];
            let fullNameArr = Object.values(currentObj)
            allUserArr.push(fullNameArr.toString())
        }
    });

    const search = $(".searcher")
   
    search.on("click", function(event){
        event.stopPropagation()
        event.preventDefault()
        window.location.href = `/users/profile/${$("#autoComplete").val()}`
    })

const autoCompleteJS = new autoComplete({
    selector: "#autoComplete",
    placeHolder: "Search for Users..",
    data: {
        src: allUserArr,
        cache: true,
    },
    resultsList: {
        element: (list, data) => {
            if (!data.results.length) {
                // Create "No Results" message element
                const message = document.createElement("div");
                // Add class to the created element
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                // Append message element to the results list
                list.prepend(message);
            }
        },
        noResults: true,
    },
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                autoCompleteJS.input.value = selection;
            }
        }
    }
});

