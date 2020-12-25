
const rating = document.querySelector("#rating");
const name = document.querySelector("#name");
const status_meth = document.querySelector("#statmeth");
const stats = document.querySelector("#stats");
const subjects = document.querySelector("#subj");
const img = document.querySelector("#imagen");

let id = window.location.href;
id = id.split("=");
document.addEventListener("DOMContentLoaded", loadTeacher());
   //FETCH TEACHER FROM DB
async function loadTeacher(){
   let response;
   try {
      response = await fetch(`https://ca-42yan.ondigitalocean.app/api/v1/teachers/${id[1]}`);
   } catch {
      name.className = "h3 alert alert-danger";
      name.innerHTML = 'SOMETHING WENT WRONG';
      return;
   }
         let teacher = await response.json();
         teacher = teacher.data;
         if(!teacher)
         window.location.assign("../404/404.html")
         //START
               img.style.display = "block";
               rating.innerHTML = `<h3 >Rating</h3> ${teacher.rating}`;  
               name.innerHTML = teacher.name;
               status_meth.innerHTML = `<h3>Status</h3>
                                       <p>${teacher.status}</p>
                                       <h3>Methodology</h3>
                                       <p>${teacher.methodology}</p>
                                       `;
               let sub = "<h3>Subjects</h3>";
               for (s in teacher.subjects){
               sub += `<a href="../subject/subject.html?${teacher.subjects[s]}"><p>${teacher.subjects[s]}</p></a>`;                    
         }
         subjects.innerHTML = sub;
         //END
   loadTargetReviews();
}
//FETCH TEACHER FROM DB
async function loadTargetReviews(){
    const reviewContainer = document.querySelector("#review");
   //FETCH TEACHER REVIEWS FROM DB
    let response;
      try {
         response = await fetch(`https://ca-42yan.ondigitalocean.app/api/v1/reviews/target/${id[1]}`);
      } catch {
         name.className = "h3 alert alert-danger";
         name.innerHTML = 'SOMETHING WENT WRONG';
         return;
      }
    let reviews = await response.json();
        reviews = reviews.data;
    //FETCH TEACHER REVIEWS FROM DB
      if(reviews.length == 0){
        reviewContainer.innerHTML = '<h3 class ="text-center">There are no reviews</h3>';
         return;
      }
      //Load reviews into html
      reviewContainer.innerHTML = '<h3 class ="text-center">Current reviews</h3>';
         const editDeleteDiv = `
                     <i class="fa">
                        <div class="col-sm-4">
                        <div class="constant-width btn edit-deleteReview slideTop">
                           <button id="edit" class="btn btn-default constant-width">Edit</button>
                           <button id="delete" class="btn btn-default constant-width">Delete</button>
                        </div>
                        </div>
                     </i>`;

         for (rev in reviews){
            const col6 = document.createElement("div");
            col6.className = "col-sm-12";
            let reviewDiv = document.createElement("div");
            reviewDiv.className = "alterConstant-width btn alterReview cleaner ";
            //get edited status
            let edited = "";
               if(reviews[rev].edited)
               edited = "Edited";
            reviewDiv.innerHTML +=  `
            <span id="revId" >${reviews[rev]._id}</span> 
            <span>${edited}</span> 
            <h3><a href="../user/user.html?${reviews[rev].user}">${reviews[rev].user}</a> <span class= "fakep">says...</span> 
            <span>
                  <i class="fa fa-cog"></i>
                  ${editDeleteDiv}
            </span>
            </h3>
            
            <pre><p>${reviews[rev].comment}</p> </pre>
               <span class= "fakep">${reviews[rev].date.split("T")[0]}</span> 
               <span class= "fakep">${reviews[rev].rating}</span> 
              `;
            //Getting replies on the right reviews
               for (i in reviews[rev].replies){
                  //get Edited status
                  let edited = "";
                  if(reviews[rev].replies[i].edited)
                  edited = "Edited";
                  
               reviewDiv.innerHTML += `
                  
                  <div class="col-sm-12">

                  <div class="constant-width btn reply cleaner ">
                  <span >${edited}</span> 
                  <h3><a href="../user/user.html?${reviews[rev].replies[i].user}">${reviews[rev].replies[i].user}</a> <span class= "fakep">replies...</span>

                  <span>
                  <span id="replyId">${reviews[rev].replies[i].replyId}</span>
                     
                  <i class="fa fa-cog cogreply"></i>
                      ${editDeleteDiv}
                  </span>
                  
                  </h3>
                        <pre class="constant-width"><p>${reviews[rev].replies[i].reply}</p> </pre>
                  </div>
               </div>`;
            }
            //Getting replies on the right reviews
         reviewDiv.innerHTML += `
                  <form class="responseF">
                     <div class="form-group center ">
                     <textarea placeholder="Response" class="form-control responseInput response" cols="30" rows="1" ></textarea>
                     </div>
                     <button type="submit" class="btn btn-default btn-lg responseBtn">Post reply</button>
                  </form>
               `;  
               col6.appendChild(reviewDiv);
               col6.innerHTML+="<br><br>";
               reviewContainer.appendChild(col6);
         }
         //Load reviews into html
   }
