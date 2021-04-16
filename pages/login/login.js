// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    down:'',message1:'',message2:''
  },
 getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    var that =this
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        let user = res.userInfo
        wx.setStorageSync('user',user)
        that.submit(user)
        this.setData({
          down:'down',
          message1:'代表迪迦感谢你！',
          message2:'(*^▽^*)'
        })
        return
      },
      fail: res => {
        //拒绝授权
        this.setData({
          down:'down',
          message1:'那我下次再来好了',
          message2:'(ಥ﹏ಥ)'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 3000);
        return
     }
    })
  },
  submit(user){
    const db = wx.cloud.database()
    db.collection('userDetail').where({
      nickName:user.nickName
    }).get({
      success: function(res) {
        var length = res.data.length;
        if(length==0){
          db.collection('userDetail').add({
            data: user,
            success: res => {
              // 在返回结果中会包含新创建的记录的 _id
              console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
              console.error('[数据库] [新增记录] 失败：', err)
            }
          })
        }
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 3000);
      },
      fail:function(){
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 3000);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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