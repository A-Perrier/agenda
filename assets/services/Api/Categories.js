import Axios from 'axios';
import { CATEGORY_ENDPOINT } from '../../config';
import { debugDDResponse } from '../Debug';
import Cache from '../Cache';
import { dangerToast } from '../Toast';

const cacheKey = "categories"

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export const findAll = async () => {
  const cachedCategories = await Cache.get(cacheKey)

  if (cachedCategories) return cachedCategories

  return axios
    .get(CATEGORY_ENDPOINT)
    .then(
      ({ data }) => {
        const categories = JSON.parse(data)
        Cache.set(cacheKey, categories)
        return categories
      }
    )
}

export const create = (data) => {
  return axios
    .post(CATEGORY_ENDPOINT, data)
    .then(
      async ({ data }) => {
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


export const remove = (data) => {
  return axios
    .delete(`${CATEGORY_ENDPOINT}/${data.id}`)
    .then(
      async (response) => {
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