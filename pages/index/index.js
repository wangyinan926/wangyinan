//index.js
//获取应用实例
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var day = ["今天", "明天", "后天"];
var qqmapsdk;
Page({
  data: {
    district: "",
    province: '',
    city: '',
    street: "",
    hideNotice: false,
    day: day,
    tmp: '12',
    txt: '晴',
    code: 'code',
    vis: 'vis',
    dir: '风级',
    sc: '3',
    hum: '12',
    fl: '12',
    daily_forecast: [{
      cond_txt_d: "晴天",
      qlty: 'sun',
      tmp_min: "10",
      tmp_max: '15'
    }, {
      cond_txt_d: "多云",
      qlty: 'duo',
      tmp_min: "12",
      tmp_max: '16'
    }, {
      cond_txt_d: "多云",
      qlty: 'duo',
      tmp_min: "13",
      tmp_max: '15'
    }],
    notice: '不积跬步，无以至千里',
    latitude: '',
    longitude: '',
    imgUrls: [{
      id: 0,
      link: '/my_music/my_music',
      url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2525925535,4044091073&fm=26&gp=0.jpg'
    }, {
      id: 1,
      link: '/my_music/my_music',
      url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00779-2260.jpg'
    }, {
      id: 2,
      link: '/my_music/my_musicr',
      url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2743268655,1778161208&fm=26&gp=0.jpg'
    }],
    indicatorDots: true, //小点
    indicatorColor: "white", //指示点颜色
    activeColor: "coral", //当前选中的指示点颜色
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 1500, //滑动时间
  },
  onLoad: function (e) {
    console.log('onload')
    qqmapsdk = new QQMapWX({
      key: '46RBZ-KCA6D-HSH4Z-HDRI2-PBC3Q-I7FLQ' //这里自己的key秘钥进行填充
    });
    let vm = this;
    vm.getUserLocation(1);
  },
  bindMapTap: function () {
    wx.navigateTo({
      url: '../map/map'
    })

  },
  onShow: function () {
    console.log('onshow')

  },
  onPullDownRefresh: function () {

    this.onLoad(1)
    wx.stopPullDownRefresh()
  },
  getUserLocation: function (e,i) {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // console.log(JSON.stringify(res
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation(e);
        } else {
          //调用wx.getLocation的API
          vm.getLocation(e);
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function (e) {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude, e)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude, e) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res);
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let district = res.result.ad_info.district
        let street = res.result.address_component.street_number
        vm.setData({
          province: province,
          city: city,
          district: district,
          street: street,
          latitude: latitude,
          longitude: longitude
        })
        if (e == 1) {
          return
        } else {
          vm.seachWeather()
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  seachWeather: function () {
  
    wx.showModal({  
      title: '因为之前面免费的接口被停',  
      content: '现在看到的是假的天气数据',  
      cancelText:"谅解",
      success: function(res) {  
          if (res.confirm) {  
            wx.showToast({   
              title: '谢谢谅解',
              duration: 2000  
          })  
          } else if (res.cancel) {  
            wx.showToast({  
              title: '谢谢谅解',   
              duration: 2000  
          })   
          }  
      }  
  })
  },
  getInput: function (e) {
    this.setData({
      district: e.detail.value
    });
  }
})