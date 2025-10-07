
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

//Popup open
$(".green_btn").addEventListener("click", () => togglePopup("income"));
$(".red_btn").addEventListener("click", () => togglePopup("expense"));
//cancel Btn
$(".cancel_income").addEventListener("click", closePopup);
$(".cancel_expense").addEventListener("click", closePopup);
// Save btn
$(".save_btn").addEventListener("click", () => handleTransaction("income"));
$(".expense_update").addEventListener("click", () => handleTransaction("expense"));
//popup 
function togglePopup(type) {
  $(".popup_wrapper").style.display = "flex";
  $(".income").style.display = type === "income" ? "flex" : "none";
  $(".expense").style.display = type === "expense" ? "flex" : "none";
}
function closePopup() {
  $(".popup_wrapper").style.display = "none";
  clearInputs();
}

// inocome or expense type check
function handleTransaction(type) {
  let index = type == "income" ? 0 : 1;
 
  let amountElem = $$(".amount_value")[index];// document.getElementbyclassname("amount")
  let descElem = $$(".description_value")[index];

  let net = amountElem.value.trim();
  console.log(net)
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
  trans_list(net, description, color, type);
  //update bal
  const totalElem = $(".total_amount");
  const total = parseInt(totalElem.innerText) || 0;
  totalElem.innerText = total + sign * parseInt(net);
  closePopup();
}

// Create li
function trans_list(amount, description, color, type) {
  let list = document.createElement("li");
  list.setAttribute("list-type",type);
  list.className = `list_container ${color}`;

  let descDiv = document.createElement("div");
  descDiv.textContent = description;

  let amountDiv = document.createElement("div");
  amountDiv.className = "amount-trans";
  amountDiv.innerHTML = amount;

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
  deleteItem.textContent = "Delete";

  actionMenu.append(editItem, deleteItem);
  iconDiv.append(actionMenu);
  amountDiv.append(iconDiv);

  list.append(descDiv, amountDiv);
  $(".trans_data").append(list);
   //delete
   deleteItem.addEventListener("click", deleteItems);
 
  function deleteItems(){
  console.log($(".total_amount").innerText);
   let getAmount=parseInt( $(".total_amount").innerText);
   let net = parseInt(amount);
   let subt=net + getAmount;
   $(".total_amount").innerText = subt;
 console.log(subt);

    list.remove();
  }
 

  
editItem.addEventListener("click", function(){
  var list_type = list.getAttribute("list-type");
  editList(list_type,description,amount);
  list.remove();
});
//menu
  iconDiv.addEventListener("click", (e) => {
    console.log(e);
    e.stopPropagation();
    actionMenu.style.display = actionMenu.style.display === "block" ? "none" : "block";
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
  inputElem.classList.add("error_border");
  inputElem.addEventListener("input", () => {
    errorElem.textContent = "";
    inputElem.classList.remove("error_border");
  });
}

  function editList(type,des,amount){
  $(".popup_wrapper").style.display = "flex";
  $(".income").style.display = type === "income" ? "flex" : "none";
  $(".expense").style.display = type === "expense" ? "flex" : "none";

  let index = type === "income" ? 0 : 1;
  let amountElem = $$(".amount_value")[index];
  let descElem = $$(".description_value")[index];

   amountElem.value = amount;
   descElem.value = des;
  }

// Reset inputs
function clearInputs() {
  $$(".amount_value").forEach((i) => (i.value = ""));
  $$(".description_value").forEach((i) => (i.value = ""));
}
