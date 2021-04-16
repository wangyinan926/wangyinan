// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount:0,
    queryResult:[],
    skip:0,
    lds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getTotalCount()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getTotalCount() {
    // return
    const db = wx.cloud.database()
    let that = this;
    db.collection('user').count({
      success: function (res) {
        that.setData({
          totalCount: res.total
        })
        that.getlist()
      }
    })
  },
  scrollToLower(){
      
  },
  getlist(){
    wx.showToast({title: '加载中', icon: 'loading',duration: 10000});
    console.log('总条数'+ this.data.totalCount)
    console.log('现在'+this.data.skip)
    if(this.data.totalCount <= this.data.skip &&this.data.skip!==0){
      wx.hideToast();
      wx.showToast({
        icon: 'none',
        title: '已加载全部'
      })
      return
    }
    var that =this
    const db = wx.cloud.database()
    db.collection('user').skip(that.data.skip).limit(4).get({
      success: res => {
        console.log(res);
        let result = this.data.queryResult
        let lds =this.data.lds
        res.data.map((item)=>{
          if(lds.indexOf(item._id) < 0){
            result.push(item)
          }
          lds.push(item._id)
        })
        let skip = that.data.skip+4
        this.setData({
          queryResult: result,
          skip:skip,
          lds:lds
        })
        wx.hideToast();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
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
    this.getlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
     
  }
})