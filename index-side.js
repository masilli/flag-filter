import { countriesArray } from "./countries.js"

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

filterDash.addEventListener("submit", function (e) {
  e.preventDefault()

  const selectedContinents = [
    ...document.querySelectorAll(
      '#continent-options input[type="checkbox"]:checked'
    ),
  ].map((checkbox) => checkbox.value)
  const selectedColors = [
    ...document.querySelectorAll(
      '#color-options input[type="checkbox"]:checked'
    ),
  ].map((checkbox) => checkbox.value)

  if (selectedContinents.length === 0 || selectedColors.length === 0) {
    //console.log("empty: "+selectedContinents)
    matchingFlags = []
  } else {
    matchingFlags = countriesArray.filter((country) => {
      let includeContinents =
        selectedContinents.length === 0 ||
        selectedContinents.includes(country.continent)
      let includeColors =
        selectedColors.length === 0 ||
        selectedColors.some((color) => country.colors.includes(color))
      return includeContinents && includeColors
    })
  }
  renderFlags()
})

renderFlags()

function renderFlags() {
  contDiv.innerHTML = ""

  totalResults.textContent = matchingFlags.length

  matchingFlags.forEach((region) => {
    const countryNameElement = document.createElement("p")
    countryNameElement.classList.add("country")
    // countryNameElement.innerHTML = `<img src="${region.flag}"><br><span class="region-name">${region.name}</span>`
    countryNameElement.innerHTML = `
    <figure>
        <img src="${region.flag}" alt="${region.name} flag">
        <figcaption>
        <span class="region-name">${region.name}</span>
        </figcaption>
    </figure>`

    // myModal
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName('close')[0];
  const modalCountryName = document.getElementById('modal-country-name');
  const modalCountryFlag = document.getElementById('modal-country-flag');
  const modalCountryCapital = document.getElementById('modal-country-capital');
  const modalCountryContinent = document.getElementById('modal-country-continent');
  const modalCountryColors = document.getElementById('modal-country-colors');

  countryNameElement.querySelector('figure').addEventListener('click', () => {
    const country = matchingFlags.find(c => c.id === region.id);
    if (country) {
      modalCountryName.textContent = `Name: ${country.name}`;
      modalCountryFlag.src = `${country.flag}`;
      modalCountryCapital.textContent = `Capital: ${country.capital}`;
      modalCountryContinent.textContent = `Continent: ${country.continent}`;
      modalCountryColors.textContent = `Colors: ${country.colors.join(', ')}`;
      modal.style.display = 'block';
    }
  });

  span.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }

    contDiv.appendChild(countryNameElement)
  })
  

}
