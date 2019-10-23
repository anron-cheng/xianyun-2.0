<template>
  <div class="box">
      <div class="name">相关攻略</div>
      <div class="postBox" v-for="(item,index) in postsList" :key="index" @click="$router.push(`/post/detail?id=${item.id}`)">
          <img :src="`${item.images[0]}`" alt="">
          <div class="postContent">
              <p class="title">{{item.title}}</p>
              <span class="time">{{item.created_at}} 阅读:{{item.watch}}</span>
          </div>
      </div>

      
  </div>
</template>

<script>
import comment from "@/components/post/comment.vue";
import moment from 'moment';
export default {
    data(){
        return {
            postsList : []
        }
    },
    async mounted(){
    // 获取文章列表
      const res = await  this.$axios({
        url:"/posts/recommend",
        params:this.$route.query
      })
        const {data} =res.data
        this.postsList = data
        this.postsList.forEach(v=>{
            v.created_at = moment(v.created_at).format(`YYYY-MM-DD`)
        })
        
    }
}
</script>

<style scoped lang='less'>
.box{
    .name{
        font-size: 17px;
        color: #444;
        padding-bottom: 10px;
    }
    .postBox{
        padding: 20px 0;
        border-top: 1px solid #999;
        >img{
            width: 100px;
            height: 80px;
            padding-right: 10px;
        }
        .postContent{
            height: 80px;
            width: 170px;
            display: inline-block;
            .title{
                line-height: 20px;
                height: 60px;
                overflow: hidden;
                font-size: 14px;
            }
            .time{
                font-size: 13px;
                color: #888;
            }
        }
    }
}
</style>