<template>
  <div class="map">
    <div class="search">
      <div class="search-bar">
        <input type="text" id="search" />
        <input type="button" value="搜索" id="btn" />
      </div>
    </div>
    <div class="content">
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
    };
  },
  created() {},
  mounted() {
    this.initMap();
  },

  methods: {
    initMap() {
      this.map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D", //使用3D视图
      });
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
  min-width: 800px;
}
.map .search {
  width: 25%;
  /* height: 600px; */
  height: calc(100vh - 20px);
}
.map .content {
  width: 75%;
  /* height: 600px; */
  height: calc(100vh - 20px);
  border: 2px solid lightgray;
}
#container {
  width: 100%;
  height: 100%;
}

.search .search-bar {
  width: 100%;
  height: 40px;
  border: 1px solid pink;
}
.search-bar input {
  height: 70%;
}

#search {
  outline: none;
  padding-left: 10px;
  width: 80%;
}

#btn {
  width: 10%;
}
</style>