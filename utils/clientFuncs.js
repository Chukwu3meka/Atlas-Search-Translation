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
