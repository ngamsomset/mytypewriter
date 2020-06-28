const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
  // Current Index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of current  word
  const fullTxt = this.words[current];

  // check if deleting
  if (this.isDeleting) {
    // Remove charactor
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add charactor
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type Speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If words is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make a pause at end
    typeSpeed = this.wait;
    // set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typeing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed)
}
// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);
// Init APP
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
