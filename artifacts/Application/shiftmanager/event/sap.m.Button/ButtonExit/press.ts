const confirmExit = ()=>{
    modelStatusArray.splice(0);
    TableOperatorsStatus.getModel().refresh();
    App.to(PageSelectday);
}

if( savedSallShiftStatus){
    App.to(PageSelectday);
}else{
confirmDialogMsg("Exit ","All operator status changes not saved will be removed", confirmExit);
}