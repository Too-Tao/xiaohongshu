wx.cloud.init({})
const db = wx.cloud.database()
Page({
  data:{
    adsPic:[]
  },
  onLoad:function(){
    db.collection("adsPic").get({
      success: res => {
        
        this.setData({
          adsPic: res.data
        })
      }
    })
  }
})