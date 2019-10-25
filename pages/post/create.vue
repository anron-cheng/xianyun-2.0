<template>
  <div class="post-container clearfloat">
    <div class="post-publish">
      <h2>发表游记</h2>
      <p>分享你的个人游记，让生活更美好！</p>

      <el-input v-model="draftList.title" placeholder="请输入标题" class="title"></el-input>

      <div id="app">
        <VueEditor :config="config" ref="vueEditor" class="vueEditor" />
      </div>

      <el-row class="city">
        <el-col :span="2.6">选择城市</el-col>
        <el-col :span="6">
          <el-autocomplete
            :fetch-suggestions="queryDestSearch"
            placeholder="请搜索出发城市"
            @select="handleDestSelect"
            v-model="draftList.city"
          ></el-autocomplete>
        </el-col>
      </el-row>

      <div class="btn">
        <el-button type="primary" size="small" @click="handlePublish">发布</el-button>
        <span>或者</span>
        <el-button type="warning" size="small" @click="handleSave">保存草稿</el-button>
      </div>
    </div>

    <div class="draft">
      <h4>草稿箱({{$store.state.draft.draftHistory.length}})</h4>

      <div
        class="draft-list clearfloat"
        v-for="(item,index) in $store.state.draft.draftHistory"
        :key="index"
      >
        <span @click="handleEdit(index)">{{item.title}}</span>
        <i class="el-icon-edit" @click="handleEdit(index)"></i>
        <i class="el-icon-delete" @click="handleDel(index)"></i>
        <p>{{item.time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "app",
  data() {
    return {
      index: 0,
      config: {
        uploadImage: {
          url: `${this.$axios.defaults.baseURL}/upload`,
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        },
        uploadVideo: {
          url: `${this.$axios.defaults.baseURL}/upload`,
          name: "files",
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        }
      },

      draftList: {
        title: "",
        city: "",
        content: ""
      },
      time: "",
      cities: []
    };
  },
  components: {
    VueEditor
  },
  methods: {
    handleSave(index) {
      if (!this.$store.state.user.userInfo.token) {
        this.$message.error("请登录后再写游记");
        this.$router.push("/user/login");
        return;
      }
      const arr = this.$store.state.draft.draftHistory;
      arr.forEach((item, index) => {
        if (item.title === this.draftList.title) {
          this.handleDel(index);
        }
      });
      // 自定义验证
      const rules = {
        title: {
          message: "请输入标题",
          value: this.draftList.title
        },
        city: {
          message: "请输入到达城市",
          value: this.draftList.city
        }
      };
      let valid = true;
      Object.keys(rules).forEach(v => {
        if (!valid) return;
        const { message, value } = rules[v];
        if (!value) {
          this.$message.error(message);
          valid = false;
        }
      });
      var quill = this.$refs.vueEditor.editor;
      this.draftList.content = quill.root.innerHTML;
      var now = moment()
        .locale("zh-cn")
        .format("YYYY-MM-DD");
      this.draftList.time = now;
      const goods = { ...this.draftList };
      if (valid != false) {
        this.$store.commit("draft/setHistory", goods);
      }
      this.draftList.title = "";
      this.draftList.city = "";
      quill.root.innerHTML = "";
    },
    handlePublish() {
      var quill = this.$refs.vueEditor.editor;
      this.draftList.content = quill.root.innerHTML;
      if (!this.draftList.title) {
        this.$message.error("标题不能为空");
        return;
      }
      if (quill.root.innerHTML === "<p><br></p>") {
        this.$message.error("内容不能为空");
        return;
      }
      if (!this.draftList.city) {
        this.$message.error("城市不能为空");
        return;
      }

      this.$axios({
        url: "/posts",
        method: "POST",
        data: this.draftList,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        const { data, message } = res.data;
        if (message === "新增成功") {
          this.$message.success(message);
          this.draftList.title = "";
          this.draftList.city = "";
          quill.root.innerHTML = "";
          this.$router.push(`/post/detail?id=${data.id}`);
        }
      });
    },
    handleEdit(index) {
      this.draftList.title = this.$store.state.draft.draftHistory[index].title;
      this.draftList.city = this.$store.state.draft.draftHistory[index].city;
      var quill = this.$refs.vueEditor.editor;
      quill.root.innerHTML = this.$store.state.draft.draftHistory[
        index
      ].content;
      var now = moment()
        .locale("zh-cn")
        .format("YYYY-MM-DD");
      this.time = now;
    },
    queryDestSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city?name=" + value
      }).then(res => {
        // data是后台返回的城市数组,没有value属性
        const { data } = res.data;
        // 循环给每一项添加value属性
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.cities = newData;
        cb(newData);
      });
    },
    handleDestSelect(item) {
      this.draftList.city = item.value;
    },
    // type可能等于depart 或者 dest

    handleDel(index) {
      this.$store.commit("draft/delHistory", index);
    }
  }
};
</script>

<style scoped lang="less">
.post-container {
  padding: 20px 0;
  width: 1000px;
  margin: 0 auto;

  .post-publish {
    float: left;
    width: 750px;
    margin-right: 50px;
    h2 {
      font-size: 22px;
      margin-bottom: 10px;
      font-weight: normal;
    }
    > p {
      color: #999;
      font-size: 12px;
      margin-bottom: 10px;
    }
    /deep/ .title {
      margin-bottom: 20px;
    }
    /deep/ .city {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      margin-top: 20px;
    }
    .btn {
      margin-top: 20px;
      font-size: 14px;
      em {
        color: #ffa500;
      }
    }
    #app {
      padding-bottom: 50px;
      /deep/ .vueEditor {
        height: 300px;
      }
    }
  }
  .draft {
    float: right;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    width: 180px;
    padding: 10px;
    .draft-list {
      padding-top: 10px;
      span {
        float: left;
        width: 140px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
      }
      i {
        float: left;
      }
      p {
        float: left;
        color: #999;
        font-size: 12px;
      }
    }
  }
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
.draft-list {
  span:hover {
    color: orangered;
  }
  .el-icon-edit:hover {
    color: orangered;
  }
}
</style>