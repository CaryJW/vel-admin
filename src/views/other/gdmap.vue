<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-select v-model="query.style" placeholder="主题" class="filter-item">
            <el-option v-for="item in styleArr" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <aside>使用 <a href="https://elemefe.github.io/vue-amap" target="_blank">vue-amap</a> 组件</aside>

    <div class="amap-wrapper">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="handleSearchResult" />
      <el-amap
        vid="amap"
        :center="center"
        :zoom="zoom"
        :plugin="plugin"
        :map-style="query.style"
      >
        <el-amap-marker
          :position="marker.position"
          :events="marker.events"
          :visible="marker.visible"
          :draggable="marker.draggable"
        />
        <el-amap-text
          :text="text.text"
          :offset="text.offset"
          :position="text.position"
          :events="text.events"
        />
      </el-amap>
    </div>
  </div>
</template>

<script>

let that
export default {
  name: 'GdMapDemo',
  data() {
    const styleArr = [
      {
        key: 'normal',
        value: '默认样式'
      },
      {
        key: 'dark',
        value: '幻影黑'
      },
      {
        key: 'light',
        value: '月光银'
      },
      {
        key: 'fresh',
        value: '草色青'
      }
    ]
    return {
      styleArr,
      query: {
        style: 'normal'
      },
      zoom: 18,
      center: [121.59996, 31.197646],
      marker: {
        position: [121.329402, 31.228667],
        events: {
          click: (e) => {
            console.log('点击maker', e)
            this.marker = null
          },
          dragend: (e) => {
            console.log('拖拽maker', e)
            this.marker.position = [e.lnglat.lng, e.lnglat.lat]
          }
        },
        visible: true,
        draggable: true
      },
      text: {
        position: [121.59996, 31.197646],
        text: '',
        offset: [0, -50],
        events: {
          click: () => {
            console.log('点击text')
          }
        }
      },
      plugin: [
        {
          pName: 'ToolBar', // 工具条插件
          position: 'LB'
        },
        {
          pName: 'MapType', // 卫星与地图切换
          defaultType: 0,
          showTraffic: true // 实时交通图层
        },
        {
          pName: 'OverView',
          isOpen: true // 鹰眼是否打开
        },
        {
          pName: 'Scale'
        },
        {
          pName: 'Geolocation', // 定位插件
          showMarker: false,
          timeout: 100, // 超过10秒后停止定位
          events: {
            init(o) {
              // 定位成功 自动将marker移到定位点
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  const position = [result.position.lng, result.position.lat]
                  that.center = position
                  that.marker.position = position
                  that.text.position = position
                  that.text.text = result.formattedAddress
                }
              })
            }
          }
        }
      ],
      searchOption: {
        city: '', // 城市名，默认全国
        citylimit: false // 是否限制城市内搜索
      }
    }
  },
  beforeCreate() {
    that = this
  },
  methods: {
    handleSearchResult(result) {
      if (result.length > 0) {
        const position = [result[0].lng, result[0].lat]
        this.center = position
        this.marker.position = position
        this.text.position = position
        this.text.text = result[0].address + result[0].name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 600px;

  .search-box{
    margin-bottom: 20px;
  }

  margin-bottom: 100px;
}
</style>

