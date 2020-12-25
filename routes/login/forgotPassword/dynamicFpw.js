 

const forgotForm = document.querySelector('#forgotF');
const forgoth3 = document.querySelector('#forgoth3');
const home = document.querySelector('#home');
let reqStatus, siteRedirect;


//LOGIN SITE
forgotForm.addEventListener('submit', (e) => {
   e.preventDefault();
      const email = document.querySelector("#email").value;
      if(!email){
         setValidation("Please add an email", " alert alert-danger");

               setTimeout(() =>{ 
                  removeValidation();
               }, 3000);
               return;
      }
       siteRedirect = email.split("@")[1];
      const data = {email};
      const options = {
         method: 'POST',
         headers:{
            'Content-Type': 'application/json'
         },
         body:JSON.stringify(data)
      }
      
      let log = fetch(`https://ca-42yan.ondigitalocean.app/api/v1/auth/forgotpassword`, options)
      .then(result =>{
            reqStatus = result.status;
            return result.json(); 
      });

     log.then(data =>{
        if(reqStatus == 200){

               setValidation("We have sent you a message to your email! You can close this window", " alert alert-success");
               /* 
               setTimeout(() =>{ 
                  window.location.replace(`https://${siteRedirect}`);
             
       */
               setTimeout(() =>{ 
                  home.style.display ="block";         
               }, 3000);

               }else if(reqStatus == 404){

                  setValidation(data.error, " alert alert-danger");

                  setTimeout(() =>{ 
                     removeValidation();
                  }, 3000);

            }else if(reqStatus == 500){

               setValidation("Something went wrong", " alert alert-danger");

               setTimeout(() =>{ 
                  removeValidation();
               }, 3000);

            }
      
         
      });

});

function setValidation(message, classes){

   forgotForm.style.display = "none";
   forgoth3.className += classes;
   forgoth3.innerHTML = message;
   forgoth3.style.display = "block";

}

function removeValidation(){
   
   forgoth3.style.display = "none";
   forgoth3.classList.remove("alert", "alert-danger");
   forgotForm.style.display = "block";

}

//LOGOUT SITE
 
/*
document.addEventListener("DOMContentLoaded", () =>{
   fetch(`https://ca-42yan.ondigitalocean.app/api/v1/auth/logout`);
});
*/

