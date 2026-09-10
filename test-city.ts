import airportData from "airport-data-js";
async function run() {
  const suggestions = await airportData.getAutocompleteSuggestions("London");
  console.log(JSON.stringify(suggestions.slice(0, 5), null, 2));
}
run();
