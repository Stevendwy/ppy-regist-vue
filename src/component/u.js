import axios from 'axios'

/**
 * 工具类
 * @module u
 * @see u.js
 */
export default {
  /**
   * 把 body 拼接到 path 后面
   * @param {String} path 请求 path
   * @param {Object} body 请求 body
   */
  link(path, body) {
    let result = path + '?'
    for(let key in body) {
      result += key + '=' + body[key] + '&'
    }
    return result
  },
  /**
   * axios GET 封装
   * @param {String} path 请求路径
   * @param {Object} options 其他配置
   * @param {Object} data 请求携带的数据，params
   */
  axiosGet(path, options, data) {
    return this.axiosRequest('GET', path, data || {}, options)
  },
  /**
   * axios POST 封装
   * @param {String} path 请求路径
   * @param {Object} data 请求携带的数据，body
   * @param {Object} options 其他配置
   */
  axiosPost(path, data, options) {
    return this.axiosRequest('POST', path, data, options)
  },
  /**
   * axios DELETE 封装
   * @param {String} path 请求路径
   * @param {Object} data 请求携带的数据，params
   * @param {Object} options 其他配置
   */
  axiosDelete(path, data, options) {
    return this.axiosRequest('DELETE', path, data, options)
  },
  /**
   * axios Request 封装
   * @param {String} method 请求类型
   * @param {String} path 请求路径
   * @param {Object} data 请求携带的数据，params 或 body
   * @param {Object} options 其他配置
   */
  axiosRequest(method, path, data, options) {
    let host = ''
    let url = host + path

    return (
      axios.request({
        url,
        data,
        method,
        params: data,
        ...options
      })
        .then(res => {
          if(!res.data) console.log('err with no data')

          let rData = res.data
          if (typeof (rData) !== 'object') rData = JSON.parse(rData)
          if (rData.code === 1) return rData
          else if (rData.code === 2) {
            location.href = "/login"
          }
          else {
            if(rData.msg) alert(rData.msg, '提示')
          }
        })
        .catch(err => {
          alert(err)
        })
    )
  },
  /**
   * 检查表单上传前的数据是否健全
   * @param {Object} data 需要检测的数据
   * @param {Array} keys 必要的 key 值列表
   */
  formCheck(data, keys) {
    return new Promise(function(res, rej) {
      let pass = true
      for(let key of keys) {
        if(!data[key]) {
          rej(key)
          return
        }
      }
      res(true)
    })
  }
}