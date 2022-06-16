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

// set bearer header for axios
export const setFetcherToken = (token) => {
  const axios = require("axios");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // No 'Access-Control-Allow-Origin' header is present on the requested resource.
    delete axios.defaults.headers.common["Authorization"];
  }
};

// fetcher fetcher function
export const fetcher = async (endpoint, payload) => {
  const axios = require("axios");

  const serverDomain = process.env.NODE_ENV === "production" ? "https://atlassearchtranslation.herokuapp.com" : "http://127.0.0.1:5000";

  return await axios
    .post(`${serverDomain}/API${endpoint}`, payload)
    .then(function (res) {
      // console.log(res);
      // console.log(res.statusText);
      // console.log(res.data, res.statusText);
      // if (res.statusText !== "OK") throw "Response tampered";
      return res.data;
    })
    .catch(function (err) {
      throw err?.response?.data || err?.message || err;
    });

  // const fetcher = async ({ method = "post", path, payload }) => {
  // try {
  //   // const { data } =
  //   const response = await axios[method](`${serverDomain}${path}`, payload);

  //   console.log(response && response.data);
  // } catch (error) {
  //   console.log(error);
  // }

  // axios
  //   .post(`${serverDomain}clientFuncs/auth/verifyToken`, {
  //     firstName: "Fred",
  //     lastName: "Flintstone",
  //   })
  // await axios[method](`${serverDomain}clientFuncs${path}`, payload)

  // const authCall = async (method = "post", path, payload, dispatch) => {
  //   // const token = localStorage && localStorage.SoccerMASS;
  //   if (token) {
  //     const { data } = await axios[method](`${serverDomain}${path}`, payload);
  //     if (data === "suspicious token") {
  //       setToken(null);
  //       // catchErr(dispatch, "suspicious token", "SUSPICIOUS_TOKEN");
  //       // return dispatch({ type: "SET_MANAGER", payload: {} });
  //     } else {
  //       return data;
  //     }
  //   } else {
  //     setToken(null);
  //     catchErr(dispatch, "missing token", "MISSING_TOKEN");
  //     return dispatch({ type: "SET_MANAGER", payload: {} });
  //   }
  // };

  // const noAuthCall = async (method = "post", path, payload) => {
  //   const response = await axios[method](
  //     `${serverDomain}${path}`,
  //     payload
  //     // {
  //     //   headers: {
  //     //     "Content-Type": "application/json;charset=UTF-8",
  //     //     "Access-Control-Allow-Origin": "*",
  //     //   },
  //     // }
  //   );
  //   // .then((res) => {
  //   //   console.log("RESPONSE RECEIVED: ", res);
  //   // })
  //   // .catch((err) => {
  //   //   console.log("AXIOS ERROR: ", err);
  //   // });
  //   return response?.data;
  // };

  // export {
  //   setFetcherToken,
  //   fetcher as default,
  //   // authCall, noAuthCall, serverDomain
  // };

  // {
  //   // `data` is the response that was provided by the server
  //   data: {},

  //   // `status` is the HTTP status code from the server response
  //   status: 200,

  //   // `statusText` is the HTTP status message from the server response
  //   statusText: 'OK',

  //   // `headers` the headers that the server responded with
  //   // All header names are lower cased
  //   headers: {},

  //   // `config` is the config that was provided to `axios` for the request
  //   config: {},

  //   // `request` is the request that generated this response
  //   // It is the last ClientRequest instance in node.js (in redirects)
  //   // and an XMLHttpRequest instance the browser
  //   request: {}
  // }

  // const serverDomain = process.env.NODE_ENV === "production" ? "https://atlassearchtranslation.herokuapp.com" : "http://127.0.0.1:5000";
  // return fetch(`${serverDomain}clientFuncs${endpoint}`, {
  //   method: "POST",
  //   credentials: "include",
  //   mode: "cors",
  //   // response must come back as json else you keep getting error
  //   headers: new Headers({
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Credentials": true,
  //     "Access-Control-Allow-Origin": serverDomain,
  //   }),
  //   body: JSON.stringify(data),
  // })
  //   .then(async (response) => {
  //     // A fetch Response conveniently supplies an ok , which tells you whether the request succeeded. Something like this should do the trick:
  //     if (response.ok) return response.json();
  //     // Fetch promises only reject with a TypeError when a network error occurs. Since 4xx and 5xx responses aren't network errors, there's nothing to catch. You'll need to throw an error yourself to use Promise#catch.
  //     throw await response.json();
  //   })
  //   .catch((e) => {
  //     throw e;
  //   });
};

// verification code
export const verificationGenerator = (len = 256) => {
  let text = "";
  const allowed = "ABCDEFGHIkLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
  for (let i = 0; i < len; i++) text += allowed.charAt(Math.floor(Math.random() * allowed.length));

  return text.replace(/\s/g, "");
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
  // speech.volume = 1;

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

  // // This runs when the speech recognition service starts
  // recognition.onstart = function () {
  //   console.log("We are listening. Try speaking into the microphone.");
  // };

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
