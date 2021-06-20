import axios from 'axios';
import { createHttpModule } from './util';

const { http, install } = createHttpModule(() => {
  return axios;
});

export default http;
export {
  http,
  install,
};