//sideBar
let openBarWidth=$(".openBar").innerWidth()
console.log(openBarWidth)
$(".sideBar").css("left",-openBarWidth)



$("#closeSide").click(function(){
if($(".sideBar").css("left")=="0px"){
    $(".sideBar").animate({left:-openBarWidth},500)
    $(".rightSide").removeClass("d-none")

}
})

$("#openSide").click(function(){
if($(".sideBar").css("left")!="0px"){
    $(".sideBar").animate({left: 0 },500)
    $(".rightSide").addClass("d-none")
    $(".part1").show(2000)
}
})
// search

$("#search").click(function(){
    $(".sideBar").animate({left:-openBarWidth},500)

    $(".searchInput").removeClass("d-none")
    $(".rightSide").removeClass("d-none")

    $("#allMeals").addClass("d-none")


})



//loading
$(document).ready(function(){
    $(".loading").slideUp(1000)
})


//api
 async function getMeals(){
    $(".loading").fadeIn(500)
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let finalData= await data.json()
    let result=finalData.meals;
    displayMeals(result)
    $(".loading").fadeOut(500)

    console.log(result)
}
getMeals()

 function displayMeals(data){
    let cartona=``;
    for(let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3 ">
        <div class="img position-relative"  onclick="getDetails('${data[i].strMeal}')">
         <img src="${data[i].strMealThumb}" class="w-100" alt="" >
        <div class="imgLayer d-flex  align-items-center position-absolute  opacity-0">
            <h1 class="text-black ps-2">${data[i].strMeal}</h1>
        </div>   
             </div>
    </div>
        `
    }
document.querySelector("#meals").innerHTML=cartona;
}

//  api details

async function getDetails(imgName){
    $(".loading").fadeIn(500)

    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${imgName}`)
    let finalData= await data.json()
    let result=finalData.meals;
    displayDetails(result)
    $(".loading").fadeOut(500)

    $("#allMeals").addClass("d-none")
    $("#categerioesMeals").addClass("d-none")
    $("#allofArea").addClass("d-none")
    $("#allingredients").addClass("d-none")

    


    $("#AllDescription").removeClass("d-none")
    console.log(result)
}

function displayDetails(data){
    let cartona=``;
    for(let i=0;i<data.length;i++){
        cartona+=`

        <div class="col-md-4">
        <img src="${data[i].strMealThumb}" class="w-100"  alt="">
        <p class="text-white mt-3 fw-bold">${data[i].strMeal}</p>
    </div>
    <div class="col-md-7 offset-1">
        <div class="instructions">
            <h4 class="text-white">Instructions</h4>
            <p class="text-white">${data[i].strInstructions}</p>
            <h2 class="text-white">Area: ${data[i].strArea}</h2>
            <h2 class="text-white">Category : ${data[i].strCategory}</h2>
            <h3 class="text-white">Recipes:</h3>
<ul class="list-unstyled d-flex g-3 flex-wrap">
<li class="alert alert-info m-2 p-1">${data[i].strIngredient1}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient2}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient3}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient4}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient5}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient6}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient7}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient8}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient9}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient10}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient11}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient12}</li>
<li class="alert alert-info m-2 p-1">${data[i].strIngredient13}</li>
</ul>
            <h3 class="text-white">tags:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">${data[i].strTags}</li>
            </ul>
            <a target="_blank " href="${data[i].strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${data[i].strYoutube}" class="btn btn bg-danger">Youtube</a>
        </div>
    </div>
        `
    }
document.querySelector("#AllDetails").innerHTML=cartona;

}



// search in api by name


