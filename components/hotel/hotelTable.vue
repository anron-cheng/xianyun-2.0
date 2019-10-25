<template>
  <el-table :data="details.products"  @row-click="handleJump" style="width: 100%">
    <el-table-column label="价格来源" width="420">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="低价房型" width="420">
      <template slot-scope="scope">
        <span>{{ scope.row.bestType }}</span>
      </template>
    </el-table-column>
    <el-table-column label="最低价格/每晚" width="160">
      <template slot-scope="scope">
        <span style="color:#fe980e;font-size:16px;">￥ {{ scope.row.price }} <em style="color:#8f9298"> 起</em> > </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["details"],
  methods: {
    handleJump() {
      location.href = "https://hotels.ctrip.com/hotel/694679.html";
    }
  }
};
</script>

<style scoped lang="less">

</style>