<template>
  <div class="user-manage" id="user-manage">
    <div>
<el-row type="flex" :gutter="0" justify="end">
        <el-col :span="2">
          <div style="margin-top:10px;">
          <el-checkbox v-model="isDel" @change="checkChange">去激活</el-checkbox>
          </div>
        </el-col>
        <el-col :span="5">
          <el-button-group style="float:right;">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="delMulUser"
          :disabled="multipleBtnVisible"
        >批量删除</el-button>

        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          style="margin-bottom:3px;"
          @click="addUser"
        >添加用户</el-button>
      </el-button-group>
        </el-col>
</el-row>
      
    </div>
    <div class="data-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        size="mini"
        @expand-change="expandChange"
        :highlight-current-row="true"
        @selection-change="handleSelectionChange"
        @select="handleSelection"
        @select-all="handleSelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>
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
                  v-for="item in props.row.roles"
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
        <el-table-column label="去激活" prop="isDelete" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isDelete==false?'danger':'success'"
            >{{scope.row.isDelete==false?"否":"是"}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template class="templateClass" slot-scope="scope">
            <el-button type="text" @click="resetPwd(scope.row)">重置密码</el-button>
            <el-button type="text" @click="editUser(scope.row)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
            <el-button type="text" @click="delUser(scope.row)">
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
      <add-user-dialog ref="addDialog" :addUserValue="addUserValue" @addUserSubmit="addUserSubmit"></add-user-dialog>
      <edit-user-dialog
        ref="editDialog"
        :editUserValue="editUserValue"
        @editUserSubmit="editUserSubmit"
      ></edit-user-dialog>

      <el-dialog title="删除用户信息" :visible.sync="delDialogVisible">
        <span>请选择删除方式：</span>
        <div style="margin-top:20px">
          <el-radio-group v-model="delType" size="small">
            <el-radio :label="0" border>彻底删除</el-radio>
            <el-radio :label="1" border>去激活</el-radio>
          </el-radio-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="delDialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="delSubmit" size="small">确 定</el-button>
        </div>
      </el-dialog>
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
import {
  getUsers,
  getRoles,
  createUser,
  validatorUserName,
  resetUserPwd,
  updateUser,
  delUpdateUser,
  delUser,
  delUpdateMulUser,
  delMulUser
} from "@/api/user";
import { getToken } from "@/utils/auth";
import BackToTop from "@/components/BackToTop";
import AddUserDialog from "./components/addDialog";
import EditUserDialog from "./components/editDialog";

export default {
  components: {
    EditUserDialog,
    AddUserDialog,
    BackToTop
  },
  data() {
    return {
      tableData: [],
      addUserValue: {
        addDialogVisible: false
      },
      editUserValue: {
        editDialogVisible: false,
        editFormValue: {}
      },
      delRow: {},
      delType: 1,
      delMul: false,
      delDialogVisible: false,
      multipleSelection: [],
      multipleSelectionAll: [],
      multipleBtnVisible: true,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isFirstPage: false,
        isLastPage: false,
        size: 0,
        pages: 1
      },
      isDel:false,
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
    getAllUser(pageNum, pageSize,isDel) {
      getUsers(pageNum, pageSize,isDel)
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
                    this.$set(t, "roles", res.list);
                  }
                })
                .catch(error => {
                  this.$notify.error({
                    title: "错误",
                    message: "获取权限信息失败，请刷新重试"
                  });
                });
            });
            //调用必须加setTimeOut
            setTimeout(() => {
              this.toggleSelection();
            }, 1);
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
      user.userHeadPortrait = null;
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

            setTimeout(() => {
              this.getAllUser(1, this.pageInfo.pageSize,this.isDel);
            }, 100);
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
    editUser(row) {
      this.editUserValue.editDialogVisible = !this.editUserValue
        .editDialogVisible;
      this.editUserValue.editFormValue = Object.assign({}, row);
    },
    editUserSubmit(user) {
      this.editUserValue.editDialogVisible = !this.editUserValue
        .editDialogVisible;
      user.userHeadPortrait = null;
      updateUser(user)
        .then(res => {
          if (res != 0) {
            this.$refs.editDialog.userData.userId = user.userId;
            this.$refs.editDialog.$refs.uploadAvatar.submit();
            this.$notify({
              title: "成功",

              message: "编辑用户成功",
              type: "success"
            });

            setTimeout(() => {
              this.getAllUser(
                this.pageInfo.currentPage,
                this.pageInfo.pageSize,this.isDel
              );
            }, 100);
          } else {
            this.$notify.error({
              title: "错误",
              message: "编辑用户失败，请刷新重试"
            });
          }
        })
        .catch(error => {
          console.log(error);

          this.$notify.error({
            title: "错误",
            message: "编辑用户失败，请刷新重试"
          });
        });
    },
    delUser(row) {
      this.delMul = false;
      this.delRow = row;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delMulUser() {
      this.delMul = true;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delSubmit() {
      this.delDialogVisible = !this.delDialogVisible;
      if (this.delMul) {
        let delIds = [];
        delIds = this.multipleSelectionAll.map(m => {
          return m.userId;
        });
        if (this.delType == 1) {
          delUpdateMulUser(delIds)
            .then(res => {
              if (res.val > 0) {
                for (var t of this.tableData) {
                  for (var id of delIds) {
                    if (t.userId == id) {
                      this.$set(t, "isDelete", true);
                      break;
                    }
                  }
                }
                this.multipleSelectionAll = [];
                this.$refs.multipleTable.clearSelection();
                this.$notify({
                  title: "成功",
                  duration: 3500,
                  message: "批量去激活成功!",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  duration: 4500,
                  message: "批量去激活失败，请刷新重试"
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.$notify.error({
                title: "失败",
                duration: 4500,
                message: "批量去激活失败，请刷新重试"
              });
            });
        } else if (this.delType == 0) {
          delMulUser(delIds)
            .then(res => {
              if (res.val > 0) {
                this.getAllUser(1, this.pageInfo.pageSize,this.isDel);
                this.multipleSelectionAll = [];
                this.$notify({
                  title: "成功",
                  duration: 3500,
                  message: "批量删除成功!",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  duration: 4500,
                  message: "批量删除失败，请刷新重试"
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.$notify.error({
                title: "失败",
                duration: 4500,
                message: "批量删除失败，请刷新重试"
              });
            });
        }
      } else {
        if (this.delType == 1) {

          if (this.delRow.isDelete) {
            this.$notify.error({
              title: "失败",
              duration: 4500,
              message: "此条信息已是删除状态！"
            });
            return;
          }
          delUpdateUser(this.delRow.userId)
            .then(res => {
              if (res.val == 1) {
                for (var t of this.tableData) {
                  if (t.userId == this.delRow.userId) {
                    this.$set(t, "isDelete", true);
                    break;
                  }
                }
                this.$notify({
                  title: "成功",
                  duration: 3500,
                  message: "去激活成功!",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  duration: 4500,
                  message: "去激活失败，请刷新重试"
                });
              }
            })
            .catch(error => {
              console.log(error);

              this.$notify.error({
                title: "失败",
                duration: 4500,
                message: "去激活失败，请刷新重试"
              });
            });
        } else if (this.delType == 0) {
          delUser(this.delRow.userId)
            .then(res => {
              if (res.val == 1) {
                this.getAllUser(
                  this.pageInfo.currentPage,
                  this.pageInfo.pageSize,this.isDel
                );
                this.$notify({
                  title: "成功",
                  duration: 3500,
                  message: "删除成功!",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  duration: 4500,
                  message: "删除失败，请刷新重试"
                });
              }
            })
            .catch(error => {
              console.log(error);

              this.$notify.error({
                title: "失败",
                duration: 4500,
                message: "删除失败，请刷新重试"
              });
            });
        }
      }
    },

    resetPwd(row) {
      this.$confirm("此操作将重置用户密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          console.log(row);
          resetUserPwd(row.userId)
            .then(res => {
              if (res != 0) {
                this.$notify({
                  title: "成功",

                  message: "密码重置成功",
                  type: "success"
                });
              }
            })
            .catch(error => {
              this.$notify.error({
                title: "错误",
                message: "密码重置失败，请刷新重试"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    checkChange(){
      console.log(this.isDel);
      this.getAllUser(1,this.pageInfo.pageSize,this.isDel);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelection(selection, row) {
      this.changePageCoreRecordData();
    },
    handleSizeChange(val) {
      this.changePageCoreRecordData();
      this.getAllUser(this.pageInfo.currentPage, val,this.isDel);
    },
    handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.getAllUser(val, this.pageInfo.pageSize,this.isDel);
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
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      let idKey = "userId";
      let that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      let selectAllIds = [];
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      let selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      let noSelectIds = [];
      // 得到当前页没有选中的id
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条

              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },
    // 设置选中的方法
    toggleSelection() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      let idKey = "userId";
      let selectAllIds = [];
      let that = this;
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });

      this.$refs.multipleTable.clearSelection();
      for (var i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.multipleTable.toggleRowSelection(this.tableData[i], true);
        }
      }
    }
  },
  watch: {
    multipleSelectionAll: {
      handler(newValue) {
        if (newValue.length > 0) {
          this.multipleBtnVisible = false;
        } else {
          this.multipleBtnVisible = true;
        }
      }
    }
  },
  mounted() {
    this.getAllUser(this.pageInfo.currentPage, this.pageInfo.pageSize,false);
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
