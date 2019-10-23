<template>
  <!-- 回复的那条评论 -->
  <div class="replay" >
    <div class="reply_title">
      <div class="user_info">
        <div class="user">
          <span class="user_name">{{commentParent.account.nickname}}</span>
          <span class="send_time">{{parentCreatedTime}}</span>
        </div>
        <div class="comment_num">{{commentParent.level}}</div>
      </div>
      <div class="comment " @mouseover="replayShow=true" @mouseout="replayShow=false">
        <div class="comment_comtent">{{commentParent.content}}
          <!-- 评论图片 -->
        <div v-if="commentData.pics"  class="comment_picture">
            <div class="picture_box" v-for="(item,index) in commentData.pics" :key="index">
              <img :src="`${$axios.defaults.baseURL}${item.url}`" alt="">
            </div>
        </div>  

        </div>
        <a href="javascript:;"  v-show="replayShow" @click="writeReplay(commentParent.id,commentParent.account.nickname)" class="write_replay">回复</a>
      </div>
    </div>
    <comment v-if="commentParent.parent" :commentParent='commentParent.parent' @pushCommentId='pushCommentId'></comment>
  </div>
</template>

<script>
import moment from "moment";
export default {
    data(){
    return {
      // 上一级回复的时间
      parentCreatedTime:'',
      commentData:{},
      // 回复按钮显示
      replayShow:false
    }
  },
  props:{
      commentParent:{
          type:Object,
          default:{}
      }
  },
  methods:{
    // 向父组件传送评论ID
    writeReplay(id,userName){
      const commentuser ={
        id,
        userName
      }
      this.$emit('pushCommentId',commentuser) 
    },
        // 评论楼层传出
    pushCommentId(form){
      this.$emit('pushCommentId',form) 
    }
  },
  name:'comment',
  mounted(){
       this.commentData =  this.commentParent
       this.parentCreatedTime = moment(this.commentParent.created_at).format(`YYYY-MM-DD`)
  }
};
</script>

<style scoped lang='less'>
.replay {
  border: 1px solid #888;
  background-color: #f9f9f9;
  padding: 5px;
}
.reply_title {
  padding: 10px;
}
.user_info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.user {
  display: flex;
  align-items: center;
  > span {
    margin-right: 5px;
    font-size: 13px;
    color: #888;
  }
  .user_name {
    font-weight: 600;
  }
}
.comment_num {
  line-height: 30px;
  font-size: 13px;
  color: #888;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.comment_picture{
  widows: 100%;
  .picture_box{
    display: inline-block;
    
    >img{
    margin-top: 5px;
    margin-right: 5px;
    border-radius: 5px;
    border: 1px dashed #999;
    padding: 5px;
    width:80px;
    height: 80px;
  }
  }

}
.clearfix {
  *zoom: 1;
}
.comment_comtent{
    
    margin-top: 10px;
}
.comment{
  position: relative;
}
.write_replay{
    position: absolute;
    bottom: -5px;
    right: 0px;
    color: #888;
    font-size: 13px;
    line-height: 25px;
}
</style>

