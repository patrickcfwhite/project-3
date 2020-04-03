const secret = 'KennAnniePatrickBFFs4EVAIDOCST'
const port = process.env.PORT || 4000
const dbURIPrefix = 'mongodb://localhost:27017/'
const dbName = 'activity-db'
const dbURI = process.env.MONGODB_URI || `${dbURIPrefix}${dbName}`


module.exports = { secret, port, dbURI }