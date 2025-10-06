// Add income popup open
document.getElementsByClassName("green_btn")[0].addEventListener("click", function () {
  document.getElementsByClassName("popup_wrapper")[0].style.display = "flex";
      document.getElementsByClassName("expense")[0].style.display="none";
  document.getElementsByClassName("income")[0].style.display="flex";

});

//document.addEventListener("click", dropDownClose);

// function dropDownClose(e){
//     var dropdown = document.getElementsByClassName("more_action")[0];
//     if(!dropdown.contains(e.target)){
//         dropdown.style.display = "none";
//     console.log(e);
//     }
// }
// cancel btn
document.getElementsByClassName('cancel_income')[0].addEventListener("click",function (){
      document.getElementsByClassName("popup_wrapper")[0].style.display="none";
})
document.getElementsByClassName('cancel_expense')[0].addEventListener("click",function (){
      document.getElementsByClassName("popup_wrapper")[0].style.display="none";
})


// Popup save button
document.getElementsByClassName("save_btn")[0].addEventListener("click", function () {
  
    let net = document.getElementsByClassName("amount_value")[0].value;
  let description = document.getElementsByClassName("description_value")[0].value;
  var color_code = "color1";


let amount=trans_list(net,description,color_code);
  // Reset popup
  document.getElementsByClassName("popup_wrapper")[0].style.display = "none";
  document.getElementsByClassName("amount_value")[0].value = "";
  document.getElementsByClassName("description_value")[0].value = "";
  // total bal
  var total_amount = document.getElementsByClassName("total_amount")[0].innerText;
  var total = parseInt(total_amount);
  var amount_parse = parseInt(net);
  var balance = total + amount_parse;
  document.getElementsByClassName("total_amount")[0].innerHTML= balance;
  
});
document.getElementsByClassName("red_btn")[0].addEventListener("click", function () {
    document.getElementsByClassName("popup_wrapper")[0].style.display = "flex";
    document.getElementsByClassName("income")[0].style.display="none";
      document.getElementsByClassName("expense")[0].style.display="flex";
});
    // Popup save button
document.getElementsByClassName("expense_update")[0].addEventListener("click", function () {
  
    let net = document.getElementsByClassName("amount_value")[1].value;
  let description = document.getElementsByClassName("description_value")[1].value;
  var color_code = "color2"

let amount=trans_list(net,description,color_code);
  // Reset popup
  document.getElementsByClassName("popup_wrapper")[0].style.display = "none";
  document.getElementsByClassName("amount_value")[1].value = "";
  document.getElementsByClassName("description_value")[1].value = "";
  // total bal
  var total_amount = document.getElementsByClassName("total_amount")[0].innerText;
  var total = parseInt(total_amount);
  var amount_parse = parseInt(net);
  console.log(total_amount);
  console.log(net);
  console.log(total - amount_parse);
  var balance = total - amount_parse;
  document.getElementsByClassName("total_amount")[0].innerHTML= balance;
//})

})



function trans_list(arg,arg1,color_code){
  // Create elements
  let Item_list = document.createElement("li");
  Item_list.setAttribute("class", "list_container "+color_code);

  let Item_amount = document.createElement("div");
  Item_amount.setAttribute("class","amount-trans");
  let Item_desc = document.createElement("div");

  let icon_wrapper = document.createElement("ul");
  icon_wrapper.setAttribute("class", "more_action");
  icon_wrapper.style.display = "none";

  let edit = document.createElement("li");
  edit.innerText = "Edit";

  let delet = document.createElement("li");
  delet.innerText = "Delete";

  let icon = document.createElement("div");
  icon.setAttribute("class", "dot");
  icon.innerHTML = '<i class="fa fa-ellipsis-v"></i>';

  // Append edit/delete 
  icon_wrapper.append(edit, delet);
  icon.append(icon_wrapper);

  // Assign values
  Item_amount.innerHTML =arg;
  Item_desc.textContent = arg1;

  // Append to list
  Item_amount.append(icon);
  Item_list.append(Item_desc);
  Item_list.append(Item_amount);

  // dot click
   icon.addEventListener("click", function () {
    icon_wrapper.style.display ="block";
      
  });
  // edite click
  edit.addEventListener("click",function(){

  })
  //delete click
  delet.addEventListener("click",function(){

  })

  // Add to transaction list
  document.getElementsByClassName("trans_data")[0].append(Item_list);
  //return amount;
}