 

const newPwForm = document.querySelector('#newPwF');
const newPwh3 = document.querySelector('#newPwh3');
let reqStatus;


token = window.location.href;
token = token.split("?")[1];

//LOGIN SITE
newPwForm.addEventListener('submit', (e) => {
   e.preventDefault();
      const password = document.querySelector("#psw").value;
      const data = {password};
      const options = {
         method: 'PUT',
         headers:{
            'Content-Type': 'application/json'
         },
         body:JSON.stringify(data)
      }
      
      let log = fetch(`https://ca-42yan.ondigitalocean.app/api/v1/auth/resetpassword/${token}`, options)
      .then(result =>{
            reqStatus = result.status;
            return result.json(); 
      });

     log.then(data =>{
        if(reqStatus == 200){

               setValidation("Your password has been changed, login!", " alert alert-success");
               
               setTimeout(() =>{ 
                  window.location.replace(`../../../../index.html`);
               }, 3000);
   
         } else if(reqStatus == 400){

               setValidation(data.error, " alert alert-danger");

               setTimeout(() =>{ 
                  window.location.reload();
               }, 3000);

         }else if(reqStatus == 500){

               setValidation(data.error, " alert alert-danger");

               setTimeout(() =>{ 
                  removeValidation();
               }, 3000);

         }
      
         
      });

});

function setValidation(message, classes){

   newPwForm.style.display = "none";
   newPwh3.className += classes;
   newPwh3.innerHTML = message;
   newPwh3.style.display = "block";

}

function removeValidation(){
   
   newPwh3.style.display = "none";
   newPwh3.classList.remove("alert", "alert-danger");
   newPwForm.style.display = "block";

}

//LOGOUT SITE
 

document.addEventListener("DOMContentLoaded", () =>{
   fetch(`https://ca-42yan.ondigitalocean.app/api/v1/auth/logout`);
});


