let customerId = "HW654321";
let bToken = "";
let elgRisk = "";
let elgAmount = 0;
let customerDOB = "";
let customerSalary = 0;
let properyTitle = "";


const init = async function(){
  
  await apiAuth();

  console.log('Start DOM manip');

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

      iPriceEl.innerHTML = `<form action="http://localhost" method="post">
        <input type="hidden" name="propertyamt" value="${price}"</input>
        <input type="hidden" name="custcir" value="${customerId}"</input>
        <button type="submit" name="submit" value="submit" class="btn-link">Eligible</button>
    </form>`

    }
    else {
      iPriceEl.innerText = "Not Eligible";
    }


    cards[i].insertAdjacentElement('beforebegin',iPriceEl);

    parentEl.querySelector(".title-holder")

  }


}

const apiAuth = async function(){
  url = "https://mcbinovappapi.azurewebsites.net/auth";
  let reqBody = {
    "username": `${customerId}`,
    "password": "test"
  }
  response = await fetch(url, {method: 'POST', body: JSON.stringify(reqBody)});
  bToken = await response.json()
  console.log(bToken["token"]);
  await apiEligibilityCheck();
}

const apiEligibilityCheck = async function(){

  console.log('Elig start');

  let headers = {
    "Authorization": "Bearer " + bToken["token"],
    "Content-Type": "application/json"
  }

  const urlCustomerDetails = `https://mcbinovappapi.azurewebsites.net/customers/${customerId}`;

  response = await fetch(urlCustomerDetails,{method: 'GET', headers: headers});

  customerData = await response.json();

  customerSalary = customerData["Customer"]['Salary'];
  
  customerDOB = customerData["Customer"]['DateOfBirth'];


  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;
  
  let customerAge = Date.parse(currentDate) - Date.parse(customerDOB);

  customerAge = year - customerDOB.substring(0,4)


  let reqBody = {
    "CustomerAge": customerAge,
    "LoanCategory": "Housing_first_property",
    "Salary": parseInt(customerSalary)
  }

  const url = "https://mcbinovappapi.azurewebsites.net/loans/eligibilityCheck";
  response = await fetch(url,{method: 'POST', headers: headers, body: JSON.stringify(reqBody)});
  elgData = await response.json();
  elgRisk = elgData['Risk'];
  elgAmount = elgData['LoanEligibleAmount'];

  console.log('Elig end');
}

init();

/*
hack124565
anything8598
*/