//ADD REVIEW 
const reviewForm = document.querySelector("#reviewF");
  
reviewForm.addEventListener('submit', (e) => {
   e.preventDefault();
      const comment = document.querySelector("#comment").value;
     //VALIDATIONS      VALIDATE POSTING NOTHINGNESS
         if(comment.trim().length == 0){
            //get modal
               modalAddon("Please add a review", false);
            document.querySelector("#comment").focus();
            return;
           }
     //VALIDATIONS      VALIDATE POSTING NOTHINGNESS
      const data = {comment, target:id[1]};
      const options = {
         method: 'POST',
         headers:{
            'Content-Type': 'application/json'
         },
         body:JSON.stringify(data)
      }
      
      if(fetcher(`https://ca-42yan.ondigitalocean.app/api/v1/reviews`, options)){
            //get modal
               modalAddon("Review added!");
            document.querySelector("#comment").style.height = "37px";
            document.querySelector("#comment").value = '';//clear field
      }
});
//ADD REVIEW  
 
//ADD REVIEW REPLY
//EVENT DELEGATION FOR RESPONSE INPUT
document.body.addEventListener("submit",(e) => {
   e.preventDefault();
   if(e.target.classList.contains("responseF")){
         const target = e.target.parentElement.querySelector("#revId").innerHTML;
         const reply = e.target.querySelector(".response").value;
         const replyId = Date.now().toString(36) +'_' + Math.random().toString(36).substr(2, 9);   
         if(reply.trim().length == 0){
             //get modal
               modalAddon("Please add a reply", false);
               e.target.querySelector("textarea").focus();
            return;
            }
       const data = {replies:{user: "user123", reply, replyId, edited: false }};
       const options = {
          method: 'PUT',
          headers:{
             'Content-Type': 'application/json'
          },
          body:JSON.stringify(data)
       }
         if(fetcher(`https://ca-42yan.ondigitalocean.app/api/v1/reviews/reply/${target}`, options)){
            //get modal
               modalAddon("Reply added!");
       }
   }

}); 
//ADD REVIEW REPLY

//AUTO HEIGHT TEXTAREA
//EVENT DELEGATION FOR RESPONSE TEXTAREA
document.body.addEventListener("focusin",(e) => {
   if(e.target.classList.contains("response")){
      const tx = document.getElementsByTagName('textarea');
         for (let i = 0; i < tx.length; i++) {
         tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
         tx[i].addEventListener("input", OnInput, false);
      } 
   }
});
const tx = document.getElementsByTagName('textarea');
         for (let i = 0; i < tx.length; i++) {
         tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
         tx[i].addEventListener("input", OnInput, false);
      } 

function OnInput() {
   this.style.height = 'auto';
   this.style.height = (this.scrollHeight) + 'px';
}
//AUTO HEIGHT TEXTAREA

//EDIT OR DELETE REVIEW 
document.body.addEventListener("click", (e) =>{

      if(e.target.classList.contains("fa-cog")){
            //Remove opened divs 
            const divs = document.body.querySelectorAll(".edit-deleteReview");
            //Remove opened divs 
            const editDelReview = e.target.parentElement.querySelector(".edit-deleteReview");
 
         if(editDelReview.style.display == "block"){
            e.target.className += " fa-spin-reverse";
             editDelReview.style.display = "none"
         }
         else{
            //Remove opened divs 
            for (i = 0; i<divs.length; i++)
                     divs[i].style.display = "none";
            //Remove opened divs 
            e.target.className += " fa-spin";
            editDelReview.style.display = "block"
         }
         setTimeout(() =>{
               e.target.classList.remove("fa-spin");
               e.target.classList.remove("fa-spin-reverse");
         }, 500);
      }
});
//EDIT OR DELETE REVIEW

//EDIT MODAL
const body = document.querySelector("body");
const modal_container = document.querySelector(".modal-container");
const closee = document.querySelector("#closeModal");
const header = document.querySelector("#menu");
const modal = document.querySelector(".modal");
const responseEdit = document.querySelector("#editor");
const activeR = document.querySelector("#activeRevId");
const replyId = document.querySelector("#replyId");
const h = document.querySelector(".editorTitle");
//EDIT MODAL

