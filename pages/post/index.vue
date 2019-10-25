<template>
  <div class="main clearfix">
     <div class="menus-wrap">
       <div style="height: 200px;">
          <div class="menus">
            <div class="active" v-for="(item,index) in cityList" :key="index"> 
              <div class="menus-item"><i>{{item.type}}</i> <span>></span></div>
              <div class="menus-content">
                <div class="menus-city" 
                v-for="(value,index) in item.children" 
                :key="index"
                 @click="handlerPost(value.city)"
                >
                <span>{{index +1}}</span> 
                <em>{{value.city}}</em> 
                <i>{{value.desc}}</i>
                
                </div>
              </div>
              </div>
          </div>
        </div>
          <h3>
            推荐城市
          </h3>
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt="" @click="$router.push('/post#')">
     </div>

     <div class="post-wrapper" style="width: 700px;">
        <div class="search">
          <el-input
          placeholder="请输入想去的地方，比如：'广州'"
          v-model="value"
         @keyup.enter.native="handlerPost(value)">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="handlerPost(value)"></i>
        </el-input>
        </div>
        <div class="city">推荐：
          <span 
          style="cursor: pointer;"
          v-for="(item,index) in city" :key="index"
          @click="handlerPost(item)"
          >{{item}}</span></div>
        <div class="tuijian">
          <h4>推荐攻略</h4>
          <el-button type="primary" @click="$router.push('/post/create')"> 
            <i class="el-icon-edit"></i>
            <span>写游记</span>
          </el-button>
        </div>


        <div>
            <PostList v-for="(item,index) in postList" :key="index" :postItem="item" v-if="postList.length > 0"/>
            <div v-if="postList.length === 0"> 暂无文章信息</div>
        </div>
        <div class="fenye">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[3, 6, 9]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        </div>
     </div>
  </div>
</template>

<script>
import PostList from '@/components/post/postList'
export default {
  data(){
    return{
      value:'',
      cityList:[],
      city:['广州','上海','北京'],
      postList:[],
      pageSize:3,
      pageIndex:1,
      total:0
    }
  },
  components:{
    PostList
  },
  methods:{
    handlerPost(value){
      this.pageIndex = 1
      this.value = value
      this.getPosts()
  },
  getPosts(){
    const params={
        _start:(this.pageIndex-1)*this.pageSize,
        _limit:this.pageSize,
    }
    if(this.value){
      params.city = this.value
    }
    this.$axios({
      url:'/posts',
      params
    }).then(res=>{
      const {data} = res.data
      this.total = res.data.total
      this.postList = data
    })
  },
  handleSizeChange(val) {
    this.pageSize =val
    this.getPosts()
  },
  handleCurrentChange(val) {
    this.pageIndex = val
    this.getPosts()
  },
  },
  mounted(){
    this.$axios({
      url:'/posts/cities'
    }).then(res=>{
      const {data} = res.data
      this.cityList = data
    });
    this.getPosts()
  //   this.$axios({
  //     url:`/posts`,
  //     params:{
  //       _start:(this.pageIndex-1)*this.pageSize,
  //       _limit:this.pageSize,
  //     }
  //   }).then(res=>{
  //     const {data} = res.data
  //     this.total = res.data.total
  //     this.postList = data
  //   })
  }
}
</script>

<style scoped lang="less">
.clearfix::after {
    visibility: hidden;
    clear: both;
    display: block;
    content: ".";
    height: 0
}

.clearfix {
    *zoom: 1
}
.menus{
  position: absolute;
  width: 260px;
  >:first-child{
    border-top: 1px solid #ddd;
  }
  .menus-item{
    width: 100%;
    height: 39px;
    border: 1px solid #ddd;
    line-height: 39px;
    padding:0 10px;
    box-sizing:border-box;
    border-top: none;
    position: relative;
    background-color: #fff;
    z-index: 2;
    font-size: 14px;
    span{
      float: right;
    }
  }
  
  .menus-content{
    width: 300px;
    border: 1px solid #ddd;
    height: 220px;
    position: absolute;
    left: 258px;
    top: 0;
    background-color: #fff;
    z-index: 1;
    display: none;
  }
   .active:hover{
      color: orange;
      .menus-item{
        border-right: none;
      }
     
      .menus-content{
        display: block;
        // border-left: none;
      }
    }
    .menus-city{
      width: 100%;
      padding:5px 10px;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      cursor: pointer;
      span{
        font-size: 20px;
        font-style: italic;
        margin-right: 5px;
      }
      i{
        color: #ddd;
        margin-left: 5px;
        font-size: 13px;
      }
      em:hover,i:hover{
        text-decoration:underline;
      }
    }
}
.main{
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
    // height: 900px;
    .menus-wrap{
    // position: absolute;
    width: 260px;
    float: left;
    height: 500px;
    z-index: 2;

    }
    h3{
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin: 10px 0;
    }
    img{
      display: block;
      width: 260px;
      cursor: pointer;
    }
}
// .el-menu{
//   width: 260px;
//   height: 41px; 
// }
// /deep/ .el-submenu__title{
//   height: 41px;
//   line-height: 41px;
// }
.post-wrapper{
  // background-color: #000;
  // height: 1000px;
  float: right;
}
.city{
  padding: 10px 0;
  font-size: 12px;
  span{
    margin-left: 5px;
  }
}
.tuijian{
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  height: 50px;
  box-sizing: border-box;
  position: relative;
  line-height: 50px;
  h4{
    font-size: 18px;
    color: orange;
    float: left;
  }
  h4:after{
    display: block;
    content: "";
    width: 72px;
    height: 2px;
    background: orange;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .el-button{
    float: right;
  }
}
.search{
  /deep/ .el-input__inner{
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border: 3px solid orange;
    
}
/deep/ .el-input__suffix{
      color: orange;
      font-size: 24px;
      font-weight: 700;
      margin-right: 10px;
      cursor: pointer;
}
}
.fenye{
  margin: 10px 0;
}
</style>