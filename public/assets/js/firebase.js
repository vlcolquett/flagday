//import {firebaseConfig} from './firebaseConfig'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js'
//import { getStorage, ref, list, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js"			
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js'
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js'

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

//################################ FIRESTORE #############################
const db = getFirestore(firebase);

const colRef = collection(db, 'country_flags');

const docsSnap = await getDocs(colRef);


var anchorElement
var articleElement
var imageContainer = document.getElementById('main');
var docCount = 0;
docsSnap.forEach(doc => {
  // get the id
  //console.log(doc.id);
  //console.log(doc.data()['name'], doc.data()['url']);
  docCount = docCount + 1;
  //console.log(i);
  const url = doc.data()['url'];
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
          img.id = 'fimg'+docCount.toString();
                  

          anchorElement = document.createElement('a');
          anchorElement.appendChild(img);
          anchorElement.id = "anchor" + docCount.toString();
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
          
      //var imageContainer = document.getElementById('main');
          imageContainer.appendChild(articleElement);      
          //check = imageContainer.innerHTML


})

//######################### STORAGE ############################################
// Create a reference to the "flag" folder
// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage();


// // Create a storage reference from our storage service
// const storageRef = ref(storage, 'country_flags');
// console.log("hello");

// //Get the list of images in the "flag" folder
//   list(storageRef).then(function(result) {
//   result.items.forEach(function(imageRef) {
//     // Get the download URL for each image
//     getDownloadURL(imageRef).then(function(url) {
//       // Display the image on your webpage
//       //console.log(url);
      
//           //img.style.top = '0';
//           //img.style.left = '0';



          
//           //document.body.appendChild(img);
//     }).catch((error) => {
//       // Handle any errors
//       console.log(error);
//     });
//   });
// }).catch((error) => {
//   // Handle any errors
//   console.log(error);
// });

// document.addEventListener("DOMContentLoaded", function() {
//   const images = document.querySelectorAll('a');
//   images.forEach(function(img) {
//     img.addEventListener('load', function() {
//       // Apply the styling once the image has finished loading
//       img.classList.add('image');
//     });
//   });
// });


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



//         // Create a <a> element
//         var imageLink = document.createElement('a');
//         imageLink.className = 'image';
//         imageLink.appendChild(imageElement);


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

//#################### authentication ###########################

const auth = getAuth(firebase);
var email = document.getElementById("email");
var password = document.getElementById("password");
var login = document.getElementById("login");
var logoutBtn = document.getElementById("logout");
var welcome = document.getElementById("welcome");
var reset = document.getElementById("reset");
var score = document.getElementById("score");

const loginEmailPassword = async () => {
   try{ 
    const loginEmail = email.value;
    const loginPassword = password.value;

    const userCreds = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  }catch (error){
    console.log('Error logging in: ', error);
    document.getElementById("error").innerHTML = 'invalid credentials'
  }
}
login.addEventListener("click", loginEmailPassword);

const monitorAuthState = async () => {
  onAuthStateChanged(auth, function(user) {
    if(user){
      var uid = user.uid
      email.value = "";
      password.value = "";
      for(var i =1; i <= docCount; i++){
        var anchor = document.getElementById("anchor"+i.toString());
        // Create an <input> element for the country name
        var countryInput = document.createElement('input');
        countryInput.type = 'text';
        countryInput.name = 'country';
        countryInput.id = "guessI"+i.toString();
        countryInput.value = '';
        countryInput.style.width = '50%';
        countryInput.style.bottom = '3em';
        countryInput.style.left = '1em';
        countryInput.style.position = 'absolute';
        countryInput.style.borderRadius = '5px';
        countryInput.style.opacity = '.5';
        countryInput.style.display = 'block';

        // Create an <input> element for the guess button
        var guessButton = document.createElement('input');
        guessButton.type = 'submit';
        guessButton.value = 'guess';
        guessButton.id = "guessB"+i.toString();
        guessButton.style.bottom = '3.2em';
        guessButton.style.right = '3em';
        guessButton.style.position = 'absolute';
        guessButton.style.borderRadius = '5px';
        guessButton.style.backgroundColor = '#34363b';
        guessButton.style.opacity = '.5';
        guessButton.className = 'primary';
        guessButton.style.display = 'block'

        anchor.appendChild(countryInput);
        anchor.appendChild(guessButton);
      }
      document.getElementById("out-list").style.display = "block";
      document.getElementById("in-list").style.display = "none";
      document.getElementById("resetP").style.display = "none";
      document.getElementById("log-fields").innerHTML = "";
      $(".panel").trigger('---hide');
      makePageYou(uid);
      ListenUp();
    }else{
      welcome.innerHTML = 'Welcome to <strong>Flag Day</strong>'
      
      console.log("user logged out")
    }
  })
}

