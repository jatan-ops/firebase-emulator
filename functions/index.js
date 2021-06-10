const functions = require("firebase-functions");
const axios = require('axios')

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.api = functions.https.onRequest(async (req,res) => { 
    // here function is triggered with http request so URL was provided. Soon as URL is hit, function is executed.
    switch(req.method) {
        case 'GET':
            const response = await axios.get('http://jsonplaceholder.typicode.com/users/1')
            res.send(response.data)
            break;
        case 'POST':
            const body = req.body
            res.send(body)
            break;
        case 'DELETE':
            res.send('It was a DELETE request')
            break;
        default:
            res.send('It was a default request...')
    }
})

//here userAdded function is triggered with auth, so function is triggered as sooon as user is created.
exports.userAdded = functions.auth.user().onCreate(user => {
    console.log(`${user.email} is created`)
    return Promise.resolve()
})

exports.userDeleted = functions.auth.user().onDelete(user => {
    console.log(`${user.email} is deleted`)
    return Promise.resolve()
})

//here fruitAdded function is triggered with firestore, so function is triggred whenever item is added in database.
exports.fruitAdded = functions.firestore.document('/fruits/{documentID}').onCreate((snapshot, context) => {
    console.log(snapshot.data())
    return Promise.resolve()
})

exports.fruitDeleted = functions.firestore.document('/fruits/{documentID}').onDelete((snapshot, context) => {
    console.log(snapshot.data(), 'deleted')
    return Promise.resolve()
})

exports.fruitUpdated = functions.firestore.document('/fruits/{documentID}').onUpdate((snapshot, context) => {
    console.log('Before', snapshot.before.data())
    console.log('After', snapshot.after.data())
    return Promise.resolve()
})

//cron job runs every minute
exports.scheduledFunctions = functions.pubsub.schedule('*****').onRun(context => {
    console.log('I am executing every minute')
    return null
})