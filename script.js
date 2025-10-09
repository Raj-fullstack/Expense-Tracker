window.onload = function() {
  Object.keys(localStorage).forEach((key) => {
    console.log(key);
    const translist = JSON.parse(localStorage.getItem(key)); 
    console.log(translist);
    let type, color, amount;
    if (translist.income) {  
      type = "income";
      color = "color1";
      amount = translist.income;
    } else {
      type = "expense";
      color = "color2";
      amount = translist.expense;
    }
    console.log(translist.desc);
    trans_list(amount, translist.desc, color, type);
    document.getElementsByClassName("total_amount")[0].innerHTML = translist.total_balance;
  });
};


const qselect = (selector) => document.querySelector(selector);
const qselectall = (selector) => document.querySelectorAll(selector);

//Popup open
qselect(".add_income").addEventListener("click", () => togglePopup("income"));
qselect(".add_expense").addEventListener("click", () => togglePopup("expense"));
//cancel Btn
[".cancel_income", ".cancel_expense"].forEach((sel) =>
  qselect(sel).addEventListener("click", closePopup)
);
// Save btn
qselect(".save_btn").addEventListener("click", () =>
  handleTransaction("income")
);
qselect(".expense_update").addEventListener("click", () =>
  handleTransaction("expense")
);
//popup
function togglePopup(type) {
  qselect(".popup_wrapper").style.display = "flex";
  qselect(".income").style.display = type === "income" ? "flex" : "none";
  qselect(".expense").style.display = type === "expense" ? "flex" : "none";
}
function closePopup() {
  qselect(".popup_wrapper").style.display = "none";
  clearInputs();
  qselect(".expense_update").classList.remove("save_expenses");
  qselect(".save_update").classList.remove("save_income");
}

// inocome or expense type check
var i = 0;
function handleTransaction(type) {
  let index = type == "income" ? 0 : 1;

  let amountElem = qselectall(".amount_value")[index]; // document.getElementbyclassname("amount")
  let descElem = qselectall(".description_value")[index];

  let net = amountElem.value.trim();
  console.log(net);
  let description = descElem.value.trim();
  let color = type === "income" ? "color1" : "color2";
  let sign = type === "income" ? 1 : -1;
  console.log(sign);

  // Validation
  if (!net || isNaN(net)) {
    showError(amountElem, "Please enter a valid amount");
    return;
  }
  if (!description) {
    showError(descElem, "Description is required");
    return;
  }
  //update bal
  const totalElem = qselect(".total_amount");
  const total = parseInt(totalElem.innerText) || 0;
  totalElem.innerText = total + sign * parseInt(net);

  var store = {};
  store.total_balance = qselect(".total_amount").innerText;
  let listtype = type === "income" ? 0 : 1;
  if(listtype == 0){
    store.income = net; 
  }else{
    store.expense = net;
  }
  store.desc = description

  var storage = JSON.stringify(store);
  console.log(store);
  localStorage.setItem("list-key-"+i,storage);

  trans_list(net, description, color, type);

  closePopup();
}

