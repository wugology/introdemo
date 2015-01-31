var gloss = document.getElementById('gloss');
var input = document.getElementById('input');
var json = document.getElementById('json');
var token = document.getElementById('token');

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
	
};

input.addEventListener('input', displayJSON);