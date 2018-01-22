import { MessageBox } from 'element-ui'

export default class Utils {
  /**
   * 
   * @param {Object} obj 需要删除的元素
   * @param {Object} resource 删除数据源
   * @param {String} key 参考key
   */
  static remove(obj, resource, key) {
    if (resource instanceof Array) {
      for (let i = 0, j = resource.length; i < j; i++) {
        let item = resource[i]
        let same = false
        if (key) same = item[key] === obj[key]
        else same = item === obj

        if (same) {
          resource.splice(i, 1)
          break
        }
      }
    }
    return resource
  }

  static get(path, content, payload) {
    return (
      Vue.http.get(path, {params: content})
        .then(res => {
          if(res.body.code === 1) return res.body
          else alert(res.body)
        })
    )
  }

  static post(path, content, payload) {
    return (
      Vue.http.post(path, {params: content}, {body: content})
        .then(res => {
          if(res.body.code === 1) return res.body
          else alert(res.body)
        })
    )
  }

  static delete(path, content, payload) {
    return Utils.ajax('delete', path, content, payload)
  }

  static ajax(type, path, data, payload) {
    let host = ''
    let url = host + path

    return (
      new Promise((rs, rj) => {
        $.ajax({
          type,
          url,
          data,
          success: res => {
            if (typeof (res) !== 'object') res = JSON.parse(res)

            if (res.code === 1) rs(res)
            else if (res.code === 2) {
              location.href = "/"
            }
            else MessageBox.alert(res.msg, '提示')
          },
          error: err => {

          },
          complete: () => {
            clearTimeout(timer)
          }
        })
      })
    )
  }
}
