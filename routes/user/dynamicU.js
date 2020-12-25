const user = {"name": "Juanito Mendoza", "status":"Active", "style": "80%", "acc":"50%", "availability":"80%", "resposibility":"50%","fame": "8/10"}

const fame = document.querySelector("#rating");
const name = document.querySelector("#name");
const status_meth = document.querySelector("#statmeth");
const stats = document.querySelector("#stats");
const subjects = document.querySelector("#subj");


 function loadUser(){
                
         fame.innerHTML = user.fame;  
        name.innerHTML = user.name;
        status_meth.innerHTML = `<h3>Status</h3>
                                <p>${user.status}</p>
                                
                                `;

        stats.innerHTML =  `<h3>Stats</h3>
                            <p>Style: ${user.style}</p>
                            <p>Accuracy: ${user.acc}</p>
                            <p>Availabilty: ${user.availability}</p>
                            <p>Responsibility: ${user.resposibility}</p>
                            <p>Content management: ${user.contentM}</p>`;

     

}


         

document.addEventListener("DOMContentLoaded", loadUser());
