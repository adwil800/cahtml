

const message = document.querySelector("#message");



token = window.location.href;
token = token.split("?")[1];

function verify(){
 let log = fetch(`https://ca-42yan.ondigitalocean.app/api/v1/auth/confirmation/${token}`)
 .then(result =>{
       reqStatus = result.status;
       return result.json(); 
 });

log.then(data =>{
   if(reqStatus == 200){
   message.innerHTML = "Your email has been verified!";
   setTimeout( () => {
      window.location.replace("../../../../index.html");
   }, 3000);
    }else if(reqStatus == 400){
       
       message.innerHTML = data.error;
      setTimeout( () => {
         window.location.replace("../../../../index.html");
      }, 3000);
    }else{
       message.className += " alert alert-danger";
       message.innerHTML = "Something went wrong";
    }



});


}



document.addEventListener("DOMContentLoaded", verify());