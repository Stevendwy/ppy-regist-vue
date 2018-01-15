export default {
  link(path, body) {
    let result = path + '?'
    for(let key in body) {
      result += key + '=' + body[key] + '&'
    }
    return result
  },
}