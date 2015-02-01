var phraseBox = document.getElementById('phraseBox');
var inputArea = document.getElementById('input');
var jsonArea = document.getElementById('json');
var translationBox = document.getElementById('translationBox');
var downloadArea = document.getElementById('downloadArea');


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
	var tokens = text.split(/[\u3000 .,!?]/g);
	
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

function downloadJSON(){
	// Get the JSON data
	var text = document.getElementById('json').innerHTML;
	// Encode
	var data = "text/json;charset=utf-8," + encodeURIComponent(text);
	// Create a download link
	document.getElementById('downloadArea').innerHTML = '<a class="button blue" href="data:' + data + '" download="data.json">Download the Data!</a>'
}

input.addEventListener('input', downloadJSON);
window.addEventListener('load', downloadJSON);

input.addEventListener('input', displayJSON);
window.addEventListener('load', displayJSON);
