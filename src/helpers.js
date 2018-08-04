import axios from 'axios';
import { sessionService } from 'redux-react-session';
import Validator from 'validatorjs';

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

export const log = (...messages) => {
  console.log(...messages);
}

export const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const getRandBool = () => true;// Math.random() >= 0.5;

export const env = (key, check) => {
  const variable = process.env[`REACT_APP_${key}`];

  if(check === undefined) {
    return variable;
  }

  return variable === check;
}

export const buildUrl = function (url, options) {
  var queryString = [];
  var key;
  var builtUrl;

  if (url === null) {
    builtUrl = '';
  } else if (typeof(url) === 'object') {
    builtUrl = '';
    options = url;
  } else {
    builtUrl = url;
  }

  if(builtUrl && builtUrl[builtUrl.length - 1] === '/'){
    builtUrl = builtUrl.slice(0, -1);
  }

  if (options) {
    if (options.path) {
      if (options.path.indexOf('/') === 0) {
        builtUrl += options.path;
      } else {
        builtUrl += '/' + options.path;
      }
    }

    if (options.queryParams) {
      for (key in options.queryParams) {
        if (options.queryParams.hasOwnProperty(key)
            && options.queryParams[key] !== void 0) {
          var encodedParam = encodeURIComponent(options.queryParams[key])
          queryString.push(key + '=' + encodedParam);
        }
      }
      builtUrl += '?' + queryString.join('&');
    }

    if (options.hash) {
      builtUrl += '#' + options.hash;
    }
  }

  return builtUrl;
};


export const isEnv = (check) => env('ENV', check);


export const api_url = (path, queryParams) => buildUrl(env('API_BASE_URL'), { path, queryParams });

export function client() {

  const session = JSON.parse(localStorage.getItem('redux-react-session/USER-SESSION'));

  const header = session ? `Bearer ${session.token}` : null;

  return axios.create({
    baseURL: api_url(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: header,
    },
  });
}

export function validate(data, rules, names) {
  let validator = new Validator(data, rules);

  if(names) {
    validator.setAttributeNames(names);
  }
  
  return validator;
}