let irate = 18.99;
let debt = 16000;
console.log('amount', irate*debt);


let totalDebt = debt;
let update_debt = debt;
for(let x=0; x < 12;x++) {
    let monthly_interest = update_debt * ( irate/12 )/100;
    update_debt = debt - monthly_interest;
    totalDebt += monthly_interest ;
//console.log(x);
}
console.log('total ' , totalDebt );