App({
  onLaunch() {
    console.log("小程序初始化完成~");
  },
  gIsPlayingMusic: false,
  gPlayingMusicPostId: null,
  gBaseUrl: "http://t.talelin.com/v2/movie",
  gGroupTitleMap: {
    in_theaters: "正在热映",
    coming_soon: "即将上映",
    top250: "TOP250",
  }
});
