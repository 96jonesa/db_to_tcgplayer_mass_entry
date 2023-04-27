'use strict'
const HTML_YDKFILECONTENTS = "ydkfilecontents";
const HTML_MASSENTRYLIST = "massentrylist";

var ydkfilecontents;

var massentrylist;

async function getcardlist() {
    ydkfilecontents = document.getElementById(HTML_YDKFILECONTENTS).value;

    massentrylist = document.getElementById(HTML_MASSENTRYLIST);

    let ydkListLines = ydkfilecontents.split(/\r?\n/);

    let passcodes = ydkListLines.filter(line => !isNaN(line));

    let massEntryListString = "";

    let passcodesToCountsMap = new Map();

    for (let i = 0; i < passcodes.length; i++) {
        let passcode = passcodes[i];

        if (passcodesToCountsMap.has(passcode)) {
            passcodesToCountsMap.set(passcode, passcodesToCountsMap.get(passcode) + 1);
        } else {
            passcodesToCountsMap.set(passcode, 1);
        }
    }

    let commaSeparatedIds = Array.from(passcodesToCountsMap.keys()).join(",");

    let response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${commaSeparatedIds}`);

    let responseJson = await response.json();

    for (let data of responseJson["data"]) {
        massEntryListString +=  passcodesToCountsMap.get(String(data["id"]).padStart(8, "0")) + " " + data["name"] + "\n";
    }

    massentrylist.innerHTML = massEntryListString;
}
