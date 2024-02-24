// pages/more-movies/more-movies.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    _group: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const group = options.group;
    this.data._group = group;
    wx.request({
      url: `${app.gBaseUrl}/${group}`,
      data: { start: 0, count: 12 },
      success: (res) => {
        this.setData({ movies: res.data.subjects});
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 动态设置导航栏标题
    wx.setNavigationBarTitle({title: app.gGroupTitleMap[this.data._group]});
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
    wx.request({
      url: `${app.gBaseUrl}/${this.data._group}`,
      data: {
        start: 0,
        count: 12
      },
      success: (res) => {
        this.setData({ movies: res.data.subjects });
        // 停止页面下拉刷新
        wx.stopPullDownRefresh();
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 导航栏显示加载状态
    wx.showNavigationBarLoading();
    wx.request({
      url: `${app.gBaseUrl}/${this.data._group}`,
      data: {
        start: this.data.movies.length,
        count: 12
      },
      success: (res) => {
        this.setData({
          movies: this.data.movies.concat(res.data.subjects)
        });
        // 隐藏加载状态
        wx.hideNavigationBarLoading();
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})