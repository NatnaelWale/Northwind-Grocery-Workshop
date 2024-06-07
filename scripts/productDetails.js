"use strict";

let images = [
  { categoryId: "1", image: "/images/beverages.png" },
  { categoryId: "2", image: "/images/Condiments.png" },
  { categoryId: "3", image: "/images/Confections.png" },
  { categoryId: "4", image: "/images/Dair Products.png" },
  { categoryId: "5", image: "/images/Grains and Cereals.png" },
  { categoryId: "6", image: "/images/Meat Poultru.png" },
  { categoryId: "7", image: "/images/Produce.png" },
  { categoryId: "8", image: "/images/Seafood.png" },
];

const apiBaseUrl = "http://localhost:8081/api/products";
let productNumber;

window.onload = () => {
    getproductIdFromUrl();
    loadProductData();
};

const resultsDisplay = document.getElementById("resultsDisplay");

function getproductIdFromUrl() {
  let urlParams = new URLSearchParams(location.search);
  if (urlParams.has("productId")) {
    productNumber = urlParams.get("productId");
  }
}

function loadProductData() {
    resultsDisplay.innerHTML = "";
    fetchProductData(apiBaseUrl)
    .then((data) => {
        displaySelectedProduct(data);
    });
}

function fetchProductData(apiUrl) {
  return fetch(apiUrl)
    .then((response) => response.json())
}

function displaySelectedProduct(products) {
  for (let product of products) { 
    if ( product.productId == productNumber) {
      displayData(product);
      // console.log(product)
    }
  }
}

function createProductDetailElement(label, value) {
  let element = document.createElement("h3");
  element.innerHTML = `${label}: ${value}`;
  return element;
}

function displayData(data) {
  const resultsDisplay = document.getElementById("resultsDisplay");
  resultsDisplay.className = "d-block";
  resultsDisplay.innerHTML = "";
  const table = createTable();
    const row = document.createElement("tr");
    row.appendChild(createCell(data.productName));
    row.appendChild(createCell(`$${data.unitPrice}`));
    row.appendChild(createCell(data.supplier));
    row.appendChild(createCell(data.unitsInStock))
    for (let image of images) {
      if (data.categoryId == image.categoryId) {
        const categoryImage = document.createElement("img");
        categoryImage.className = "w-100";
        categoryImage.src = image.image;
        row.appendChild(categoryImage);
      }
    }
    table.querySelector("tbody").appendChild(row);

  resultsDisplay.appendChild(table);
}

function createTable() {
  const table = document.createElement("table");
  table.id = "CourseListings";
  table.className = "table table-striped table-hover border mt-5";

  const thead = document.createElement("thead");
  thead.className = "table-dark";

  const headerRow = document.createElement("tr");
  ["Name", "Price", "Supplier", "Stock", "Category"].forEach((text) => {
    const header = document.createElement("th");
    header.textContent = text;
    headerRow.appendChild(header);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.className = "table-group-divider";
  table.appendChild(tbody);

  return table;
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  cell.className = "w-25";
  return cell;
}

