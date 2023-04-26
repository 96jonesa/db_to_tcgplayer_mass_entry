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

    for (let i = 0; i < passcodes.length; i++) {
        let passcode = passcodes[i];

        let response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${passcode}`);

        let responseJson = await response.json();

        let cardName = responseJson["data"][0]["name"];

        massEntryListString += "1 " + cardName + "\n";
    }

    massentrylist.innerHTML = massEntryListString;
}