//EVENT DELEGATION
document.body.addEventListener("click", (e)=>{

   if(e.target.id === "edit"){
      //hide submenu
    e.target.parentElement.style.display ="none";
    const cogreply = e.target.parentElement.parentElement.parentElement.parentElement.querySelector(".cogreply");
    if(cogreply){
         //edit REPLY 
        //Get current review ID
    activeR.value = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".alterReview>span#revId").innerHTML;
       //get replyId to be able to update 
       replyId.value = e.target.parentElement.parentElement.parentElement.parentElement.querySelector("#replyId").innerHTML;
       //get replyId to be able to update 

         //WORKING ON REPLY COG
            h.innerHTML = "Reply editor";
         //get current value from review
         const p = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".reply>pre>p");

         responseEdit.value = p.innerHTML;
         //Set new height based on amount of lines
         let lines = responseEdit.value.split(/\r|\r\n|\n/);
         responseEdit.style.height = parseInt((lines.length)  * 37)+"px";
         responseEdit.focus();

            body.classList.add("body")
            header.classList.add("header-hide")
            modal_container.classList.add("popmodal");
      
   }else{ 
         replyId.value = null;
       //EDIT REVIEW
   //WORKING ON REVIEW COG
            h.innerHTML = "Review editor";
            //Get current review ID
       activeR.value =  e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".alterReview>span#revId").innerHTML;
      //get current value from review
      const p = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".alterReview>pre>p");

      responseEdit.value = p.innerHTML;
      //Set new height based on amount of lines
      let lines = responseEdit.value.split(/\r|\r\n|\n/);
      responseEdit.style.height = parseInt((lines.length)  * 37)+"px";
      responseEdit.focus();

         body.classList.add("body")
         header.classList.add("header-hide")
         modal_container.classList.add("popmodal");
      }

   }else if(e.target.id === "delete"){
         //DELETE REPLY 
         const cogreply = e.target.parentElement.parentElement.parentElement.parentElement.querySelector(".fa-cog").classList.contains("cogreply");

         if(cogreply){
         //DELETE REPLY 
         activeR.value = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".alterReview>span").innerHTML;
         //activeR = review ID   
         
         //get replyId 
          const replyId = e.target.parentElement.parentElement.parentElement.parentElement.querySelector("#replyId").innerHTML;
         //get replyId 

         const data = {replyId};
         const options = {
            method: 'DELETE',
            headers:{
               'Content-Type': 'application/json'
            },
          body:JSON.stringify(data)
         }

         if(fetcher(`https://ca-42yan.ondigitalocean.app/api/v1/reviews/reply/${activeR.value}`, options)){
            //remove options menu
            e.target.parentElement.style.display ="none";
            //get modal
               modalAddon("Reply deleted!");
         }
         //DELETE REPLY 
         }else{
         //DELETE REVIEW
         //Get review ID = activeR
         activeR.value =  e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".alterReview>span#revId").innerHTML;
         //DELETE request to api
         const options = {
            method: 'DELETE',
            headers:{
               'Content-Type': 'application/json'
            }
         }

         if(fetcher(`https://ca-42yan.ondigitalocean.app/api/v1/reviews/${activeR.value}`, options)){
            //remove options menu
               e.target.parentElement.style.display ="none";
               //get modal
               modalAddon("Review deleted!");
         }
         //DELETE REVIEW
      }
   }
   });

function modalRemoval(){
      modal_container.classList.remove("popmodal");
      header.classList.remove("header-hide");
      body.classList.remove("body");
      responseEdit.value = "";
}

function modalAddon(message, reload = true){
      header.classList.add("header-hide")
      modal_container.classList.add("popmodal");
      modalUserExp(message, reload);
}

closee.addEventListener("click", modalRemoval());

modal_container.addEventListener("click", (e) => {
            if(e.target.classList == "modal-container popmodal"){
               modalRemoval();
            }
});
//EDIT OR DELETE REVIEW

//UPDATE REVIEW WITH NEW EDIT 
document.querySelector("#updateReview").addEventListener("click", (e) =>{
         //Get review ID = activeR
         let data, fetchQuery;
         if(replyId.value) //Update reply
               data = {reply: responseEdit.value, replyId: replyId.value};
         else //Update review
               data = {comment: responseEdit.value, edited: true};
          
         const options = {
            method: 'PUT',
            headers:{
               'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
         } 
         //request depending on replyId 
         if(replyId.value)
            fetchQuery = `https://ca-42yan.ondigitalocean.app/api/v1/reviews/reply/${activeR.value}`;
         else
            fetchQuery = `https://ca-42yan.ondigitalocean.app/api/v1/reviews/${activeR.value}`;

            if(fetcher(fetchQuery, options))
               if(replyId.value)
               modalUserExp("Reply updated!");
               else
               modalUserExp("Review updated!");
});
//UPDATE REVIEW WITH NEW EDIT

async function fetcher(fetchQuery, options){
   try {
    fetch(fetchQuery, options);
   } catch {
      return;
   }
   return true;
}

function modalUserExp(message, reload = true){
     //get editor to improve user experience  
     const edC= document.querySelector(".editorContainer");
     edC.style.display = "none";
       //display h with message
       const h = document.querySelector(".editorTitle");
       h.innerHTML = message;
       //remove Modal
     setTimeout(() => {
      modalRemoval();

     if(reload == true)
     loadTargetReviews();
     setTimeout(() => {
        edC.style.display = "block";
        h.innerHTML = "Review Editor";
     }, 300);
     }, 1500);

}


