// Your code here
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
}

function createTimeInEvent(employee, date) {
    const event = getEventFromDate('TimeIn', date);
    employee.timeInEvents.push(event);
    return employee;
}

function createTimeOutEvent(employee, date) {
    const event = getEventFromDate('TimeOut', date);
    employee.timeOutEvents.push(event);
    return employee;
}

function getEventFromDate(type, date) {
    return {
        type: type,
        hour: parseInt(date.split(" ")[1]),
        date: date.substr(0, 10)
    }
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(timeInEvent => timeInEvent.date === date);
    const timeOutEvent = employee.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date);
    return (timeOutEvent.hour - timeInEvent.hour)/100;
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(timeInEvent => timeInEvent.date);
    return dates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
    // alternative implementation without using wagesEarnedOnDate - more lines of code, but feels more computationally efficient than using all the functions above, since it only needs to iterate over the dates once
    // const totalHours = employee.timeInEvents.reduce(function(hoursCounter, timeInEvent, index) {
    //     const eventHours = (employee.timeOutEvents[index].hour - timeInEvent.hour)/100;
    //     return hoursCounter + eventHours;
    // }, 0);
    // return totalHours * employee.payPerHour;
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName = firstName);
}

function calculatePayroll(employees) {
    return employees.reduce((payrollTotal, employee) => payrollTotal + allWagesFor(employee), 0);
}