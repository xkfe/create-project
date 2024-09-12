/**
 * @description：请求配置
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  NOTLOGGED = 401,
  OVERDUE = 402,
  TIMEOUT = 10000, // 10s
  TYPE = 'success',
}
