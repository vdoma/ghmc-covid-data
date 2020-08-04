const csv = require('csvtojson');
const r = require('ramda');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const cheerio = require('cheerio');
const cheerioTableParser = require('cheerio-tableparser');
const axios = require('axios');
//const locations = require('./locations.js');


/* generate json from ghmc csv input */
async function jsonFromCsv(csvFilePath, jsonFilePath) {
  const jsonArray=await csv({
    headers: ['mandal', 'patientId', 'gender', 'ward', 'circle', 'zone'],
    delimiter: '|'
  }).fromFile(csvFilePath);
  await writeFileAsync(jsonFilePath, JSON.stringify(jsonArray));
}

/* fetch array of { prop: 'prop_instance_name': count: 'number_infected' } instances */
function fetchPropInfo(json, prop) {
  const props = r.compose(r.uniq, r.map(e => e[prop]))(json);
  let info = [];
  props.forEach(elem => {
    const filteredElems = r.filter(e => e[prop] == elem)(json);
    let obj = {};
    obj[prop] = elem;
    obj.count = filteredElems.length;
    info.push(obj);
  });
  info = r.sortBy(r.prop('count'))(info)
  return info;
}

async function writeJsonToFile(filename, json) {
  await writeFileAsync(filename, JSON.stringify(json));
}

async function dataFromUrl(url, selector) {
  let response;
  try {
    response = await axios.get(url);
  } catch (err) {
    console.log(err);
    throw new Error('Unable to load url');
  }
  $ = cheerio.load(response.data);
  cheerioTableParser($);
  const tableData = $(selector).parsetable(true, true, true);
  console.log(tableData.length);
  console.log(tableData[0].length);
  return tableData;
}

function jsonFromData(data) {
  let json = [];
  if (data.length !== 6) {
    return;
  }
  for (let i = 1; i < data[0].length; i++) { // ignore header
    const mandal = data[0][i];  
    const patientId = data[1][i];  
    const gender = data[2][i];  
    const ward = data[3][i];  
    const circle = data[4][i];  
    const zone = data[5][i];  

    let record = {mandal, patientId, gender, ward, circle, zone};
    record = beautifyRecord(record);
    json.push(record);
  }
  return json;
}

function csvFromData(data) {
  let csv = '';
  if (data.length !== 6) {
    return;
  }
  for (let i = 1; i < data[0].length; i++) { // ignore header
    const mandal = data[0][i];  
    const patientId = data[1][i];  
    const gender = data[2][i];  
    const ward = data[3][i];  
    const circle = data[4][i];  
    const zone = data[5][i];  

    let record = {mandal, patientId, gender, ward, circle, zone};
    record = beautifyRecord(record);
    csv += `${mandal}|${patientId}|${gender}|${ward}|${circle}|${zone}\n`;
    return csv;
  }  
}

function beautifyRecord(record) {  
  for (prop in record) {
    record[prop] = beautifiers[`beautify${classCase(prop)}`](record[prop]);
  }
  return record;
}

function writechartSpecificDataFromJson(json) {
  writeJsonToFile('data/mandal-info.json', fetchPropInfo(json, 'mandal'));
  writeJsonToFile('data/zone-info.json',   fetchPropInfo(json, 'zone'));
  writeJsonToFile('data/circle-info.json', fetchPropInfo(json, 'circle'));
  writeJsonToFile('data/ward-info.json',   fetchPropInfo(json, 'ward'));
  writeJsonToFile('data/gender-info.json', fetchPropInfo(json, 'gender'));
}

/* make the first character uppercase and the rest lower */
function capitalize(word) {
  if (!word) return word;
  if (word.length === 1) {
    return word.toUpperCase();
  } else {
    return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
  }
}

/* make the first character uppercase and leave the rest as is */
function classCase(word) {
  if (!word) return word;
  if (word.length === 1) {
    return word.toUpperCase();
  } else {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  }
}

const beautifiers = {
  beautifyMandal: (mandal) => {
    return capitalize(mandal);
  },
  beautifyPatientId: (patientId) => {
    if (!patientId) return patientId;
    patientId = patientId.toUpperCase();
    if (patientId.indexOf('P') === 0) {
      patientId = parseInt(patientId.substr(1));
    } else {
      patientId = -1; // bad value gets replaced with -1
    }
    return patientId;
  },
  beautifyWard: (ward) => {
    return `${ward[0].toUpperCase()}${ward.slice(1)}`
  },
  beautifyCircle: (circle) => {
    if (circle.includes('-')) {
      return circle.substring(0, circle.indexOf('-'));
    } else {
      return circle;
    }
  },
  beautifyZone: (zone) => {
    return zone;
  },
  beautifyGender: (gender) => {
    if (!gender) return "Unknown";
    if (gender.toLowerCase().startsWith('f')) {
      gender = 'Female';
    } else if (gender.toLowerCase().startsWith('m')) {
      gender = 'Male';
    } else {
      gender = 'Unknown';
    }
    return gender;
  }
};



async function main() {
  util.inspect.defaultOptions.maxArrayLength = null;
  const url = 'https://www.ghmc.gov.in/covid_details.aspx#';
  const selector = '#ContentPlaceHolder1_GrdCovidDetails';

  const tableData = await dataFromUrl(url, selector);
  const json = jsonFromData(tableData);
  const jsonFilePath = 'data/ghmc.json';
  await writeFileAsync(jsonFilePath, JSON.stringify(json));
  writechartSpecificDataFromJson(json);

  console.log('Done')
}

main();


/*
async function testTimeBased() {
  // testing how to generate data for time based charts
  util.inspect.defaultOptions.maxArrayLength = null;
  const jsonFilePath = 'data/ghmc.json';
  const str = await readFileAsync(jsonFilePath);
  const json = JSON.parse(str);
  const ward = 'Tarnaka';
  const frequency = 1000;
  //const ids = r.map(e => e.patientId)(json);
  //await writeFileAsync('./data/id.json', JSON.stringify(ids));  
  const wardRecords = r.filter(e => e.ward === ward)(json);
  // console.log(wardRecords);
  let res = {};
  
  let patientIds = r.map(e => e.patientId)(json);
  patientIds = r.sort((a,b) => a - b)(patientIds);
  let lastPatientId = patientIds[patientIds.length - 1];
  const intervals = Math.ceil(lastPatientId / 1000);
  for (let i = 0; i < intervals; i++ ) {
    res[i] = 0;
  }
  wardRecords.forEach(e => {
    // gets floor 1000 or 0. so P5 will be in 0th bucket. P1100 will be in 1000 bucket
    // its js, so need to floor the number
    const bucket = Math.floor(e.patientId / 1000);
    // get current val
    let val = res[bucket];
    if (!val) val = 0;
    // incr current val
    val = val + 1;
    res[bucket] = val;
  })
  console.log(res);
}
*/