// Create li
function trans_list(amount, description, color, type) {
  let list = document.createElement("li");
  list.setAttribute("list-type", type);
  list.setAttribute("list-key","list-key-"+i);
    list.className = `list_container ${color}`;

  let descDiv = document.createElement("div");
  descDiv.setAttribute("class", "list-desc");
  descDiv.textContent = description;

  let amountDiv = document.createElement("div");
  let amount_val = document.createElement("div");
  amountDiv.className = "amount-trans";
  amount_val.className = "amount-val";
  amount_val.innerHTML = amount;
  amountDiv.append(amount_val);

  let iconDiv = document.createElement("div");
  iconDiv.className = "dot";
  iconDiv.innerHTML = '<i class="fa fa-ellipsis-v"></i>';

  let actionMenu = document.createElement("ul");
  actionMenu.className = "more_action";
  actionMenu.style.display = "none";

  let editItem = document.createElement("li");
  editItem.className = "edit_btn";
  editItem.textContent = "Edit";
  let deleteItem = document.createElement("li");
  deleteItem.className = "delete_btn"
  deleteItem.textContent = "Delete";

  actionMenu.append(editItem, deleteItem);
  iconDiv.append(actionMenu);
  amountDiv.append(iconDiv);

  list.append(descDiv, amountDiv);
  qselect(".trans_data").append(list);

  
  i++;

  //delete
  deleteItem.addEventListener("click", deleteItems);

  function deleteItems() {
    console.log(qselect(".total_amount").innerText);
    let currentTotal = parseInt(qselect(".total_amount").innerText);
    let transactionAmount = parseInt(amount);
    let sign = type === "income" ? -1 : 1; // Remove income (-), add back expense (+)
    let newTotal = currentTotal + sign * transactionAmount;
    qselect(".total_amount").innerText = newTotal;
    console.log(newTotal);
    var select_ele = this.parentNode.parentNode.parentNode.parentNode;
    var attr = select_ele.getAttribute("list-key");
    console.log(attr);
    localStorage.removeItem(attr);
    list.remove();
  }

  editItem.addEventListener("click", function () {
    var list_type = list.getAttribute("list-type");
    console.log(this.parentNode.parentNode.parentNode.parentNode);
    var select_ele = this.parentNode.parentNode.parentNode.parentNode;
    var attr = select_ele.getAttribute("list-key");
    console.log(attr);
    editList(list_type, description, amount, attr);
    list.remove();
  });
  //menu
  iconDiv.addEventListener("click", (e) => {
    console.log(e);
    e.stopPropagation();
    actionMenu.style.display =
      actionMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!iconDiv.contains(e.target)) actionMenu.style.display = "none";
  });

}

// Error Handling
function showError(inputElem, message) {
  let errorElem = inputElem.parentNode.querySelector(".error");
  if (!errorElem) {
    errorElem = document.createElement("div");
    errorElem.className = "error";
    inputElem.parentNode.appendChild(errorElem);
  }
  errorElem.textContent = message;
  inputElem.classList.add("input_error");
  inputElem.addEventListener("input", () => {
    errorElem.textContent = "";
    inputElem.classList.remove("input_error");
  });
}

function editList(type, des, amount, attr) {
  qselect(".popup_wrapper").style.display = "flex";
  qselect(".income").style.display = type === "income" ? "flex" : "none";
  qselect(".expense").style.display = type === "expense" ? "flex" : "none";
  qselect(".expense_update").classList.add("save_expenses");
  qselect(".save_update").classList.add("save_income");

  let index = type === "income" ? 0 : 1;
  let amountElem1 = qselectall(".amount_value")[index];
  let descElem1 = qselectall(".description_value")[index];

  amountElem1.value = amount;
  descElem1.value = des;

  const originalAmount = parseInt(amount);

  const saveButton = type === "income" ? qselect(".save_btn") : qselect(".expense_update");
  const newSaveButton = saveButton.cloneNode(true);
  saveButton.parentNode.replaceChild(newSaveButton, saveButton);
  newSaveButton.addEventListener("click", function(e) {
    const newAmount = parseInt(amountElem1.value.trim());
    const newDescription = descElem1.value.trim();
    
    // Validation
    if (!newAmount || isNaN(newAmount)) {
      showError(amountElem1, "Please enter a valid amount");
      return;
    }
    if (!newDescription) {
      showError(descElem1, "Description is required");
      return;
    }

    // Calculate balance difference
    const currentTotal = parseInt(qselect(".total_amount").innerText);
    const sign = type === "income" ? 1 : -1;
    
    // Remove old amount and add new amount
    const balanceDifference = sign * (newAmount - originalAmount);
    const newTotal = currentTotal + balanceDifference;
    qselect(".total_amount").innerText = newTotal;

    var store = {};
    store.total_balance = newTotal;
    let listtype = type === "income" ? 0 : 1;
  if(listtype == 0){
    store.income = newAmount; 
  }else{
    store.expense = newAmount;
  }
  store.desc = newDescription;
  var storage = JSON.stringify(store);
  console.log(store);
  localStorage.setItem(attr,storage);

    // new transaction updated value
    const color = type === "income" ? "color1" : "color2";
    trans_list(newAmount, newDescription, color, type);
    
    closePopup();
  });
}

// Reset inputs
function clearInputs() {
  qselectall(".amount_value").forEach((i) => (i.value = ""));
  qselectall(".description_value").forEach((i) => (i.value = ""));
}
