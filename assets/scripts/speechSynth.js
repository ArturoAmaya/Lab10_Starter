// speechSynth.js

const synth = window.speechSynthesis;
let voices;
let toggleBool = false;

window.addEventListener('DOMContentLoaded', init);

function init() {
  setTimeout(() => populateVoices(), 50);
  bindListeners();
}

function populateVoices() {
  const voiceSelect = document.querySelector('#voice-select');
  voices = synth.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.innerHTML = `${voice.name} (${voice.lang})`;
    option.setAttribute('value', `${voice.name} (${voice.lang})`);
    option.setAttribute('data-index', voiceSelect.children.length - 1)
    voiceSelect.appendChild(option);
  });
}

function bindListeners() {
  const talkBtn = document.querySelector('#explore > button');
  const textarea = document.querySelector('#explore > textarea');

  talkBtn.addEventListener('click', () => {
    let textToSpeak = textarea.value;
    let utterThis = new SpeechSynthesisUtterance(textToSpeak);
    utterThis.voice = voices[getOptionIndex()];
    synth.speak(utterThis);
    let boolboy = document.getElementById("toggle");
    toggleBool = (boolboy.innerHTML === "true");
    console.warn(toggleBool);
    utterThis.addEventListener('start', flapMouth(toggleBool, true));
    utterThis.addEventListener('end', ()=> {document.querySelector('#explore > img').setAttribute('src', './assets/images/smiling.png');});
  })
}

function getOptionIndex() {
  const voiceSelect = document.querySelector('#voice-select');
  const option = voiceSelect.options[voiceSelect.selectedIndex];
  return option.getAttribute('data-index');
}

function flapMouth(toggleBool, open) {
  console.log("synth speaking?: " + synth.speaking);
  console.log("toggleBool: " + toggleBool);
  console.log("open: " + open);
  let face = document.querySelector('#explore > img');
  if(toggleBool) {
    if (open) {
      console.log("open");
      face.setAttribute('src', './assets/images/smiling-open.png');
      setTimeout(() => {
        if (synth.speaking) {
          flapMouth(toggleBool, !open);
        }
      }, 500);
    } else {
      console.log("closed");
      face.setAttribute('src', './assets/images/smiling.png');
      setTimeout(() => {
        if (synth.speaking) {
          flapMouth(toggleBool, !open);
        }
      }, 500);
    }
    
  } else {
    face.setAttribute('src', 'assets/images/smiling-open.png');
    setTimeout(() => {
      if (synth.speaking) {
        flapMouth(toggleBool, !open);
      } else {
        face.setAttribute('src', 'assets/images/smiling.png');
      }
    }, 500);
  }
  
  /*
  let speaker = new SpeechSynthesisUtterance(text.value);
  speaker.addEventListener ('start', function(){
  face.src="./assets/images/smiling-open.png";
  });
  speaker.addEventListener ('end', function(){
  face.src="./assets/images/smiling.png";
  });*/
}
