"use strict";
const cardsContainer = document.querySelector(".cards-container");
const button1Element = document.getElementById("button1");
const button2Element = document.getElementById("button2");
const button3Element = document.getElementById("button3");

const renderedCards = (properties) => {
  cardsContainer.innerHTML = "";

  properties.forEach((property) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("property-card");

    const imagesDiv = document.createElement("div");
    imagesDiv.classList.add("images-box");

    const imgElement = document.createElement("img");
    imgElement.src = property.image;

    const paragraphsDiv = document.createElement("div");
    paragraphsDiv.classList.add("description-box");

    const priceParagraph = document.createElement("p");
    priceParagraph.innerText = `${property.price} \u20AC`;

    const cityParagraph = document.createElement("p");
    cityParagraph.innerText = property.city;

    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.innerText = property.description;

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-outline-secondary");
    removeButton.innerText = "Remove card";
    // deleteButton.addEventListener("click", () => deleteProperty(property.id));

    cardsContainer.append(cardDiv);
    cardDiv.append(imagesDiv, paragraphsDiv, removeButton);
    imagesDiv.append(imgElement);
    paragraphsDiv.append(priceParagraph, cityParagraph, descriptionParagraph);
  });
};

const fetchApi = async () => {
  try {
    const res = await fetch("https://robust-safe-crafter.glitch.me/");
    const propertyList = await res.json();
    console.log(propertyList);

    renderedCards(propertyList);

    // const findIndexRemoved = propertyList.findIndex(
    //   (t) => t.title === task.title
    // );

    // if (findIndexRemoved !== -1) {
    //   container.innerHTML = "";
    //   removedArray.splice(findIndexRemoved, 1);
    // }

    const firstFilter = () => {
      button1Element.setAttribute("class", "btn btn-outline-success");
      button2Element.setAttribute("class", "btn btn-outline-secondary");
      button3Element.setAttribute("class", "btn btn-outline-secondary");

      const filteredByCity = propertyList.filter((property) => {
        return property.city === "Vilnius";
      });
      renderedCards(filteredByCity);
    };

    const secondFilter = () => {
      button1Element.setAttribute("class", "btn btn-outline-secondary");
      button2Element.setAttribute("class", "btn btn-outline-success");
      button3Element.setAttribute("class", "btn btn-outline-secondary");

      const filteredByCity = propertyList.filter((property) => {
        return property.city === "Kaunas";
      });
      renderedCards(filteredByCity);
    };

    const thirdFilter = () => {
      button1Element.setAttribute("class", "btn btn-outline-secondary");
      button2Element.setAttribute("class", "btn btn-outline-secondary");
      button3Element.setAttribute("class", "btn btn-outline-success");

      const filteredByCity = propertyList.filter((property) => {
        return property.city === "Klaipeda";
      });
      renderedCards(filteredByCity);
    };

    button1Element.addEventListener("click", firstFilter);
    button2Element.addEventListener("click", secondFilter);
    button3Element.addEventListener("click", thirdFilter);
    removeButton.addEventListener("click", deleteProperty);
  } catch {
    console.error(`Download error: ${error.message}`);
  }
};

const deleteProperty = async () => {
  try {
    const res = await fetch("https://robust-safe-crafter.glitch.me/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    });

    if (res.ok) {
      console.log(`Property deleted successfully.`);
      fetchApi();
    } else {
      throw new Error(
        `Failed to delete property. Server returned: ${res.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error deleting property: ${error.message}`);
  }
};

fetchApi();
