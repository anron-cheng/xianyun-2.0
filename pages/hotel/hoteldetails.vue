<template>
  <div class="main">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="hotel-break">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
      <el-breadcrumb-item>好来阁商务宾馆</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 酒店名称 -->
    <div class="hotel-name">
      <el-row>
        <el-col :span="12">
          <div class="grid-content chinese-name">
            {{details.name}}
            <span>♛♛♛♛♛</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content">{{details.alias}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content">{{details.address}}</div>
        </el-col>
      </el-row>
    </div>

    <!-- 图片展示 -->
    <HotelImage :details="details" />

    <!-- 价格来源 -->
    <HotelTable :details="details" />
    <!-- 地图 -->
    <div class="map">
      <div id="container"></div>
      <div class="selectPlace">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
              <li
                v-for="(item,index) in details.scenic"
                :key="index"
                class="infinite-list-item"
              >{{ item.name }}</li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
              <li
                v-for="(item,index) in details.scenic"
                :key="index"
                class="infinite-list-item"
              >{{ item.name }}</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 酒店信息 -->
    <div class="hotelInfo">
      <el-row class="infoRow">
        <el-col :span="4">基本信息</el-col>
        <el-col :span="5">
          <em>入住时间: 14:00之后</em>
        </el-col>
        <el-col :span="5">
          <em>离店时间: 12:00之前</em>
        </el-col>
        <el-col :span="5">
          <em>{{details.creation_time}} / {{details.renovat_time}}</em>
        </el-col>
        <el-col :span="5">
          <em>酒店规模: {{details.roomCount}}间客房</em>
        </el-col>
      </el-row>
      <el-row class="infoRow">
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20">
          <span>外币兑换服务</span>
          <span>洗衣服务</span>
          <span>吹风机</span>
          <span>电梯</span>
        </el-col>
      </el-row>
      <el-row class="infoRow">
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">
          <span>暂无此服务</span>
        </el-col>
      </el-row>
      <el-row class="infoRow">
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20">
          <span>基本信息</span>
        </el-col>
      </el-row>
    </div>

    <div class="hotelComment">
      <h4>0条真实用户评论</h4>
      <div class="commentContent">
        <div class="commentLeft">
          <p>总评数：{{details.all_remarks}}</p>
          <p>好评数：{{details.good_remarks}}</p>
          <p>坏评数：{{details.bad_remarks}}</p>
        </div>
        <div class="commentRight">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <el-progress type="circle" :percentage="77" class="circle"></el-progress>
          <el-progress type="circle" :percentage="80" class="circle"></el-progress>
          <el-progress type="circle" :percentage="68" class="circle"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotelImage from "@/components/hotel/hotelImage";
import HotelTable from "@/components/hotel/hotelTable";
export default {
  data() {
    return {
      details: {},
      activeName: "first",
      value: 0,
      longitude: "",
      latitude: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(event);
    },
    load() {
      this.count += 2;
    }
  },
  components: {
    HotelImage,
    HotelTable
  },
  mounted() {
    const id = this.$route.query.id;
    this.$axios({
      url: "/hotels?id=" + id
    }).then(res => {
      const data = res.data.data[0];
      this.details = data;
      this.value = data.stars;
      this.longitude = data.location.longitude;
      this.latitude = data.location.latitude;
      console.log(this.details);

      // 高德地图
      window.onLoad = function() {
        var map = new AMap.Map("container", {
          zoom:15,
          center: [118.8718107, 31.32846821]
        });
        var marker = new AMap.Marker({
          position: new AMap.LngLat(118.8718107, 31.32846821)
        });
        map.add(marker);
      };
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=23b0ac26d021ad9902f720ebfa9848cb&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    });
  }
};
</script>

<style scoped lang= "less">
.main {
  width: 1000px;
  margin: 0 auto;
  .hotel-break {
    margin: 20px 0;
  }
  .hotel-name {
    color: #656565;
    font-size: 14px;
    .chinese-name {
      font-size: 24px;
      color: #333333;
      span {
        color: #ff9900;
        font-size: 16px;
      }
    }
  }
  .map {
    display: flex;
    margin: 20px 0;
    #container {
      margin-right: 20px;
      width: 650px;
      height: 360px;
    }
    .selectPlace {
      width: 350px;
      height: 360px;
    }
  }
  .hotelInfo {
    font-size: 14px;

    /deep/ .infoRow {
      padding: 20px 10px;
      border-bottom: 1px solid #ededed;
    }
    em {
      display: block;
      width: 80%;
    }
    span {
      color: #666;
      font-size: 14px;
      background: #eee;
      margin: 0 10px 0 0;
      padding: 4px 10px;
      border-radius: 5px;
    }
  }
  .hotelComment {
    margin-top: 20px;
    .commentContent {
      display: flex;
      align-items: center;
      .commentRight {
        display: flex;
        margin-left: 80px;
        align-items: center;
        flex: 1;
        /deep/ .circle {
          padding: 0 30px;
        }
      }
    }
  }
}
</style>