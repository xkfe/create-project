import alovaInstance from '@/api/request'

export function getExampleApi() {
  return alovaInstance.Get('/todos/1')
}
