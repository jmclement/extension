let bToken = "";
let elgRisk = "";
let elgAmount = 0;

const init = function(){
  
  cards = document.getElementsByClassName("card-image");

  for(i=0;i<cards.length;i++){
    const iEl = document.createElement('img');
    let price = 0;
    iEl.src = 'https://www.mcb.mu/resource/mcb/images/logo.png';
    iEl.width = 50;
    iEl.height = 50;
    cards[i].insertAdjacentElement('beforebegin', iEl);
    parentEl = cards[i].parentNode;
    parentEl = parentEl.parentNode;
    priceEl = parentEl.querySelector('.price');

    if(priceEl != null) {
      if(priceEl.firstChild.type != undefined) {
        priceAEl = priceEl.getElementsByTagName('a');
        price = priceAEl[0].innerText;
      } else {
        price = priceEl.innerText;
      }
    }

    if (price != 0) {
      price = price.replaceAll('Rs ','').replaceAll(',','');
    }
    
    iPriceEl = document.createElement('div');

    if (price <= elgAmount) {
      iPriceEl.innerText = "Eligible";
    }
    else {
      iPriceEl.innerText = "Not Eligible";
    }


    cards[i].insertAdjacentElement('beforebegin',iPriceEl);

  }

  apiAuth();

}

const apiAuth = async function(){
  url = "https://mcbinovappapi.azurewebsites.net/auth";
  let reqBody = {
    "username": "HW654321",
    "password": "test"
  }
  response = await fetch(url, {method: 'POST', body: JSON.stringify(reqBody)});
  bToken = await response.json()
  console.log(bToken["token"]);
  apiEligibilityCheck();
}

const apiEligibilityCheck = async function(){
  let headers = {
    "Authorization": "Bearer " + bToken["token"],
    "Content-Type": "application/json"
  }

  let reqBody = {
    "CustomerAge": 32,
    "LoanCategory": "Housing_first_property",
    "Salary": 10000
  }

  const url = "https://mcbinovappapi.azurewebsites.net/loans/eligibilityCheck";
  response = await fetch(url,{method: 'POST', headers: headers, body: JSON.stringify(reqBody)});
  elgData = await response.json();
  elgRisk = elgData['Risk'];
  elgAmount = elgData['LoanEligibleAmount'];
}

init();

/*
hack124565
anything8598
*/
