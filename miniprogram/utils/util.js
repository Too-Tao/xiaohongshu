wx.cloud.init();
const db = wx.cloud.database();
const notes = db.collection('notes');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//加载notes,Page=1 (页)是个形参
//limit=10  一次加载数10
//fn
const loadNotes = (fn, page = 1, limit = 10) => {
  const skip = (page - 1) * limit; //忽略前几页数据
  let total = 0;
  notes
    .count()
    .then(res => {
      total = res.total
      return notes
        .limit(limit)
        .skip(skip)
        .get()
    })
    .then(res => {
      fn({
        total,
        data: res.data
      })
    })
}
module.exports = {
  formatTime: formatTime,
  loadNotes
}