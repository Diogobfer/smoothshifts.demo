//status values of the operators for the day 
let statusArray : object[]  = [
  { key: "1", text: "Service" },
  { key: "2", text: "Day Off" },
  { key: "3", text: "Vacation" },
  { key: "4" , text: "Other" }
];

//Load the status values to the select element
statusArray.forEach((status)=>{
  const optservice  = new sap.ui.core.Item({
    key:status["key"],
    text:status["text"]
    });
  Select.addItem(optservice);
});
//variable that store the data to be use on the shift 
let shiftDataInUse : string = getCurentDate() ;

// Set the header of the table
TableOperatorsStatus.setHeaderText("Status for the "+ shiftDataInUse);

// array model for the TableOperatsStatus
let modelStatusArray :  object[] = [
  {date:"",name:"", id:"", cat:"", stat :""}
] ;
// Create the JSON model
var statusModel = new sap.ui.model.json.JSONModel();
//set the array modelStatusArray as the model 
statusModel.setData(modelStatusArray);

// Set the model to the table
TableOperatorsStatus.setModel(statusModel);

// Bind the table items to the model
TableOperatorsStatus.bindItems({
  path: "/",
  template: new sap.m.ColumnListItem({
    type: sap.m.ListType.Active,
    cells: [
      new sap.m.Text({ text: "{date}" }),
      new sap.m.Text({ text: "{name}" }),
      new sap.m.Text({ text: "{id}" }),
      new sap.m.Text({ text: "{cat}" }),
      new sap.m.Text({ text: "{stat}" })
    ]
  })
});

//Put the key on the column name into the table and capitalize the key
 Object.keys(modelStatusArray[0]).forEach((key)=>{
        TableOperatorsStatus.addColumn(new sap.m.Column({
  header: new sap.m.Text({ text:(key.charAt(0).toUpperCase() + key.slice(1)) })}))
}); 
//remove all item from the modelArray 
modelStatusArray.splice(0);
//Uptade the table to match the values of the array modelStatusArray 
TableOperatorsStatus.getModel().refresh();


