<template>
  <div class="box">
    <div class="name">相关攻略</div>
    <div
      class="postBox"
      v-for="(item,index) in postsList"
      :key="index"
      @click="$router.push(`/post/detail?id=${item.id}`)"
    >
      <img :src="`${item.images[0]}`" alt />
      <div class="postContent">
        <p class="title">{{item.title}}</p>
        <span class="time">{{item.created_at}} 阅读:{{item.watch}}</span>
      </div>
    </div>
    <div class="flight">
      <h2 class="air-title">
        <span class="iconfont iconfeiji"></span>
        <i>国内机票</i><span class="titlePS">(搜索机票立即出发~)</span>
      </h2>

      <el-form class="search-form-content" label-width="80px">
        <el-form-item label="出发城市">
          <el-input placeholder="请搜索出发城市" class="el-autocomplete"></el-input>
        </el-form-item>

        <el-form-item label="到达城市">
          <el-input placeholder="请搜索到达城市" class="el-autocomplete"></el-input>
        </el-form-item>

        <el-form-item label>
          <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="$router.push('/air')">搜索</el-button>
        </el-form-item>
        <div class="reverse"></div>
      </el-form>
    </div>
  </div>
</template>

<script>
import comment from "@/components/post/comment.vue";
import moment from "moment";
export default {
  data() {
    return {
      postsList: []
    };
  },
  async mounted() {
    // 获取文章列表
    const res = await this.$axios({
      url: "/posts/recommend",
      params: this.$route.query
    });
    const { data } = res.data;
    this.postsList = data;
    this.postsList.forEach(v => {
      v.created_at = moment(v.created_at).format(`YYYY-MM-DD`);
    });
  }
};
</script>

<style scoped lang='less'>
.box {
  .name {
    font-size: 17px;
    color: #444;
    padding-bottom: 10px;
  }
  .postBox {
    padding: 20px 0;
    border-top: 1px solid #999;
    > img {
      width: 100px;
      height: 80px;
      padding-right: 10px;
    }
    .postContent {
      height: 80px;
      width: 170px;
      display: inline-block;
      .title {
        line-height: 20px;
        height: 60px;
        overflow: hidden;
        font-size: 14px;
      }
      .time {
        font-size: 13px;
        color: #888;
      }
    }
  }
  .flight {
    .air-title {
      margin: 15px 0;
      font-size: 20px;
      font-weight: normal;
      color: orange;
      .titlePS{
          font-size: 15px;
      }
      span {
        font-size: 20px;
      }
    }
    .search-form-content {
      position: relative;

      .el-autocomplete {
        width: 100%;
      }
    }
  }
}
</style>