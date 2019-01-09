const htmlMap = {
  'ensp': ' ',
  'emsp': ' ',
  'nbsp': ' ',
  'quot': '"',
  'lt': '<',
  'gt': '>',
  'amp': '&'
}

function unescapeHtml(string){
  if(!string) return string
    
  Object.keys(htmlMap).forEach(key => string = string.replace(new RegExp(`&${key};`, 'ig'), htmlMap[key]))
  return string
}

export { unescapeHtml }