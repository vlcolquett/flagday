import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js'
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js"			
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js'

console.log("boo");

var firebaseConfig = {
  apiKey: "AIzaSyAKBR9W7oK5OpGCOPLXa6NRFxU6Pb0zSdQ",
  authDomain: "flagday-95308.firebaseapp.com",
  projectId: "flagday-95308",
  storageBucket: "flagday-95308.appspot.com",
  messagingSenderId: "617381883851",
  appId: "1:617381883851:web:b87a151c7a9eb104df104e",
  measurementId: "G-9HLKY9YBQF"
};
const firebase = initializeApp(firebaseConfig);

// Create a reference to the "flag" folder
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();
var check
var anchorElement
var articleElement
var imageContainer = document.getElementById('main');
// Create a storage reference from our storage service
const storageRef = ref(storage, 'country_flags');
console.log("hello");
// Fetch the list of images in the 'flag' folder
// listAll(storageRef)
//   .then(function(result) {
//     result.items.forEach(function(imageRef) {
//       // Get the download URL for each image
//       getDownloadURL(imageRef).then(function(url) {
//         // Create an <img> element
//         var imageElement = document.createElement('img');
//         imageElement.src = url;
//         imageElement.alt = '';

//         // Create an <input> element for the country name
//         var countryInput = document.createElement('input');
//         countryInput.type = 'text';
//         countryInput.name = 'country';
//         countryInput.id = 'country';
//         countryInput.value = '';
//         countryInput.style.width = '50%';
//         countryInput.style.bottom = '1em';
//         countryInput.style.left = '1em';
//         countryInput.style.position = 'absolute';
//         countryInput.style.borderRadius = '5px';
//         countryInput.style.opacity = '.5';

//         // Create an <input> element for the guess button
//         var guessButton = document.createElement('input');
//         guessButton.type = 'submit';
//         guessButton.value = 'guess';
//         guessButton.style.bottom = '1em';
//         guessButton.style.right = '1em';
//         guessButton.style.position = 'absolute';
//         guessButton.style.borderRadius = '5px';
//         guessButton.style.backgroundColor = '#34363b';
//         guessButton.style.opacity = '.5';
//         guessButton.className = 'primary';

//         // Create a <a> element
//         var imageLink = document.createElement('a');
//         imageLink.className = 'image';
//         imageLink.appendChild(imageElement);
//         imageLink.appendChild(countryInput);
//         imageLink.appendChild(guessButton);

//         // Append the <a> element to the image container
//         imageContainer.appendChild(imageLink);
//       }).catch(function(error) {
//         console.log('Error getting download URL:', error);
//       });
//     });
//   })
//   .catch(function(error) {
//     console.log('Error fetching images:', error);
//   });
//Get the list of images in the "flag" folder
  listAll(storageRef).then(function(result) {
  result.items.forEach(function(imageRef) {
    // Get the download URL for each image
    getDownloadURL(imageRef).then(function(url) {
      // Display the image on your webpage
      const img = document.createElement('img');
      img.src = url;
      img.style.backgroundPosition = 'center';
          img.style.backgroundRepeat = 'no-repeat';
          img.style.backgroundSize = 'cover';
          img.style.border = '0';
          img.style.borderRadius = '10px';
          img.style.height = '95%';
          img.style.width = '95%';
          img.style.position = 'absolute';
          //img.style.top = '0';
          //img.style.left = '0';

      anchorElement = document.createElement('a');
          anchorElement.appendChild(img);
         anchorElement.classList.add('image');
          anchorElement.style.backgroundSize = 'cover';
          anchorElement.style.content = '';
          anchorElement.style.display = 'block';
          anchorElement.style.height = '100%';
          anchorElement.style.position = 'absolute';
          anchorElement.style.top = '0';
          anchorElement.style.left = '0';
          anchorElement.style.width = '100%';
          anchorElement.className = 'image';
          
         


      articleElement = document.createElement('article');
          articleElement.classList.add('thumb');  
          articleElement.appendChild(anchorElement);

      imageContainer = document.getElementById('main');
          imageContainer.appendChild(articleElement);      
          check = imageContainer.innerHTML

          
          //document.body.appendChild(img);
    }).catch((error) => {
      // Handle any errors
      console.log(error);
    });
  });
}).catch((error) => {
  // Handle any errors
  console.log(error);
});

document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('a');
  images.forEach(function(img) {
    img.addEventListener('load', function() {
      // Apply the styling once the image has finished loading
      img.classList.add('image');
    });
  });
});
