"use strict";

const addPropertyButton = document.getElementById("add");

const imageInput = document.getElementById("imageInput");
const priceInput = document.getElementById("priceInput");
const cityInput = document.getElementById("cityInput");
const descriptionInput = document.getElementById("descriptionInput");

const statusMessages = document.getElementById("statusMessages");

const cities = ["Vilnius", "Kaunas", "Klaipeda", "Šiauliai", "Panevėžys"];

cities.forEach((city) => {
  const addCity = document.getElementById("cityInput");
  const option = document.createElement("option");
  option.setAttribute("value", city);
  option.innerText = city;
  addCity.append(option);
});

function displayStatus(isOk, text) {
  const statusDiv = document.getElementById("statusMessages");
  const statusText = document.createElement("h1");
  statusDiv.style.color = isOk ? "03d3b2" : "red";
  statusText.innerHTML = text;
  statusDiv.append(statusText);
}

const addProperty = () => {
  const imageInputValue = imageInput.value;
  const priceInputValue = priceInput.value;
  const cityInputValue = cityInput.value;
  const descriptionInputValue = descriptionInput.value;

  const newProperty = {
    image: imageInputValue,
    price: priceInputValue,
    city: cityInputValue,
    description: descriptionInputValue,
  };

  statusMessages.innerHTML = "";

  fetch("https://robust-safe-crafter.glitch.me/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProperty),
  })
    .then((res) => {
      if (res.ok) {
        displayStatus(res.ok, "Property successfully added.");
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch((error) => {
      displayStatus(false, `Something went wrong. Server returned: ${error}.`);
    });
};

addPropertyButton.addEventListener("click", addProperty);
