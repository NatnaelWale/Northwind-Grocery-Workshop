"use strict";

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
  fetchCourseData(apiBaseUrl)
    .then((data) => {
        displaySelectedProduct(data);
    //   console.log(data)
    });
}

function fetchCourseData(apiUrl) {
  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching course data:', error));
}

function displaySelectedProduct(products) {
  for (let product of products) { 
    if ( product.productId == productNumber) {
        displayProductDetails(product);
    //   console.log(product)
    }
  }
}

function displayProductDetails(product) {
  let productName = createProductDetailElement("Product Name", product.productName);
  let unitPrice = createProductDetailElement("Unit Price", `$${product.unitPrice}`);
  let supplier = createProductDetailElement("Supplier", product.supplier);
  let unitsInStock = createProductDetailElement("Units in Stock", product.unitsInStock);

  resultsDisplay.appendChild(productName);
  resultsDisplay.appendChild(unitPrice);
  resultsDisplay.appendChild(supplier);
  resultsDisplay.appendChild(unitsInStock);
}

function createProductDetailElement(label, value) {
  let element = document.createElement("h3");
  element.innerHTML = `${label}: ${value}`;
  return element;
}
