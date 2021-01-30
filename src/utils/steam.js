const axios = require('axios');

let statusUrl = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${process.env.STEAM_API_KEY}&steamids=`;
let profileUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=`;

const fetchProfiles = async(docs) =>{
    for(d of docs){
        statusUrl += d.steamid + ',';
        profileUrl += d.steamid + ',';
    }
    const statusResult = await axios.get(statusUrl);
    const profilesResult = await axios.get(profileUrl);
    let allProfiles = profilesResult.data.response.players;
    let allStatus = statusResult.data.players;

    for(i = 0; i < allProfiles.length; i++){
        for(j = 0; j < allStatus.length; j++){
            if(allProfiles[i].steamid == allStatus[j].SteamId){
                delete allStatus[j].SteamId;
                Object.assign(allProfiles[i], allStatus[j]);
            }
        }
    }
    return allProfiles;
}
module.exports.fetchProfiles = fetchProfiles;