async function getMeals2(searchName){
    $(".loading").fadeIn(500)

    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`)
    let finalData= await data.json()
    let result=finalData.meals;
    console.log(result)
    displayMeals(result)
    $(".loading").fadeOut(500)

    $("#allMeals").removeClass("d-none")


}


let namesearch=document.querySelector(".namesearch")
namesearch.addEventListener("change",function(e){
getMeals2(e.target.value)
$("#categerioesMeals").addClass("d-none")
$("#ingreds").addClass("d-none")
$("#cont").addClass("d-none")


console.log(e.target.value);

})


//search in api by letter


async function getMeals3(letter){
    $(".loading").fadeIn(500)
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let finalData= await data.json();
    let result=finalData.meals;
    console.log(result)
    displayMeals(result)
    $(".loading").fadeOut(500)
    $("#allMeals").removeClass("d-none")


}

let letterSearch=document.querySelector(".letterSearch")


letterSearch.addEventListener("keyup",function(e){
    getMeals3(e.target.value)
    $("#categerioesMeals").addClass("d-none")
    $("#cont").addClass("d-none")

    console.log(e.target.value);
    })

//categories

 async function categorie(){
    $(".loading").fadeIn(500)

    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let finalData= await data.json()
    let result=finalData.categories;
    displayCategrioes(result)
    $(".loading").fadeOut(500)

    console.log(result)
}

 function displayCategrioes(data){
    let cartona=``;
    for(let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3 ">
        <div class="img position-relative"  onclick="FilterCategorie('${data[i].strCategory}')">
            <img src="${data[i].strCategoryThumb}" class="w-100" alt="">
        <div class="imgLayer d-flex flex-column   align-items-center position-absolute  opacity-0">
            <h1 class="text-black ps-2">${data[i].strCategory}</h1>
            <p class="ps-2">${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>   
             </div>
    </div>
        `
    }
        document.querySelector("#categerioes").innerHTML=cartona;
    }
   


let Categrioes= document.querySelector("#Categrioes")
Categrioes.addEventListener("click",function(){
    $("#allMeals").addClass("d-none")
    $("#categerioesMeals").removeClass("d-none")
    $("#AllDescription").addClass("d-none")

    $("#cont").addClass("d-none")

    categorie()
})

document.querySelector("#search").addEventListener("click",function(){
    $("#categerioesMeals").addClass("d-none")
    $("#allofArea").addClass("d-none")
    $("#AllDescription").addClass("d-none")



})

document.querySelector("#Categrioes").addEventListener("click",function(){
    $(".searchInput").addClass("d-none")
    $("#allofArea").addClass("d-none")
    $("#ingreds").addClass("d-none")



})


//filter by categories
 async function FilterCategorie(categoryName){
    $(".loading").fadeIn(500)

    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    let finalData= await data.json()
    let result=finalData.meals;
    filterDisplay(result.slice(0,20))
    $(".loading").fadeOut(500)

    console.log(result)
}

  function filterDisplay(data){
    let cartona=``;
    for(let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3 ">
        <div class="img position-relative" onclick="getDetails('${data[i].strMeal}')" >
            <img src="${data[i].strMealThumb}" class="w-100" alt="" >
        <div class="imgLayer d-flex flex-column justify-content-center  align-items-center position-absolute  opacity-0">
            <h1 class="text-black ps-2">${data[i].strMeal}</h1>
        </div>   
             </div>
    </div>
        `}

        document.querySelector("#categerioes").innerHTML=cartona;
    }

//API ARea

async function allAreas(){
    $(".loading").fadeIn(500)

    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let finalData= await data.json()
    let result=finalData.meals;
    displayAreas(result)
    $(".loading").fadeOut(500)

    console.log(result)
}

function displayAreas(data){
    let cartona=``;
    for(let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3">
        <div class="Area  text-center" onclick="FilterArea('${data[i].strArea}')" >
            <i class="fa-solid fa-house-laptop text-white fs-1"></i>
            <h3 class="text-white">${data[i].strArea}</h3>
        </div>
    </div>
        `}

        document.querySelector("#Area").innerHTML=cartona;
    }


document.querySelector("#areaa").addEventListener("click",function(){
    $("#allMeals").addClass("d-none")
    $(".searchInput").addClass("d-none")
    $("#categerioesMeals").addClass("d-none")
    $("#allofArea").removeClass("d-none")
    $("#cont").addClass("d-none")
    $("#AllDescription").addClass("d-none")



    allAreas()
})


//filter by Area
 async function FilterArea(AreaName){
    $(".loading").fadeIn(500)

    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaName}`)
    let finalData= await data.json()
    let result=finalData.meals;
    AreaDisplay(result)
    $(".loading").fadeOut(500)

    console.log(result)
}

  function AreaDisplay(data){
    let cartona=``;
    for(let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3" >
        <div class="img position-relative" onclick="getDetails('${data[i].strMeal}')">
            <img src="${data[i].strMealThumb}" class="w-100" alt="">
        <div class="imgLayer d-flex flex-column justify-content-center  align-items-center position-absolute  opacity-0">
            <h1 class="text-danger ps-2">${data[i].strMeal}</h1>
        </div>   
             </div>
    </div>
        `}
        document.querySelector("#Area").innerHTML=cartona;
    }


