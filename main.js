let inputName = document.getElementById("input-name");
let inputPrice = document.getElementById("input-price");
let inputCount = document.getElementById("input-count");
let btn = document.getElementById("btn");
let productsDiv = document.getElementById("items");
let edittedProduct = null

array = [];

btn.addEventListener("click", () => {
  if (
    inputName.value !== "" &&
    inputPrice.value !== "" &&
    inputCount.value !== ""
  ) {
    if(edittedProduct){
      edittedProduct.name=inputName.value
      edittedProduct.price=Number(inputPrice.value)
      edittedProduct.count=Number(inputCount.value)
      displayProduct();
      clearInput();

      btn.innerHTML="Add Product"

      edittedProduct=null
    }else{
      addProduct();
      displayProduct();
      clearInput();
    }
  } else {
    alert("please entre an value");
  }
});

function addProduct() {
  array.push({
    name: inputName.value,
    price: Number(inputPrice.value),
    count: Number(inputCount.value),
    id: array.length + 1,
  });
}

function displayProduct() {
  productsDiv.innerHTML = "";
  array.forEach((i) => {
    productsDiv.innerHTML += `
    <div class="list-group-item d-flex justify-content-between rounded">
        <span>${i.name}</span>
        <span>${i.price}$</span>
        <span>${i.count}</span>
        <div class='d-flex justify-content-center align-items-center gap-2'>
          <button class="del" onclick="deleteProduct(${i.id})">X</button>
          <button class='btn' onclick="editProduct(${i.id})"><i class="fa-solid fa-pen-to-square text-success" style='font-size:25px'></i></button>
        </div>
    </div>
    `;
  });

  const total = array.reduce((a, b) => {
    return a + b.price * b.count;
  }, 0);

  productsDiv.innerHTML += `
    <div class="list-group-item d-flex justify-content-between rounded bg-primary text-light mt-3">
        <span>Total</span>
        <span>${total}$</span>
    </div>
  `;
}

function clearInput() {
  inputName.value = "";
  inputPrice.value = "";
  inputCount.value = "";
}

function deleteProduct(id) {
  array = array.filter((a) => {
    return id != a.id;
  });
  displayProduct();
}

function editProduct(id) {
  edittedProduct = array.find((item) => {
    return item.id === id;
  });

  inputName.value = edittedProduct.name;
  inputPrice.value = edittedProduct.price;
  inputCount.value = edittedProduct.count;

  btn.innerHTML = "Update Product";
}
