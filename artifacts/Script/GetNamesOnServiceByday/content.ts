//the selcted day of the shift to search
const {selectedday}= req.query ; 

//Get the the operators on the seleted day 
const currentShift = await entities.shifts.createQueryBuilder("shifts")
    .where('shifts.Status = :status', { status: 'Service' })
    .andWhere('shifts.Date LIKE :date', { date:"%"+selectedday+"%" })
    .getMany();
//get all the operators 
const allOperators = await entities.operators.find()

//select the operators that are on service the selected day 
const serviceOperators = allOperators.filter(
    (operator)=>currentShift.some(
        (shifts)=> shifts.Operator_ID === operator.Operator_ID  
        ));
//array to store the name and rank of the operator on service 
let nameArray : object[] = []; 
//load the name and rank on the operators on service to the nameArray
serviceOperators.forEach((operator) => {
  let jsonObj: object = {
    Name: operator["Name"],
    Rank: operator["Category"]

  };
  nameArray.push(jsonObj);
});

//Array to store the complete status of the shift 
const allStatus : object[] = [];
//get the complete status of the shift on the selected day 
const cena = await entities.shifts.createQueryBuilder("shifts")
    .where('shifts.Date LIKE :date', { date:"%"+selectedday+"%" })
    .getMany();
//Load to the array allStatus the information of the shitf operator status 
cena.forEach((shiftStatus)=>{
let op =  allOperators.find(operator => operator["Operator_ID"]===shiftStatus["Operator_ID"]);
allStatus.push({date:shiftStatus["Date"],name:op["Name"], id:shiftStatus["Operator_ID"], cat: op["Category"], stat :shiftStatus["Status"]})
});

result = {
            "ListofServiceNames" : nameArray,
            "CompleteStatus": allStatus
            }; 
complete();


