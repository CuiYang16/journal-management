<template>
  <div>
    <el-dialog
      title="借阅杂志期刊"
      :visible.sync="addDialogValue.addFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="addBorrowForm" :rules="addRules" ref="borrowForm" status-icon>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userId">
          <el-select v-model="addBorrowForm.userId" filterable placeholder="请选择" clearable>
            <el-option
              v-for="item in userValue"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
              :disabled="item.isDelete"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="杂志名称" :label-width="formLabelWidth" prop="journalId">
          <el-select v-model="addBorrowForm.journalId" filterable placeholder="请选择" clearable>
            <el-option
              v-for="item in journalValue"
              :key="item.journalId"
              :label="item.journalName"
              :value="item.journalId"
              :disabled="!(item.isBorrow&&!item.isDelete&&item.inventory>0)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogValue.addFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addSubmit" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, getJournals } from "@/api/borrow.js";

export default {
  props: ["addDialogValue"],
  data() {
    return {
      addBorrowForm: {
        userId: "",
        journalId: ""
      },
      addRules: {
        userId: [
          {
            required: true,
            message: "请输入借阅用户",
            trigger: "change"
          }
        ],
        journalId: [
          {
            required: true,
            message: "请输入借阅杂志期刊",
            trigger: "change"
          }
        ]
      },
      userValue: [],
      journalValue: [],
      formLabelWidth: "120px"
    };
  },
  methods: {
    addSubmit() {
      this.$refs["borrowForm"].validate(valid => {
        if (valid) {
          this.$emit("addSubmit", this.addBorrowForm);
        } else {
          this.$message.error("请按提示正确填写信息！");
        }
      });
    }
  },
  watch: {
    "addDialogValue.addFormVisible": {
      handler(newValue) {
        if (newValue == true) {
          getUsers()
            .then(res => {
              this.userValue = res.list;
            })
            .catch(error => {
              console.log(error);
              this.$notify.error({
                title: "错误",

                message: "获取用户信息失败，请刷新重试！"
              });
            });
          getJournals()
            .then(res => {
              this.journalValue = res.list;
            })
            .catch(error => {
              console.log(error);
              this.$notify.error({
                title: "错误",

                message: "获取杂志信息失败，请刷新重试！"
              });
            });
        } else {
          this.$refs.borrowForm.clearValidate();
        }
      }
    }
  }
};
</script>