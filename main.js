//Accessing Form
const searchForm = document.querySelector('form');
//Accessing Search-result
const searchResultDiv = document.querySelector('.searchResult');

let searchQuery = '';

const APP_ID = '859b0070';
const APP_key = 'b4b82f1d5a14800f6cf7fb452fc93aab';

searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    //get input value from form
    searchQuery = e.target.querySelector('input').value;
    //Fetch
    fetchApi();

});

async function fetchApi(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=12`
    const resp = await fetch(baseURL)
    const data = await resp.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results){
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `<div class="item">
            <img src = ${result.recipe.image} alt="${result.recipe.label}">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a href="${result.recipe.url}" target = "_blank" class="viewButton">View Recipe</a>
            </div>
            <p class="itemData">Calories: ${result.recipe.calories.toFixed(0)}</p>  
            <p class="itemData">Cuisine Type: ${result.recipe.cuisineType}</p>
            <p class="itemData">Dish Type: ${result.recipe.dishType}</p>  
            <p class="itemData">Source: ${result.recipe.source}</p> 
        </div>`
    })
    searchResultDiv.innerHTML = generatedHTML;
}
