let bToken = "";

const init = function(){
  
  cards = document.getElementsByClassName("card-image");

  for(i=0;i<cards.length;i++){
    const iEl = document.createElement('img');
    iEl.src = 'https://www.mcb.mu/resource/mcb/images/logo.png';
    iEl.width = 50;
    iEl.height = 50;
    cards[i].insertAdjacentElement('beforebegin', iEl);
  }

  apiAuth();

}

const apiAuth = async function(){
  url = "https://mcbinovappapi.azurewebsites.net/auth";
  let reqBody = {
    "username": "hack124565",
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
  console.log(headers);
  console.log(reqBody);
  response = await fetch(url,{method: 'POST', headers: headers, body: JSON.stringify(reqBody)});
  console.log(await response.json())
}

init();

/*
hack124565
anything8598
*/
