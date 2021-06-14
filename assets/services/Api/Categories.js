import Axios from 'axios';
import { CATEGORY_ENTRYPOINT } from '../../config';
import { debugDDResponse } from '../Debug';

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const create = (data) => {
  return axios
    .post( CATEGORY_ENTRYPOINT, data)
    .then(
      async ({ data }) => {
        const id = await data
        return id
      }
    )
    .catch(
      response => response
    )
}