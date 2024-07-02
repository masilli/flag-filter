// import { countriesArrayV2 } from "./countriesV2.js";
// import { allRegions } from "./allRegions.js";
// import { uniqueRegions } from "./uniqueRegions.js";
// import { updatedUniqueRegions } from "./updatedUniqueRegions.js";
import { allRegions } from "./allRegionsV2.js";

//console.log(countriesArrayV2)
//console.log(allRegions)


const convDiv = document.getElementById("converter");

// ** ADD MISSING PROPERTIES TO COUNTRIES ARRAY ** //
// const updatedCountriesArray = countriesArray.map((country) => ({
//   ...country,
//   isCountry: true,
//   flagType: "bicolor",
//   symbol: ["circle", "sun"],
// }));

// **  stringify the array and render it to html ** //
// convDiv.innerHTML = `<pre>${JSON.stringify(
//   updatedCountriesArray,
//   null,
//   2
// )}</pre>`;

// const commonCountries = countriesArrayV2.filter(country =>
//   allRegions.some(region => region.countryName === country.name)
// );

// const uniqueRegions = allRegions.filter(region =>
//   !countriesArrayV2.some(country => country.name === region.countryName)
// );

// const newUpdatedUniqueRegions = updatedUniqueRegions.map((country) => ({
//     ...country,
//   colors: ["color", "color"],
//   hasSymbol: true,
//   flagType: "bicolor",
//   symbol: ["circle", "sun"]
// }));


// const sortedRegions = allRegions.sort((a, b) => a.name.localeCompare(b.name));

// // Step 2: Reset the 'id' for each object
// const updatedRegions = sortedRegions.map((region, index) => ({
//   ...region,
//   id: index + 1,
// }));


convDiv.innerHTML = `<pre>${JSON.stringify(
  allRegions,
  null,
  2
)}</pre>`;