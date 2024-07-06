//variable that store the action to be perfomed when the data is saved 
let editOrCreateShift : string= "";
//flag that indicates if the data was saved or not 
let savedSallShiftStatus : boolean = false;
//Request to the api of the names on service on a seleted day 
async function callapi(curentdate :string): Promise<string[]>{
  var options = {
    parameters: {
        "selectedday": curentdate 
    }
};
  const result = await apiRestAPIGetNamesOnService(options);
  return result; 
}
//Add to the table rows with the names of the operator that are on service that day, and if the slecte shift as operators asigned load that operators to modelStatusArray
function updateTable(curentdate : string ): void{
//clear the tables of the previous rows 
Table.removeAllItems();
//call the api 
callapi(curentdate).then((nameonservice)=>{
  //get the size of all the status of all operator on that day
  let allStatusSize = nameonservice["CompleteStatus"].length;
  //if the shift has operators 
  if(allStatusSize>0){
    //remove all elemtes of the modelStatusArray 
    modelStatusArray.splice(0);
    //load the current shift status to the modelStatusArray
    nameonservice["CompleteStatus"].forEach(
      operator => modelStatusArray.push(operator) );
    //Indicate that the action to be permed on save the changes is Update the table
    editOrCreateShift = "Update";
  //if the shit has no opetators 
  }else{
    //indicate that the operation on save is to create new rows on the table
     editOrCreateShift = "Insert";
     //clear the array modelStatusArray
     modelStatusArray.splice(0);
  }
  //update the tables that is bind to the array modelStatusArray
  TableOperatorsStatus.getModel().refresh();
  //Load the operator that are on service to the table
  const operators = nameonservice["ListofServiceNames"];
   operators.forEach(function (item) {
    var oRow = new sap.m.ColumnListItem();
    var oCell1 = new sap.m.Text({ text: item["Name"] });
    var oCell2 = new sap.m.Text({ text: item["Rank"] });
    oRow.addCell(oCell1);
    oRow.addCell(oCell2);
    Table.addItem(oRow);
    });
  });
  
}

//get the current date in the formate yyyy-mm-dd
function getCurentDate():string{
  const getDate = new Date();
  return getDate.getFullYear()+"-0"+(getDate.getMonth()+1)+"-0"+getDate.getDate();
}
// Put to columns on the tables with the headther Name ad Ranck 
Table.setHeaderText("Operators on Service");
Table.addColumn(new sap.m.Column({
  header: new sap.m.Text({ text: "Name" })}));
Table.addColumn(new sap.m.Column({
  header: new sap.m.Text({ text: "Rank" })}));
Table.setNoDataText("No operators assigned to the shift");
//Put the operators that are on service in the selected that day in the rows on the table
updateTable(getCurentDate());





