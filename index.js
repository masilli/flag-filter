import {countriesArray} from './countries.js'

const filterDash = document.getElementById("filter-dashboard")

const yesSymbolRadio = document.getElementById("has-symbol-yes")
const noSymbolRadio = document.getElementById("has-symbol-no")
const eitherSymbolRadio = document.getElementById("has-symbol-either")
const chosenContinent = document.getElementById("choose-continent")

const contDiv = document.getElementById("content")
const totalResults = document.getElementById("total-results")

//console.log(countriesArray)

let matchingFlags = countriesArray

// renderFlags()

function getSelectedColors(containerId) {
    const container = document.getElementById(containerId);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// filterDash.addEventListener('submit', function(e){
//     e.preventDefault()

    // if (chosenContinent.value !== 'all'){
    //     matchingFlags = countriesArray.filter(function(country){
    //         return country.continent === chosenContinent.value
    //     })
    // } else {
    //     matchingFlags = countriesArray
    // }

    // if (yesSymbolRadio.checked){
    //     matchingFlags = countriesArray.filter(function(country){
    //         return country.hasSymbol
    //     })
    // } else if (noSymbolRadio.checked){
    //     matchingFlags = countriesArray.filter(function(country){
    //         return !country.hasSymbol
    //     })
    // }

    // if (chosenContinent.value !== 'all'){

    //     if (yesSymbolRadio.checked){
    //         matchingFlags = countriesArray.filter(function(country){
    //             return country.continent === chosenContinent.value && country.hasSymbol
    //         })
    //     } else if (noSymbolRadio.checked){
    //         matchingFlags = countriesArray.filter(function(country){
    //             return country.continent === chosenContinent.value && !country.hasSymbol
    //         })
    //     } else {
    //         matchingFlags = countriesArray.filter(function(country){
    //             return country.continent === chosenContinent.value
    //         })
    //     }

    // } else {
    //     matchingFlags = countriesArray
    // }

//     matchingFlags = countriesArray.filter(function (country) {
//         let matchesContinent = chosenContinent.value === 'all' || chosenContinent.value === country.continent
//         let matchesSymbol

//         if (yesSymbolRadio.checked) {
//             matchesSymbol = country.hasSymbol
//         } else if (noSymbolRadio.checked) {
//             matchesSymbol = !country.hasSymbol
//         } else {
//             matchesSymbol = true
//         }

//         return matchesContinent && matchesSymbol
//     });

//     renderFlags()

// })

filterDash.addEventListener('submit', function (e) {
    e.preventDefault()

    let includeColors = getSelectedColors('filter-container-include-colors')
    let excludeColors = getSelectedColors('filter-container-exclude-colors')

    matchingFlags = countriesArray.filter(function (country) {
        let matchesContinent = chosenContinent.value === 'all' || chosenContinent.value === country.continent
        let matchesSymbol = yesSymbolRadio.checked ? country.hasSymbol : noSymbolRadio.checked ? !country.hasSymbol : true
        let matchesIncludeColors = includeColors.length === 0 || includeColors.some(color => country.colors.includes(color))
        let matchesExcludeColors = excludeColors.length === 0 || !excludeColors.some(color => country.colors.includes(color))
        
        return matchesContinent && matchesSymbol && matchesIncludeColors && matchesExcludeColors
    });

    renderFlags()
});

renderFlags()

function renderFlags() {
    contDiv.innerHTML = ''
    //console.log(matchingFlags.length);

    totalResults.textContent = matchingFlags.length

    matchingFlags.forEach(region => {
        const countryNameElement = document.createElement('p');
        countryNameElement.classList.add("country")
        countryNameElement.innerHTML = `<img src="${region.flag}"><br><span class="region-name">${region.name}</span>`
        contDiv.appendChild(countryNameElement);
    });

    // matchingFlags.forEach((region, index) => {
    //     setTimeout(function() {
    //         const countryNameElement = document.createElement('p');
    //         countryNameElement.classList.add("country")
    //         countryNameElement.innerHTML = `<img src="${region.flag}"><br><span class="region-name">${region.name}</span>`
    //         contDiv.appendChild(countryNameElement)
    //     }, index * 20)
    // });

    // create checkboxes
    function colorCheckboxes() {
        const checkboxes = document.querySelectorAll("input[type='checkbox']")
        checkboxes.forEach(checkbox => {
            checkbox.style.backgroundColor = checkbox.value
        })
    }

    colorCheckboxes()

    function getColorsCount(matchingFlags) {
        const colorsCount = {}
    
        for (let flag of matchingFlags) {
            if (Array.isArray(flag.colors)) {
                for (let color of flag.colors) {
                    if (colorsCount[color]) {
                        colorsCount[color]++
                    } else {
                        colorsCount[color] = 1
                    }
                }
            } else {
                console.warn(`The colors property of ${flag.name} is not an array`)
            }
        }
    
        return colorsCount;
    }
    
    //console.log(getColorsCount(matchingFlags))
    
    function renderColorsCount(colorsCount) {
        const container = document.querySelector(".info")
        container.innerHTML = "" // Clear the container before rendering new content
    
        // for (let color in colorsCount) {
        //     const colorElement = document.createElement("div");
        //     colorElement.textContent = `${color}: ${colorsCount[color]}`;
        //     container.appendChild(colorElement);
        // }
        const sortedColors = Object.entries(colorsCount).sort((a, b) => b[1] - a[1])

        // Render the sorted array
        for (let [color, count] of sortedColors) {
            const colorElement = document.createElement("div")
            if (color === "black" || color === "blue" || color === "maroon") {
                colorElement.innerHTML = `${color}<br><span class="individual-color-count" style="background:${color};color:#fff;">${count}</span>`
            } else {
                colorElement.innerHTML = `${color}<br><span class="individual-color-count" style="background:${color}">${count}</span>`
            }
            
            container.appendChild(colorElement)
        }
    }
    
    const colorsCount = getColorsCount(matchingFlags)
    renderColorsCount(colorsCount)

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

// function getColorsArray(countriesArray) {
//     const colorsSet = new Set();
//     for (let flag of countriesArray) {
//         if (Array.isArray(flag.colors)) {
//             for (let color of flag.colors) {
//                 colorsSet.add(color);
//             }
//         } else {
//             console.warn(`The colors property of ${flag.name} is not an array`);
//         }
//     }
//     return Array.from(colorsSet);
// }

// console.log(getColorsArray(countriesArray))

// function getColorsCount(countriesArray) {
//     const colorsCount = {};

//     for (let flag of countriesArray) {
//         if (Array.isArray(flag.colors)) {
//             for (let color of flag.colors) {
//                 if (colorsCount[color]) {
//                     colorsCount[color]++;
//                 } else {
//                     colorsCount[color] = 1;
//                 }
//             }
//         } else {
//             console.warn(`The colors property of ${flag.name} is not an array`);
//         }
//     }

//     return colorsCount;
// }

// console.log(getColorsCount(countriesArray))

// function renderColorsCount(colorsCount) {
//     const container = document.querySelector(".info");
//     container.innerHTML = ""; // Clear the container before rendering new content

//     for (let color in colorsCount) {
//         const colorElement = document.createElement("div");
//         colorElement.textContent = `${color}: ${colorsCount[color]}`;
//         container.appendChild(colorElement);
//     }
// }

// const colorsCount = getColorsCount(countriesArray);
// renderColorsCount(colorsCount);