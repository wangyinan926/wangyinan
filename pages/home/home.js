// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    down:'',
    show:'',
    user:{},
    timer:'',
    menuitems: [{
        text: '个人资料',
        url: '../mine/mine',
        icon: '/images/mine.png',
        tips: '',
        arrows: '/images/user/arrows.png'
      },
      {
        text: '邀请好友',
        url: '#',
        icon: '/images/share.png',
        tips: 'share',
        arrows: '/images/user/arrows.png'
      },
      {
        text: '来聊聊天',
        url: '#',
        icon: '/images/help.png',
        tips: 'cus',
        arrows: '/images/user/arrows.png'
      },
      {
        text: '用户信息',
        url: '../user/user',
        icon: '/images/music.png',
        arrows: '/images/user/arrows.png',
        tips:'mm'
      }
    ],
    transform: 'translateY(100%)',
    duration: '0.8s'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user =wx.getStorageSync('user')||false
    console.log(user)
    if(!user){
     let i =  setTimeout(()=>{
        wx.navigateTo({
          url:  "/pages/login/login",
        })
      },2000)
      this.setData({
        timer:i
      })
    }
    this.setData({
      user:user
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
    console.log('onshow')
    var that = this
    this.setData({
      down:'down',
      show:'show'
    })
    if(!that.data.user){
      var user =wx.getStorageSync('user')||false
      this.setData({
        user:user
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('隐藏')
    var that = this;
    clearInterval(that.data.timer)
    this.setData({
      down: 'none',
      show:'none'
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('卸载')
    var that = this;
    clearInterval(that.data.timer)
    this.setData({
      down: 'none',
      show:'none'
    })
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
    return {
      title: '来瞅一哈！',
      path: '/pages/center/center' // 路径，传递参数到指定页面。

    }
  }
})