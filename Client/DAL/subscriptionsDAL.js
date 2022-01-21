import axios from 'axios'

//subscriptionsDAL has all the basic functions that talk to the server side in reggardes with subscriptions data

const url = 'http://localhost:8001/subscriptions'

const getAllSubscriptions = async () => (await (await axios.get(url)).data)

const getSubscriptionByID = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const updateSubscriptionById = async (updatedSubscription, id) => await axios.put(`${url}/${id}`, updatedSubscription)

const addSubscription = async (newSubscription) => await axios.post(url, newSubscription)

const deleteSubscription = async (id) => await axios.delete(`${url}/${id}`)


export { getAllSubscriptions, getSubscriptionByID, updateSubscriptionById, addSubscription, deleteSubscription }    