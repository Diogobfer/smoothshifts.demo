
//obtain te selected item
if(TableAllOperators.getSelectedItem()=== null){
    sap.m.MessageToast.show("Select an operator to assign a status");
}else{
const selectedItem = TableAllOperators.getSelectedItem().getBindingContext();
//obtain the propratis of the item 
//get the name 
let  itemName : string = selectedItem.getProperty("Name");
//get the id 
let itemOperatorId : string = selectedItem.getProperty("Operator_ID");
let checkrepetedName : boolean = modelStatusArray.some((operator)=> operator["name"]=== itemName );
/* console.log(itemName)
console.log(checkrepetedName)
console.log(modelStatusArray) */
//get the category 
let  itemCategory : string = selectedItem.getProperty("Category");
//get the curent data 
let shiftData : string = shiftDataInUse;
if(checkrepetedName){
      sap.m.MessageToast.show("The operator " + itemName + " with ID " + itemOperatorId + " is already registered");
}else{
//get the seleted status from the selet element 
let seltstatus : string =Select.getSelectedItem().getProperty("text");
//set the new row dot the table TableOperatorsStatus
let newRow  = {date: shiftData , name:  itemName, id: itemOperatorId, cat: itemCategory, stat: seltstatus};
//add the row to the array that has the binding  
modelStatusArray.push(newRow);
//refres the model
TableOperatorsStatus.getModel().refresh();
}

};