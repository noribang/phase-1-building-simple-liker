// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
/* 1) Add .hidden to error modal on page load. */
const modal = document.getElementById("modal")
// console.log(modal)
modal.classList.add("hidden")
/* 2) When empty heart is clicked call mimicServerCall() to make server request. */
const heartGlyph = document.getElementsByClassName("like-glyph")

/* On page load heart glyph will be EMPTY_HEART. */
for (let i = 0; i < heartGlyph.length; i++) {
  heartGlyph[i].innerText = EMPTY_HEART
  // console.log(heartGlyph[i].innerText)
}

/* Add event listener to span.like-glyph elements. */
for (let i = 0; i < heartGlyph.length; i++) {
  heartGlyph[i].addEventListener("click", function(event) {
    console.log(event.target.innerText)
    // console.log(i, ": Listening!!!")
    const like = event.target
    // like.innerText = FULL_HEART
    // like.classList.add("activated-heart")
    ////////////////////////////////
    /* Case A. If heart is empty. */
    ////////////////////////////////
    if (like.innerText === '♡') {
      /* Mimic server response. 
         Call .catch() on server error and
         display server error on modal. 
      */
      mimicServerCall()
      /* On server return success status display red full heart. */
      .then((data) => {
        console.log(data)
        like.innerText = FULL_HEART
        like.classList.add("activated-heart")
      })
        /* Server error. */
        .catch((error) => {
        console.log(error)
        /* Display modal message on error. */
        modal.classList.remove("hidden")
        document.getElementById("modal-message").innerText = error
        /* Hide modal after 3 seconds. */
        setTimeout(function() {
          modal.classList.add("hidden")
        }, 3000)
      })
    }
    ////////////////////////////////
    /* Case B. If heart is full. 
       Change heart back to empty.
       Remove red color from heart.*/
    ////////////////////////////////
    if (like.innerText === '♥') {
      console.log("return to empty heart")
      like.innerText = EMPTY_HEART
      like.classList.remove("activated-heart")
    }

  })
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
