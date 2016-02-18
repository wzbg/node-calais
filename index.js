/* 
* @Author: zyc
* @Date:   2016-02-18 14:06:33
* @Last Modified by:   zyc
* @Last Modified time: 2016-02-18 19:30:45
*/
'use strict'

const fetchUrl = require('fetch').fetchUrl

const url = 'https://api.thomsonreuters.com/permid/calais'

module.exports = class {
  constructor(token, headers) {
    this.headers = headers = headers || {}
    if (!headers['X-AG-Access-Token']) headers['X-AG-Access-Token'] = token
    if (!headers['Content-Type']) headers['Content-Type'] = 'text/html'
    if (!headers.outputFormat) headers.outputFormat = 'application/json'
  }
  exec(content) {
    return new Promise((resolve, reject) => {
      fetchUrl(url, { headers: this.headers, payload: 'content=' + content }, (err, res, buf) => {
        if (err) return reject(err)
        if (res.status != 200) return reject(new Error('error status: ' + res.status))
        const json = JSON.parse(buf)
        const result = {}
        for (let key in json) {
          const value = json[key]
          if (key === 'doc') {
            const meta = value.meta
            result.language = meta.language
          } else if (/cat\/\d+/.test(key)) {
            const group = value._typeGroup
            if (group) {
              result[group] = result[group] || []
              result[group].push({ name: value.name, score: value.score })
            }
          } else if (/SocialTag\/\d+/.test(key)) {
            result.socialTags = result.socialTags || []
            result.socialTags.push({ name: value.name, importance: value.importance })
          } else {
            const type = value._type
            if (type && value.name) {
              const group = value._typeGroup
              if (group) {
                result[group] = result[group] || {}
                result[group][type] = result[group][type] || []
                result[group][type].push({ name: value.name, relevance: value.relevance })
              }
            }
          }
        }
        resolve(result)
      })
    })
  }
}