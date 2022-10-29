let contry_code = {
  "USD" : "USD",
  "THB" : "THB",
  "MYR" : "MYR",
  "EUR" : "EUR",
  "AUD" : "AUD"
}
let contry_flags = {
  "USD" : "USA",
  "THB" : "THA",
  "MYR" : "MYS",
  "EUR" : "GBR",
  "AUD" : "AUS"

}

let droplist = document.querySelectorAll(".drop-list select")
let fromCurrency = document.querySelector(".form select")
let toCurrency = document.querySelector(".to select")
let inputexchange = document.getElementById("currency")
let resultexchange = document.getElementById("exchangeresult")
let apiKey = 'f057c7c929bf01e36fb16616'

for(let i=0;i<droplist.length;i++){
  for(currency_code in contry_code){
    let selected;
    if(i == 0){
      selected = currency_code == "THB" ? "selected" : ""
    }else if(i == 1){
      selected = currency_code == "USD" ? "selected" : ""
    }
    let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`
    //insert options tag inside select(tag)
    droplist[i].insertAdjacentHTML("beforeend",optionTag)
  }
    droplist[i].addEventListener("change" , e =>{
      loadFlag(e.target)
    })
}

 function getExchangeRate(){
  let input =  document.getElementById("currency")
  let inputVal = input.value
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
  fetch(url).then(response => response.json()).then(result =>{
    let exchangerate = result.conversion_rates[toCurrency.value]
    let totalExchange =  (inputVal * exchangerate).toLocaleString('en')
    let resultexchange = document.getElementById("exchangeresult")
    resultexchange.innerText = `${inputVal} ${fromCurrency.value} =  ${totalExchange} ${toCurrency.value}`
  })
}

inputexchange.addEventListener("input", () =>{
   getExchangeRate()
})

function loadFlag(element){
  for(code in contry_flags){
    if(code == element.value){
      let imgTag = element.parentElement.querySelector("img")
      imgTag.src = `https://countryflagsapi.com/svg/${contry_flags[code]}`
    }
  }
}