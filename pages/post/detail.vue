<template>
  <div class="main">
    <el-row>
      <!-- 内容左边部分 -->
      <el-col :span="17">
        <div class="grid-content bg-purple bodyLeft">
          <div class="bread">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">攻略详情</a></el-breadcrumb-item>
              </el-breadcrumb>
          </div>
          <div v-show="valve">
            <h1>{{post.title}}</h1>
            <div class="clearfix">
              <div class="publishTime">
                <span>攻略： {{postCreatedTime}}</span>
                <span>阅读： {{post.watch}}</span>
              </div>
            </div>
            <div class="content" v-html="post.content"></div>
          </div>
          <div class="userNav">
            <div class="userNav_content">
              <span class="iconfont icon-pinglun"></span>
              <span>评论({{commentTotal}})</span>
            </div>
            <div class="userNav_content" @click="userFollow">
              <span class="iconfont " :class="clickFollow ? 'icon-shoucang':'icon-shoucang1'"></span>
              <span>收藏</span>
            </div>
            <div class="userNav_content">
              <span class="iconfont icon-fenxiang"></span>
              <span>分享</span>
            </div>
            <div class="userNav_content" @click="userLike">
              <span class="iconfont" :class="clickLike ? 'icon-zan':'icon-zan1'"></span>
              <span>点赞({{post.like}})</span>
            </div>
          </div>

          <h3>评论</h3>

          <el-form :model="form" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="评论内容">
              <el-input
                type="textarea"
                @keyup.enter="submitForm"
                :placeholder="commentFrom.userName? `回复：@${commentFrom.userName}`:''"
                v-model="form.content"
              ></el-input>
              <button class="cancelReply" v-if="commentFrom.userName" @click="cancelReply">取消回复</button>
            </el-form-item>

            <!-- 上传文件 -->
            <el-form-item class="uploadPicture" label="图片内容">
              <el-upload
                :action="`${$axios.defaults.baseURL}/upload`"
                name="files"
                list-type="picture-card"
                :file-list="form.cover"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>

            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>

          <div class="commentBox">
            <!-- 评论组件 -->

            <comment
              v-for="(item,index) in PostComment"
              :key="index"
              :commentData="item"
              @pushCommentId="getCommentId"
            ></comment>
          </div>
          <div class="book">
            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="commentTotal"
            ></el-pagination>
          </div>
        </div>
      </el-col>
      <!-- 内容右边部分 -->
      <el-col :span="7" v-show="valve">
        <rightSizeNav></rightSizeNav>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import comment from "@/components/post/comment.vue";
