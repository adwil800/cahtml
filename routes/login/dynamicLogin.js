 

const loginForm = document.querySelector('#loginF');
const loginh3 = document.querySelector('#loginh3');
const logger = document.querySelector('#logger');
let reqStatus;
logger.addEventListener("click", (e) =>{

      logger.style.backgroundColor = "black";
      logger.style.color = "white";

      setTimeout(() =>{ 
         logger.removeAttribute("style");
      }, 2000);
      
})

//LOGIN SITE
loginForm.addEventListener('submit', (e) => {
   
   e.preventDefault();
      const email = document.querySelector("#email").value;
      const psw = document.querySelector("#psw").value;
      const data = {email, password: psw};
      const options = {
         method: 'POST',
         headers:{
            'Content-Type': 'application/json'
         },
         body:JSON.stringify(data)
      }
      
      let log = fetch(`https://ca-42yan.ondigitalocean.app/api/v1/auth/login`, options)
      .then(result =>{
            reqStatus = result.status;
            return result.json(); 
      })
      .catch(err => {
         setValidation("Something went wrong", " alert alert-danger");
         setTimeout(() =>{ 
            removeValidation();
         }, 3000);
      });

     log.then(data =>{
        if(reqStatus == 200){

               setValidation("You're now logged in!", " alert alert-success");

               setTimeout(() =>{ 
                  window.location.replace("./home.html");
               }, 3000);
       
         } else if(reqStatus == 401){

               setValidation(data.error, " alert alert-danger");

               setTimeout(() =>{ 
                  window.location.reload();
               }, 3000);

         }else if(reqStatus == 400){

               setValidation(data.error, " alert alert-danger");

               setTimeout(() =>{ 
                  removeValidation();
               }, 3000);

         }
      
         
      });

});

function setValidation(message, classes){

   loginForm.style.display = "none";
   loginh3.className += classes;
   loginh3.innerHTML = message;
   loginh3.style.display = "block";

}

function removeValidation(){
   
   loginh3.style.display = "none";
   loginh3.classList.remove("alert", "alert-danger");
   loginForm.style.display = "block";

}

//LOGOUT SITE
 
/*
document.addEventListener("DOMContentLoaded", () =>{
   fetch(`https://ca-42yan.ondigitalocean.app/api/v1/auth/logout`);
});
 */

