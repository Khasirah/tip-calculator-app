const bill = document.getElementById("inp-bill");
const tipBtns = document.querySelectorAll(".tip");
const customTip = document.getElementById("inp-tip");
const people = document.getElementById("inp-people"); 
const errMsg = document.querySelector(".error-msg");
const results = document.querySelectorAll(".value");
const resetBtn = document.querySelector(".reset");

let billValue = 0.0;
let tip = 0;
let numOfPeople = 1;
let tipAmount = 0
let total = 0


// fungsi fungsi
// -------------- //

function validationFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx)
}

function calculatedTip(){
    if (numOfPeople >= 1){
        tipAmount = billValue * tip / numOfPeople;
        total = billValue * (tip + 1) / numOfPeople;
    }
    results[0].innerHTML = '$' + tipAmount.toFixed(2);
    results[1].innerHTML = '$' + total.toFixed(2); 
}

// evemt  listener
// -------------- //

tipBtns.forEach(btn => {
    btn.addEventListener('click', function(){
        tipBtns.forEach(btn => {
            btn.classList.remove('btn-active');
            customTip.value = null
        })
        btn.classList.add('btn-active');
        tip = parseFloat(btn.innerHTML)/100;
    })
})

bill.addEventListener('input', function(){
    if (bill.value.includes(',')) {
        bill.value = bill.value.replace(',','.');
    }

    if(!validationFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length-1);
    }

    billValue = parseFloat(bill.value);
})

customTip.addEventListener('input', function(){
    if (customTip.value.includes(',')) {
        customTip.value = customTip.value.replace(',','.');
    }

    if(!validationFloat(customTip.value)) {
        customTip.value = customTip.value.substring(0, customTip.value.length-1);
    }

    tip = parseFloat(customTip.value)/100;

    if(customTip.value != null) {
        tipBtns.forEach(btn => {
            btn.classList.remove('btn-active');
        })
    }
})

people.addEventListener('input', function(){
    if (people.value.includes(',')) {
        people.value = people.value.replace(',','.');
    }

    if(!validationFloat(people.value)) {
        people.value = people.value.substring(0, people.value.length-1);
    }

    if(people.value <= 0) {
        errMsg.classList.add("show-err");
        setTimeout(function(){
            errMsg.classList.remove("show-err");
        }, 3000)
    }

    numOfPeople = parseInt(people.value);
    
    calculatedTip()
})

resetBtn.addEventListener('click', function(){
    bill.value = null;
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });
    customTip.value = null;
    people.value = null;
    results[0].innerHTML = '$0.00'
    results[1].innerHTML = '$0.00'
})


