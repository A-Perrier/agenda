import Axios from 'axios';
import { EVENT_ENDPOINT } from '../../config';
import { debugDDResponse } from '../Debug';
import Cache from '../Cache';
import { dangerToast } from '../Toast';

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

export const create = (data) => {
  return axios
    .post(EVENT_ENDPOINT, data)
    .then(
      async ({ data }) => {
        //debugDDResponse(data)
        const id = await data
        return id
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