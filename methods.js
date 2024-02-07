var validateDate = require("validate-date");
const date_calculate=require("./date_and_price")
let subscriptionDate ;
let SubscriptionPrice=0;
let topup_history=[];
let summary =[];
const PRICE_CALCULATOR =(Price)=>{
    SubscriptionPrice+=Price;
}
// Method to add Subscription 
const ADD_SUBSCRIPTION = (Category,Plan)=>{
    if(subscriptionDate){
        //call Method to calculate Renewal date for each Subscription Type    
       var date = date_calculate["CALCULATE_RENEWAL_DATE"](Plan,subscriptionDate);
       const subArr = summary.filter(str => str.includes(`RENEWAL_REMINDER ${Category}`));
      if(subArr.length){
        summary.unshift("ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY")
      }else{
       summary.push(`RENEWAL_REMINDER ${Category} ${date}`)
       PRICE_CALCULATOR(date_calculate["pricing"][Category][Plan])
      }
    }else{
       summary.push("ADD_SUBSCRIPTION_FAILED INVALID_DATE")
       
    }
}
// Method for Adding TopUp
const ADD_TOPUP = (topup , times)=>{
    if(SubscriptionPrice){
    let index= topup_history.filter(str => str.includes(topup))
    if(index.length){
        summary.splice(1, 0, "ADD_TOPUP_FAILED DUPLICATE_TOPUP");
    }else{
        topup_history.push(topup)
        PRICE_CALCULATOR(date_calculate["TOP_UP"][topup] * times)
    }
}else{
    summary.push("ADD_TOPUP_FAILED INVALID_DATE")
}
}
// Method to Print Renewal Detail
const PRINT_RENEWAL_DETAILS = ()=>{
    SubscriptionPrice?summary.push(`RENEWAL_AMOUNT ${SubscriptionPrice}`) : summary.push("SUBSCRIPTIONS_NOT_FOUND") ;
    for(result in summary) 
        console.log(summary[result])  
}
// Method for Starting Subscription , accepts the start date
const START_SUBSCRIPTION = (date)=>{
    // validate if the date if a valid date
    if(validateDate(date.replaceAll("-","/"), responseType="boolean",dateFormat="dd/mm/yyyy")){
        date = date.trim().split("-")
        subscriptionDate =date[1]+"-"+date[0]+"-"+date[2]
    }else{
    summary.push("INVALID_DATE")    
    }

}
// Export the methods to be accessed 
module.exports={
//  name_exported : internal_name
ADD_SUBSCRIPTION ,
ADD_TOPUP,
PRINT_RENEWAL_DETAILS,
START_SUBSCRIPTION,
}
