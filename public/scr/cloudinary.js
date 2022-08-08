var myWidget = cloudinary.createUploadWidget({
    cloudName: 'doiwoxozv',
    uploadPreset: 'x695mtm9'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);

        let cldUrl = result.info.url
        console.log(cldUrl)

        fetch('/users/profilePic', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile_pic_url: cldUrl
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
    }
}
)

document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
}, false);

var myWidget1 = cloudinary.createUploadWidget({
    cloudName: 'doiwoxozv',
    uploadPreset: 'gcrsfed5'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);

        let cldUrl = result.info.url
        console.log(cldUrl)

        fetch('/reviews/reviewPic', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile_pic_url: cldUrl
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
    }
}
)

document.getElementById("upload_widget1").addEventListener("click", function () {
    myWidget1.open();
}, false);