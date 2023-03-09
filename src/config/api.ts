enum endpoints {
  products = '/products',
  categories = '/categories',
}

enum methods {
  get = 'get',
  post = 'post',
}

export const API = {
  BASE_URL: 'https://api.escuelajs.co/api/v1',
  ENDPOINT: endpoints,
  METHOD: methods,
};
