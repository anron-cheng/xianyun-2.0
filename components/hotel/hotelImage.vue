<template>
  <div class="hotel-images">
    <div class="bigImg">
      <img src="@/uploads/big.jpeg" />
    </div>
    <div class="smallImg">
      <el-row>
        <el-col :span="12" class="smallImg1">
          <img src="@/uploads/1.jpeg" />
        </el-col>
        <el-col :span="12" class="smallImg1">
          <img src="@/uploads/2.jpeg" />
        </el-col>
        <el-col :span="12" class="smallImg1">
          <img src="@/uploads/3.jpeg" />
        </el-col>
        <el-col :span="12" class="smallImg1">
          <img src="@/uploads/4.jpeg" />
        </el-col>
        <el-col :span="12" class="smallImg1">
          <img src="@/uploads/5.jpeg" />
        </el-col>
        <el-col :span="12" class="smallImg1">
          <img src="@/uploads/6.jpeg" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped lang="less">
img {
  display: block;
  width: 100%;
  height: 100%;
}
.hotel-images {
  display: flex;
  margin: 20px 0;
  .bigImg {
    width: 640px;
    height: 360px;
    margin-right: 15px;
  }
  .smallImg {
    display: flex;
    flex: 1;
    .smallImg1 {
      padding-bottom: 15px;
      img {
        width: 160px;
        height: 110px;
      }
    }
  }
}
</style>