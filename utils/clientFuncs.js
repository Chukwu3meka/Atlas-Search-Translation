// sleep function
export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time * 60 * 60));

// make values in an array unique
export const uniqueArray = (arr) => arr.filter((value, index, self) => self.indexOf(value) === index);

// get random valuesbetween two numbers
export const range = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

// date diff
export const dateDiff = (date) => Math.round((new Date() - new Date(date)) / (1000 * 60 * 60 * 24)) - 1;

// ordinal suffix
export const ordinalSuffix = (n) => n + (n + 0 ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : "");

// add days to date
export const addDays = (date = new Date(), days = 7) => {
  date = new Date(date) || new Date();
  date.setDate(date.getDate() + days);
  return date.toDateString();
};

// api fetcher function
export const fetcher = async (endpoint, data) => {
  return fetch(`/api${endpoint}`, {
    method: "POST",
    // response must come back as json else you keep getting error
    headers: new Headers({ "Content-Type": "application/json", Accept: "application/json" }),
    body: JSON.stringify(data),
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .catch(() => null);
};

// text to speech
export const textToSpeechHandler = async ({ text, language, setLoading }) => {
  if (!window) return; //detect if window is defined

  setLoading(true);

  // Initialize new SpeechSynthesisUtterance object
  let speech = new SpeechSynthesisUtterance();

  // set speech language
  speech.lang = language === "Spanish" ? "es" : language === "French" ? "fr" : "en";
  // set text
  speech.text = text;

  // Start Speaking
  window.speechSynthesis.speak(speech);

  speech.onend = (event) => setLoading(false);
  speech.onerror = (event) => setLoading(false);

  // speechSynthesis.speak(speech);
};

//  stop text to speech
export const stopTextToSpeechHandler = async () => {
  if (!window) return;

  window.speechSynthesis.cancel();
};

//  speech to text
export const speechToTextHandler = async ({ setText, language }) => {
  // console.log("We are listening. Try speaking into the microphone.");
  // new speech recognition object
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // set recognition language
  recognition.lang = language === "Spanish" ? "es" : language === "French" ? "fr" : "en";

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    console.log("We are listening. Try speaking into the microphone.");
  };

  recognition.onspeechend = function () {
    // when user is done speaking
    recognition.stop();
  };

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;

    setText(transcript);
    // console.log({ transcript });
  };

  // start recognition
  recognition.start();
};
