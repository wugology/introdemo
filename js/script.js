// Constructors for linguistic objects
function Phrase() {
  this.transcripts = [];
  this.phonemicTranscriptions = [];
  this.phoneticTranscriptions = [];
  this.translations = [];
  this.words = [];
  this.tags = [];
};

function Tag(category, value) {
  this.category = category;
  this.value = value;
};

function Transcript(orthographyIndex, transcriptText, transcriptType) {
  this.orthography = orthographyIndex;
  this.transcriptText = transcriptText;
  this.transcriptType = transcriptType;
};

function Transcription(orthographyIndex, transcriptionText) {
  this.orthography = orthographyIndex;
  this.transcriptionText = transcriptionText;
};

function Translation(orthographyIndex, translationText, translationType) {
  this.orthography = orthographyIndex;
  this.translationText = translationText;
  this.translationType = translationType;
};

function Word() {
  this.phonemicTranscriptions = [];
  this.phoneticTranscriptions = [];
  this.morphemes = [];
  this.glosses = [];
  this.tags = [];
};

// General sitewide functions
// Takes a string and tokenizes it based on a set of delimiters
  // For now this is just blanket tokenization - later we may divide this into tokenizeWords & tokenizeSentences, and maybe others
  // The filter(Boolean) will filter out the "" ending split since "" == False
function tokenize(string, delimiters) {
  var regExp = new RegExp('[(' + delimiters.join(')(') + ')]+', 'g');
  return string.split(regExp).filter(Boolean);
};


//Gets rid of non-word characters, makes everything lower case, and outputs phonemes (letters)
function phonemize(string) {
  var text2 = string.replace(/\W+/g,"");
  var text3 = text2.replace(/\d+/g, '');
  var text4 = text3.toLowerCase();
  var phonemes = text4.split('');
  return phonemes;
};


//Takes an array (of phonemes, words, POS, etc.) and outputs a frequency table (matrix of a and b). From http://stackoverflow.com/questions/5667888/counting-occurences-of-javascript-array-elements

function freqTable(array) {
        var item = [], frequency = [], previous;
        array.sort();
        for ( var i = 0; i < array.length; i++ ) {
            if ( array[i] !== previous ) {
                item.push(array[i]);
                frequency.push(1);
            } else {
                frequency[frequency.length-1]++;
            }
            previous = array[i];
        }
        data = {key: item, value: frequency};
        return data;
    }

