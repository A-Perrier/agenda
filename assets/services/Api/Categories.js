import Axios from 'axios';
import { CATEGORY_ENTRYPOINT } from '../../config';
import { debugDDResponse } from '../Debug';
import Cache from '../Cache';

const cacheKey = "categories";

const axios = Axios.create();
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const findAll = async () => {
  const cachedCategories = await Cache.get(cacheKey)

  if (cachedCategories) return cachedCategories;

  return axios
    .get(CATEGORY_ENTRYPOINT)
    .then(
      ({ data }) => {
        const categories = JSON.parse(data);
        Cache.set(cacheKey, categories)
        return categories;
      }
    )
}

export const create = (data) => {
  return axios
    .post(CATEGORY_ENTRYPOINT, data)
    .then(
      async ({ data }) => {
        const id = await data;
        return id;
      }
    )
    .catch(
      response => response
    )
}