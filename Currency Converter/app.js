const currenciesApi =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll("select");
const btn = document.querySelector(".btn");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const finalOutput = document.querySelector(".finaloutput");

// dropdown options
for (let select of dropdown) {
  for (let currencyCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currencyCode;
    option.value = currencyCode;

    if (select.name === "from" && currencyCode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currencyCode === "PKR") {
      option.selected = true;
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// flag update
const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const setDefaultValues = async () => {
  let amount = document.querySelector("input");
  let amountValue = amount.value;

  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }

  let url = `${currenciesApi}/${fromCurrency.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();

  let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
  let finalAmount = (amountValue * rate).toFixed(3);

  finalOutput.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  setDefaultValues();
});

window.addEventListener("load", () => {
  setDefaultValues();
});

const swapIcon = document.querySelector(".swap-icon");

swapIcon.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  updateFlag(fromCurrency);
  updateFlag(toCurrency);
  setDefaultValues();
});
