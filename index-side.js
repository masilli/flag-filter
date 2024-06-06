import {countriesArray} from './countries.js'

const contDiv = document.getElementById("content")
const totalResults = document.getElementById("total-results")

const filterDash = document.getElementById("filter-dashboard")

//const chosenContinents = document.getElementById("continent-options")

//console.log(countriesArray)

let matchingFlags = countriesArray

// filterDash.addEventListener('submit', function (e) {
//     e.preventDefault()

//     matchingFlags = countriesArray.filter(function (country) {
//         let matchesContinent = chosenContinents.value === '' || chosenContinents.value === country.continent
        
//         return matchesContinent
//     });

//     renderFlags()
// })

filterDash.addEventListener('submit', function (e) {
    e.preventDefault()

    const selectedContinents = [...document.querySelectorAll('#continent-options input[type="checkbox"]:checked')].map(checkbox => checkbox.value)
    const selectedColors = [...document.querySelectorAll('#color-options input[type="checkbox"]:checked')].map(checkbox => checkbox.value)

    if (selectedContinents.length === 0 || selectedColors.length === 0) {
        //console.log("empty: "+selectedContinents)
        matchingFlags = []
    } else {
        matchingFlags = countriesArray.filter(country => {
            let includeContinents = selectedContinents.length === 0 || selectedContinents.includes(country.continent)
            let includeColors = selectedColors.length === 0 || selectedColors.some(color => country.colors.includes(color))
            return includeContinents && includeColors
        })
    }
    renderFlags()
})

renderFlags()

function renderFlags() {
    contDiv.innerHTML = ''

    totalResults.textContent = matchingFlags.length

    matchingFlags.forEach(region => {
        const countryNameElement = document.createElement('p');
        countryNameElement.classList.add("country")
        countryNameElement.innerHTML = `<img src="${region.flag}"><br><span class="region-name">${region.name}</span>`
        contDiv.appendChild(countryNameElement);
    });
}