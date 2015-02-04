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