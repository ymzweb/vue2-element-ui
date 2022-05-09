<template>
  <div class="about">
    <input type="text" v-model="val" />
    <button @click="doGet">查询get</button>
    <button @click="doPost2">修改post</button>
    <button @click="doPut">修改put</button>
    <button @click="doDel">删除</button>

    <div>
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </div>
  </div>
</template>
<script>
import * as Api from "@/api/test";

export default {
  components: {},
  data() {
    return {
      val: "",
    };
  },
  methods: {
    doGet() {
      this.$http.get("/course", {
        params: { id: this.val || 1000 },
      });
    },

    // modify
    doPost2() {
      this.$http.post("/course", {
        id: 1002,
        course_name: "hhh",
      });
    },
    doPut() {
      this.$http.put("/course/1002", {
        course_name: "2233",
      });
    },
    doDel() {
      console.log(this.val);
      this.$http({
        url: `/course/${this.val}`,
        method: "delete",
      });
    },

    open() {
      this.$alert("这是一段内容", "标题名称", {
        // confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
  },
};
</script>
