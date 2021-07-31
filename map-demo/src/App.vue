<template>
  <div class="map">
    <!-- 左侧部分-搜索 -->
    <div class="search">
      <div class="search-bar">
        <div id="kwd">请输入关键词搜索：</div>
        <input
          type="text"
          id="search"
          ref="search"
          v-model="inputVal"
          @change="searchAddress"
        />
        <input type="button" value="搜索" id="btn" @click="searchAddress" />
      </div>
      <!-- 列表展示区 -->
      <div id="panel"></div>
    </div>

    <!-- 右侧部分-地图 -->
    <div class="content">
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
let placeSearch, map;
export default {
  data() {
    return {
      inputVal: "",
    };
  },

  mounted() {
    this.$refs.search.focus();
    this.initMap();
  },

  methods: {
    //初始化地图
    initMap() {
      map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D", //使用3D视图
      });

      AMap.service(["AMap.PlaceSearch"], function () {
        //构造地点查询类
        placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "010", // 兴趣点城市
          citylimit: false, //是否强制限制在设置的城市内搜索
          map: map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
      });
    },

    //关键字查询
    searchAddress() {
      placeSearch.search(this.inputVal);
    },

    selectAddress(e) {
      //这里获得点选地点的经纬度
      let location = e.selected.data.location;
      console.log("lng", location.lng);
      console.log("lat", location.lat);
    },
  },

  //监听输入框的关键字输入
  watch: {
    inputVal(val) {
      this.searchAddress(val);
    },
  },
};
</script>

<style  scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.map {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-width: 900px;
  min-height: 700px;
}
.map .search {
  width: 25%;
  height: 98vh;
  /* height: calc(100vh - 20px); */
}
.map .content {
  width: 75%;
  /* height: calc(100vh - 20px); */
  height: 98vh;
  border: 1px solid lightgray;
}
#container {
  width: 100%;
  height: 100%;
}

.search .search-bar {
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.search-bar #kwd {
  font-size: 14px;
  color: gray;
}
.search-bar input {
  height: 70%;
}

#search {
  width: 80%;
  outline: none;
  padding-left: 10px;
}

#btn {
  width: 40px;
  margin-left: 5px;
  border: none;
  background-color: #3385ff;
  color: #fff;
  cursor: pointer;
}

#panel {
  height: 87vh;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin: 6vh 0.5vw 0 0;
  overflow: scroll;
}

#panel::-webkit-scrollbar {
  display: none;
}
</style>