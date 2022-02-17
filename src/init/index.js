const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const clearAll = document.querySelector(".clear");

const items = JSON.parse(localStorage.getItem("item")) || [];

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name = item]").value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("item", JSON.stringify(items));
  this.reset();
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function populateList(plates = [], plateList) {
  plateList.innerHTML = plates
    .map((plate, i) => {
      return `<li>
        <input type = "checkbox" data-index=${i} id = "item${i}" ${
        plate.done ? "checked" : ""
      } />
        <label for="item${i}">${plate.text}</label>
        </li>`;
    })
    .join("");
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("item", JSON.stringify(items));
  populateList(items, itemsList);
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function clearItems() {
  localStorage.removeItem("item");
  window.location.reload();
  return (itemsList.innerHTML = "");
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
clearAll.addEventListener("click", clearItems);

populateList(items, itemsList);