import moment from "moment";
import rightSizeNav from "@/components/post/rightSizeNav.vue";
export default {
  components: {
    comment,
    rightSizeNav
  },
  data() {
    return {
      imageUrl: "",
      // 阀门
      valve: false,
      // 用户点赞
      clickLike:false,
      // 用户收藏
      clickFollow:false,
      // 用户是否登录
      isLogin: false,
      // 文章详情数据
      post: {
        cityName: ""
      },
      // 文章创建时间
      postCreatedTime: "",
      // 评论数量
      commentTotal: 0,
      // 条数
      pageSize: 2,
      // 分页
      pageIndex: 0,
      // 评论全部内容
      PostComment: [],
      // 评论ID
      commentFrom: {},
      // 评论表单
      form: {
        content: "",
        cover: []
      },
      dialogImageUrl: "",
      dialogVisible: false,
      // 图片上传数组
      picture: []
    };
  },
  methods: {
    // 取消回复对象
    cancelReply() {
      this.commentFrom = {};
      this.form.content = "";
    },
    // 发表评论
    submitForm() {
      if(!this.isLogin) return this.userIslogin()
      this.$axios({
        url: "/comments",
        method: "POST",
        data: {
          content: this.form.content,
          post: this.post.id,
          pics: this.picture,
          follow: this.commentFrom.id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        if (res.status == 200) {
          this.$message.success(res.data.message);
          this.commentFrom = {};
          this.form.content = "";
          this.picture = [];
          this.getPostComment();
        }
      });
    },
    // 获取评论ID
    getCommentId(commentFrom) {
      this.commentFrom = commentFrom;
    },
    // 上传文件成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.picture.push(res[0]);
    },
    handleRemove(file, fileList) {
      this.picture = file;
    },
    // 检查用户是否登录
    userIslogin() {
        this.$message.warning("请首先登录");
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
    },
    // 点击关注
    async userFollow() {
      if(!this.isLogin) return this.userIslogin()
      this.clickFollow =true
      await this.userIslogin();
      const res = this.$axios(
        await {
          url: "/posts/star",
          params: this.$route.query,
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
          }
        }
      );
    },
    // 点击点赞
    async userLike() {
      if(!this.isLogin) return this.userIslogin()
      this.clickLike = true
      await this.userIslogin();
      const res = this.$axios(
        await {
          url: "/posts/like",
          params: this.$route.query,
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
          }
        }
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPostComment();
    },
    handleCurrentChange(val) {
      this.pageIndex = val - 1;
      this.getPostComment();
    },
    async getPostComment() {
      // 获取评论数据
      const res = await this.$axios({
        url: `/posts/comments?post=${this.post.id}&_start=${this.pageIndex}&_limit=${this.pageSize}`,
        method: "GET"
      });
      const data = res.data;
      this.commentTotal = data.total;
      this.PostComment = data.data;
      
    },
    async getPostData() {
      // 获取文章内容

      const res = await this.$axios({
        url: "/posts",
        params: this.$route.query,
        method: "GET"
      });

      if (res.status == 200) {
        const { data } = res.data;
        this.post = data[0];

        this.postCreatedTime = moment(this.post.created_at).format(
          `YYYY-MM-DD`
        );
        if (!this.post.like) this.post.like = 0;

        // 检查用户是否登录
        const { userInfo } = this.$store.state.user;
        if (userInfo.token) this.isLogin = true;
      }

      this.getPostComment();
      this.valve = true;
    }
  },
   mounted() {
    // 获取文章内容
    this.getPostData()
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.getPostData()
      }
    }
  }
};
</script>

<style scoped lang='less'>
.main {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .bodyLeft {
    padding-right: 10px;
    .bread {
      font-size: 14px;
      margin-bottom: 5px;
      :first-child {
        font-weight: 600;
      }
    }
    > h1 {
      padding: 20px 0;
      border-bottom: 1px solid #888;
    }
    .publishTime {
      float: right;
      padding: 20px 0 27px 0;
      color: #999;
      font-size: 16px;
      :first-child {
        padding-right: 20px;
      }
    }
    .content {
      width: 100%;
      /deep/ p {
        line-height: 25px;
      }
      /deep/ img {
        max-width: 698px;
        padding: 10px 0;
      }
    }
    .userNav {
      .userNav_content {
        display: inline-block;
        padding: 0 13px;
        :first-child {
          color: #ffaa0d;
          font-size: 40px;
        }
        :last-child {
          display: block;
          color: #999;
          font-size: 16px;
        }
      }
      padding: 50px 0 35px 0;
      text-align: center;
    }
    .send_comment {
      margin: 10px 0;
      .send_picture {
        float: left;
      }
      .btn {
        float: right;
        background-color: #409eff;
        width: 60px;
        height: 30px;
        border: none;
        border-radius: 5px;
      }
    }
  }
  .bodyRight {
    padding-left: 10px;
    width: 100%;
    height: 500px;
    background-color: red;
  }

  .commentBox {
    border: 1px solid #999;
    border-bottom: none;
    margin-bottom: 20px;
  }
  .clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .clearfix {
    *zoom: 1;
  }
}
.cancelReply {
  background-color: #409eff;
  color: white;
  position: absolute;
  top: 12px;
  right: 16px;
  border: none;
  padding: 5px;
  border-radius: 5px;
}
/deep/ .el-textarea__inner {
  resize: none;
}
.uploadPicture {
  display: inline-block;
  width: 500px;
}
.submit {
  display: inline-block;
}
.book {
  text-align: center;
  margin-bottom: 40px;
}
</style>