const resetP = async () => {
  var r_email = prompt("Enter the email for the account you would like to reset the password for.");
  sendPasswordResetEmail(auth, r_email)
  .then(() => {
    alert("Password email has been sent.");
  })
  .catch((error)=> {
    const errorCode = error.code;
    const errorMessage = error.message;
  })
}

reset.addEventListener("click", resetP);

const logout = async () => {
  await signOut(auth);
  location.reload();
}

logoutBtn.addEventListener("click", logout);

monitorAuthState();

async function makePageYou(uid){
  const userRef = doc(db, 'users', uid)
      //console.log(user.uid, userRef)
      const userSnap = await getDoc(userRef);
      var uscore = userSnap.data()["score"];
      console.log("score ", uscore);
      console.log(userSnap.data()["name"])
      if (userSnap){
        //var n = data(userSnap);
        welcome.innerHTML = 'Welcome, '+ userSnap.data()["name"];
        score.innerHTML = '<strong>High Score: '+ uscore +' </strong>';
      }else{
          console.log("no document found")
      }
    }


//######################CHECK COUNTRY GUESS#######################################
function ListenUp(){
  for(var i = 1; i<= docCount; i++){
    //get elements
    var guessI = document.getElementById("guessI"+i.toString());
    var guessB = document.getElementById("guessB"+i.toString());

    //add listeners and send data
    guessB.addEventListener("click", checkGuess)

  }
}

var cScore = 0;
var correct = 0;
async function checkGuess(event){
  //we need to get the country name and check with value
  const inputField = event.target.previousElementSibling;
  var index = inputField.id.slice(6);
  if(index.length == 1){
    var indexF = "00"+index;
  }else if(index.length == 2){
    var indexF = "0"+index;
  }
  const iValue = inputField.value;
 
  if(iValue){
    console.log(iValue, indexF)
    const ctryRef = doc(db, 'country_flags', indexF)
      //console.log(user.uid, userRef)
      // var gScore = score.innerHTML.split(" ")[2];
      // console.log(parseInt(gScore));
      const ctrySnap = await getDoc(ctryRef);
      var guessB = 'guessB'+index.toString();
      var Fimage = 'fimg'+index.toString();
      if (ctrySnap){
        if (ctrySnap.data()["name"].toLowerCase() == iValue.toLowerCase().trim()){
          console.log("correct");
          inputField.style.display = 'none';
          document.getElementById(guessB).style.display = 'none';
          document.getElementById(Fimage).style.border = '10px solid rgb(94, 248, 63)';
          cScore = cScore + 50;
          score.innerHTML = 'Score: ' + cScore.toString();
          correct = correct + 1
          if(correct == 55){ //i know, i know this is hardcoded... get the count of images when you're not tired...
            console.log("you got all right") // store score to the user if it is higher
            const user = auth.currentUser;
            //const uname = welcome.innerHTML.split(" ")[1];
            console.log(user.uid);
            const highScore = doc(db, 'users', user.uid)
            const hsSnap = await getDoc(highScore);
            if(hsSnap.data()["score"] < cScore){
              await updateDoc(highScore, {
                score: cScore
              });
              alert("You've got a new High Score! Press okay to play again or explore some more!");
              location.reload();
            }else{
              alert("You didn't beat your score, but you can play again! Press okay to continue.");
              location.reload();
            }
          }
        }else{
          console.log("no");
          document.getElementById(Fimage).style.border = '10px solid red'
          cScore = cScore - 10;
          score.innerHTML = 'Score: ' + cScore.toString();
        }
      }else{
          console.log("no document found")
      }
  }else{
    console.log('Element clicked but empty');
  }
  console.log("current ", cScore);
}