<template>
  <div>
    <el-dialog
      title="添加用户"
      :visible.sync="addUserValue.addDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="addUserForm" ref="addUserForm" @submit.native.prevent>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="addUserForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="userSex">
          <el-radio-group v-model="addUserForm.userSex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="userPwd">
          <el-input v-model="addUserForm.userPwd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPwd">
          <el-input v-model="addUserForm.confirmPwd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="userPhone">
          <el-input v-model="addUserForm.userPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth" prop="userEmail">
          <el-input v-model="addUserForm.userEmail" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="用户头像" :label-width="formLabelWidth" prop="userHeadPortrait">
          <el-input v-model="addUserForm.userHeadPortrait" autocomplete="off"></el-input>

          <el-upload
            class="upload-demo"
            ref="uploadAvatar"
            action="http://127.0.0.1:8888/jm-user/user/upload/user-img/"
            :data="userData"
            :on-success="handleAvatarSuccess"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
            :limit="1"
            accept=".jpg, .jpeg, .png"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary" v-if="uploadBtn">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="用户角色" :label-width="formLabelWidth" prop="roles">
          <el-select v-model="addUserForm.roles" multiple placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserValue.addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllRoles, validatorUserName } from "@/api/user";

export default {
  props: ["addUserValue"],

  data() {
    const validateUserName = (rule, value, callback) => {
      var nPattern = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]){4,16}$/;
      if (!nPattern.test(value)) {
        callback(new Error("4-16位，可以包括字母，数字，汉字！"));
      } else {
        validatorUserName(value)
          .then(res => {
            if (res.val == 1) {
              callback(new Error("用户名已存在！"));
            } else {
              callback();
            }
          })
          .catch();
      }
    };
    const validatePwd = (rule, value, callback) => {
      var pPattern = /^.*(?=.{8,12})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*?_]).*$/;
      if (!pPattern.test(value)) {
        callback(new Error("8-12位，必须包括字母，数字，特殊字符！"));
      } else {
        callback();
      }
    };
    const validateConfirmPwd = (rule, value, callback) => {
      var pPattern = /^.*(?=.{8,12})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*?_]).*$/;
      if (!pPattern.test(value) || this.addUserForm.userPwd != value) {
        callback(new Error("密码不一致，请重新确认！"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      var pPattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if (!pPattern.test(value)) {
        callback(new Error("请正确输入手机号！"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      var ePattern = /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/;
      if (!ePattern.test(value)) {
        callback(new Error("请正确输入邮箱！"));
      } else {
        callback();
      }
    };
    return {
      userData: { userId: "" },
      imageUrl: "",
      formLabelWidth: "100px",
      addDialogVisible: false,
      addUserForm: {
        userName: "",
        userPwd: "",
        confirmPwd: "",
        userPhone: "",
        userEmail: "",
        userSex: "",
        userHeadPortrait: "",
        roles: []
      },
      addUserRule: {
        userName: [
          { required: true, validator: validateUserName, trigger: "blur" }
        ],
        userPwd: [{ required: true, validator: validatePwd, trigger: "blur" }],
        confirmPwd: [
          { required: true, validator: validateConfirmPwd, trigger: "blur" }
        ],
        userPhone: [
          { required: true, validator: validatePhone, trigger: "blur" }
        ],
        userEmail: [
          { required: true, validator: validateEmail, trigger: "blur" }
        ],
        userSex: [
          { required: true, message: "请选择用户性别", trigger: "change" }
        ],
        userHeadPortrait: [
          { required: true, message: "请选择用户头像", trigger: "change" }
        ],
        roles: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ]
      },
      fileList: [],
      uploadBtn: true,
      roleOptions: []
    };
  },
  methods: {
    addUserSubmit() {
      this.$refs["addUserForm"].validate(valid => {
        if (valid) {
          this.$emit("addUserSubmit", this.addUserForm);
        } else {
          this.$notify.error({
            title: "错误",
            message: "请正确填写用户信息！"
          });
        }
      });
    },
    handleChange(file, fileList) {
      const isLt500k = file.size / 1024 / 1024 < 0.5;
      if (!isLt500k) {
        this.$message.error("上传头像图片大小不能超过 500k!");
        this.$refs.uploadAvatar.clearFiles();
      } else {
        this.addUserForm.userHeadPortrait = file.name;
        if (fileList.length == 1) {
          this.uploadBtn = false;
        }
      }
    },
    handleRemove(file, fileList) {
      if (fileList.length == 0) {
        this.uploadBtn = true;
        this.addUserForm.userHeadPortrait="";
      }
    },
    handleAvatarSuccess(res, file) {
      //this.imageUrl = URL.createObjectURL(file.raw);
      if (res.val == 0) {
        this.$notify.error({
          title: "错误",
          message: res.str
        });
      }
    },
    beforeAvatarUpload(file) {
      const isLt500k = file.size / 1024 / 1024 < 0.5;
      if (!isLt500k) {
        this.$message.error("上传头像图片大小不能超过 500k!");
      }
      return isLt500k;
    }
  },
  watch: {
    "addUserValue.addDialogVisible": {
      handler(newValue) {
        if (newValue == false) {
          this.$refs.addUserForm.clearValidate();
        } else {
          getAllRoles()
            .then(res => {
              if (res.list.length > 0) {
                this.roleOptions = res.list;
              }
            })
            .catch(error => {
              this.$notify.error({
                title: "错误",
                message: "获取权限信息失败，请刷新重试"
              });
            });
        }
      }
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
