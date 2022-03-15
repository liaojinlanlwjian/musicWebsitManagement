

<template>
  <div class="app-container">
    <el-autocomplete
      ref="place"
      v-model="mapLocation.address"
      :fetch-suggestions="querySearch"
      placeholder="请输入详细地址"
      style="width: 100%"
      :trigger-on-focus="true"
      :select-when-unmatched="true"
      @select="handleSelect"
    >
    <el-button slot="append" @click="getLocation" icon="el-icon-search" style="background:#00965e;color:#ffffff">获取定位</el-button>
    </el-autocomplete>
    <div style="margin: 5px">
      <baidu-map class="bm-view" :center="mapCenter" :zoom="mapZoom" :scroll-wheel-zoom="true" ak="baidu-ak" @ready="handlerBMap" />
    </div>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
  name: 'BaiduMapDemo',
  components: {
    BaiduMap
  },
  data() {
    return {
      mapZoom: 15,
      mapCenter: { lng: 0, lat: 0 },
      form:{
        locationMsg:''
      },
      mapLocation: {
        address: undefined,
        coordinate: undefined
      }
    }
  },
  methods: {
         getLocation() {
      let _this = this;
      let geolocation = new BMap.Geolocation();  // 创建百度地理位置实例，代替 navigator.geolocation
      geolocation.getCurrentPosition(function(e) {
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
              // 百度 geolocation 的经纬度属性不同，此处是 point.lat 而不是 coords.latitude
              // console.log(_this.lng, _this.lat);
              let point = new BMap.Point(e.point.lng, e.point.lat);
              let gc = new BMap.Geocoder();
              gc.getLocation(point, function(rs){
                _this.mapLocation.address = rs.address
                _this.address = rs.address;
                let obj = {}
                obj['point'] = rs.point
                obj['value'] = rs.address
                _this.handleSelect(obj)
                  // let addComp = rs.addressComponents;  // 返回的结果，大家可以先把rs打印出来看看是什么
                  // console.log(addComp);
                  // let address = addComp.city+addComp.district+addComp.street;  // 拼接地址
                  // _this.address = address;
                  // console.log(address);
                  // _this.mapLocation.address = address
                  // console.log(_this.$refs);
                  // _this.$refs.place.focus()
                  // // _this.handleSelect()
                  // window.sessionStorage.setItem('address', address);  // 地址存入sessionStorage，再次进入页面就不需要再次请求位置了
              });
          } else {
              console.log(this.getStatus());
          }
      });
        },
    handlerBMap({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      if (this.mapLocation.coordinate && this.mapLocation.coordinate.lng) {
        this.mapCenter.lng = this.mapLocation.coordinate.lng
        this.mapCenter.lat = this.mapLocation.coordinate.lat
        this.mapZoom = 15
        map.addOverlay(new this.BMap.Marker(this.mapLocation.coordinate))
      } else {
        this.mapCenter.lng = 113.271429
        this.mapCenter.lat = 23.135336
        this.mapZoom = 10
      }
    },
    //输入框获取焦点时调用的方法
    querySearch(queryString, cb) {
      var that = this
      var myGeo = new this.BMap.Geocoder()
      myGeo.getPoint(queryString, function(point) {
        if (point) {
          that.mapLocation.coordinate = point
          that.makerCenter(point)
        } else {
          that.mapLocation.coordinate = null
        }
      }, this.locationCity)
      var options = {
        onSearchComplete: function(results) {
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            var s = []
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i)
              var item = { value: x.address + x.title, point: x.point }
              s.push(item)
              cb(s)
            }
          } else {
            cb()
          }
        }
      }
      var local = new this.BMap.LocalSearch(this.map, options)
      local.search(queryString)
    },
    // 选中输入框推荐的值的时候触发
    handleSelect(item) {
      var { point } = item
      this.mapLocation.coordinate = point
      this.makerCenter(point)
    },
    makerCenter(point) {
      if (this.map) {
        this.map.clearOverlays()
        this.map.addOverlay(new this.BMap.Marker(point))
        this.mapCenter.lng = point.lng
        this.mapCenter.lat = point.lat
        this.mapZoom = 15
      }
    },
    handleChange(item){
       var { point } = item
      this.mapLocation.coordinate = point
      this.makerCenter(point)
    }
  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 700px;
}
</style>

