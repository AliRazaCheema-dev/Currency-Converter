
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else {
      if (select.name === "to" && currCode === "PKR") {
        newOption.selected = "selected";
      }
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}
function getExchangeRate(baseCurrency, targetCurrency) {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // console.log('Data:', data);
      const exchangeRate = data[baseCurrency][targetCurrency];
      let amount = document.querySelector(".amount input");
      let amtVal = amount.value;
      if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
  }
      let finalValue = exchangeRate * amtVal;
      msg.innerText=` ${amtVal} ${fromCurr.value} = ${toCurr.value}  ${finalValue.toFixed(2)}`;
    //   if (exchangeRate) {
    //     console.log(`Exchange rate from ${baseCurrency.toUpperCase()} to ${targetCurrency.toUpperCase()} is ${exchangeRate}`);
    //   } else {
    //     console.log(`Exchange rate for ${targetCurrency.toUpperCase()} not found in the response`);
    //   }
    // })
    // .catch(error => {
    //   console.error('There has been a problem with your fetch operation:', error);
    });
}
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  getExchangeRate(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
  
});
window.addEventListener("load", ()=>{
  getExchangeRate(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
})