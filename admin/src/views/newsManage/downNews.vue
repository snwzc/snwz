<template>
  <div>
    <h1>爬取状态：{{DownNewsStatus==1?'爬取已开启':'爬取已关闭'}}</h1>
    <div>
      <el-button @click="changeStatus">{{DownNewsStatus==1?'停止爬取':'开始爬取'}}</el-button>
    </div>
  </div>
</template>


<script>
import { timerStatus, stopTimer, openTimer } from "@/api/news";
import { Message, MessageBox } from "element-ui";

export default {
  name: "DownNews",
  data() {
    return {
      DownNewsStatus: 0
    };
  },
  mounted() {
    this.timerStatus();
  },
  methods: {
    changeStatus() {
      MessageBox.confirm("确认修改次状态吗？", "提示").then(res => {
        if (this.DownNewsStatus == 1) {
          this.stopTimer();
        } else {
          this.openTimer();
        }
      });
    },
    timerStatus() {
      timerStatus().then(res => {
        this.DownNewsStatus = res.body.status;
      });
    },
    openTimer() {
      openTimer().then(res => {
        this.timerStatus();
      });
    },
    stopTimer() {
      stopTimer().then(res => {
        this.timerStatus();
      });
    }
  }
};
</script>

<style>
</style>