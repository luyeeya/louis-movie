// pages/movie-detail/movie-detail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 将服务器返回的电影数据，处理成页面可以直接使用的数据
   */
  processMovieData(movie) {
    const data = {};
    data.title = movie.title;
    data.subTitle = movie.countries[0] + " · " + movie.year;
    data.image = movie.images.large;
    data.likes = movie.wish_count;
    data.comments = movie.comments_count;
    data.stars = movie.rating.average / 2;
    data.rating = movie.rating.average
    data.directors = movie.directors.map(i => i.name).join(" / ");
    data.casts = movie.casts.map(i => i.name).join(" / ");
    data.genres = movie.genres.join("、");
    data.summary = movie.summary || "暂无";
    data.castsInfo = movie.casts.map(i => {
      return {
        avatar: i.avatars.large,
        name: i.name
      }
    });
    this.setData({
      movie: data
    });
  },

  /**
   * 预览图片
   */
  previewImage(event) {
    wx.previewImage({
      urls: [this.data.movie.image],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const movieId = options.id;
    wx.request({
      url: `${app.gBaseUrl}/subject/${movieId}`,
      success: (res) => {
        this.processMovieData(res.data);
      }
    })
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