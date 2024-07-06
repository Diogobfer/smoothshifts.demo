//indicates how to save the data 
const{save}=req.query;
//body with the status of each operator for the day 
const{shiftStatus}= req.body;

//add the values to the table
if(save ==="Insert"){
try{
await entities.shifts.createQueryBuilder()
    .insert()
    .values(shiftStatus)
    .execute();
    result = {
    "SavedOnDatabase": "yes"
    } 
}catch(error){
    result = {
    "SavedOnDatabase": error,
    };
}
//Update the values on the table
}else if(save==="Update"){
    try{
        shiftStatus.forEach(operator=> updateShiftsRow(operator["Status"],operator["Operator_ID"],operator["Date"]))
        result = {
            "SavedOnDatabase": "yes"
        }
    }catch(error){
        result = {
        "SavedOnDatabase": error,
    };
    }
}
//update a row on the table shift
async function updateShiftsRow(status : string , opId : number , shiftDay: string){
await entities.shifts.createQueryBuilder()
    .update()
    .set({"Status":status})
    .where("Operator_ID= :id",{id :opId  }).andWhere("Date = :date",{date:shiftDay})
    .execute()
}
complete();