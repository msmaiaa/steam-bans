const buildQueryParams = (raw) =>{
    let newQuery = {...raw};
    if(raw.sendEmail){
        newQuery.sendEmail = true;
    }
    if(raw.sendDiscord){
        newQuery.sendDiscord = true;
    }
    return newQuery;
}

module.exports = buildQueryParams;