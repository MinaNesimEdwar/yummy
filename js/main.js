let boxWidth = $(".sideNav .navTab").outerWidth();
$(".sideNav .openCloseIcon").click(() => {
  if ($(".sideNav").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

function closeSideNav() {
  $(".sideNav").animate({ left: -boxWidth }, 500);
  $(".sideNav .openCloseIcon").addClass("fa-bars");
  $(".sideNav .openCloseIcon").removeClass("fa-x");
  for (let i = 5; i >= 0; i--) {
    $(".navLinks ul li")
      .eq(i)
      .animate({ top: 300 }, (i + 5) * 100);
  }
}
closeSideNav();
function openSideNav() {
  $(".sideNav").animate({ left: 0 }, 500);
  $(".sideNav .openCloseIcon").addClass("fa-x");
  $(".sideNav .openCloseIcon").removeClass("fa-bars");
  for (let i = 0; i < 5; i++) {
    $(".navLinks ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}

$("document").ready(()=>{
  searchByName(" ").then(()=>{
    $(".loadingScreen").fadeOut(500);
    $("body").css("overflow","visible");
    $(".innerLoadingScreen").fadeOut(300);
  })

}
)



function displayMeals(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div onClick="getMealDetails(${arr[i].idMeal})" class="meal position-relative overflow-hidden rounded-2">
      <img src=${arr[i].strMealThumb} class="w-100">
      <div class="mealLayer position-absolute d-flex align-items-center">
        <h3 class="text-black fs-2 fw-bold ms-2">${arr[i].strMeal}</h3>
      </div>
    </div>
  </div>
    `;
    $(".rowData").html(cartona);
  }
}

async function getCategories() {
  $(".rowData").html(``);
  $(".innerLoadingScreen").fadeIn(300);
  $("#searchContainer").html(``);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  displayCategories(data.categories);
  $(".innerLoadingScreen").fadeOut(300);

}

function displayCategories(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div onclick="getCategoriesMeals('${
      arr[i].strCategory
    }')" class="meal position-relative overflow-hidden rounded-2">
      <img src=${arr[i].strCategoryThumb} class="w-100">
      <div class="mealLayer position-absolute text-center d-flex flex-column overflow-hidden  justify-content-center align-items-center">
        <h3 class="text-black fw-bold">${arr[i].strCategory}</h3>
        <p class="text-black p-1">${arr[i].strCategoryDescription
          .split(" ")
          .slice(0, 15)
          .join(" ")}</p>
      </div>
    </div>
  </div>
    `;
    $(".rowData").html(cartona);
  }
}

async function getCategoriesMeals(category) {
  $(".rowData").html(``);
  $(".innerLoadingScreen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  displayMeals(data.meals.slice(0, 20));
  $(".innerLoadingScreen").fadeOut(300);
}

async function getAreas() {
  $(".rowData").html(``);
  $(".innerLoadingScreen").fadeIn(300);
  $("#searchContainer").html(``);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await response.json();
  displayAreas(data.meals);
  console.log(data.meals);
  $(".innerLoadingScreen").fadeOut(300);
}

function displayAreas(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
      <div onclick="getAreasMeals('${arr[i].strArea}')" class="meal position-relative overflow-hidden rounded-2">
        <i class="fas fa-house-chimney fa-10x d-block text-center p-2"></i>
        <div class="mealLayer position-absolute text-center d-flex flex-column overflow-hidden  justify-content-center align-items-center">
          <h3 class="text-black fs-2 fw-bold">${arr[i].strArea}</h3>
        </div>
      </div>
    </div>
      `;
    $(".rowData").html(cartona);
  }
}

async function getAreasMeals(area) {
  $(".rowData").html(``);
  $(".innerLoadingScreen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await response.json();
  displayMeals(data.meals.slice(0, 20));
  $(".innerLoadingScreen").fadeOut(300);
}

async function getIngredients() {
  $(".rowData").html(``);
  $(".innerLoadingScreen").fadeIn(300);
  $("#searchContainer").html(``);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await response.json();
  displayIngredients(data.meals.slice(0, 20));
  $(".innerLoadingScreen").fadeOut(300);
}

function displayIngredients(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div onclick="getIngredientsMeals('${
          arr[i].strIngredient
        }')" class="meal position-relative overflow-hidden text-center rounded-2 p-2">
          <i class="fas fa-drumstick-bite fa-4x d-block text-center text-success p-2"></i>
        <h3 class="fw-bold ">${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(" ").slice(0, 15).join(" ")}</p>
        </div>
      </div>
        `;
    $(".rowData").html(cartona);
  }
}

async function getIngredientsMeals(ingredient) {
  $(".rowData").html(``);
  $(".innerLoadingScreen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await response.json();
  displayMeals(data.meals.slice(0, 20));
  $(".innerLoadingScreen").fadeOut(300);
}

async function getMealDetails(id){ 
  closeSideNav()
  $(".rowData").html(``);
  $(".innerLoadingScreen").fadeIn(300);
  $("#searchContainer").html(``);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  let data=await response.json();
  displayMealDetails(data.meals[0])
  $(".innerLoadingScreen").fadeOut(300);
}

function displayMealDetails(meal){
let ingredients=``
for(let i=1;i<=20;i++){
  if(meal[`strIngredient${i}`]){
    ingredients+=`
    <li class="alert alert-info p-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>
    `
  }
}
let tags =meal.strTags?.split(",");
if(!tags) tags=[];
let tagsStr=``;
for(let i=0 ;i<tags.length;i++){
  
    tagsStr+=`<li class="alert alert-danger p-2">${tags[i]}</li>`
}

  let cartona = ` 
  <div class="col-md-4">
  <img src=${meal.strMealThumb} class="w-100 rounded-2">
  <h2 class="mt-3">${meal.strMeal}</h2>
</div>
<div class="col-md-8">
  <h2 class="fw-bolder">Instructions</h2>
  <p>${meal.strInstructions}</p>
  <h3><span class="fw-bold">Area :</span> ${meal.strArea}</h3>
  <h3><span class="fw-bold">Category :</span> ${meal.strCategory}</h3>
  <h3><span class="fw-bold">Recipes  :</span> </h3>
  <ul class="list-unstyled d-flex flex-wrap gap-2">
    ${ingredients}
  </ul>
  <h3><span class="fw-bold">Tags   :</span> </h3>
  <ul class="list-unstyled d-flex flex-wrap gap-2">
  ${tagsStr}
  </ul>
  <a target="_blank" href=${meal.strSource} class="btn btn-success me-2">Source</a>
  <a target="_blank" href=${meal.strYoutube} class="btn btn-danger">YouTube</a>
</div>
  `
  $(".rowData").html(cartona);
}


function searchInput(){
  $("#searchContainer").html(`
  <div class="row py-5">
  <div class="col-md-6">
    <input onKeyup="searchByName(this.value)" type="text" class="form-control  " placeholder="Search By Name">
  </div>
  <div class="col-md-6">
    <input onKeyup="searchByFirstLetter(this.value)" maxLength="1" type="text" class="form-control  " placeholder="Search By First Letter">
  </div>
</div>
  `)
  $(".rowData").html("");
}

async function searchByName(term) {
  $(".rowData").html(``);
  $(".innerLoadingScreen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let data = await response.json();
  data.meals ? displayMeals(data.meals): displayMeals([]);
  $(".innerLoadingScreen").fadeOut(300);
}

async function searchByFirstLetter(term) {
  $(".rowData").html(``);
  $(".innerLoadingScreen").fadeIn(300);
  term==""? term="a":"";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  let data = await response.json();
  data.meals ? displayMeals(data.meals): displayMeals([]);
  $(".innerLoadingScreen").fadeOut(300);
}



function showContacts() {
  $(".rowData").html(`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `)
  submitBtn = document.getElementById("submitBtn")


  document.getElementById("nameInput").addEventListener("focus", () => {
      nameInputTouched = true
  })

  document.getElementById("emailInput").addEventListener("focus", () => {
      emailInputTouched = true
  })

  document.getElementById("phoneInput").addEventListener("focus", () => {
      phoneInputTouched = true
  })

  document.getElementById("ageInput").addEventListener("focus", () => {
      ageInputTouched = true
  })

  document.getElementById("passwordInput").addEventListener("focus", () => {
      passwordInputTouched = true
  })

  document.getElementById("repasswordInput").addEventListener("focus", () => {
      repasswordInputTouched = true
  })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
  if (nameInputTouched) {
      if (nameValidation()) {
          document.getElementById("nameAlert").classList.replace("d-block", "d-none")

      } else {
          document.getElementById("nameAlert").classList.replace("d-none", "d-block")

      }
  }
  if (emailInputTouched) {

      if (emailValidation()) {
          document.getElementById("emailAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("emailAlert").classList.replace("d-none", "d-block")

      }
  }

  if (phoneInputTouched) {
      if (phoneValidation()) {
          document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

      }
  }

  if (ageInputTouched) {
      if (ageValidation()) {
          document.getElementById("ageAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("ageAlert").classList.replace("d-none", "d-block")

      }
  }

  if (passwordInputTouched) {
      if (passwordValidation()) {
          document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

      }
  }
  if (repasswordInputTouched) {
      if (repasswordValidation()) {
          document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

      }
  }


  if (nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()) {
      submitBtn.removeAttribute("disabled")
  } else {
      submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}