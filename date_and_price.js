let reminderDate=9;
const pricing={
    MUSIC:{FREE:0 ,PERSONAL:100 , PREMIUM:250},
    VIDEO:{FREE:0 ,PERSONAL:200 , PREMIUM:500},
    PODCAST:{FREE:0 ,PERSONAL:100 , PREMIUM:300},
}
const TOP_UP ={
    TEN_DEVICE : 100,
    FOUR_DEVICE : 50
} 

const CALCULATE_RENEWAL_DATE=(Plan,subscriptionDate)=>{
    const datelength={FREE:1, PERSONAL:1,PREMIUM:3}
    var expiryDate=new Date(subscriptionDate);
    expiryDate.setMonth(expiryDate.getMonth() +datelength[Plan]);
    expiryDate.setDate(expiryDate.getDate() -reminderDate);
    let  Month=expiryDate.getMonth()+1
    Month<10?Month="0"+Month:{};
    let date = expiryDate.getDate()-1+"-"+Month+"-"+expiryDate.getFullYear()
    return date
}

module.exports={
    CALCULATE_RENEWAL_DATE,
    pricing,
    TOP_UP
}