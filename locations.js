/* Not using this for now. Just relying on data from the html table 
This will remain unfinished for now.
*/
const mandals = [
"Bahadurpura", 	"Asifnagar", 	"Musheerabad", "Saidabad", 	"Bandlaguda",  "Khairatabad",  "Shaikpet",  "Charminar", "Tirumalagiri", "Golconda",  "Nampally",  "Maredpalle", "Amberpet",  "Secunderabad", "Himayathnagar", "Ameerpet"  
];

const zones = [
"Charminar", "Khairathabad", "Kukatpally", "L.B. Nagar", "Secunderabad", "Serilingampally" 
];

const circles = [
  "Kapra", 
  "Uppal", 
  "Hayathnagar", 
  "L.B.Nagar Zone", 
  "SaroorNagar", 
  "Malakpet", 
  "Santhoshnagar", 
  "Chandrayangutta", 
  "Charminar", 
  "Falaknuma", 
  "Rajendra Nagar", 
  "Mehdipatnam", 
  "Karwan", 
  "Goshamahal", 
  "Musheerabad", 
  "Amberpet", 
  "Khairathabad", 
  "Jubilee Hills", 
  "Yousufguda", 
  "Gachibowli", 
  "Serilingampally", 
  "RC Puram, Patancheruvu", 
  "Moosapet", 
  "Kukatpally", 
  "Qutbullapur", 
  "Gajularamaram", 
  "Alwal", 
  "Malkajgiri", 
  "Secunderabad", 
  "Begumpet" 
];

const zoneToCirclesMap = {
  "Charminar": [
    "Malakpet", 
    "Santhoshnagar", 
    "Chandrayangutta", 
    "Charminar", 
    "Falaknuma", 
    "Rajendra Nagar", 
  ],
  "Khairathabad": [
    "Mehdipatnam", 
    "Karwan", 
    "Goshamahal", 
    "Khairathabad", 
    "Jubilee Hills", 
  ],
  "Kukatpally": [
    "Moosapet", 
    "Kukatpally", 
    "Qutbullapur", 
    "Gajularamaram", 
    "Alwal", 
  ],
  "L.B. Nagar": [
    "Kapra", 
    "Uppal", 
    "Hayathnagar", 
    "L.B.Nagar Zone", 
    "SaroorNagar", 
  ],
  "Secunderabad": [
    "Musheerabad", 
    "Amberpet", 
    "Malkajgiri", 
    "Secunderabad", 
    "Begumpet", 
  ],
  "Serilingampally": [
    "Yousufguda", 
    "Gachibowli", 
    "Serilingampally", 
    "RC Puram, Patancheruvu", 
  ]
}

const circleToWardsMap = {
  "Kapra": ["Kapra", "Dr AS Rao Nagar", "Cherlapally", "Meerpet HB Colony", "Mallapur", "Nacharam"], 
  "Uppal": ["Chilukanagar", "Habsiguda", "Ramanthapur", "Uppal"], 
  "Hayathnagar": ["Nagole", "Mansoorabad", "Hayaat nagar", "BN Reddy Nagar"], 
  "L.B.Nagar Zone": ["Vanasthalipuram", "Hastinapuram", "Champapet", "Lingojiguda"], 
  "SaroorNagar": ["Saroornagar", "Rama Krishna Puram", "Kothapet", "Chaitanyapuri", "Gaddiannaram"], 
  "Malakpet": [], 
  "Santhoshnagar": [], 
  "Chandrayangutta": [], 
  "Charminar": [], 
  "Falaknuma": [], 
  "Rajendra Nagar": [], 
  "Mehdipatnam": [], 
  "Karwan": [], 
  "Goshamahal": [], 
  "Musheerabad": [], 
  "Amberpet": [], 
  "Khairathabad": [], 
  "Jubilee Hills": [], 
  "Yousufguda": [], 
  "Gachibowli": [], 
  "Serilingampally": [], 
  "RC Puram, Patancheruvu": [], 
  "Moosapet": [], 
  "Kukatpally": [], 
  "Qutbullapur": [], 
  "Gajularamaram": [], 
  "Alwal": [], 
  "Malkajgiri": [], 
  "Secunderabad": [], 
  "Begumpet": []
};

const wards = [];

exports.mandals = mandals;
exports.zones = zones;
exports.circles = circles;
exports.wards = wards;
exports.zoneToCirclesMap = zoneToCirclesMap;
exports.circleToWardsMap = circleToWardsMap;
