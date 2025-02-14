const {readFileSync} = require('fs');

function extractGroupNames(data) {
    return data.map(group => group.groupName);
}

 function getGroupNames() {
    const groupsData = readFileSync(`data/example.json`, 'utf8');
    const groupNames = extractGroupNames(JSON.parse(groupsData));
    return groupNames;
}

module.exports = { getGroupNames };