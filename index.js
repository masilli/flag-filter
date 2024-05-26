import {countriesArray} from './countries.js'

const filterDash = document.getElementById("filter-dashboard")

const chosenContinent = document.getElementById("choose-continent")

const contDiv = document.getElementById("content")
const totalResults = document.getElementById("total-results")

//console.log(countriesArray)

let matchingFlags = countriesArray

filterDash.addEventListener('submit', function(e){
    e.preventDefault()

    if (chosenContinent.value){
        matchingFlags = countriesArray.filter(function(country){
            return country.continent === chosenContinent.value
        })
    } else {
        matchingFlags = countriesArray.filter(function(country){
            return country
        })
    }

    renderFlags()

})

function renderFlags() {
    contDiv.innerHTML = ''
    //console.log(matchingFlags.length);

    totalResults.textContent = matchingFlags.length

    // matchingFlags.forEach(region => {
    //     const countryNameElement = document.createElement('p');
    //     countryNameElement.innerHTML = `<img src="${region.flag}" height="100"><br>${region.name}`;
    //     contDiv.appendChild(countryNameElement);
    // });

    matchingFlags.forEach((region, index) => {
        setTimeout(function() {
            const countryNameElement = document.createElement('p');
            countryNameElement.innerHTML = `<img src="${region.flag}" height="100"><br>${region.name}`;
            contDiv.appendChild(countryNameElement);
        }, index * 25); // Each element is delayed by 500ms multiplied by its index
    });

}

//let selectedColor = "red";

//const matchingFlags = countriesArray.filter(function(country) {
    //if (country.colors) { // Check if colors property is defined
        //return country.colors.includes("red") && country.colors.includes("white") && !country.colors.includes("yellow") && !country.colors.includes("green") && !country.colors.includes("blue")  && !country.colors.includes("black") //&& country.hasSymbol;
        // return country.hasSymbol;
        // return !country.hasSymbol
        // return country.colors.includes("red") && country.colors.includes("yellow") && !country.colors.includes("green") && country.colors.includes("blue")  && !country.colors.includes("black");
        // return country.continent === "north-america"
        // return country
    //}
    //return false; // Return false if colors property is undefined
//});

function getColorsArray(countriesArray) {
    const colorsSet = new Set();
    for (let flag of countriesArray) {
        if (Array.isArray(flag.colors)) {
            for (let color of flag.colors) {
                colorsSet.add(color);
            }
        } else {
            console.warn(`The colors property of ${flag.name} is not an array`);
        }
    }
    return Array.from(colorsSet);
}

console.log(getColorsArray(countriesArray));