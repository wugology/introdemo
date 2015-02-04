// GLOBAL VARIABLES
var nodes = {
  downloadButton: document.querySelector('#downloadButton'),
  inputArea: document.querySelector('#inputArea'),
  inputAreaWordsWrapper: document.querySelector('#inputArea .words'),
  jsonArea: document.querySelector('#jsonArea'),
  transcriptionBox: document.querySelector('#transcriptionBox'),
  translationBox: document.querySelector('#translationBox'),
  wordTemplate: document.querySelector('#wordTemplate')
};

// The phrase object (NOT created from the Phrase() constructor, for pedagogical purposes)
var phrase = {
  transcription: '',
  translation: '',
  words: []
};

// CONSTRUCTORS
// This Word() constructor is different from our official schema, for pedagogical purposes
function Word(token, gloss, partOfSpeech) {
  this.token = token;
  this.gloss = gloss;
  this.partOfSpeech = partOfSpeech;
};

// GLOBAL FUNCTIONS
// Empties the content of a contenteditable element when the user clicks on it
function clearContentEditable(ev) {
  if (ev.target.className === 'wordGloss') {
    ev.target.innerHTML = '';
  }
};

// Displays the dictionary visualization, using data from the phrase object
function displayDictionary() {
  
};

// Displays the interlinear gloss visualization, using data from the phrase object
function displayInterlinear() {
  
};

// Displays the JSON visualization, using data from the phrase object
function displayJSON() {  
  nodes.jsonArea.innerHTML = JSON.stringify(phrase, null, 2);
};

// Displays the words within the inputArea, so that users can add glosses to the words
  // This is not an instance of the sitewide displayPhrase() function, for pedagogical purposes
function displayPhrase() {
  var wordObject = wordTemplate.content.querySelector('.word');
  var wordToken = wordTemplate.content.querySelector('.wordToken');
  nodes.inputAreaWordsWrapper.innerHTML = '';
  phrase.words.forEach(function(word, i) {
    wordObject.id = 'word_' + i;
    wordToken.innerHTML = word.token;
    var newWord = wordTemplate.content.cloneNode(true);
    nodes.inputAreaWordsWrapper.appendChild(newWord);
  });
};

// Creates a download button where users can download their JSON data
function setDownloadButton(){
  // Get the JSON data
  var text = nodes.jsonArea.innerHTML;
  // Set the download link to download the JSON data on click
  nodes.downloadButton.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(text);
};

// Updates the phrase object, and (re-)renders the JSON, interlinear, and lexicon visualizations
function render(ev) {
  updatePhrase(ev);
  if (ev.target.className !== 'wordGloss') {
    displayPhrase();
  }
  displayJSON();
  displayInterlinear();
  displayDictionary();
  setDownloadButton();
};

// Whenever the user types/changes the data, the phrase object is updated with that data
function updatePhrase(ev) {
  if (ev.target.className === 'wordGloss') {
    var wordIndex = ev.target.parentNode.id.replace('word_', '');
    phrase.words[wordIndex].gloss = ev.target.innerHTML;
  };
  if (ev.target.id === 'transcriptionBox') {
    // Gets the data that users have typed into the Transcription box
    var transcription = nodes.transcriptionBox.value;
    
    // Defines the delimiters that will be used to tokenize the string
      // Includes basic punctuation, brackets, inverted !/?, various quotes from around the world
    var delimiters = [' ', '.', ',', '!', '?', ':', ';', '/', '\\', '[', '\\]', '{', '}', '<', '>', '-', '\u3000', '\u00A1', '\u00BF', '\u0022', '\u0027', '\u00AB', '\u00BB', '\u2018', '\u2019', '\u201A', '\u201B', '\u201C', '\u201D', '\u201E', '\u201F', '\u2039', '\u203A', '\u300C', '\u300D', '\u300E', '\u300F', '\u301D', '\u301E', '\u301F', '\uFE41', '\uFE42', '\uFE43', '\uFE44', '\uFF02', '\uFF07', '\uFF62', '\uFF63'];

    // Tokenizes the transcription based on the delimiters
    var tokens = tokenize(transcription, delimiters);

    // For each token, creates a new word, then adds that word to the phrase object
    var words = [];
    tokens.forEach(function(token) {
      var word = new Word(token, '', '');
      words.push(word);
    });
    phrase.words = words;    
  }
  var translation = nodes.translationBox.value;
    
  // Sets the transcription and translation properties of the phrase object equal to the data typed in the transcription and translation boxes
  phrase.transcription = transcription;
  phrase.translation = translation;
};

// EVENT LISTENERS
nodes.inputArea.addEventListener('click', clearContentEditable);
nodes.inputArea.addEventListener('input', render);
window.addEventListener('load', render);