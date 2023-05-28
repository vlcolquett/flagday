// Create a reference to the "flag" folder
const storageRef = firebase.storage().ref().child('flag');

// Get the list of images in the "flag" folder
storageRef.listAll().then((result) => {
  result.items.forEach((imageRef) => {
    // Get the download URL for each image
    imageRef.getDownloadURL().then((url) => {
      // Display the image on your webpage
      const img = document.createElement('img');
      img.src = url;
      document.body.appendChild(img);
    }).catch((error) => {
      // Handle any errors
      console.log(error);
    });
  });
}).catch((error) => {
  // Handle any errors
  console.log(error);
});