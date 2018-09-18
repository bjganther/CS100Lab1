
const API_KEY = "612d52d0-b77f-11e8-bf0e-e9322ccde4db";
const galleriesurl = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;


function hideallmiddle() {
        document.querySelector("#all-galleries").style.display = "block";
        document.querySelector("#all-objects").style.display = "none";
        document.querySelector("#this-object").style.display = "none";
        console.log("back2works");
    };

    function hidealllast() {
        document.querySelector("#all-galleries").style.display = "none";
        document.querySelector("#all-objects").style.display = "block";
        document.querySelector("#this-object").style.display = "none";
        console.log("back2works");
    };

   
    

document.addEventListener("DOMContentLoaded", () => {
    
    showGalleries(galleriesurl);
    document.querySelector("#art-title").style.color = "crimson";
    document.querySelectorAll(".a").style.color= "green"; 
    document.querySelectorAll('button').style.color="crimson";
    
   


    

});

document.querySelector("#art-title").style.color = "crimson";
document.querySelectorAll(".a").style.color= "green"; 
document.querySelectorAll('button').style.color="crimson";
document.querySelector("h2").style.color="orange";

function showGalleries(galleriesurl) {
    fetch(galleriesurl)
    .then(response => response.json())
    .then(data => {
    data.records.forEach(gallery => {
        document.querySelector("#galleries").innerHTML += `
        <li>
            <a href="#gallery_${gallery.id}" onclick="showObjectsTable('${gallery.id}', '${gallery.name}')">
            ${gallery.name} 
            </a>
            <br />Gallery #${gallery.id}
            <br />Floor ${gallery.floor}
        </li>
        `;
    });
    if (data.info.next) {
        showGalleries(data.info.next);
    }
    })
    document.querySelector(".a").style.color= "green"; 
    document.querySelector('button').style.color="crimson";
}


function showObjectsTable(galleryid, galleryname) {
    console.log(galleryname);
    //console.log("no");
    document.querySelector("#all-galleries").style.display = "none";
    document.querySelector("#all-objects").style.display = "block";
    document.querySelector("#this-object").style.display = "none";
    galleryurl= `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${galleryid}`
    fetch(galleryurl)
    .then(response => response.json())
    .then(data => {
    document.querySelector("#objects").innerHTML="";
    document.querySelector("#gallery-title").innerHTML=galleryname;
  
    data.records.forEach(object=> {document.querySelector("#objects").innerHTML +=
        `<li>
            <a href="#object_${object.objectnumber}" onclick="showObject('${object.objectnumber}'&comma; ${galleryid})">
             ${object.title} </a>
             <br/>
             Object #${object.objectnumber}:(People ${object.people})
             <br/>
            <a href="${object.url}">Website</a>
            <br />
            <img src =${object.primaryimageurl} style = "width: 500px; height: 600px">
            <br/><br/>
            
        </li>
        `;
        console.log("70");
    });
    if (data.info.next) {
        showGalleries(data.info.next);
        console.log("repeat");
    }
    console.log("74");
    document.querySelector(".a").style.color= "green"; 
    document.querySelector('button').style.color="crimson";
    })
}

function showObject(objectnumber ) {

   
    

    console.log("hello");
    document.querySelector("#all-objects").style.display = "none";
    document.querySelector("#all-galleries").style.display = "none";
    document.querySelector("#this-object").style.display = "block";
    objecturl= `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&objectnumber=${objectnumber}`
    fetch(objecturl)
    .then(response => response.json())
    .then(data => {
    data.records.forEach(object=> {
        document.querySelector("#object").innerHTML = `
        <li>
            <a href="#object_${object.objectnumber}" onclick="showObject(${object.objectnumber})">
             ${object.title}</a>
             Object #${object.objectnumber} (Description ${object.description})(Provenance ${object.provenance})
            (Accession Year ${object.accessionyear}) 
            </a>
            <a href="${object.url}">Website</a>
            <img src =${object.primaryimageurl} style = "width: 500px; height: 600px">
        </li>
        `;
        document.querySelector("#object-title").innerHTML= object.title;

    });
    if (data.info.next) {
        showObjectsTable(data.info.next);
    }
    })
    document.querySelector(".a").style.color= "green"; 
    document.querySelector('button').style.color="crimson";
}


//check the state of the URL after each hash change
['DOMContentLoaded', 'hashchange'].forEach((e) => {
    window.addEventListener(e, () => {

      // if there's a # there, that's a saved state, set bg to that color
        if (window.location.hash) {
            let value =  window.location.hash.slice(1);
            console.log(value);
            let arr = value.split("_");
            if (arr[0] == "gallery") {
                console.log(arr[0]);
                console.log(arr[1]);
                
                showObjectsTable(arr[1]);
            };
            if (arr[0] == "object") {
                console.log("object");
                showObject(arr[1]);
            };
            
        }
    });
});

// color change function
function gallerychange(id)
{
   showObjectsTable(id);
    
}

function objectchange(id)
{
    showObject(id);
}






