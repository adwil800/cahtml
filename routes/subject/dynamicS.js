
const container = document.querySelector("#subject-program");
const subjName = document.querySelector("#subjName");
const error = document.querySelector("#subjError");

area = window.location.href.split("?")[1];
let reqStatus;
 function loadSubject(){

let s = fetch(`https://ca-42yan.ondigitalocean.app/api/v1/subjects/${area}`)
        .then(result =>{
            reqStatus = result.status;
            if(reqStatus == 200){
            
            }else if(reqStatus == 500){
                area = area.replace(/%20/g, " ");
                setValidation(`Subject "${area}" not found`, " alert alert-danger");
            }
            
            return result.json();      
        }).catch( err =>{

            setValidation("Database connection could have not been stablished", " alert alert-danger");
        });

       
        


    s.then(data =>{
        data = data.data;
        //Name of subject
        subjName.innerHTML = data.name;

    let content = "";

    for(i in data.content){
        for (k in data.content[i].unitContent){
            content += `
               <p>${data.content[i].unitContent[k]}</p>
                    `;
           }
        const set = document.createElement("div");
        set.className= "col-md-12 section-container-spacer";

        set.innerHTML +=        `
                                    <div class=" btn btn-default max-width psize15" >
                                    <h2>${data.content[i].unit}</h2>
                                        ${content}
                                    </div>
                                    `;
                                
        container.appendChild(set);
        content = "";

        }


        });

}

document.addEventListener("DOMContentLoaded", loadSubject());



function setValidation(message, classes){

    error.className += classes;
    error.innerHTML = message;
    error.style.display = "block";
 
 }
 