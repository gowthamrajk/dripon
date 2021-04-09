function getid(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id')
}
function getNumber(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('bno')
}

const id=getid()
const bedNumber=getNumber()

const bed=document.getElementById("bed")
bed.innerHTML='Room Number<br><b style="color:#279486">'+bedNumber+'</b>'


const api_url='https://api.thingspeak.com/channels/'+id+'/feeds/last'
var drip_rate=null;
var total_bottle_lvl=null
var current_lvl=null
var threshold_lvl=null
const check=()=>{
    var count=0;
    document.getElementById("parameter1").textContent=drip_rate
    document.getElementById("parameter2").textContent=total_bottle_lvl
    document.getElementById("parameter3").textContent=current_lvl
    document.getElementById("parameter4").textContent=threshold_lvl
    const notification = document.getElementById('badge');
    const threshold = document.getElementById('threshold');
    if(current_lvl < threshold_lvl)
    {
        count++;
        threshold.innerText = "Bottle Level crossed below threshold limit, Please turn off";
        threshold.style.background = "red";
    }
    else if(current_lvl == threshold_lvl)
    {
        count++;
        threshold.innerText = "Bottle Level Reached threshold limit, Please be careful";
        threshold.style.background = "orange";
    }
    else
    {
        count++;
        threshold.innerText = "Drip Flow is constant !!!";
        threshold.style.background = "green";
    }
    console.log(count);
    notification.innerText = count;
}
async function getValue(){
    const response=await fetch(api_url);
    const data=await response.json();
    drip_rate=data.field1;
    total_bottle_lvl=data.field2;
    current_lvl=data.field3;
    threshold_lvl=data.field4;
    if(typeof data.field1 === "undefined"){
        drip_rate="No-data"
    }
    if(typeof data.field2 === "undefined"){
        total_bottle_lvl="No-data"
    }
    if(typeof data.field3 === "undefined"){
        current_lvl="No-data"
    }
    if(typeof data.field4 === "undefined"){
        threshold_lvl="No-data"
    }
    check()
    console.log('s')
}
getValue()
setInterval(getValue,20000);
