// components/post/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    post: Object
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
    onTap(event) {
      var eventDetail = { id: this.properties.post.id }; // detail对象，提供给事件监听函数
      var eventOption = {}; // 触发事件的选项
      this.triggerEvent('tappost', eventDetail, eventOption);
    }
  }
})