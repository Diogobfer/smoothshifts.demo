//get the total number of  operators
let numberOfOperatorsWithsatatus : number = modelStatusArray.length;

//obtain te selected item of the table TablesOperatorStatus 
const selectedItemAssignStatus = TableOperatorsStatus.getSelectedItem(); 

//if there is no operator on the array send a message informing that the list is empty
if(numberOfOperatorsWithsatatus===0){
    sap.m.MessageToast.show("No operator on the status list");    
    //if there is no element selected 
}else if(selectedItemAssignStatus === null){
    sap.m.MessageToast.show("No operator selected")
}else{ 
    
    let  nameToRemove: string =  selectedItemAssignStatus.getBindingContext().getProperty("name");
    let  statToRemove: string =  selectedItemAssignStatus.getBindingContext().getProperty("stat");
    let  idToRemove: string =  selectedItemAssignStatus.getBindingContext().getProperty("id");
    const removeOperatorStatus = ()=>{
    //Get the index of the object to remove 
    const indexToRemove = modelStatusArray.findIndex((element) => element["id"] === idToRemove);
    //remove the object of the array
    modelStatusArray.splice(indexToRemove, 1);
    //refresh the model 
    TableOperatorsStatus.getModel().refresh();
    }

    confirmDialogMsg("Remove Operator Status?","Remove the status "+statToRemove+", from operator "+nameToRemove+" with ID "+idToRemove, removeOperatorStatus);
}
