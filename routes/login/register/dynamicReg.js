 

const registerForm = document.querySelector('#registerF');
const registerh3 = document.querySelector('#regh3');
let reqStatus;


//LOGIN SITE
registerForm.addEventListener('submit', (e) => {
   e.preventDefault();
      const name = document.querySelector("#alias").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#psw").value;
     //VALIDATIONS
         if(!name){
            missingFields("name");  
            return;
               
         } 
         if(!email){
            missingFields("email");  
            return;
         } 
         if(!password){
            missingFields("password");  
            return;
         } 
         if(password.length < 6){

            setValidation("Password must be at least 6 characters", " alert alert-danger");

                  setTimeout(() =>{ 
                     removeValidation();
                  }, 2000);
            return;
               
         }

     //VALIDATIONS

      const data = {name, email, password};
      const options = {
         method: 'POST',
         headers:{
            'Content-Type': 'application/json'
         },
         body:JSON.stringify(data)
      }
      
      let log = fetch(`https://ca-42yan.ondigitalocean.app/api/v1/auth/register`, options)
      .then(result =>{
            reqStatus = result.status;
            return result.json(); 
      });

     log.then(data =>{
        
        if(reqStatus == 200){

               setValidation("Registered successfully, verify your email to login!", " alert alert-success");

               setTimeout(() =>{ 
                  window.location.replace("../../../index.html");
               }, 3000);
       
         }else if(reqStatus){
            
            setValidation(data.error, " alert alert-danger");

            setTimeout(() =>{ 
               removeValidation();
            }, 3000);
         
         }
      
         
      });

});

function setValidation(message, classes){

   registerForm.style.display = "none";
   registerh3.className += classes;
   registerh3.innerHTML = message;
   registerh3.style.display = "block";

}

function removeValidation(){
   
   registerh3.style.display = "none";
   registerh3.classList.remove("alert", "alert-danger");
   registerForm.style.display = "block";

}

//LOGOUT SITE
 
/*
document.addEventListener("DOMContentLoaded", () =>{
   fetch(`https://ca-42yan.ondigitalocean.app/api/v1/auth/logout`);
});
* */

function missingFields(field){
   let a = "a";
   if(field == "email")
         a = "an";
   setValidation(`Please add ${a} ${field}`, " alert alert-danger");

   setTimeout(() =>{ 
      removeValidation();
   }, 2000);
}