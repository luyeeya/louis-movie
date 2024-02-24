// pages/movies.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
    showSearchResult: false,
    searchResult: []
  },

  /**
   * 搜索电影
   */
  search(event) {
    wx.setNavigationBarTitle({ title: "搜索结果" });
    this.setData({ showSearchResult: true });
    const searchWord = event.detail.value;
    wx.request({
      url: `${app.gBaseUrl}/search`,
      data: {
        q: searchWord
      },
      success: (res) => {
        this.setData({ searchResult: res.data.subjects });
      }
    })
  },

  /**
   * 取消搜索
   */
  cancelSearch() {
    wx.setNavigationBarTitle({ title: "" });
    this.setData({ showSearchResult: false });
  },

  goToMoreMovies(event) {
    const group = event.currentTarget.dataset.group;
    wx.navigateTo({
      url: `/pages/more-movies/more-movies?group=${group}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 正在热映
    wx.request({
      url: `${app.gBaseUrl}/in_theaters`,
      data: { start: 0, count: 3 },
      success: (res) => {
        this.setData({ inTheaters: res.data.subjects});
      }
    });
    // 即将上映
    wx.request({
      url: `${app.gBaseUrl}/coming_soon`,
      data: { start: 0, count: 3 },
      success: (res) => {
        this.setData({ comingSoon: res.data.subjects});
      }
    });
    // TOP250
    wx.request({
      url: `${app.gBaseUrl}/top250`,
      data: { start: 0, count: 3 },
      success: (res) => {
        this.setData({ top250: res.data.subjects});
      }
    });
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