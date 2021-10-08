<template>
  <div class="app-container">
    <aside>使用 <a href="https://dafrok.github.io/vue-baidu-map" target="_blank">vue-baidu-map</a> 组件</aside>

    <baidu-map
      class="bmap-wrapper"
      :center="center"
      :zoom="zoom"
      @ready="handler"
    >
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT" />
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />
    </baidu-map>
  </div>
</template>

<script>
let that
export default {
  name: 'BdMapDemo',
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 15
    }
  },
  beforeCreate() {
    that = this
  },
  methods: {
    handler({ BMap, map }) {
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(r => {
        that.center.lng = r.point.lng
        that.center.lat = r.point.lat
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bmap-wrapper {
  width: 100%;
  height: 700px;
  margin-bottom: 100px;
}
</style>

