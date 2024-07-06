
const months: { [key: string]: string } = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12"
};

const selectedDate = Calendar.getSelectedDates()[0].getStartDate().toString();

const yyyy : string= selectedDate.substring(11, 15);
const mm : string= months[selectedDate.substring(4, 7)];
const dd : string = selectedDate.substring(8, 10);
shiftDataInUse = yyyy+"-"+mm+"-"+dd
// Set the headther of the table
TableOperatorsStatus.setHeaderText("Status for the "+shiftDataInUse);
updateTable(shiftDataInUse);
savedSallShiftStatus = false;
 
