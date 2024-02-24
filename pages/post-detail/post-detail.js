// pages/post-detail/post-detail.js
import { posts } from '../../data/data.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postContent: {},
    bookmarked: false,
    isPlayingMusic: false,
    _bookmarks: {},
    _bgm: null
  },

  /**
   * 添加或移除书签
   */
  switchBookmarkStatus() {
    let bookmarks = this.data._bookmarks;
    const id = this.data.postContent.id;
    const bookmarked = this.data.bookmarked;
    bookmarks[id] = !bookmarked;
    this.setData({
      bookmarked: !bookmarked,
      _bookmarks: bookmarks
    });
    wx.setStorageSync('bookmarks', bookmarks);
    wx.showToast({
      title: bookmarked ? '取消收藏' : '收藏成功',
    })
  },

  /**
   * 播放音乐
   */
  playMusic() {
    const bgm = this.data._bgm;
    const { title, coverImgUrl, src } = this.data.postContent.music;
    bgm.title = title;
    bgm.coverImgUrl = coverImgUrl;
    bgm.src = src; // 当设置了新的 src 时，会自动开始播放
  },

  /**
   * 暂停音乐
   */
  pauseMusic() {
    const bgm = this.data._bgm;
    bgm.pause();
  },

  isCurrentMusicPlaying() {
    return app.gIsPlayingMusic && app.gPlayingMusicPostId === this.data.postContent.id;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const postContent = posts.find(p => p.id == options.id);
    this.setData({
      postContent
    });

    // 获取缓存中的收藏状态
    const id = postContent.id;
    const bookmarks = wx.getStorageSync('bookmarks');
    this.setData({
      bookmarked: bookmarks[id] || false,
      _bookmarks: bookmarks || {}
    });

    // 获取全局的音乐播放状态
    this.setData({ isPlayingMusic: this.isCurrentMusicPlaying() });

    // 初始化 Backgroundbgm
    const bgm = wx.getBackgroundAudioManager();
    bgm.onPlay(() => {
      app.gIsPlayingMusic = true;
      app.gPlayingMusicPostId = this.data.postContent.id;
      this.setData({ isPlayingMusic: true });
    });
    bgm.onPause(() => {
      app.gIsPlayingMusic = false;
      app.gPlayingMusicPostId = null;
      this.setData({ isPlayingMusic: false });
    });
    this.data._bgm = bgm; // 不需要数据绑定，因此可以不用 setData 赋值
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})