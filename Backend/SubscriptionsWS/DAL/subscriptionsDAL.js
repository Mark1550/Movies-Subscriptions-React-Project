const subscriptionsModel = require('../Models/subscriptionsModel')

//a function that gets all the subscriptions using the subscriptionsModel
const getAllSubscriptions = () => {
    return new Promise((resolve, reject) => {
        subscriptionsModel.find({}, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

// a function that gets a subscriptions by it's ID using the subscriptionsModel
const getSubscriptionById = async (id) => {
    return new Promise((resolve, reject) => {
        subscriptionsModel.findById(id, (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data)
            }

        })
    })
}

// a function that adds a subscription to the database using the subscriptionsModel
const addSubscription = (newSubscription) => {
    return new Promise((resolve, reject) => {
        const subscription = new subscriptionsModel(newSubscription)
        subscription.save((err) => {
            if (err)
                reject(err)
            else
                resolve("Subscription was added successfully")
        })
    })
}

// a function that updates a subscriptoin in the database by it's ID using the subscriptionsModel
const updateSubscription = (id, updatedSubscription) => {
    return new Promise((resolve, reject) => {
        subscriptionsModel.findByIdAndUpdate(id, updatedSubscription, (err) => {
            if (err)
                reject(err)
            else
                resolve("Subscription was updated successfully")
        })
    })
}

// a function that deletes a subscription by it's ID using the subscriptionsModel
const deleteSubscription = (id) => {
    return new Promise((resolve, reject) => {
        subscriptionsModel.findByIdAndDelete(id, (err) => {
            if (err)
                reject(err)
            else
                resolve("Subscription was deleted successfully")
        })
    })
}


module.exports = { getAllSubscriptions, addSubscription, deleteSubscription, updateSubscription, getSubscriptionById }