// Variables
const urlBase= "https://api.punkapi.com/v2/beers?page=";
const filterABV = document.getElementById("filterABV");
const filterIBU = document.getElementById("filterIBU");
const pageText = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
let optionsABV = "", optionsIBU = "", page = 1;
const beerNameDisplay = document.querySelector('.beers');


// Fileters
filterABV.addEventListener("change", e=>{
    const value = e.target.value;

    switch(value){
        case "all": 
            optionsABV = "";
            break
        case "weak": 
            optionsABV = "&abv_lt=4.6";
            break
        case "medium":
            optionsABV = "&abv_gt=4.5&abv_lt=7.6";
            break
        case "strong":
            optionsABV = "&abv_gt=7.5";
            break
    }

    page = 1;
    getBeers();
})

filterIBU.addEventListener("change", e=>{
    const v = e.target.value;

    switch(v){
        case "all": 
            optionsIBU = "";
            break
        case "weak": 
            optionsIBU = "&ibu_lt=35";
            break
        case "medium":
            optionsIBU  = "&ibu_gt=34&ibu_lt=75";
            break
        case "strong":
            optionsIBU  = "&ibu_gt=74";
            break

    }
    page = 1;
    getBeers();
})



async function getBeers(){

    const url = urlBase+ page+ optionsABV + optionsIBU;
    console.log(url);

    const response = (await fetch(url));
    const beerData = await response.json();
    
    console.log(beerData);

    pageText.innerText = page;

    if(page === 1) {
        prevPage.disabled = true;
    } else {
        prevPage.disabled = false;
    }
    if (beerData.length < 25){
        nextPage.disabled = true;
    }else{
        nextPage.disabled = false;
    }
    


    beerName = '';

    const genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';

    beerData.forEach(b => {
        beerName += `
        <div class='beer-wrapper card'>
        <div class='beer'>
            <img class='beer__img' src="${b.image_url ? b.image_url : genericBottle}">
            <h3>${b.name}</h3>
            <span class='beer__info'>
                <span>ABV: ${b.abv}%</span>
                <span>IBU: ${b.ibu}</span>
            </span>
        </div>
        <div class='beer__content'>
            <div class='beer__name'>${b.name}</div>
            <div class='beer__tagline'>${b.tagline}</div>
            <div class='beer__description'>${b.description}</div>
            <div class='beer__food-pairing'>
                Pair with: ${b.food_pairing.join(', ')}
            </div>
        </div>
    </div>
        `;
    })

    beerNameDisplay.innerHTML = `${beerName}`;
}


// Pagination

prevPage.addEventListener('click',()=>{
    page--;
    getBeers();
} )
nextPage.addEventListener('click', () => {
    page++;
    getBeers();
});

getBeers()