<template>
  <div class="container">
      <div class="post-duo" v-if="postItem.images.length >= 3">
          <nuxt-link :to="'/post/detail?id='+postItem.id" class="title">{{postItem.title}}</nuxt-link>
          <div class="content" @click="$router.push('/post/detail?id='+postItem.id)">
              {{postItem.summary}}
          </div>
          <el-row type="flex" class="row-bg" justify="space-between">
           <img class="img" 
            @click="$router.push('/post/detail?id='+postItem.id)"
           :src="item"
           v-for="(item,index) in postItem.images" :key="index"
           v-if="index <3">
           <!-- <img class="img" src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt="">
           <img class="img" src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt=""> -->
        </el-row>
        <el-row type="flex" class="row-bg userinfo" justify="space-between" >
            <el-col :span="12" class="el-row is-align-middle el-row--flex">
                <i class="el-icon-location-outline"></i><span>{{postItem.cityName}}</span> by
                <a href="/user/personal" class="el-row is-align-middle el-row--flex">
                    <img class="userimg" :src="$axios.defaults.baseURL+postItem.account.defaultAvatar" alt="">
                <span class="username">{{postItem.account.nickname}}</span>
                </a>
                <span class="el-icon-view"> </span>
                {{postItem.watch}}
            </el-col>
            <el-col :span=12 style="text-align: right;"><span class="zan">{{postItem.like === null ? 0:postItem.like}} 赞</span></el-col>
        </el-row>
      </div>
      <div class="post-dan" v-if="postItem.images.length < 3">
          <el-row type="flex" class="row-bg userinfo" justify="space-between" >
              <img class="img" 
               @click="$router.push('/post/detail?id='+postItem.id)"
              :src="postItem.images[0]" alt="" >
              <div class="dan-content">
                <div class="title"  
                @click="$router.push('/post/detail?id='+postItem.id)" 
                style="width:470px;">{{postItem.title}}</div>
                <div class="content"  @click="$router.push('/post/detail?id='+postItem.id)" >
                    {{postItem.summary}}
                </div>
                <el-row type="flex" class="row-bg userinfo" justify="space-between" >
                    <el-col :span="12" class="el-row is-align-middle el-row--flex">
                        <i class="el-icon-location-outline"></i><span>{{postItem.cityName}}</span> by
                        <a href="/user/personal" class="el-row is-align-middle el-row--flex">
                            <img class="userimg" :src="$axios.defaults.baseURL+postItem.account.defaultAvatar" alt="">
                        
                        <span class="username">{{postItem.account.nickname}}</span>
                        </a>
                        <span class="el-icon-view"> </span>
                        {{postItem.watch}}
                    </el-col>
                    <el-col :span=12 style="text-align: right;"><span class="zan">{{postItem.like === null ? 0:postItem.like}} 赞</span></el-col>
                </el-row>
              </div>
            </el-row>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        postItem:{}
    }
}
</script>

<style scoped lang="less">
    .container{
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    .title{
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        white-space: nowrap;
        margin-bottom: 15px;
        font-weight: 400;
        font-size: 18px;
        color:#000;
        overflow: hidden;
        cursor: pointer;
        
    }
    .title:hover{
            color:orange;
        }
    .content{
        margin-bottom: 15px;
        line-height: 1.5;
        font-size: 14px;
        height: 63px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        color:#000;
        cursor: pointer;
    }
    .imgs{
        margin: 15px 0;
    }
    .img{
        width: 220px;
        height: 150px;
        display: block;
        object-fit: cover;
        cursor: pointer;
    }
    .userinfo{
        margin-top: 20px;
        font-size: 12px;
        color: #999;
        // i{
        //     margin-right: 5px;
        // }
        span{
            margin-right:5px;
        }
    }
    .userimg{
        display: block;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    margin: 5px;
    }
    .username{
        color:orange;
    }
    .zan{
        color: orange;
        font-size: 16px;
        
    }
    .img{
        width: 220px;
        height: 150px;
        display: block;
        object-fit: cover;
    }
    // .post-dan{
    //     padding:10px 0;
    // }
    .dan-content{
        width: 470px;
        // background-color: #000;
    }
</style>