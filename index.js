// Your code here
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(rowData) {
    return rowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, card){
    let [date, hour] = card.split(" ")

    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, card){
    let [date, hour] = card.split(" ")

    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, dateEntered) {
    let signIn = employee.timeInEvents.find(function(e){
        return e.date === dateEntered
    })
    let signOut = employee.timeOutEvents.find(function(e){
        return e.date === dateEntered
    })
    return (signOut.hour - signIn.hour) / 100
}

function wagesEarnedOnDate(employee, dateEntered) {
    let wage = hoursWorkedOnDate(employee, dateEntered)
        * employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee) {
    let workedDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = workedDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

function calculatePayroll(arrOfEmployeeRecords){
    return arrOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
} 