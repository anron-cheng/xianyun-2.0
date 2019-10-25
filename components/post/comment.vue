<template>
  <div class="box">
    <div class="user_title">
      <div class="user_info">
        <div class="user">
          <img :src="`${$axios.defaults.baseURL}${commentData.account.defaultAvatar}`" alt />
          <span class="user_name">{{commentData.account.nickname}} </span>
          <span class="send_time" >{{createdTime}}</span>
        </div>
        <div class="comment_num">{{commentData.level}}</div>
      </div>
      <!-- 回复楼层组件 -->
      <commentFloor v-if="commentData.parent" :commentParent="commentData.parent" @pushCommentId='ReplayFloor'></commentFloor>
      
      <div class="comment clearfix" @mouseover="replayShow=true" @mouseout="replayShow=false">
        <div class="comment_comtent">{{commentData.content}}
          <!-- 评论图片 -->
        <div v-if="commentData.pics"  class="comment_picture">
            <div class="picture_box" v-for="(item,index) in commentData.pics" :key="index">
              <img :src="`${$axios.defaults.baseURL}${item.url}`" alt="">
            </div>
        </div>  
        </div>
        <a href="javascript:;" v-show="replayShow" @click="writeReplay(commentData.id,commentData.account.nickname)" class="write_replay">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import commentFloor from "@/components/post/commentFloor.vue"
export default {
  props:{
     commentData:{
       type:Object,
       default:{},
       
     }
  },
  components:{
    commentFloor
  },
  data(){
    return {
      // 回复时间
      createdTime:'',
      commentParent:{},
      // 回复按钮显示
      replayShow:false
    }
  },
  methods:{
    // 向父组件传送评论ID
    writeReplay(id,userName){
        const commentTo ={
        id,
        userName
      }
      // 此楼层传出
      this.$emit('pushCommentId',commentTo) 
    },
    // 评论楼层传出
    ReplayFloor(form){
      this.$emit('pushCommentId',form) 
    }
  },
  mounted(){
    this.createdTime = moment(this.commentData.created_at).format(`YYYY-MM-DD`)
    this.commentParent = this.commentData
    
  }
};
</script>

<style scoped lang='less'>
.box {
  border-bottom: 1px solid #999; 
  .user_title {
    padding: 20px 20px 5px 20px;
  }
}
.user_info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.user {
  display: flex;
  align-items: center;
  > img {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    margin-right: 5px;
  }
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
.comment{
  position: relative;
}
.write_replay{
    position: absolute;
    bottom: 0px;
    right: 0px;
    color: #888;
    font-size: 13px;
    margin-top: 5px;
    line-height: 20px;
}
.comment_comtent{
    margin-top: 5px;
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
</style>