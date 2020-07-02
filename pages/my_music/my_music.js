//index.js

const app = getApp()

Page({
  data: {
    ifShow:false,
    ifshowList:false,
    audioindex: 0,
    audio: [{
      id: '0',
      poster: 'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=181113038,1342231338&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=f7969831ed1858ebb56104c548707c02',
      name: '桥边姑娘',
      author: '海伦',
      src: 'http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=81010978&type=convert_url&response=res'
    }, {
      id: '1',
      poster: 'http://p2.music.126.net/bYTctrjUegSyzDPteIeNOw==/74766790705099.jpg?param=130y130',
      name: '月半小夜曲',
      author: '李克勤',
      src: 'http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=148358&type=convert_url&response=res'
    }, {
      id: '2',
      poster: 'http://p1.music.126.net/lgReIYke7cuR_Hyo3BSwlA==/109951164582728714.jpg?param=130y130',
      name: '岁月神偷',
      author: '等什么君',
      src: 'http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=61478506&type=convert_url&response=res'
    },{
      id: '3',
      poster: 'http://p1.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg?param=130y130',
      name: '淘汰',
      author: '陈奕迅',
      src: 'http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=236687&type=convert_url&response=res'
    },{
      id: '4',
      poster: 'http://p2.music.126.net/RJoUUM_dSGSwwPzWaE041g==/3245758328218726.jpg?param=130y130',
      name: '稳稳的幸福',
      author: '陈奕迅',
      src: 'http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=3236471&type=convert_url&response=res'
    },{
      id: '5',
      poster: 'http://img3.kuwo.cn/star/albumcover/300/86/93/2359259663.jpg',
      name: '等你下课(with 杨瑞代)',
      author: '周杰伦',
      src: 'http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=40079875&type=convert_url&response=res'
    },{
      id: '6',
      poster: '//y.gtimg.cn/music/photo_new/T002R300x300M000002Neh8l0uciQZ.jpg?max_age=2592000',
      name: '给我一首歌的时间',
      author: '周杰伦',
      src: 'http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=440614&type=convert_url&response=res'
    },{
      id: '7',
      poster: 'http://p2.music.126.net/loPUgrajdDnixh2Jemk2EQ==/109951164150451518.jpg?param=130y130',
      name: '空',
      author: '徐海俏',
      src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_76938578&response=res&type=convert_url&'
    },{
      id: '8',
      poster: 'https://p3fx.kgimg.com/stdmusic/20190315/20190315213345638831.jpg',
      name: '左手指月',
      author: '李雨桐',
      src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_65064796&response=res&type=convert_url&'
    },{
      id: '9',
      poster: 'http://p2.music.126.net/Aj4X1kpV-C2LLi-e_Xhgvg==/109951164499744148.jpg?param=130y130',
      name: '下山',
      author: '宇辰辰',
      src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_82703934&response=res&type=convert_url&'
    },{
      id: '10',
      poster: 'http://p2.music.126.net/dnRTxhaQ2Y_DoqrfwCpfJQ==/109951162806037796.jpg?param=130y130',
      name: '遗憾',
      author: '大壮',
      src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_22813317&response=res&type=convert_url&'
    }],

  },
  showList(){
    this.setData({
      ifshowList:!this.data.ifshowList
    })
  },
  seekList(event){
    var that =this
    var id =event.currentTarget.dataset.id
    console.log(id)
    that.setData({
      audioindex: id,
      ifShow:true,
      ifshowList:false
    })
    this.audioCtx.play()
    this.audioCtx.seek(0)
  },
  backPlay() {
    var index = this.data.audioindex
    var that = this
    index--
    console.log(index)
    if (index <= 0) {
      that.setData({
        audioindex: 0,
        ifShow:true
      })
      this.audioCtx.play()
      this.audioCtx.seek(0)

    } else {
      that.setData({
        audioindex: index,
        ifShow:true
      })
      this.audioCtx.play()
    }
  },
  nextPlay() {
    var index = this.data.audioindex
    var that = this
    index++
    console.log(index)
    if (index >= this.data.audio.length) {
      that.setData({
        audioindex: 0,
        ifShow:true
      })
      this.audioCtx.play()
      this.audioCtx.seek(0)
    } else {
      that.setData({
        audioindex: index,
        ifShow:true
      })
      this.audioCtx.play()
    }
  },
  audioPlay() {
    this.audioCtx.play()
    this.setData({
      ifShow:true
    })
  },
  audioPause() {
    this.audioCtx.pause()
    this.setData({
      ifShow:false
    })
  },
  // audio14() {
  //   this.audioCtx.seek(14)
  // },
  // audioStart() {
  //   this.audioCtx.seek(0)
  // },
  onReady(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
})