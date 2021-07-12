import Axios from 'axios';
import { EVENT_ENDPOINT } from '../../config';
import { debugDDResponse } from '../Debug';
import Cache from '../Cache';
import { dangerToast, successToast } from '../Toast';
import { removeFromArray } from '../../shared/utils';

const cacheKey = "events"

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export const findAllByDate = async (numericDate) => {
  const cachedEvents = await Cache.get(`${cacheKey}/${numericDate}`)

  if (cachedEvents) return cachedEvents

  return axios
    .get(`${EVENT_ENDPOINT}/${numericDate}`)
    .then(
      ({ data }) => {
        const events = JSON.parse(data)
        Cache.set(`${cacheKey}/${numericDate}`, events)
        return events
      }
    )
}


export const findAllUntil = async (numericDate) => {
  return axios
    .get(`${EVENT_ENDPOINT}/until/${numericDate}`)
    .then(
      ({ data }) => {
        const events = JSON.parse(data)
        Cache.set(`${cacheKey}/until/${numericDate}`, events)
        return events
      }
    )
}


export const findAll = async (fromCacheWanted = true) => {
  if (fromCacheWanted) {
    const cachedEvents = await Cache.get(`${cacheKey}`)
    if (cachedEvents) return cachedEvents 
  }

  return axios
    .get(`${EVENT_ENDPOINT}`)
    .then(
      ({ data }) => {
        const events = JSON.parse(data)
        Cache.set(`${cacheKey}`, events)
        return events
      }
    )
}

export const create = (data) => {
  return axios
    .post(EVENT_ENDPOINT, data)
    .then(
      async ({ data }) => {
        const event = await JSON.parse(data)
        const allEvents = Cache.get(`${cacheKey}`)
        allEvents.push(event)
        return event
      }
    )
    .catch(
      ({ response }) => {
        const { data } = response
        for (const [errorField, message] of Object.entries(data)) {
          dangerToast(message)
        }
        return response.data
      }
    )
}



export const edit = (data) => {
  return axios
    .put(`${EVENT_ENDPOINT}/${data.id}`, data)
    .then(
      async ({ data }) => {
        successToast("La modification a été prise en compte")
        const event = await JSON.parse(data)
        Cache.clear(`${cacheKey}`)
        Cache.get(`${cacheKey}`)
        return event
      }
    )
    .catch(
      ({ response }) => {
        const { data } = response
        for (const [errorField, message] of Object.entries(data)) {
          dangerToast(message)
        }
        return response.data
      }
    )
}



export const remove = (data) => {
  return axios
    .delete(`${EVENT_ENDPOINT}/${data.id}`)
    .then(
      async (response) => {
        let allEvents = Cache.get(`${cacheKey}`)
        allEvents.map(event => {
          if (event.id === data.id) {
            allEvents = removeFromArray(allEvents, event)
          }
        })
        Cache.set(`${cacheKey}`, allEvents)

        const status = await response.data
        return status
      }
    )
    .catch(
      ({ response }) => {
        const { data } = response
        dangerToast(data)
      }
    )
}