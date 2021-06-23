import Axios from 'axios';
import { EVENT_ENDPOINT } from '../../config';
import { debugDDResponse } from '../Debug';
import Cache from '../Cache';
import { dangerToast } from '../Toast';
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
        Cache.set(`${cacheKey}/${numericDate}`, events)
        return events
      }
    )
}


export const findAll = async () => {
  const cachedEvents = await Cache.get(`${cacheKey}`)

  if (cachedEvents) return cachedEvents

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
        const event = await data
        const allEvents = Cache.get(`${cacheKey}`)
        allEvents.push(JSON.parse(event))
        Cache.set(`${cacheKey}`, allEvents)
        return JSON.parse(event)
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