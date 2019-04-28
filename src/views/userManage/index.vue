<template>
  <div class="user-manage" id="user-manage">
    <div>
      <el-button-group style="float:right;">
        <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>

        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          style="margin-bottom:3px;"
          @click="addUser"
        >添加用户</el-button>
      </el-button-group>
    </div>
    <div class="data-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        size="mini"
        @expand-change="expandChange"
        :highlight-current-row="true"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户头像">
                <el-popover placement="right" width="240" trigger="hover">
                  <img
                    :src="(props.row.userHeadPortrait==null||props.row.userHeadPortrait=='')?require('E:/img/1555556540064-journal-timg.jpg'):require('E:/img/'+props.row.userHeadPortrait)"
                    width="200"
                    height="200"
                  >
                  <img
                    :src="(props.row.userHeadPortrait==null||props.row.userHeadPortrait=='')?require('E:/img/1555556540064-journal-timg.jpg'):require('E:/img/'+props.row.userHeadPortrait)"
                    width="100"
                    height="100"
                    slot="reference"
                  >
                </el-popover>
              </el-form-item>
              <el-form-item label="用户角色">
                <el-popover
                  placement="top-start"
                  title="标题"
                  width="200"
                  trigger="hover"
                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                  v-for="item in props.row.role"
                  :key="item.roleId"
                >
                  <el-tag slot="reference" style="margin-right:15px;">{{ item.roleName }}</el-tag>
                </el-popover>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="userId" width="60"></el-table-column>
        <el-table-column label="用户名" prop="userName" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column
          label="用户性别"
          prop="userSex"
          align="center"
          show-overflow-tooltip
          :formatter="sexFormat"
        ></el-table-column>
        <el-table-column label="用户邮箱" prop="userEmail" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="联系方式" prop="userPhone" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column
          label="最后登录"
          prop="lastLoginTime"
          align="center"
          show-overflow-tooltip
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column label="已删除" prop="isDelete" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isDelete==false?'danger':'success'"
            >{{scope.row.isDelete==false?"否":"是"}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template class="templateClass" slot-scope="scope">
            <el-button type="text">重置密码</el-button>
            <el-button type="text">
              <i class="el-icon-edit-outline"></i>
            </el-button>
            <el-button type="text">
              <i class="el-icon-delete" style="color: red"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-group">
      <template>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-sizes="[10, 20, 30, 40,50]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
          ></el-pagination>
        </div>
      </template>
    </div>
    <div>
      <add-user-dialog
        ref="addDialog"
        :addUserValue="addUserValue"
        @addUserSubmit="addUserSubmit"
      ></add-user-dialog>
    </div>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="150"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import { getUsers, getRoles, createUser, validatorUserName } from "@/api/user";
import { getToken } from "@/utils/auth";
import BackToTop from "@/components/BackToTop";
import AddUserDialog from "./components/addDialog";

export default {
  components: {
    AddUserDialog,
    BackToTop
  },
  data() {
    return {
      tableData: [],
      addUserValue: {
        addDialogVisible: false
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isFirstPage: false,
        isLastPage: false,
        size: 0,
        pages: 1
      },
      myBackToTopStyle: {
        right: "0px",
        bottom: "50px",
        width: "30px",
        height: "30px",
        "border-radius": "4px",
        "line-height": "40px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1" // 按钮的背景颜色 The background color of the button
      }
    };
  },
  methods: {
    getAllUser(pageNum, pageSize) {
      getUsers(pageNum, pageSize)
        .then(res => {
          if (res.pageInfo.list.length > 0) {
            this.tableData = res.pageInfo.list;
            this.pageInfo.currentPage = res.pageInfo.pageNum;
            this.pageInfo.pageSize = res.pageInfo.pageSize;
            this.pageInfo.total = res.pageInfo.total;
            this.pageInfo.isFirstPage = res.pageInfo.isFirstPage;
            this.pageInfo.isLastPage = res.pageInfo.isLastPage;
            this.pageInfo.size = res.pageInfo.size;
            this.pageInfo.pages = res.pageInfo.pages;
            this.tableData.forEach(t => {
              getRoles(t.userId)
                .then(res => {
                  if (res.val != 0) {
                    this.$set(t, "role", res.list);
                  }
                })
                .catch(error => {
                  this.$notify.error({
                    title: "错误",
                    message: "获取权限信息失败，请刷新重试"
                  });
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
    },
    addUser() {
      this.addUserValue.addDialogVisible = !this.addUserValue.addDialogVisible;
    },
    addUserSubmit(user) {
      this.addUserValue.addDialogVisible = !this.addUserValue.addDialogVisible;
      createUser(user)
        .then(res => {
          if (res.val != 0) {
            this.$refs.addDialog.userData.userId = res.val;
            this.$refs.addDialog.$refs.uploadAvatar.submit();
            this.$notify({
              title: "成功",

              message: "添加用户成功",
              type: "success"
            });
            this.getAllUser(1, this.pageInfo.pageSize);

            this.$nextTick(function() {
              this.$refs.addDialog.$refs.addUserForm.resetFields();
              this.$refs.addDialog.$refs.uploadAvatar.clearFiles();
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "创建用户失败，请刷新重试"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: "错误",
            message: "创建用户失败，请刷新重试"
          });
        });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    expandChange(row, expandedRows) {
      let expandFlag = expandedRows.indexOf(row);
      if (expandFlag != -1) {
      }
    },
    sexFormat(row, column, cellValue, index) {
      if (cellValue == 1) {
        return "男";
      }
      if (cellValue == 0) {
        return "女";
      }
      return "--";
    },
    dateFormat: function(row, column, cellValue, index) {
      if (cellValue != null) {
        var date = new Date(cellValue); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        var h = date.getHours() + ":";
        var m = date.getMinutes() + ":";
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
      } else {
        return "--";
      }
    }
  },
  watch: {},
  created() {
    this.getAllUser(this.pageInfo.currentPage, this.pageInfo.pageSize);
  }
};
</script>

<style scoped>
#user-manage {
  margin: 15px;
}
#user-manage .el-table {
  font-size: 13px;
}

#user-manage .page-group {
  float: right;
  margin: 5px 10px 0 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
