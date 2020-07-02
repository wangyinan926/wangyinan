// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [{
        text: '个人资料',
        url: '#',
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
        text: '听点音乐',
        url: '../my_music/my_music',
        icon: '/images/music.png',
        tips: '',
        arrows: '/images/user/arrows.png'
      },
      {
        text: '帮助说明',
        url: '#',
        icon: '/images/help.png',
        tips: '',
        arrows: '/images/user/arrows.png'
      }
    ],
    transform: 'translateY(100%)',
    duration: '0.8s'
  },
  gomuic: function () {
    wx.navigateTo({
      url: '../my_music/my_music'
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
    var that = this
    setTimeout(function a1() {
      that.setData({
        transform: 'translateY(0)',
        duration: '0.3s'
      })
    }, 50)
    setTimeout(() => {
      this.setData({
        transform: 'translateY(15%)',
        duration: '0.12s'
      })
    }, 300)
    setTimeout(() => {
      this.setData({
        transform: 'translateY(10%)',
        duration: '0.061s'
      })
    }, 400)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      transform: 'translateY(100%)',
    })
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
    return {
      title: '来瞅一哈！',
      path: '/page/home/home' // 路径，传递参数到指定页面。

    }
  }
})