//ingredients
async function getingredients(){
    $(".loading").fadeIn(500)


    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let finalData= await data.json()
    let result=finalData.meals;
    ingredientsDisplay(result.slice(0,20))
    $(".loading").fadeOut(500)

    console.log(result.slice(0,20))
}

function ingredientsDisplay(data){
    let cartona=``;
    for(let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3">
        <div class="ingredientsBox d-flex flex-column text-center" onclick="ingredientsFilter('${data[i].strIngredient}')">
            <i class="fa-solid fa-drumstick-bite text-white fs-1"></i>
            <h3 class="text-white">${data[i].strIngredient}</h3>
            <p class="text-white">${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
    </div>
        `}
        document.querySelector("#ingreds").innerHTML=cartona;
    }

document.querySelector("#Ingredients").addEventListener("click",function(){
    $("#allMeals").addClass("d-none")
    $(".searchInput").addClass("d-none")
    $("#categerioesMeals").addClass("d-none")
    $("#allofArea").addClass("d-none")
    $("#cont").addClass("d-none")
    $("#AllDescription").addClass("d-none")
    $("#allingredients").removeClass("d-none")






    getingredients()
})
// filter by ingredients


async function ingredientsFilter(ingreName){
    $(".loading").fadeIn(500)

    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingreName}`)
    let finalData= await data.json()
    let result=finalData.meals;
    ingFilter(result)
    $(".loading").fadeOut(500)

    console.log(result)
}

  function ingFilter(data){
    let cartona=``;
    for(let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3 ">
        <div class="img position-relative" onclick="getDetails('${data[i].strMeal}')" >
            <img src="${data[i].strMealThumb}" class="w-100" alt="">
        <div class="imgLayer d-flex  justify-content-center  align-items-center position-absolute  opacity-0">
            <h1 class="text-black ps-2">${data[i].strMeal}</h1>
        </div>   
             </div>
    </div>
        `}    
            document.querySelector("#ingreds").innerHTML=cartona;
    }



  //contacts

  $("#ContacUs").click(function(){
    $("#cont").removeClass("d-none")
    $(".sideBar").animate({left:-openBarWidth},500)
    $(".rightSide").removeClass("d-none")

})
document.querySelector("#ContacUs").addEventListener("click",function(){
    $("#allMeals").addClass("d-none")
    $("#categerioesMeals").addClass("d-none")
    $("#allofArea").addClass("d-none")
    $(".searchInput").addClass("d-none")
    $("#allingredients").addClass("d-none")



}
)
// validation
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
let submitButton=document.getElementById("submitBtn")
document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})
document.getElementById("mail").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phonee").addEventListener("focus", () => {
    phoneInputTouched = true
})    

document.getElementById("AGE").addEventListener("focus", () => {
    ageInputTouched = true
})  

 document.getElementById("pass").addEventListener("focus", () => {
    passwordInputTouched = true
})   
 document.getElementById("Repass").addEventListener("focus", () => {
    nameInputTouched = true
})

function nameValidation() { return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))}
function emailValidation() { return (/^\w+@\w+\.\w+$/.test(document.getElementById("mail").value))}
function phoneValidation() { return (/^0((13|2[2-4]|3|4[05-8]|5[05]|6[24-689]|8[2468]|9[235-7])\d{7}|1[0125]\d{8})$/.test(document.getElementById("phonee").value))}
function AgeValidation() { return ( /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("AGE").value))}
function passValidation() { return  (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("pass").value))}
function repassValidation() {
    return document.getElementById("Repass").value == document.getElementById("pass").value

}


function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("invalidName").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("invalidName").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("invalidEmail").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidEmail").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("invalidphone").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidphone").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (AgeValidation()) {
            document.getElementById("invalidAge").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidAge").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passValidation()) {
            document.getElementById("invalidpass").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidpass").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repassValidation()) {
            document.getElementById("invalidrepass").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidrepass").classList.replace("d-none", "d-block")

        }
    }
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        AgeValidation() &&
        passValidation() &&
        repassValidation()) {
    submitButton.removeAttribute("disabled")
    } 
    else {
        submitButton.setAttribute("disabled", true)
    }
}
