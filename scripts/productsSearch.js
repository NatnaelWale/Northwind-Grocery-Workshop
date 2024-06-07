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

// Let's define the radio buttons
const onSearchByCategoryBtn = document.getElementById("category");
const onDisplayAllGroceryBtn = document.getElementById("displayAll");

// Let's define the dropdown and result displaying divs
const dropdownDisplay1 = document.getElementById("dropdownDisplay1");
const resultsDisplay = document.getElementById("resultsDisplay");

window.onload = () => {
  onSearchByCategoryBtn.addEventListener("change", populateOptions);
  onDisplayAllGroceryBtn.addEventListener("change", populateOptions);
};

function populateOptions() {
  dropdownDisplay1.innerHTML = "";
  if (onSearchByCategoryBtn.checked) {
    populateCategoriesOptions();
  } else if (onDisplayAllGroceryBtn.checked) {
    populateAllGroceries();
  }
}

function populateCategoriesOptions() {
  let categoryApiUrl = "http://localhost:8081/api/categories";

  dropdownDisplay1.className = "d-block";
  resultsDisplay.className = "d-none";

  fetch(categoryApiUrl)
    .then((response) => response.json())
    .then((data) => {
      
       //==== A way to display the category using a dropdown =-====//

      //     const selectCategory = document.createElement("select");
      //     selectCategory.className = "text-center form form-control mt-5 custom-select1";
      //     data.forEach(category => {
      //     const selectCategoryOptions = document.createElement("option")
      //     selectCategoryOptions.textContent = category.name;
      //     selectCategoryOptions.value = category.categoryId;
      //     selectCategory.appendChild(selectCategoryOptions);
      // })
      // dropdownDisplay1.appendChild(selectCategory);


      //=== A more fancy way to display the categories using lists with images====//

      const biggerCategoriesDiv = document.createElement("div");
      biggerCategoriesDiv.className = "menu section";
      const titleDiv = document.createElement("div");
      titleDiv.className = "container section-title";
      const title = document.createElement("h1");
      title.textContent = "Our Categories";
      titleDiv.appendChild(title);
      biggerCategoriesDiv.appendChild(titleDiv);

      const categoriesDiv = document.createElement("div");
      categoriesDiv.className = "container";
      const categoriesUnorderedList = document.createElement("ul");
      categoriesUnorderedList.className =
        "nav nav-tabs d-flex justify-content-center";
      categoriesUnorderedList.setAttribute("data-aos", "fade-up");
      categoriesUnorderedList.setAttribute("data-aos-delay", "50");
      data.forEach((category) => {
        const categoryList = document.createElement("li");
        categoryList.id = category.categoryId;
        categoryList.className = "nav-item";
        const anchor = document.createElement("a");
        anchor.className = "nav-link show";
        anchor.setAttribute("data-bs-toggle", "tab");
        anchor.setAttribute("data-bs-target", `#category-${category.name}`);
        for (let image of images) {
          if (category.categoryId == image.categoryId) {
            const categoryImage = document.createElement("img");
            categoryImage.className = "iconImage";
            categoryImage.src = image.image;
            anchor.appendChild(categoryImage);
          }
        }
        const listTitle = document.createElement("h4");
        listTitle.textContent = category.name;
        listTitle.className = "text-center mt-2";
        anchor.appendChild(listTitle);
        categoryList.appendChild(anchor);
        categoriesUnorderedList.appendChild(categoryList);
      });
      biggerCategoriesDiv.appendChild(categoriesUnorderedList);
      dropdownDisplay1.appendChild(biggerCategoriesDiv);

      var lists = document.querySelectorAll("ul li");
      // console.log(lists)
      lists.forEach(function (list) {
        list.onclick = function () {
          location.href = "productsSearch.html#resultsDisplay";
          let selectedProductId = this.id;
          // console.log(selectedProductId);
          let specificCategoryApi = `http://localhost:8081/api/products/bycategory/${selectedProductId}`;
          fetch(specificCategoryApi)
            .then((response) => response.json())
            .then((data) => {
              displayData(data);
            });
        };
      });
    });
}

function populateAllGroceries() {
  let allGroceriesApiUrl = "http://localhost:8081/api/products";
  dropdownDisplay1.className = "d-none";

  fetch(allGroceriesApiUrl)
    .then((response) => response.json())
    .then((data) => {
      //Let's now sort the fetched data with alphabetical order of their product name:
      let sortedData = data.sort(function (a, b) {
        return a.productName.localeCompare(b.productName);
      });
      displayData(sortedData);
    });
}
function displayData(data) {
  const resultsDisplay = document.getElementById("resultsDisplay");
  resultsDisplay.className = "d-block";
  resultsDisplay.innerHTML = "";
  const table = createTable();
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.appendChild(createCell(item.productName));
    row.appendChild(createCell(`$${item.unitPrice}`));
    row.appendChild(createCell(item.productId));
    row.appendChild(createVisitLink(item.productId));
    for (let image of images) {
      if (item.categoryId == image.categoryId) {
        const categoryImage = document.createElement("img");
        categoryImage.className = "w-100";
        categoryImage.src = image.image;
        row.appendChild(categoryImage);
      }
    }
    table.querySelector("tbody").appendChild(row);
  });

  resultsDisplay.appendChild(table);
}

function createTable() {
  const table = document.createElement("table");
  table.id = "CourseListings";
  table.className = "table table-striped table-hover border mt-5";

  const thead = document.createElement("thead");
  thead.className = "table-dark";

  const headerRow = document.createElement("tr");
  ["Name", "Price", "Product Id", "Link", "Category"].forEach((text) => {
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

function createVisitLink(text) {
  const visitLinkTd = document.createElement("td");
  visitLinkTd.className = "w-25";
  const visitLink = document.createElement("a");
  visitLink.textContent = "Show Details";
  visitLink.href = "productDetails.html?productId=" + text;
  visitLink.className = "text-decoration-none";
  // console.log(visitLink.href)
  visitLinkTd.appendChild(visitLink);
  return visitLinkTd;
}
