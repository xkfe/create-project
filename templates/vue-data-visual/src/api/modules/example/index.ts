import alovaInst from '@/api/request'

export function getExampleAPI<P extends object>(params: P) {
  const alovaInstance = alovaInst.Post('/todos1/1', params)
  alovaInstance.meta = {
    ignoreToken: false,
  }
  return alovaInstance
}
