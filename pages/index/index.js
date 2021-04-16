//index.js
//获取应用实例
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var day = ["今天", "明天", "后天"];
var qqmapsdk;
Page({
  data: {
    user:{},
    timer:'',
    canIUseGetUserProfile:true,
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
      url: 'https://th.wallhaven.cc/small/j3/j3833m.jpg'
    }, {
      id: 1,
      url: 'https://th.wallhaven.cc/small/k7/k797xd.jpg'
    }, {
      id: 2,
      url: 'https://th.wallhaven.cc/small/x8/x8183o.jpg'
    },
    {
      id: 3,
      url: 'https://th.wallhaven.cc/small/v9/v9m9rp.jpg'
    },
    {
      id: 4,
      url: 'https://th.wallhaven.cc/small/72/7266we.jpg'
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
    var user =wx.getStorageSync('user')||false
     console.log(user)
     this.setData({
       user:user
     })
     if(!user){
      let i =  setTimeout(()=>{
        wx.navigateTo({
          url:  "/pages/login/login",
        })
      },2000)
      this.setData({
        timer:i
      })
      return
    }
  },
  bindMapTap: function () {
    wx.navigateTo({
      url: '../map/map'
    })

  },
  onShow: function () {
    console.log('onshow')
    if(this.data.longitude==''&&this.data.latitude==''){
      console.log('获取')
      qqmapsdk = new QQMapWX({
        key: '46RBZ-KCA6D-HSH4Z-HDRI2-PBC3Q-I7FLQ' //这里自己的key秘钥进行填充
      });
      let vm = this;
      vm.getUserLocation(1);
    }
    console.log('不获取')
   
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
  CurentTime()
    { 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        return(clock); 
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
  onAdd: function (data) {
    // console.log(data)?\
    var user =this.data.user
    if(!user){
       return
    }
    const db = wx.cloud.database()
    data.avatarUrl=user.avatarUrl
    data.wxcity=user.city
    data.wxgender=user.gender
    data.wxnickName=user.nickName
    data.wxprovince=user.province
    data.time =this.CurentTime()
    db.collection('user').add({
      data: data,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        console.error('[数据库] [新增记录] 失败：', err)
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
        let data = {
          province: province,
          city: city,
          district: district,
          street: street,
          latitude: latitude,
          longitude: longitude
        }
        vm.onAdd(data)
        // wx.request({
        //   url: 'http://192.168.1.127:3000/users/test',
        //   method:'POST',
        //   header:{
        //     "content-type":'application/x-www-form-urlencoded'
        //   },
        //   data:data,
        //   // responseType:'json',
        //  success(res){
        //   console.log(res)
        //  },
        //  fail(e){
        //    console.log(e)
        //  }
        // })
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
      showCancel:false,
      success: function(res) {  
          if (res.confirm) {  
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
  },
  onUnload: function () {
    var that = this;
    clearInterval(that.data.timer)
  },
  onHide: function () {
    var that = this;
    clearInterval(that.data.timer)
  },
})