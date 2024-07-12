import { allRegions as countriesArray } from "./allRegionsV2.js";

const contDiv = document.getElementById("content");
const totalResults = document.getElementById("total-results");

const filterDash = document.getElementById("filter-dashboard");


let matchingFlags = countriesArray;

// filterDash.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const independentOptions = [
//     ...document.querySelectorAll(
//       '#independent-options input[type="checkbox"]:checked'
//     ),
//   ].map((checkbox) => checkbox.value);
//   const selectedContinents = [
//     ...document.querySelectorAll(
//       '#continent-options input[type="checkbox"]:checked'
//     ),
//   ].map((checkbox) => checkbox.value);
//   const selectedColors = [
//     ...document.querySelectorAll(
//       '#color-options input[type="checkbox"]:checked'
//     ),
//   ].map((checkbox) => checkbox.value);
//   const selectedFlagTypes = [
//     ...document.querySelectorAll(
//       '#flag-options input[type="checkbox"]:checked'
//     ),
//   ].map((checkbox) => checkbox.value);
//   const selectedSymbols = [
//     ...document.querySelectorAll(
//       '#symbol-options input[type="checkbox"]:checked'
//     ),
//   ].map((checkbox) => checkbox.value);

//   if (selectedContinents.length === 0) {
//     //console.log("empty: "+selectedContinents)
//     matchingFlags = [];
//   } else {
//     matchingFlags = countriesArray.filter((country) => {
//       let includeIndependent = 
//         independentOptions.length === 0 ||
//         (independentOptions.includes("independent") && country.isCountry) ||
//         (independentOptions.includes("not-independent") && !country.isCountry);
//       let includeContinents =
//         selectedContinents.length === 0 ||
//         selectedContinents.includes(country.continent);
//       let includeColors =
//         selectedColors.length === 0 ||
//         selectedColors.every((color) => country.colors.includes(color));
//       let includeFlagTypes =
//         selectedFlagTypes.length === 0 ||
//         selectedFlagTypes.includes(country.flagType);
//       let includeSymbols = 
//         selectedSymbols.length === 0 || 
//         selectedSymbols.some(symbol => symbol === 'none' ? 
//           !country.hasSymbol : country.symbol.includes(symbol));
//       return includeIndependent && includeContinents && includeColors && includeFlagTypes && includeSymbols;
//     });
//   }
//   renderFlags();
// });

// Define the filtering function
function filterCountries() {
  const independentOptions = [
    ...document.querySelectorAll(
      '#independent-options input[type="checkbox"]:checked'
    ),
  ].map((checkbox) => checkbox.value);
  const selectedContinents = [
    ...document.querySelectorAll(
      '#continent-options input[type="checkbox"]:checked'
    ),
  ].map((checkbox) => checkbox.value);
  const selectedColors = [
    ...document.querySelectorAll(
      '#color-options input[type="checkbox"]:checked'
    ),
  ].map((checkbox) => checkbox.value);
  const selectedFlagTypes = [
    ...document.querySelectorAll(
      '#flag-options input[type="checkbox"]:checked'
    ),
  ].map((checkbox) => checkbox.value);
  const selectedSymbols = [
    ...document.querySelectorAll(
      '#symbol-options input[type="checkbox"]:checked'
    ),
  ].map((checkbox) => checkbox.value);

  if (selectedContinents.length === 0) {
    matchingFlags = [];
  } else {
    matchingFlags = countriesArray.filter((country) => {
      let includeIndependent = 
        independentOptions.length === 0 ||
        (independentOptions.includes("independent") && country.isCountry) ||
        (independentOptions.includes("not-independent") && !country.isCountry);
      let includeContinents =
        selectedContinents.length === 0 ||
        selectedContinents.includes(country.continent);
      let includeColors =
        selectedColors.length === 0 ||
        selectedColors.every((color) => country.colors.includes(color));
      let includeFlagTypes =
        selectedFlagTypes.length === 0 ||
        selectedFlagTypes.includes(country.flagType);
      let includeSymbols = 
        selectedSymbols.length === 0 || 
        selectedSymbols.some(symbol => symbol === 'none' ? 
          !country.hasSymbol : country.symbol.includes(symbol));
      return includeIndependent && includeContinents && includeColors && includeFlagTypes && includeSymbols;
    });
  }
  renderFlags();
}

// Attach event listeners to all checkboxes
document.querySelectorAll('#independent-options input[type="checkbox"], #continent-options input[type="checkbox"], #color-options input[type="checkbox"], #flag-options input[type="checkbox"], #symbol-options input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('change', filterCountries);
});

renderFlags();

function renderFlags() {
  contDiv.innerHTML = "";

  totalResults.textContent = matchingFlags.length;

  matchingFlags.forEach((region) => {
    const countryNameElement = document.createElement("p");
    countryNameElement.classList.add("country");
    countryNameElement.innerHTML = `
    <figure>
        <img src="${region.flag}" alt="${region.name} flag">
        <figcaption>
        <span class="region-name">${region.name}</span>
        </figcaption>
    </figure>`;

    // myModal
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const modalCountryName = document.getElementById("modal-country-name");
    const modalCountryFlag = document.getElementById("modal-country-flag");
    const modalCountryCapital = document.getElementById("modal-country-capital");
    const modalCountryContinent = document.getElementById("modal-country-continent");
    const modalCountryColors = document.getElementById("modal-country-colors");
    const modalCountryFlagType = document.getElementById("modal-country-flag-type");
    const modalCountryFlagSymbol = document.getElementById("modal-country-flag-symbol");
    const modalCountryWiki = document.getElementById("modal-country-wikipedia");

    countryNameElement.querySelector("figure").addEventListener("click", () => {
      const country = matchingFlags.find((c) => c.id === region.id);
      if (country) {
        modalCountryName.textContent = country.name;
        modalCountryFlag.src = `${country.flag}`;
        modalCountryCapital.textContent = `Capital: ${country.capital}`;
        modalCountryContinent.textContent = `Continent: ${country.continent}`;
        modalCountryColors.textContent = `Colors: ${country.colors}`;
        modalCountryFlagType.textContent = `Flag type: ${country.flagType}`;
        modalCountryFlagSymbol.textContent = `Symbol: ${country.symbol}`;
        modalCountryWiki.innerHTML = `<a href="https://en.wikipedia.org/wiki/Flag_of_${country.name}" target="_blank">More information</a>`;
        modal.style.display = "block";
      }
    });

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    contDiv.appendChild(countryNameElement);
  });
}
