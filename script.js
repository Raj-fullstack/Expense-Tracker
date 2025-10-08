
const qselect = (selector) => document.querySelector(selector);
const qselectall = (selector) => document.querySelectorAll(selector);

//Popup open
qselect(".add_income").addEventListener("click", () => togglePopup("income"));
qselect(".add_expense").addEventListener("click", () => togglePopup("expense"));
//cancel Btn
[".cancel_income", ".cancel_expense"].forEach(sel => qselect(sel).addEventListener("click", closePopup));
// Save btn
qselect(".save_btn").addEventListener("click", () => handleTransaction("income"));
qselect(".expense_update").addEventListener("click", () => handleTransaction("expense"));
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
function handleTransaction(type) {
  let index = type == "income" ? 0 : 1;
 
  let amountElem = qselectall(".amount_value")[index];// document.getElementbyclassname("amount")
  let descElem = qselectall(".description_value")[index];

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
  const totalElem = qselect(".total_amount");
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
  descDiv.setAttribute("class","list-desc");
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
  deleteItem.textContent = "Delete";

  actionMenu.append(editItem, deleteItem);
  iconDiv.append(actionMenu);
  amountDiv.append(iconDiv);

  list.append(descDiv, amountDiv);
  qselect(".trans_data").append(list);
   //delete
   deleteItem.addEventListener("click", deleteItems);
 
  function deleteItems(){
  console.log(qselect(".total_amount").innerText);
   let getAmount=parseInt( qselect(".total_amount").innerText);
   let net = parseInt(amount);
   let subt=net + getAmount;
   qselect(".total_amount").innerText = subt;
 console.log(subt);

    list.remove();
  }
 

  
editItem.addEventListener("click", function(){
  var list_type = list.getAttribute("list-type");
  console.log(this);
  editList(list_type,description,amount,this);
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

  function editList(type,des,amount,ele){
  qselect(".popup_wrapper").style.display = "flex";
  qselect(".income").style.display = type === "income" ? "flex" : "none";
  qselect(".expense").style.display = type === "expense" ? "flex" : "none";
  qselect(".expense_update").classList.add("save_expenses");
  qselect(".save_update").classList.add("save_income");
  var bal = qselect(".total_amount").innerText;

  var edit_selector = ele.parentNode.parentNode.parentNode;

  console.log(edit_selector);

  let index = type === "income" ? 0 : 1;
  let amountElem1 = qselectall(".amount_value")[index];
  let descElem1 = qselectall(".description_value")[index];

   amountElem1.value = amount;
   descElem1.value = des;

   qselect(".save_income").addEventListener("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    window.stop();
    console.log(e);
    let color = type === "income" ? "color1" : "color2";
  let sign = type === "income" ? -1 : 1;
    //let index = type == "income" ? 0 : 1;
 
  //let amountElem = qselectall(".amount_value")[index];// document.getElementbyclassname("amount")
  //let descElem = qselectall(".description_value")[index].innerText;
  console.log(amountElem1);

    //edit_selector.closest(".list-desc").innerText = descElem;
    console.log(edit_selector.matches(".amount-val"));
    edit_selector.matches(".amount-val").innerText = amountElem1;

    console.log("bal "+bal);
    console.log("amount "+amountElem1);
    console.log("total "+parseInt(bal) -  parseInt(amountElem1))

    bal.innerText = parseInt(bal) -  parseInt(amountElem1);

    //const totalElem = qselect(".total_amount");
  //const total = parseInt(bal.innerText) || 0;
  //bal.innerText = total + sign * parseInt(amountElem);
    
  });
  }

  

// Reset inputs
function clearInputs() {
  qselectall(".amount_value").forEach((i) => (i.value = ""));
  qselectall(".description_value").forEach((i) => (i.value = ""));
}
