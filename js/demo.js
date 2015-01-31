var phraseBox = document.getElementById('phraseBox');
var inputArea = document.getElementById('input');
var jsonArea = document.getElementById('json');
var translationBox = document.getElementById('translationBox');

var phrase = {
	transcription: '',
	translation: '',
	words: []
};

function Word(token, gloss, partOfSpeech) {
	this.token = token;
	this.gloss = gloss;
	this.partOfSpeech = partOfSpeech;
};

function displayJSON() {
	var text = transcription.value;
	var tokens = text.split(/[ .,!?]/g);
	
	var words = []
	tokens.forEach(function(token) {
		if (token !== '') {
			var word = new Word(token, '', '');
			words.push(word);
		}
	});
	phrase.words = words;
	
	phrase.transcription = transcription.value;
	phrase.translation = translation.value;
	
	json.innerHTML = JSON.stringify(phrase, null, 2);
};

input.addEventListener('input', displayJSON);
window.addEventListener('load', displayJSON);