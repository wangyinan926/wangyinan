// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age:0,
    phone: '13243341305',
    name: '王银安'
  },
  call: function () {
    console.log(this.data.phone)
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
      success: function () {
        console.log('成功')
      }
    })
  },
  add: function () {
    var that = this
    wx.addPhoneContact({
      firstName: that.data.name,
      mobilePhoneNumber: that.data.phone,
      success: function () {
        console.log('成功')
      }
    })
  },
  copyText: function () {
    wx.setClipboardData({
      data:this.data.phone ,
      success: function (res) {
        wx.hideToast()
        wx.showModal({
          title: '提示',
          content:'微信号已经复制,请到微信页面添加好友',
          showCancel:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var year = new Date().getFullYear()
      console.log(year)
      this.setData({
        age: year - 1996
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})