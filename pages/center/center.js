"use strict";
Page({
  data: {
    time:'',
    title: "ddemo",
    currentIndex: 0,
    oldIndex: 0,
    view: [{
      in: "",
      out: ""
    }, {
      in: "",
      out: ""
    }],
    bottom: "",
    bottom_one: "",
    bottom_two: "",
    bottom_three: "",
    bottom_four: ""
  },
  touchStart: function (t) {
    this.setData({
      startX: t.changedTouches[0].clientX
    })
  },
  touchEnd: function (t) {
    var e = this,
      n = this.data.view;
    this.setData({
      endX: t.changedTouches[0].clientX
    });
    var a = t.changedTouches[0].clientX - this.data.startX;
    if (a < -100) {
      if (this.data.currentIndex >= 1) return;
      this.setData({
        oldIndex: e.data.currentIndex,
        currentIndex: ++e.data.currentIndex
      }), n[this.data.oldIndex].out = "animated fadeOutLeft", n[this.data.oldIndex].in = "", n[this.data.currentIndex].in = "animated fadeInRight", n[this.data.currentIndex].out = "", this.setData({
        view: n
      }), this.cleanAnimated(), this.showAnimated()
    } else if (a > 100) {
      if (this.data.currentIndex <= 0) return;
      this.setData({
        oldIndex: e.data.currentIndex,
        currentIndex: --e.data.currentIndex
      }), n[this.data.oldIndex].out = "animated fadeOutRight", n[this.data.oldIndex].in = "", n[this.data.currentIndex].in = "animated fadeInLeft", n[this.data.currentIndex].out = "", this.setData({
        view: n
      }), this.cleanAnimated(), this.showAnimated()
    }
  },
  showAnimated: function () {
    var t = this;
    0 === this.data.currentIndex ? (setTimeout(function () {
      t.setData({
        one_one: "animated fadeIn",
        one_two: "animated bounceIn"
      })
    }, 1e3), setTimeout(function () {
      t.setData({
        one_three: "animated bounceIn"
      })
    }, 1500), setTimeout(function () {
      t.setData({
        one_four: "animated bounceIn"
      })
    }, 1800), setTimeout(function () {
      t.setData({
        one_five: "animated lightSpeedIn"
      })
    }, 1900)) : 1 === this.data.currentIndex && (setTimeout(function () {
      t.setData({
        two_one: "animated fadeInDown",
        two_two: "animated fadeInUp"
      })
    }, 1e3), setTimeout(function () {
      t.setData({
        two_three: "animated zoomIn",
        two_four: "animated zoomIn"
      })
    }, 1200), setTimeout(function () {
      t.setData({
        two_three: "two-music-one",
        two_four: "two-music-two"
      })
    }, 2200))
  },
  cleanAnimated: function () {
    0 === this.data.oldIndex ? this.setData({
      one_one: "animated fadeOut",
      one_two: "animated fadeOut",
      one_three: "animated fadeOut",
      one_four: "animated fadeOut",
      one_five: "animated fadeOut"
    }) : 1 === this.data.oldIndex && this.setData({
      two_one: "animated fadeOut",
      two_two: "animated fadeOut",
      two_three: "animated fadeOut",
      two_four: "animated fadeOut",
      two_five: "animated fadeOut"
    })
  },
  onLoad: function () {},
  onReady: function () {},
  onLoad: function () {
    this.setData({
      bottom: "",
      bottom_one: "",
      bottom_two: "",
      bottom_three: "",
      bottom_four: ""
    })
    this.showAnimated();
    var t = this;
    setTimeout(function () {
      let time = new Date().toLocaleTimeString()
      t.setData({
        bottom: "animated slideInUp",
        time:time
      })
    }, 2e3), setTimeout(function () {
      t.setData({
        bottom_one: "animated slideInUp"
      })
    }, 2100), setTimeout(function () {
      t.setData({
        bottom_two: "animated slideInUp"
      })
    }, 2200), setTimeout(function () {
      t.setData({
        bottom_three: "animated slideInUp"
      })
    }, 2300), setTimeout(function () {
      t.setData({
        bottom_four: "animated slideInUp"
      })
    }, 2400), setTimeout(function () {
      t.setData({
        bottom_one: "bottom-4s-move"
      })
    }, 3100), setTimeout(function () {
      t.setData({
        bottom_two: "bottom-3s-move"
      })
    }, 3200), setTimeout(function () {
      t.setData({
        bottom_three: "bottom-2s-move"
      })
    }, 3300), setTimeout(function () {
      t.setData({
        bottom_four: "bottom-1s-move"
      })
    }, 3400)
  },
  onHide: function () {
    // this.cleanAnimated(), 
    // this.setData({
    //   bottom: "",
    //   bottom_one: "",
    //   bottom_two: "",
    //   bottom_three: "",
    //   bottom_four: ""
    // })
  },
  onUnload: function () {},
  onPullDownRefresh: function () {}
});
//# sourceMappingURL=ddemo.js.map