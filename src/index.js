const inputSearch = $("input#searchByName");
const inputSearchByLetter = $("input#searchByFirstLetter");
const searchContainer = $(".searchSection");
const mealsContainer = $(".meals-container .grid");
const categoriesContainer = $(".categories-container .grid");
const areaContainer = $(".area-container .grid");
const ingredientsContainer = $(".ingredients-container .grid");
const contactUs = $(".contact-us .container");
const leftSidebar = $(".sidebar.left");
const searchTitleSidebar = $("#search-title-sidebar");
const categoryTitleSidebar = $("#category-title-sidebar");
const areaTitleSidebar = $("#area-title-sidebar");
const ingredientTitleSidebar = $("#ingredients-title-sidebar");
const contactTitleSidebar = $("#contact-title-sidebar");
const registerName = $("#register-name");
const registerEmail = $("#email");
const registerPhone = $("#phone");
const registerAge = $("#age");
const registerPassword = $("#password");
const registerRePassword = $("#repassword");
const submitButton = $("#submit-button");
const detailsContainer = $(".details .container");
let aValidation = false,
    bValidation = false,
    cValidation = false,
    dValidation = false,
    eValidation = false,
    fValidation = false;
let categories = [];
let container;

async function fetchMealsByName(query) {
    let v1Result = await fetch(
        `https:/www.themealdb.com/api/json/v1/1/search.php?s=${
            query || "chicken"
        }`
    );
    let result = await v1Result.json();
    return result.meals;
}
function displayMeals(arr) {
    mealsContainer.parentsUntil("body").siblings(".all").addClass("hidden");
    mealsContainer.parentsUntil("body").removeClass("hidden");
    mealsContainer.html("");
    for (const cat of arr.slice(0, 20)) {
        mealsContainer.append(`
            <div class="relative group overflow-hidden cursor-pointer" data-id-meal="${cat.idMeal}">
                <div class="img-layer bg-white text-center p-5 w-full h-full absolute top-96 group-hover:top-0 duration-500 bg-opacity-75 flex flex-col justify-center items-center">
                    <h3 class="category-name text-black  text-2xl font-bold z-10">${cat.strMeal}</h3>
                </div>
                <img
                    class="h-auto max-w-full rounded-lg"
                    src="${cat.strMealThumb}"
                    alt=""
                />
            </div>
            `);
    }
    mealsContainer.children().on("click", function () {
        fetchMealDetails($(this).attr("data-id-meal")).then((res) =>
            displayDetails(res)
        );
        detailsContainer.parent().removeClass("hidden");
        detailsContainer.parent().siblings(".all").addClass("hidden");
        searchContainer.parentsUntil("body").addClass("hidden");
    });
}

async function fetchMealDetails(query) {
    let v1Result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${
            query || "52772"
        }`
    );
    let result = await v1Result.json();
    return result.meals[0];
}
async function displayDetails(obj) {
    detailsContainer.html(`
                        <div class="w-4/12 h-96">
                    <div class="img-container w-8/12 mx-auto overflow-hidden rounded-3xl mt-8">
                        <img src="${obj.strMealThumb}" alt="" class="w-full">
                    </div>
                    <h3 class=" text-xl text-center">${obj.strMeal}</h3>
                </div>
                <div class="w-8/12 h-96 p-4">
                    <h3 class="text-2xl">Instructions:</h3>
                    <p class="">
                    ${obj.strInstructions}
                    </p>
                    <h4 class="text-xl"><span class="font-bold ">Area </span>: ${obj.strArea}</h4>
                    <h4 class="text-xl"><span class="font-bold ">Category</span>: ${obj.strCategory}</h4>
                    <h4 class="font-bold text-2xl">recipes:</h4>
                    <div class="recipes my-2">
                        <span class=" px-4 py-2 text-sky-700 bg-sky-200 rounded-xl">whatever</span>
                        <span class=" px-4 py-2 text-sky-700 bg-sky-200 rounded-xl">whatever</span>
                        <span class=" px-4 py-2 text-sky-700 bg-sky-200 rounded-xl">whatever</span>
                        <span class=" px-4 py-2 text-sky-700 bg-sky-200 rounded-xl">whatever</span>
                        <span class=" px-4 py-2 text-sky-700 bg-sky-200 rounded-xl">whatever</span>
                        <span class=" px-4 py-2 text-sky-700 bg-sky-200 rounded-xl">whatever</span>
                    </div>
                    <h4 class="font-bold text-2xl">Tags:</h4>
                    <div class="tags my-2">
                        <span class=" px-4 py-2 text-green-700 bg-green-200 rounded-xl">whatever</span>
                        <span class=" px-4 py-2 text-green-700 bg-green-200 rounded-xl">whatever</span>
                        <span class=" px-4 py-2 text-green-700 bg-green-200 rounded-xl">whatever</span>
                    </div>
                    <a href="${obj.strYoutube}" class="px-4 inline-block py-2 bg-red-600 rounded-3xl mt-4">youtube</a>
                    <a href="${obj.strYoutube}" class="px-4 inline-block py-2 bg-slate-600 rounded-3xl mt-4">source</a>
                </div>
        `);
}

async function fetchMealsByLetter(query) {
    let v1Result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${query || "b"}`
    );
    let result = await v1Result.json();
    return result.meals;
}

