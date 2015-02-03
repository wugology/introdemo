// GLOBAL VARIABLES
var nodes = {
	downloadArea: document.querySelector('#downloadArea'),
	inputArea: document.querySelector('#inputArea'),
	jsonArea: document.querySelector('#jsonArea'),
	transcriptionBox: document.querySelector('#transcriptionBox'),
	translationBox: document.querySelector('#translationBox')
};

var phrase = {
	transcription: '',
	translation: '',
	words: []
};

// CONSTRUCTORS
function Word(token, gloss, partOfSpeech) {
	this.token = token;
	this.gloss = gloss;
	this.partOfSpeech = partOfSpeech;
};

// GLOBAL FUNCTIONS
function displayDictionary() {
	
};

function displayInterlinear() {
	
};

function displayJSON() {	
	nodes.jsonArea.innerHTML = JSON.stringify(phrase, null, 2);
};

function downloadJSON(){
	// Get the JSON data
	var text = nodes.jsonArea.innerHTML;
	// Encode
	var data = "text/json;charset=utf-8," + encodeURIComponent(text);
	// Create a download link
	nodes.downloadArea.innerHTML = '<a class="button blue" href="data:' + data + '" download="data.json">Download your data!</a>'
}

// Updates the phrase object, and (re-)renders the JSON, interlinear, and lexicon visualizations
function render() {
	updatePhrase();
	displayJSON();
	displayInterlinear();
	displayDictionary();
};

function updatePhrase() {
	var transcription = nodes.transcriptionBox.value;
	var translation = nodes.translationBox.value;
    var tokens = transcription.split(/[ .,!?\:\;\/\\\[\]\{\}\<\>\-\u3000\u00A1\u00BF\u0022\u0027\u00AB\u00BB\u2018\u2019\u201A\u201B\u201C\u201D\u201E\u201F\u2039\u203A\u300C\u300D\u300E\u300F\u301D\u301E\u301F\uFE41\uFE42\uFE43\uFE44\uFF02\uFF07\uFF62\uFF63]+/g).filter(Boolean);
	// basics, brackets, inverted !/?, various quotes from around the world
    // the filter(Boolean) will filter out the "" ending split since "" == False
	var words = [];
	tokens.forEach(function(token) {
		var word = new Word(token, '', '');
		words.push(word);
	});
	phrase.words = words;
	
	phrase.transcription = transcription;
	phrase.translation = translation;
};

// EVENT LISTENERS
nodes.inputArea.addEventListener('input', downloadJSON);
window.addEventListener('load', downloadJSON);

nodes.inputArea.addEventListener('input', render);
window.addEventListener('load', render);
