//VALIDATING IF TEACHERS ARE FILTERED BY AREA OR GENERAL
area = window.location.href.split("?")[1];
if(area)
    loadTopTeachers(`https://ca-42yan.ondigitalocean.app/api/v1/teachers/area/${area}`, true);
else{
    loadTopTeachers(`https://ca-42yan.ondigitalocean.app/api/v1/teachers`);
    area = "g";
}

const header = document.querySelector("#areaT");
const container = document.querySelector("#teacher-toggler");
const error = document.querySelector("#ntf");

//SEARCH FOR TEACHERS
const search = document.querySelector("#search-bar");
document.querySelector("form").addEventListener("submit", e => { e.preventDefault()});

search.addEventListener("keyup", (e)=>{
    const container = document.querySelector(".filtered")
        if(search.value.trim().length == 0){
            container.innerHTML="";
            return;
            }
        
        container.innerHTML="";
        document.querySelector(".loading").style.display="block";

        //Filter teachers
        filterTeachers(container);
        //Filter teachers
});
//SEARCH FOR TEACHERS


async function filterTeachers(container){
    let response;
    try {
     response = await fetch(`https://ca-42yan.ondigitalocean.app/api/v1/teachers/${area}/name/${search.value}`);

    } catch  {
         sendResponse("Something went wrong", container);
        return;
    }
    const teachers = await response.json();

    //error
    if(!teachers.data){
         sendResponse("Something went wrong", container);
         return;
     }

    //display teachers
    setTimeout(()=>{
         document.querySelector(".loading").style.display="none";

         container.innerHTML="";
         if(teachers.data.length == 0){
             sendResponse("No teachers were found", container);
             return;
         }
         showFiltered(teachers.data, container);
     }, 1000);

 }

 function showFiltered(teachers, container){
     let materias = "";
 
     for(i in teachers){
         for (s in teachers[i].subjects){
                     materias += teachers[i].subjects[s]+",";
                     if( s == 1)
                     break;
             }
             
             route = `../maestro/maestro.html?teacher=${teachers[i]._id}`;
                 
             const teacher = document.createElement("div");
             teacher.className= "col-sm-4";
             teacher.innerHTML = `
                                     <h4>${i}/3</h4>
                                     <a id ="alter" href="${route}">
                                     <div id ="alter" class="constant-width btn btn-default" >
                                         <h3>${teachers[i].name}</h3>
                                     <p>${materias}...</p>
                                     </div>
                                     </a>
                                 `;
             container.appendChild(teacher);
                 materias = "";
     }  
 
 }
 
function sendResponse(message, parent){

    const div = document.createElement("div");
    div.className += "alert alert-danger";

    div.innerHTML = `<h3>${message}</h3>`;

    parent.appendChild(div);

} 

async function loadTopTeachers(fetchQuery, topType){
    let response;
    try {
     response = await fetch(fetchQuery);
    } catch  {
        error.className = "alert alert-danger text-center";
        error.innerHTML = 'SOMETHING WENT WRONG';
        return;
    }

    const teachers = await response.json();
    top3 = teachers.data;

    if(!top3){
        error.className = "alert alert-danger text-center";
        error.innerHTML = 'SOMETHING WENT WRONG';
        return;
    }

    if(topType){
        if(area == "HS")
            areaT = "Health Sciences";
        else if(area == "AE")
            areaT = "Arquitecture & Engineering";
        else if(area == "ESS")
            areaT = "Economics and Social Sciences";

            header.innerHTML = `  
            <h3 id ="hsize" >Top ${areaT} teachers</h3>
                `;
    }else{
        header.innerHTML = `  
        <h3 id ="hsize">Top teachers of all time</h3>
        `;
    }
    //Display general and area teachers
    let materias = "";
    for(i in top3){
        for (s in top3[i].subjects){
                    materias += top3[i].subjects[s]+",";
                    if( s == 1)
                    break;
            }
            route = `../maestro/maestro.html?teacher=${top3[i]._id}`;
                
            const teacher = document.createElement("div");
            teacher.className= "col-sm-4";
            teacher.innerHTML = `
                                    <h4>${i}/3</h4>
                                    <a id ="alter" href="${route}">
                                    <div id ="alter" class="constant-width btn btn-default" >
                                        <h3>${top3[i].name}</h3>
                                    <p>${materias}...</p>
                                    </div>
                                    </a>
                                `;
            container.appendChild(teacher);
            materias = "";  
            
            if(i==2)
            break;
    
    }      
    //Display general and area teachers

}