async function fetchMealsByCategory(query) {
    categories.includes(query) ? null : categories.push(query);
    let v1Result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${
            query || "chicken"
        }`
    );
    let result = await v1Result.json();
    return result.meals;
}
async function fetchMealsByingredient(query) {
    let v1Result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${
            query || "chicken_breast"
        }`
    );
    let result = await v1Result.json();
    return result.meals;
}
async function fetchByArea(query) {
    let v1Result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`
    );
    let result = await v1Result.json();
    return result.meals;
}

async function fetchAreaList() {
    let v1Result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let result = await v1Result.json();
    return result.meals;
}
async function fetchCategories() {
    let v1Result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let result = await v1Result.json();
    return result.categories;
}

async function fetchIngredientList() {
    let v1Result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let result = await v1Result.json();
    return result.meals;
}

function displayCategories(arr) {
    categoriesContainer.html("");
    for (const cat of arr) {
        categoriesContainer.append(`
            <div class="relative group overflow-hidden cursor-pointer" data-category="${
                cat.strCategory
            }">
                <div class="img-layer bg-white text-center p-5 w-full h-full absolute top-96 group-hover:top-0 duration-500 bg-opacity-75 flex flex-col justify-center items-center">
                    <h3 class="category-name text-black  text-2xl font-bold z-10">${
                        cat.strCategory
                    }</h3>
                    <p>
                    ${cat.strCategoryDescription
                        .split(" ")
                        .slice(0, 20)
                        .join(" ")}
                    </p>
                </div>
                <img
                    class="h-auto max-w-full rounded-lg"
                    src="${cat.strCategoryThumb}"
                    alt=""
                />
            </div>
            `);
    }
}
function displayAreaList(arr) {
    areaContainer.html("");
    console.log(arr);
    for (const cat of arr) {
        areaContainer.append(`
            <div class="relative group overflow-hidden cursor-pointer bg-blue-400 h-64" data-id="${cat.strArea}">
                <div class="img-layer bg-white text-center p-5 w-full h-full absolute top-96 group-hover:top-0 duration-500 bg-opacity-75 flex flex-col justify-center items-center">
                    <h3 class="category-name text-black  text-2xl font-bold z-10">${cat.strArea}</h3>
                </div>
                <img
                    class="h-auto max-w-full rounded-lg"
                    src=""
                    alt=""
                />
            </div>
            `);
    }
}
function displayIngredientList(arr) {
    ingredientsContainer.html("");
    console.log(arr);
    for (const cat of arr.slice(0, 20)) {
        ingredientsContainer.append(`
            <div class="relative group overflow-hidden cursor-pointer bg-sky-400 h-64" data-id="${
                cat.strIngredient
            }">
                <div class="img-layer bg-white text-center p-5 w-full h-full absolute top-96 group-hover:top-0 duration-500 bg-opacity-75 flex flex-col justify-center items-center">
                    <h3 class="category-name text-black  text-2xl font-bold z-10">${
                        cat.strIngredient
                    }</h3>
                                    <p>
                    ${cat.strDescription.split(" ").slice(0, 20).join(" ")}
                    </p>
                </div>
                <img
                    class="h-auto max-w-full rounded-lg"
                    src=""
                    alt=""
                />
            </div>
            `);
    }
}

inputSearch.on("input", function (e) {
    fetchMealsByName(e.target.value).then((res) => {
        displayMeals(res);
    });
});
inputSearchByLetter.on("input", function (e) {
    fetchMealsByLetter(e.target.value).then((res) =>
        displayMeals(res.slice(0, 20))
    );
});

// Initialize the sidebar
leftSidebar.sidebar({ side: "left", speed: 500 });

// Event to close the sidebar on button click
$("#toggleBtn").on("click", (e) => {
    if (leftSidebar.hasClass("sidebar-open")) {
        leftSidebar.trigger("sidebar:close");
        leftSidebar.removeClass("sidebar-open");
        let items = leftSidebar.find("li").toArray().reverse();
        $(items).each(function (index) {
            $(this)
                .delay(index * 60)
                .animate(
                    {
                        top: "200px",
                    },
                    {
                        duration: 700,
                        specialEasing: {
                            // width: "linear",
                            height: "easeBounce",
                        },
                    }
                );
        });
        $("#toggleBtn").html(` <i class="fa-solid fa-bars"></i>`);
    } else {
        leftSidebar.trigger("sidebar:open");
        leftSidebar.addClass("sidebar-open");
        //select all li in sidebar and animate
        leftSidebar.find("li").each(function (index) {
            $(this)
                .delay(index * 60)
                .animate(
                    {
                        top: "0px",
                    },
                    {
                        duration: 700,
                        specialEasing: {
                            // width: "linear",
                            height: "easeBounce",
                        },
                    }
                );
        });

        $("#toggleBtn").html('<i class="fa-solid fa-xmark"></i>');
    }
});

categoryTitleSidebar.on("click", () => {
    console.log("i'm clicked");
    console.log(
        categoriesContainer
            .parentsUntil("body")
            .siblings(".all")
            .addClass("hidden")
    );
    categoriesContainer.parentsUntil("body").removeClass("hidden");
    searchContainer.addClass("hidden");
});

areaTitleSidebar.on("click", () => {
    console.log("i'm clicked");
    areaContainer.parentsUntil("body").siblings(".all").addClass("hidden");
    areaContainer.parentsUntil("body").removeClass("hidden");
    searchContainer.addClass("hidden");
});

ingredientTitleSidebar.on("click", () => {
    console.log("i'm clicked");
    ingredientsContainer
        .parentsUntil("body")
        .siblings(".all")
        .addClass("hidden");
    ingredientsContainer.parentsUntil("body").removeClass("hidden");
    searchContainer.addClass("hidden");
});

searchTitleSidebar.on("click", () => {
    searchContainer.removeClass("hidden");
    mealsContainer.html("");
    displayMeals();
});

contactTitleSidebar.on("click", () => {
    contactUs.parentsUntil(".body").siblings(".all").addClass("hidden");
    contactUs.parentsUntil(".body").removeClass("hidden");
    searchContainer.addClass("hidden");
});

// Start All Standard Fetching

fetchCategories().then((res) => {
    displayCategories(res);
    categoriesContainer.children().on("click", function (e) {
        console.log($(this).attr("data-category"));
        fetchMealsByCategory($(this).attr("data-category")).then((res) => {
            console.log(res);
            displayMeals(res);
        });
    });
});

fetchAreaList().then((res) => {
    displayAreaList(res);
    areaContainer.children().on("click", function (e) {
        console.log($(this).attr("data-category"));
        fetchByArea($(this).attr("data-id")).then((res) => {
            displayMeals(res);
        });
    });
});

fetchIngredientList().then((res) => {
    displayIngredientList(res);
    ingredientsContainer.children().on("click", function (e) {
        console.log($(this).attr("data-category"));
        fetchMealsByingredient($(this).attr("data-id")).then((res) => {
            displayMeals(res);
        });
    });
});

registerName.on("change", function () {
    if (this.value == "") {
        $(this).next().removeClass("hidden");
        aValidation = false;
    } else {
        $(this).next().addClass("hidden");
        aValidation = true;
    }
});

registerEmail.on("input", function () {
    console.log(this.value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(this.value)) {
        console.log("ok");
        $(this).next().addClass("hidden");
        bValidation = true;
    } else {
        console.log("not Ok");
        $(this).next().removeClass("hidden");
        bValidation = false;
    }
});
registerPhone.on("input", function () {
    console.log(this.value);
    const phone = /^01[0-9]/;
    if (phone.test(this.value)) {
        console.log("ok");
        $(this).next().addClass("hidden");
        cValidation = true;
    } else {
        console.log("not Ok");
        $(this).next().removeClass("hidden");
        cValidation = false;
    }
});
registerAge.on("input", function () {
    console.log(this.value);
    const age = /^(1[01][0-9]|120|[1-9][0-9]?)$/;
    if (age.test(this.value)) {
        console.log("ok");
        $(this).next().addClass("hidden");
        dValidation = true;
    } else {
        console.log("not Ok");
        $(this).next().removeClass("hidden");
        dValidation = false;
    }
});
registerPassword.on("input", function () {
    console.log(this.value);
    const age = /^(?=.*[A-Za-z]).{8,}$/;
    if (age.test(this.value)) {
        console.log("ok");
        $(this).next().addClass("hidden");
        eValidation = true;
    } else {
        console.log("not Ok");
        $(this).next().removeClass("hidden");
        eValidation = false;
    }
});
registerRePassword.on("input", function () {
    console.log(registerPassword.eq(0)[0].value);
    if (registerPassword.val() == this.value) {
        $(this).next().addClass("hidden");
        fValidation = true;
    } else {
        console.log("not Ok");
        $(this).next().removeClass("hidden");
        fValidation = false;
    }
    if (
        validation(
            aValidation,
            bValidation,
            cValidation,
            dValidation,
            eValidation,
            fValidation
        )
    ) {
        submitButton.removeAttr("disabled");
    } else {
        submitButton.attr("disabled", true);
    }
});

function validation(a, b, c, d, e, f) {
    console.log(a, b, c, d, e, f);
    return a & b & c & d & e & f;
}
submitButton.attr(
    "disabled",
    validation(
        aValidation,
        bValidation,
        cValidation,
        dValidation,
        eValidation,
        fValidation
    )
);
// console.log(validation());
registerAge.val("");
registerEmail.val("");
registerName.val("");
registerPassword.val("");
registerPhone.val("");
registerRePassword.val("");
