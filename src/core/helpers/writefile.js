const fs = require('fs');

module.exports = (collection, array) => {
    fs.writeFileSync(`./src/core/${collection}/${collection}.json`, JSON.stringify(array));
}