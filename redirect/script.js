var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var actions = [ 'go to about page' ,'about page'];
var grammar = '#JSGF V1.0; grammar actions; public <redirect> = ' + actions.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
// var bg = document.querySelector('html');
var hints = document.querySelector('.hints');
actions.forEach(function(v, i, a){
  console.log(v, i);
 
});
hints.innerHTML = 'Tap/click then say to redirect to aboutus page. Try <br><b>go to about page<b><br></b><b>about page</b>';

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var action = event.results[0][0].transcript;
  // diagnostic.textContent = 'Result received: ' + action + '.';
  if(action.localeCompare("go to about page")==0 || action.localeCompare("about page")==0)
  {
    about_redirect();
  } 
  else
  {
    diagnostic.textContent = 'Result received: ' + action + '.';
  }
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
function about_redirect()
{
	window.location.href="about.php";
}