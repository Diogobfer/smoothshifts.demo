//the selcted day of the shift to search
var selectedday = req.query.selectedday;
//Get the the operators on the seleted day 
var currentShift = await entities.shifts.createQueryBuilder("shifts")
    .where('shifts.Status = :status', { status: 'Service' })
    .andWhere('shifts.Date LIKE :date', { date: "%" + selectedday + "%" })
    .getMany();
//get all the operators 
var allOperators = await entities.operators.find();
//select the operators that are on service the selected day 
var serviceOperators = allOperators.filter(function (operator) { return currentShift.some(function (shifts) { return shifts.Operator_ID === operator.Operator_ID; }); });
//array to store the name and rank of the operator on service 
var nameArray = [];
//load the name and rank on the operators on service to the nameArray
serviceOperators.forEach(function (operator) {
    var jsonObj = {
        Name: operator["Name"],
        Rank: operator["Category"]
    };
    nameArray.push(jsonObj);
});
//Array to store the complete status of the shift 
var allStatus = [];
//get the complete status of the shift on the selected day 
var cena = await entities.shifts.createQueryBuilder("shifts")
    .where('shifts.Date LIKE :date', { date: "%" + selectedday + "%" })
    .getMany();
//Load to the array allStatus the information of the shitf operator status 
cena.forEach(function (shiftStatus) {
    var op = allOperators.find(function (operator) { return operator["Operator_ID"] === shiftStatus["Operator_ID"]; });
    allStatus.push({ date: shiftStatus["Date"], name: op["Name"], id: shiftStatus["Operator_ID"], cat: op["Category"], stat: shiftStatus["Status"] });
});
result = {
    "ListofServiceNames": nameArray,
    "CompleteStatus": allStatus
};
complete();
