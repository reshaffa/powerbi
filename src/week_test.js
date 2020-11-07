const _ = require('lodash');
const path = require('path');
const moment = require('moment');
const convert = require('convert-csv-to-json');
const fileName = path.join(__dirname, './database/files/New Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);


let equipments = []
var weeks = [
    { tag_no : 'R1798409', initial_date : '09/27/2020' , status: 3 },
    { tag_no : 'R1798408', initial_date : '09/27/2020' , status: 3 },
    { tag_no : 'R1798407', initial_date : '09/27/2020' , status: 3 },
    { tag_no : 'R1798406', initial_date : '09/27/2020' , status: 3 },
    { tag_no : 'R1798405', initial_date : '09/27/2020' , status: 3 },
    { tag_no : 'R1798402', initial_date : '09/27/2020' , status: 3 },
    { tag_no : 'R1798409', initial_date : '09/23/2020' , status: 1 },
    { tag_no : 'R1798408', initial_date : '09/23/2020' , status: 2 },
    { tag_no : 'R1798407', initial_date : '09/23/2020' , status: 3 },
    { tag_no : 'R1798406', initial_date : '09/23/2020' , status: 3 },
    { tag_no : 'R1798405', initial_date : '09/23/2020' , status: 3 },
    { tag_no : 'R1798402', initial_date : '09/23/2020' , status: 1 },
    { tag_no : 'R1798409', initial_date : '09/15/2020' , status: 3 },
    { tag_no : 'R1798408', initial_date : '09/15/2020' , status: 3 },
    { tag_no : 'R1798407', initial_date : '09/15/2020' , status: 3 },
    { tag_no : 'R1798406', initial_date : '09/15/2020' , status: 3 },
    { tag_no : 'R1798405', initial_date : '09/15/2020' , status: 3 },
    { tag_no : 'R1798402', initial_date : '09/15/2020' , status: 2 },
    { tag_no : 'R1798409', initial_date : '09/8/2020' , status: 3 },
    { tag_no : 'R1798408', initial_date : '09/8/2020' , status: 3 },
    { tag_no : 'R1798407', initial_date : '09/8/2020' , status: 3 },
    { tag_no : 'R1798406', initial_date : '09/8/2020' , status: 3 },
    { tag_no : 'R1798405', initial_date : '09/8/2020' , status: 3 },
    { tag_no : 'R1798402', initial_date : '09/8/2020' , status: 3 }
  ];
let status_one = []
let status_two = []
weeks.map((el) => {
  let compare_date = moment(el.initial_date).format('YYYY-MM-DD')
  let one_week = moment(compare_date).week()
  let one_month = moment(compare_date).month() + 1
  let one_year = moment(compare_date).year()
  let week_code = el.tag_no.toString()+""+one_week.toString()+""+one_month+""+one_month.toString()+""+one_year.toString()

  status_one.push({
    tag_no : el.tag_no,
    week_code:  week_code,
    status : el.status
  })
})

console.log(status_one);
