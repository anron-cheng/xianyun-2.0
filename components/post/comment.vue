<template>
  <div class="box">
    <div class="user_title">
      <div class="user_info">
        <div class="user">
          <img src="@/static/1.jpg" alt />
          <span class="user_name">萨达多所多 </span>
          <span class="send_time">2019-10-19 5:14</span>
        </div>
        <div class="comment_num">2</div>
      </div>

      <!-- 回复的那条评论 -->
      <div class="replay">
        <div class="reply_title">
          <div class="user_info">
            <div class="user">
              <span class="user_name">萨达多所多 </span>
              <span class="send_time">2019-10-19 5:14</span>
            </div>
            <div class="comment_num">2</div>
          </div>
          <div class="comment_comtent">加油！！</div>
        </div>
      </div>

    <div class="comment_comtent">哈哈哈哈哈哈哈</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.box {
  border: 2px solid #888;
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
    border: 1px solid #888;
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
.replay{
    border: 1px solid #888;
    background-color: #f9f9f9;
}
.reply_title{
    padding:10px;
}
.comment_comtent{
    margin-top: 10px;
}
</style>