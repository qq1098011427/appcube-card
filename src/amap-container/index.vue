<template>
  <div class="amap-container">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  name: 'amap-container',
  data() {
    return {
      map: null
    }
  },
  methods: {
    initMap() {
      this.map = new window.AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom:11, //初始化地图层级
        center: [116.397428, 39.90923] //初始化地图中心点
      });
    }
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style scoped>
.amap-container {
  width: 100%;
  height: 100vh;
}
#container {
  width: 100%;
  height: 100%;
}
</style>
