<template>
  <div class="main">
    <el-row>
      <!-- 内容左边部分 -->
      <el-col :span="17">
        <div class="grid-content bg-purple bodyLeft">
          <div class="bread">
            <a href="javascript:;">旅游攻略</a> /
            <a href="javascript:;">攻略详情</a>
          </div>
          <h1>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h1>
          <div class="clearfix">
            <div class="publishTime">
              <span>攻略： 2019-05-22 10:57</span>
              <span>阅读： 8561</span>
            </div>
          </div>
          <div class="content">
            大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，
            花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花
            得更有道理，收下这份攻略，带你6000块花式玩转塞班。
            <img
              src="@/static/3.jpg"
              alt
            />
            大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，
            花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花
            得更有道理，收下这份攻略，带你6000块花式玩转塞班。
            <img
              src="@/static/3.jpg"
              alt
            />
            大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，
            花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花
            得更有道理，收下这份攻略，带你6000块花式玩转塞班。
            <img
              src="@/static/3.jpg"
              alt
            />
          </div>
          <div class="userNav">
            <div class="userNav_content">
              <span class="iconfont icon-pinglun"></span>
              <span>评论(205)</span>
            </div>
            <div class="userNav_content">
              <span class="iconfont icon-shoucang1"></span>
              <span>收藏</span>
            </div>
            <div class="userNav_content">
              <span class="iconfont icon-fenxiang"></span>
              <span>分享</span>
            </div>
            <div class="userNav_content">
              <span class="iconfont icon-zan1"></span>
              <span>点赞(205)</span>
            </div>
          </div>
          <div class="write_comment">
            <h3>评论</h3>
            <div class="comment_case">
              <textarea style="resize:none;width:100%;height:60px;border-radius: 10px;padding:5px 20px;"></textarea>
            </div>
          </div>
          <div class="send_comment clearfix">
            <el-upload
              class="avatar-uploader send_picture"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <button class="btn">提交</button>
          </div>
          <comment></comment>
        </div>
      </el-col>
      <!-- 内容右边部分 -->
      <el-col :span="7">
        <div class="grid-content bg-purple-light bodyRight"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import comment from '@/components/post/comment.vue'
export default {
  components:{
    comment
  },
  data() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
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
      > img {
        padding: 10px 0;
        width: 100%;
      }
    }
    .userNav {
      .userNav_content {
        display: inline-block;
        padding: 0 13px;
        :first-child {
          color: #ffaa0d;
          font-size: 45px;
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
    .write_comment {
      .comment_case {
        padding-top: 15px;
        width: 100%;
      }
    }
    .send_comment{
      margin-top: 10px;
      .send_picture{
        float: left;
      }
      .btn{
        float: right;
        background-color:#409EFF;
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

// element样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    border: 1px dashed #999;
    background-color: #fbfdff;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>