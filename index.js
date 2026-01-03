// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";
//Select all required elements
const input = document.querySelector("#state-input");
const btn = document.querySelector("#fetch-alerts");
const alertsDisplay = document.querySelector("#alerts-display");
const errorMessage = document.querySelector("#error-message");

//Function to fetch weather alerts
async function fetchWeatherAlerts(state) {
  const api = `https://api.weather.gov/alerts/active?area=${state}`;
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error("Error fetching weather alerts");
    }
    const data = await response.json();
    return data;
    // console.log(data);
    // displayAlerts(data);
  } catch (error) {
    throw new Error(error.message);
  }
}
//Display alerts on the page
function displayAlerts(data, state) {
  alertsDisplay.innerHTML = "";
  const alertCount = data.features.length;
  const title = document.createElement("h2");
  title.textContent = `Weather Alerts: ${alertCount}`;
  alertsDisplay.appendChild(title);

  const list = document.createElement("ul");

  data.features.forEach((alert) => {
    const listItem = document.createElement("li");
    listItem.textContent = alert.properties.headline;
    list.appendChild(listItem);
  });
  alertsDisplay.appendChild(list);
}
//Error handling: clear any existing error and hide the error element
function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}
//Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}
//Add event listener and create the main logic
btn.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();
  alertsDisplay.innerHTML = "";
  clearError();
  if (!state) {
    showError("State abbreviation is required");
    return;
  }
  alertsDisplay.textContent = "Fetching data...";
  try {
    const data = await fetchWeatherAlerts(state);
    displayAlerts(data, state);
    input.value = "";
  } catch (error) {
    showError(error.message);
  }
});
