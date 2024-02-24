// components/movie/index.js
const app = getApp();

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    movie: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToDetail(event) {
      const movieId = this.properties.movie.id;
      wx.navigateTo({
        url: `/pages/movie-detail/movie-detail?id=${movieId}`
      });
    }
  },
})