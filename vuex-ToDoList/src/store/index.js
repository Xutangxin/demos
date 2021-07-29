import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)
Vue.use(axios);
export default new Vuex.Store({

  state: {
    // 所有的任务列表
    list: [
      {
        "id": 0,
        "info": "Racing car sprays burning fuel into crowd.",
        "done": false
      },
      {
        "id": 1,
        "info": "Japanese princess to wed commoner.",
        "done": false
      },
      {
        "id": 2,
        "info": "Australian walks 100km after outback crash.",
        "done": false
      },
      {
        "id": 3,
        "info": "Man charged over missing wedding girl.",
        "done": false
      },
      {
        "id": 4,
        "info": "Los Angeles battles huge wildfires.",
        "done": false
      }
    ],
    //文本框输入值
    inputValue: '',
    //id
    nextId: 5,
    viewKey: 'all'
  },

  mutations: {
    //向state里添加数据（任务列表）
    initList(state, list) {
      state.list = list;
    },
    //将文本框内容同步到state
    setInputValue(state, val) {
      state.inputValue = val;
    },
    //添加事项
    //1.创建事项 2.加到list尾部 3.id加1，清空输入值
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj);
      state.nextId++;
      state.inputValue = '';
    },
    //通过id删除单项任务
    //1.获取要删除元素的索引 2.根据索引删除元素
    removeItem(state, id) {
      const index = state.list.findIndex((item) => {
        return item.id === id;
      });
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    //更新复选框勾选状态
    updateStatus(state, params) {
      const index = state.list.findIndex(item => item.id === params.id);
      if (index !== -1) {
        state.list[index].done = params.status;
      }

    },
    //清除已完成事项，把未完成的事项过滤出来
    clearDone(state) {
      state.list = state.list.filter(item => item.done === false);
    },
    //取得全部，已完成，未完成点击状态
    changeListView(state, key) {
      state.viewKey = key;
    }


  },

  actions: {
    // 发送异步请求,这里有个不影响功能的报错
    // getList(context) {
    //   axios.get('./list.json').then((res) => {
    //     context.commit('initList', res.data);//触发mutation里的方法，对list进行赋值
    //     console.log('请求成功');
    //   }).catch(error => {
    //     console.log('请求出现问题' + error);
    //   });
    // }
  },

  getters: {
    //统计未完成任务数
    //getters会对state里的数据进行包装，但不会影响原始数据
    unDoneNum(state) {
      return state.list.filter(item => item.done === false).length;
    },
    //改变全部，已完成，未完成视图
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list;
      } else if (state.viewKey === 'undone') {
        return state.list.filter(item => !item.done);
      } else {
        return state.list.filter(item => item.done);
      }
    }

  },

  modules: {
  }
})
