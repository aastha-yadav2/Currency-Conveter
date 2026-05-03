const countryList = {
  USD: "US",
  INR: "IN",
  EUR: "EU",
  GBP: "GB",
  AUD: "AU",
  CAD: "CA",
  JPY: "JP",
  CNY: "CN"
};





const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currCode;
    option.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Fetch exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${from}.json`;

  try {
    let response = await fetch(URL);

    if (!response.ok) {
      throw new Error("API Error");
    }

    let data = await response.json();

    let rate = data[from][to];

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(
      2
    )} ${toCurr.value}`;
  } catch (error) {
    console.error(error);
    msg.innerText = "❌ Error fetching exchange rate";
  }
};

// Flag update
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Button click
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// Load event
window.addEventListener("load", () => {
  updateExchangeRate();
});
