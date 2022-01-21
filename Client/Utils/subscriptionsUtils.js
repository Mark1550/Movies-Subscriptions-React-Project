import { addSubscription, deleteSubscription, getAllSubscriptions, updateSubscriptionById } from "../DAL/subscriptionsDAL";

// a function that return true if the member has a subscription and false if it doesn't
const checkIfHasSub = async (id) => {
    let bool = false
    const subs = await getAllSubscriptions()
    for (let sub of subs) {
        if (sub.memberId === id) {
            bool = true
        }
    }
    return bool;
}

// a function that deleted subscription by it's member's id
const deleteSub = async (id) => {
    const sub = await getSubById(id)
    if (sub !== undefined) {
        await deleteSubscription(sub._id)
    }
}

// a function that find's a subscription by it's member's id
const getSubById = async (id) => {
    const allSubs = await getAllSubscriptions()
    const sub = allSubs.find((subscription) => subscription.memberId === id)
    return sub
}

// a function that adds a movie to the subscription's movie array in the database
const AddMovieToSub = async (memberId, newMovie) => {
    const subBool = await checkIfHasSub(memberId)
    if (subBool) {
        const sub = await getSubById(memberId)
        let array = [...sub.movies, newMovie]
        const newObj = { ...sub, movies: array }
        await updateSubscriptionById(newObj, memberId)
    } else {
        const newSub = {
            memberId: memberId,
            movies: [newMovie]
        }
        await addSubscription(newSub)
    }
}

export { AddMovieToSub, getSubById, deleteSub, checkIfHasSub }