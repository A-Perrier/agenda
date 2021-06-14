import Axios from 'axios';
import { CATEGORY_ENTRYPOINT } from '../../config';
import { debugDDResponse } from '../Debug';

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const create = (data) => {
  axios
    .post( CATEGORY_ENTRYPOINT, data)
    .then(
      ({data, statusCode}) => debugDDResponse(data)
    )
    .catch(
      response => debugDDResponse(response)
    )
}