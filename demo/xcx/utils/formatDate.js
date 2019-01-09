function zeroPad(n) {
  return `0${n}`.slice(-2)
}

/**
 *
 * @param interval
 * @param type
 * type == 1 => YYYY-MM-DD HH:mm:ss
 * type == 2 => YYYY-MM-DD 00:00:00
 * type == 3 => HH:mm:ss
 * type == 4 => MM-DD
 * type == 5 => YYYY-MM-DD HH:mm
 * type == null => YYYY-MM-DD
 * @returns {*}
 */
function formatDate(src, type, split = '-') {
  const dateObject = new Date(src)
  const year = dateObject.getFullYear()
  const month = zeroPad(dateObject.getMonth() + 1)
  const date = zeroPad(dateObject.getDate())
  const hours = zeroPad(dateObject.getHours())
  const minutes = zeroPad(dateObject.getMinutes())
  const seconds = zeroPad(dateObject.getSeconds())

  const formatDate = `${year}${split}${month}${split}${date}`
  const formatTime = `${hours}:${minutes}:${seconds}`
  
  if (type == 1) return `${formatDate} ${formatTime}`
  if (type == 2) return `${formatDate} 00:00:00`
  if (type == 3) return formatTime
  if (type == 4) return `${month}${split}${date}`
  if (type == 5) return `${formatDate} ${hours}:${minutes}`
  if (type == 6) return `${hours}:${minutes}`
  if (type == 7) return `${minutes}:${seconds}`

  return formatDate
}


function formatTime(date) {
  if(!date) return ''

  const dateArray = date.split(/\/|\-|\:|\ /)
  dateArray[1] -= 1
  const now = new Date()
  now.setHours(0, 0, 0, 0) // 当天零点
  const zoreTime = now.getTime()
  const newTime = +new Date(...dateArray); // 动态时间的毫秒数

  if (newTime > zoreTime) { // 今天的状态
    return formatDate(newTime, 6)
  }

  const dayInterval = Math.floor((zoreTime - newTime) / (24 * 60 * 60 * 1000)); // 时间间隔

  if (dayInterval == 0) {
    return '昨天'
  }

  if (dayInterval == 1) {
    return '前天'
  }

  if (dayInterval >= 2 && dayInterval <= 5) {
    return dayInterval + 1 + '天前'
  }

  const nowYear = new Date().getFullYear()
  const dateObj = new Date(...dateArray)
  const year = dateObj.getFullYear()
  const month = zeroPad((dateObj.getMonth() + 1))
  const dateStr = zeroPad(dateObj.getDate())

  return `${nowYear == year ? '' : year + '年' }${month}月${dateStr}日`
}

export default formatDate
export { zeroPad, formatTime }