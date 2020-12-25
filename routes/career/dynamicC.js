 const carrera = document.querySelector("#carrera");

 const error = document.querySelector("#ntf");

 id = window.location.href.split("?")[2];
 area = window.location.href.split("?")[1];



 async function loadCareer(){
          
      let response;
      try {
         response = await fetch(`https://ca-42yan.ondigitalocean.app/api/v1/careers/${area}/${id}`);
      } catch {
         error.className = "alert alert-danger text-center";
         error.innerHTML = 'SOMETHING WENT WRONG';
         return;
      }
      
      let carr = await response.json();
          carr = carr.data;
        let container = `<div class="section-container-spacer text-center">
                                 <h1 class="h2">${carr.career}</h1>
                                 </div>

                                 <div class=" col-md-7">
                                 <h2>Career stats</h2>

                                 <h3>Duration:</h3>
                                 <p>${carr.duration}</p>
                                 
                                 <h3>Semesters length:</h3>
                                 <p>4 months</p>

                                 <h3>Schedule availability:</h3>
                                 <p>${carr.schedule}</p>
                                 <h3>Difficulty:</h3>
                                 <p>${carr.difficulty}</p>

                                 <h3>Average subject per semester: </h3>
                                 <p>${carr.averagesubject}</p>

                                 <h3>Average graduates per year:</h3>
                                 <p>NOT IMPLEMENTED IN DB</p>
                                 </div> 

                                 <div class="col-md-5">
                                 <h2>General</h2>
               
                                 <h3>About it:</h3>
                                 <p>${carr.about}</p>
               
                                 <h3>What you'll learn:(?)</h3>
                                 <p>${carr.knowledge} </p>
               
                                 <h3>Teachers: </h3>
                                 <p><a href="../maestros/maestros.html?${area}">See all teachers</a></p>
               
                                 <h3>Useful resources: </h3>
                                 
                                <p><a  id = "faq">FAQ</a></p>
                                 
                                 <p><a href="../pensum/Pensum.html" >Pensum</a></p>

                                 <p><a href="https://drive.google.com/drive/folders/1O0DPmiPQps6KKvH8sfistwtQyf7mlexd?usp=sharing">Content manager</a></p>
                                 <p><a href="https://drive.google.com/drive/folders/1O0DPmiPQps6KKvH8sfistwtQyf7mlexd?usp=sharing">Contributions</a></p>
                                 <p><a href="../../contact.html">Requests</a></p>
                                 
                                 </div> 
                                 `;

            carrera.innerHTML = container;
}
document.addEventListener("DOMContentLoaded", loadCareer());

const faq = document.getElementById("faq");
const modal_container = document.querySelector(".modal-container");
const closee = document.querySelector(".closeModal");
const body = document.querySelector("body");
const header = document.querySelector("#menu");
const modal = document.querySelector(".modal");

//EVENT DELEGATION
document.body.addEventListener("click", (e)=>{

      if(e.target.id === "faq"){
      body.classList.add("body")
      header.classList.add("header-hide")
      modal_container.classList.add("popmodal");}
      
})

closee.addEventListener("click", () =>{
      modal_container.classList.remove("popmodal");
      header.classList.remove("header-hide")
      body.classList.remove("body")

});

modal_container.addEventListener("click", (e) => {
            if(e.target.classList == "modal-container popmodal"){
                  modal_container.classList.remove("popmodal");
                  header.classList.remove("header-hide")
                  body.classList.remove("body")
            }
});
