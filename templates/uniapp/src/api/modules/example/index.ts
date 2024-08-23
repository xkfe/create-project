import request from '@/api/request'

export function getExampleApi() {
  return request.get('http://jsonplaceholder.typicode.com/photos', {})
}
