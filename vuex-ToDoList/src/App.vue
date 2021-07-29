<template>
  <div id="app">
    <a-input
      id="input"
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="editInputValut"
    />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <!-- 使用箭头函数来监听复选框选中状态 -->
        <a-checkbox
          :checked="item.done"
          @change="(e)=>{
          changeStatus(e,item.id);
          }"
        >{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>
      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneNum}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey==='all'?'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey==='undone'?'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey==='done'?'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"; //导入mapState
export default {
  name: "app",
  data() {
    return {};
  },

  created() {
    // 触发action里的getList，发送axios请求
    this.$store.dispatch("getList");
  },

  computed: {
    ...mapState(["list", "inputValue", "viewKey"]), //将state里的数据映射为自己的数据
    ...mapGetters(["unDoneNum", "infoList"]),
  },

  methods: {
    //编辑文本框内容时，将内容同步到state
    editInputValut(e) {
      this.$store.commit("setInputValue", e.target.value);
    },
    //添加事项
    addItemToList() {
      if (this.inputValue.trim().length <= 0) {
        this.$message.warning("内容不能为空");
      } else {
        this.$store.commit("addItem");
      }
    },
    //通过id删除单项任务
    removeItemById(id) {
      this.$store.commit("removeItem", id);
    },
    // 监听复选框状态
    changeStatus(e, id) {
      const params = {
        id: id,
        status: e.target.checked,
      };
      this.$store.commit("updateStatus", params);
    },
    //清除已完成事项
    clear() {
      this.$store.commit("clearDone");
    },
    //实现全部，已完成，未完成的切换
    changeList(key) {
      this.$store.commit("changeListView", key);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 37%;
  padding: 10px;
  /* border: 1px solid gray; */
  margin: 0 auto;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#input {
  margin-bottom: 3px;
}
</style>
