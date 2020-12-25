/*const careers = [{"name": "System Engineering","image": "../../assets/images/Architecture.jpg", "route":"../career/carrera.html", "description": "For those who love creating their own structures!", "avsubject": "7", "avgraduates":"150"},{"name": "System Engineering","image": "../../assets/images/Architecture.jpg", "route":"#", "description": "For those who love creating their own structures!", "avsubject": "7", "avgraduates":"150"},{"name": "System Engineering","image": "../../assets/images/Architecture.jpg", "route":"#", "description": "For those who love creating their own structures!", "avsubject": "7", "avgraduates":"150"},{"name": "System Engineering","image": "../../assets/images/Architecture.jpg", "route":"#", "description": "For those who love creating their own structures!", "avsubject": "7", "avgraduates":"150"}];*/
 const carreras = document.querySelector("#carreras");
const error = document.querySelector("#ntf");
 
 area = window.location.href;
 area = area.split("?");


let careers;

 function loadCareers(){
      
 let Cs =  fetch(`https://ca-42yan.ondigitalocean.app/api/v1/careers/${area[1]}`)
 .then(result =>{
 return result.json();
 }).catch(err =>{
      error.className = "alert alert-danger text-center";
      error.innerHTML = 'SOMETHING WENT WRONG';
  });
  
 Cs.then(data =>{
       careers = data.data;
      for(i in careers){
            const container = document.createElement("div");
            container.className = "col-sm-4";

        route = `../career/carrera.html?${area[1]}?${careers[i]._id}`;
        container.innerHTML = `
                  
                  <a href="${route}" title="" class="black-image-project-hover">
                  <img src="../../assets/images/Architecture.jpg" alt="" class="img-responsive">
                        </a>
                  <div class="card-container card-container-lg">
                  <h4>00${i}/00${careers.length-1}</h4>
                  <h3>${careers[i].career}</h3>
                  <p>${careers[i].about}</p>
                  <a href="#" title="" class="btn btn-default">More</a>
                  </div>
                  
                                 `;

      carreras.appendChild(container);
      }
});

}
 
document.addEventListener("DOMContentLoaded", loadCareers());
