//Function that returns a confirmation dialog message that receives a custom title, message, and a function to execute
function confirmDialogMsg(title:string,msg : string,func : Function): sap.m.Dialog{
  let oDialog =  new sap.m.Dialog({
    title: title,
    type: sap.m.DialogType.Message,
    content: new sap.m.Text({
        text: msg
    }),
    //If yes button is pressed executed the assigned function 
    beginButton: new sap.m.Button({
        text: "Yes",
        press: function() {
            func();
            oDialog.close();
        }
    }),
    //if no close the dialog
    endButton: new sap.m.Button({
        text: "Cancel",
        press: function() {
            oDialog.close();
        }
    }),
    afterClose: function() {
        oDialog.destroy();
    }
})
return oDialog.open();

}