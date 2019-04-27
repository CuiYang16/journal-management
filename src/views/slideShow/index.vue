<template>
  <div class="slide-show">
    <el-upload
      action="http://127.0.0.1:8888/jm-user/slide/insert/slide"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
      :on-exceed="onExceed"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :limit="8"
      show-file-list
      multiple
      accept=".jpg, .jpeg, .png"
    >
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb,最多8张</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import { getSlides, delSlides } from "@/api/slideShow";

export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      imageUrl: ""
    };
  },
  methods: {
    handleRemove(file, fileList) {
      delSlides(file.name)
        .then(res => {
          if (res.val == 1) {
            this.$notify({
              title: "成功",
              duration: 4500,
              message: "删除成功",
              type: "success"
            });
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            duration: 4500,
            message: "删除失败，请刷新重新上传"
          });
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {},
    handleAvatarSuccess(res, file) {
      //this.imageUrl = URL.createObjectURL(file.raw);
      if (res.val == 1) {
        this.$notify({
          title: "成功",
          duration: 4500,
          message: "上传成功",
          type: "success"
        });
      }
    },
    handleError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        duration: 4500,
        message: "上传失败，请刷新重新上传"
      });
    },

    beforeAvatarUpload(file) {
      const isLt500K = file.size / 1024 / 1024 < 0.5;
      if (!isLt500K) {
        this.$message.error("上传图片大小不能超过500k!");

        return false;
      } else {
        return true;
      }
    },
    onExceed(files, fileList) {
      this.$notify.error({
        title: "错误",
        duration: 4500,
        message: `当前限制选择 8 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
      });
    }
  },
  created() {
    getSlides()
      .then(res => {
        if (res.list.length > 0) {
          res.list.forEach(l => {
            this.fileList.push({
              slideId: l.slideId,
              name: l.name,
              url: require("E:/img/" + l.name)
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.$message({
          message: "初始化信息失败，请刷新重试！",
          type: "error"
        });
      });
  }
};
</script>

<style scoped>
.slide-show {
  margin: 15px;
}
</style>
