document.addEventListener('DOMContentLoaded', () => {

  // Unix timestamp (in seconds) to count down to
  var flagDay = (new Date("June 12, 2023").getTime() / 1000) + (86400 * 2) + 1;

  // Set up FlipDown
  var flipdown = new FlipDown(flagDay)

    // Start the countdown
    .start()

    // Do something when the countdown ends
    .ifEnded(() => {
      console.log('The countdown has ended!');
      document.getElementById('overlay').style.zIndex = 0;
      document.getElementById('timer').style.display = "none";
    });

  // Toggle theme
 /* var interval = setInterval(() => {
    let body = document.body;
    body.classList.toggle('light-theme');
    body.querySelector('#flipdown').classList.toggle('flipdown__theme-dark');
    body.querySelector('#flipdown').classList.toggle('flipdown__theme-light');
  }, 5000);*/

});