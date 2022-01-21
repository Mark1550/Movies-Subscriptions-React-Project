const { getAllSubscriptions, deleteSubscription } = require("../DAL/subscriptionsDAL")

// a function that deletes all the subscriptions from the database
const deleteAllSubscriptionsFromDB = async () => {
    const subscriptions = await getAllSubscriptions()
    for (let sub of subscriptions) {
        await deleteSubscription(sub._id)
    }
}
module.exports={deleteAllSubscriptionsFromDB}