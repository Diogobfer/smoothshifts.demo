
let saveStatusArray: object[] = [];
//get the total number of  operators registered
let numberOfOperators : number = TableAllOperators.getItems().length; 
//number of operator with status saociated 
let operatorSizeArray : number = modelStatusArray.length;
//count the number of operator on service 
const minServiceOperators = modelStatusArray.filter(operator=>operator["stat"] === "Service");
console.log(minServiceOperators.length);
const teamLeaderOnService = minServiceOperators.some(operator=> operator["cat"]==="Team leader")
const sizeServiceTeam = minServiceOperators.length
//if the status array is empty
if(operatorSizeArray=== 0){
    sap.m.MessageToast.show("Add operators to this shift");    
}
//if there are some operator with no status asigned 
else if(operatorSizeArray<numberOfOperators){
    sap.m.MessageToast.show("There are Operator that are missing status"); 
}else if(!(sizeServiceTeam === 4) || !teamLeaderOnService  ) {
     sap.m.MessageToast.show("The service team is missing a required operator or team leader.");    
}else{
    const comfirmSaveShift = ()=>{ 
        //convert the model of the array modelStatusArray for the format that is keep on the data base
        // model of the  modelStatusArray {date:"",name:"", id:"", cat:"", stat :""} 
        modelStatusArray.forEach((operator)=>{
        saveStatusArray.push({"Status":operator["stat"],"Operator_ID":operator["id"],"Date":operator["date"],"createdBy":"admin","updatedBy":"admin"})
        });
    
        //Send the array of the shift status ofthe day to the data base shift
        const saveShiftStatus =  async ()=>{ 
            var options = {
                parameters: {
                    "save": editOrCreateShift
                },
                data: {"shiftStatus":saveStatusArray}
            };
            console.log(editOrCreateShift);
            //await for the result of the database 
            await apiRestAPISaveShiftstatus(options).then((data)=>{
            //if the save is  sucecefull
            if(data["SavedOnDatabase"]==="yes"){
                sap.m.MessageToast.show("The status for this Day has ben saved");
                savedSallShiftStatus = true;
            }
            //if the save is unsusefull 
            else{
                sap.m.MessageToast.show("The status for this day has not been saved. Please contact support."); 
            }})
            
        }
        saveShiftStatus();
    }
    confirmDialogMsg("Save Shift Status","Save the operators status for this Shift ? ", comfirmSaveShift);
}
