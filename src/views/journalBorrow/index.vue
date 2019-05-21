<template>
  <div class="journal-borrow">
    <div class="header">
      <el-row type="flex" :gutter="0" justify="end">
        <ElCol :span="17">
          <el-select
            v-model="search"
            filterable
            placeholder="请选择查找用户"
            clearable
            size="mini"
            allow-create
            @visible-change="visibleChange"
            @change="handelSelectChange"
          >
            <el-option
              v-for="item in userValue"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            ></el-option>
          </el-select>
          <div class="checkbox-group">
            <el-checkbox-group v-model="checkList" @change="checkChange">
              <el-checkbox label="1" :disabled="checkList.indexOf('2')>=0">已逾期</el-checkbox>
              <el-checkbox label="2" :disabled="checkList.indexOf('1')>=0">未逾期</el-checkbox>
              <el-checkbox label="3" :disabled="checkList.indexOf('4')>=0">已归还，有罚金且已缴纳</el-checkbox>
              <el-checkbox label="4" :disabled="checkList.indexOf('3')>=0">已归还，有罚金未缴纳</el-checkbox>
            </el-checkbox-group>
          </div>
        </ElCol>

        <el-col :span="5">
          <el-button-group style="float:right;">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              :disabled="multipleBtnVisible"
              @click="delBorrowMul"
            >批量删除</el-button>

            <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              style="margin-bottom:3px;"
              @click="addBorrow"
            >新添借阅</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>
    <div class="borrow-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        size="mini"
        highlight-current-row
        @selection-change="handleSelectionChange"
        @select="handleSelection"
        @select-all="handleSelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="借阅天数">
                <span>已借阅{{scope.row.realityDays==null?(realityDay(scope.row.borrowTime)):scope.row.realityDays}}天</span>
              </el-form-item>
              <el-form-item label="逾期天数">
                <span>已逾期{{scope.row.overdueDays==0?(overDay(scope.row.returnTime)):scope.row.overdueDays}}天</span>
              </el-form-item>
              <el-form-item label="罚金">
                <span>{{scope.row.penalty==0?(overDay(scope.row.returnTime)*0.5):scope.row.penalty}}元</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="borrowId" width="55"></el-table-column>
        <el-table-column
          label="借阅时间"
          prop="borrowTime"
          :formatter="dateFormat"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          label="应归还时间"
          prop="returnTime"
          :formatter="dateFormat"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          label="实际归还时间"
          prop="realityReturn"
          :formatter="dateFormat"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column label="杂志名称" prop="journalName" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.journalDetails.journalName}}</template>
        </el-table-column>
        <el-table-column label="借阅用户" prop="userName" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.user.userName}}</template>
        </el-table-column>

        <el-table-column label="是否逾期" prop="isOverdue" align="center">
          <template slot-scope="scope">
            <div>
              <el-tag
                :type="scope.row.returnTime>=new Date()?'danger':'success'"
              >{{scope.row.isOverdue==false?(scope.row.returnTime>new Date()?'否':'是'):scope.row.isOverdue==true?'是':'否'}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否缴纳" prop="isPayment" align="center">
          <template slot-scope="scope">
            <div>
              <el-tag
                :type="scope.row.isPayment==false?'danger':'success'"
              >{{scope.row.penalty>0?(scope.row.isPayment==false?'否':'是'):'--'}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="去激活" prop="isDelete" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isDelete==false?'danger':'success'"
            >{{scope.row.isDelete==false?"否":"是"}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="180" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="payment(scope.row)"
              :disabled="!(scope.row.realityReturn!=null&&(!scope.row.isPayment)&&scope.row.isOverdue)"
            >缴纳罚金</el-button>
            <el-button type="text" @click="returnJournal(scope.row)">归还杂志</el-button>

            <el-button type="text" @click="deleteBorrow(scope.row)">
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

    <div class="dialog-dialog">
      <add-dialog ref="addBorrow" :addDialogValue="addDialogValue" @addSubmit="addSubmit"></add-dialog>
      <return-dialog :returnDialogValue="returnDialogValue" @returnSubmit="returnSubmit"></return-dialog>
      <el-dialog title="删除借阅信息" :visible.sync="delDialogVisible">
        <span>请选择删除方式：</span>
        <div style="margin-top:20px">
          <el-radio-group v-model="delType" size="small">
            <el-radio :label="0" border>彻底删除</el-radio>
            <el-radio :label="1" border>改变去激活状态</el-radio>
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
import BackToTop from "@/components/BackToTop";
import {
  getBorrows,
  createBorrow,
  returnJournal,
  getUsers,
  updatePayment,
  delUpdate,
  delBorrow,
  delUpdateMul,
  delBorrowMul
} from "@/api/borrow.js";
import AddDialog from "./components/addDialog";
import ReturnDialog from "./components/returnDialog";

export default {
  components: {
    BackToTop,
    AddDialog,
    ReturnDialog
  },
  data() {
    return {
      tableData: [],
      search: "",
      addDialogValue: {
        addFormVisible: false
      },
      returnDialogValue: {
        returnFormVisible: false,
        overDay: "",
        penalty: ""
      },
      returnRow: {},
      userValue: [],
      checkList: [],
      isOverdue: 2,
      isPayment: 2,
      delDialogVisible: false,
      delRow: {},
      delType: 1,
      delMul: false,
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
    getAllBorrow(currentPage, pageSize, userId, isOverdue, isPayment) {
      getBorrows(currentPage, pageSize, userId, isOverdue, isPayment)
        .then(res => {
          this.tableData = res.pageInfo.list;
          this.pageInfo.currentPage = res.pageInfo.pageNum;
          this.pageInfo.pageSize = res.pageInfo.pageSize;
          this.pageInfo.total = res.pageInfo.total;
          this.pageInfo.isFirstPage = res.pageInfo.isFirstPage;
          this.pageInfo.isLastPage = res.pageInfo.isLastPage;
          this.pageInfo.size = res.pageInfo.size;
          this.pageInfo.pages = res.pageInfo.pages;
          //调用必须加setTimeOut
          setTimeout(() => {
            this.toggleSelection();
          }, 1);
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "初始化信息失败，请刷新重试！",
            type: "error"
          });
        });
    },
    addBorrow() {
      this.addDialogValue.addFormVisible = true;
    },
    addSubmit(value) {
      this.addDialogValue.addFormVisible = false;
      createBorrow(value.userId, value.journalId)
        .then(res => {
          if (res.val == 1) {
            this.$notify({
              title: "成功",
              message: "借阅成功",
              type: "success"
            });

            this.getAllBorrow(
              1,
              this.pageInfo.pageSize,
              this.search == "" ? 0 : this.search,
              this.isOverdue,
              this.isPayment
            );
          } else if (res.val == 50008) {
            this.$notify.error({
              title: "错误",
              message:
                "您有逾期罚金未按时缴纳，目前不能继续借阅，请缴纳罚金后继续借阅！"
            });
          } else if (res.val == 50010) {
            this.$notify.error({
              title: "错误",
              message:
                "您在借杂志期刊数量达到10本，不得继续借阅，请归还后后继续借阅！"
            });
          }
          this.$nextTick(function() {
            this.$refs.addBorrow.$refs["borrowForm"].resetFields();
          });
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: "错误",
            message: "借阅失败，请刷新重试！"
          });
        });
    },
    returnSubmit(isPayment) {
      this.returnDialogValue.returnFormVisible = false;
      returnJournal(this.returnRow, isPayment ? 1 : 0)
        .then(res => {
          if (res.val == 1) {
            this.$notify({
              title: "成功",
              message: "归还成功",
              type: "success"
            });

            this.getAllBorrow(
              this.pageInfo.currentPage,
              this.pageInfo.pageSize,
              this.search == "" ? 0 : this.search,
              this.isOverdue,
              this.isPayment
            );
          }
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: "错误",
            message: "归还失败，请刷新重试！"
          });
        });
    },
    returnJournal(row) {
      this.returnRow = row;
      if (row.returnTime <= new Date()) {
        this.returnDialogValue.overDay = this.overDay(row.returnTime);
        this.returnDialogValue.penalty = this.overDay(row.returnTime) * 0.5;
        this.returnDialogValue.returnFormVisible = true;
      } else {
        this.$confirm("请确认归还杂志期刊符合要求！", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认归还",
          cancelButtonText: "取消"
        })
          .then(() => {
            this.returnSubmit(false);
          })
          .catch(action => {});
      }
    },
    payment(row) {
      this.$confirm("请确认罚金数额！", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认缴纳",
        cancelButtonText: "取消"
      })
        .then(() => {
          updatePayment(row.borrowId)
            .then(res => {
              if (res.val == 1) {
                this.$set(row, "isPayment", true);
                this.$notify({
                  title: "成功",
                  message: "缴纳罚金成功",
                  type: "success"
                });
              }
            })
            .catch();
        })
        .catch(action => {});
    },
    deleteBorrow(row) {
      this.delMul = false;

      this.delRow = row;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delBorrowMul() {
      this.delMul = true;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delSubmit() {
      this.delDialogVisible = !this.delDialogVisible;
      if (this.delMul) {
        let delIds = [];
        delIds = this.multipleSelectionAll.map(m => {
          return m.borrowId;
        });
        if (this.delType == 1) {
          delUpdateMul(delIds)
            .then(res => {
              if (res.val > 0) {
                for (var t of this.tableData) {
                  for (var id of delIds) {
                    if (t.borrowId == id) {
                      this.$set(t, "isDelete", true);
                      break;
                    }
                  }
                }
                this.multipleSelectionAll = [];
                this.$refs.multipleTable.clearSelection();
                this.$notify({
                  title: "成功",
                  message: "批量去激活成功!",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  message: "批量去激活失败，请刷新重试"
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.$notify.error({
                title: "失败",
                message: "批量去激活失败，请刷新重试"
              });
            });
        } else {
          delBorrowMul(delIds)
            .then(res => {
              if (res.val > 0) {
                this.getAllBorrow(
                  1,
                  this.pageInfo.pageSize,
                  this.search == "" ? 0 : this.search,
                  this.isOverdue,
                  this.isPayment
                );
                this.multipleSelectionAll = [];
                this.$notify({
                  title: "成功",
                  message: "批量删除成功!",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  message: "批量删除失败，请刷新重试"
                });
              }
            })
            .catch(error => {
              console.log(error);

              this.$notify.error({
                title: "失败",
                message: "批量删除失败，请刷新重试"
              });
            });
        }
      } else {
        if (this.delType == 1) {
          if (this.delRow.isDelete) {
            this.$notify.error({
              title: "失败",
              message: "此条信息已是删除状态！"
            });
            return;
          }
          delUpdate(this.delRow.borrowId)
            .then(res => {
              if (res.val == 1) {
                for (var t of this.tableData) {
                  if (t.borrowId == this.delRow.borrowId) {
                    this.$set(t, "isDelete", true);
                    break;
                  }
                }

                this.$notify({
                  title: "成功",
                  message: "去激活成功!",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  message: "去激活失败，请刷新重试"
                });
              }
            })
            .catch(error => {
              console.log(error);

              this.$notify.error({
                title: "失败",
                message: "去激活失败，请刷新重试"
              });
            });
        } else {
          delBorrow(this.delRow.borrowId)
            .then(res => {
              if (res.val == 1) {
                this.getAllBorrow(
                  this.pageInfo.currentPage,
                  this.pageInfo.pageSize,
                  this.search == "" ? 0 : this.search,
                  this.isOverdue,
                  this.isPayment
                );
                this.$notify({
                  title: "成功",
                  message: "删除成功!",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  message: "删除失败，请刷新重试"
                });
              }
            })
            .catch(error => {
              console.log(error);

              this.$notify.error({
                title: "失败",
                message: "删除失败，请刷新重试"
              });
            });
        }
      }
    },
    handelSelectChange(value) {
      this.getAllBorrow(
        1,
        10,
        value == "" ? 0 : this.search,
        this.isOverdue,
        this.isPayment
      );
    },
    checkChange() {
      this.isOverdue = 2;
      this.isPayment = 2;
      if (this.checkList.indexOf("1") >= 0) {
        this.isOverdue = 1;
      }
      if (this.checkList.indexOf("2") >= 0) {
        this.isOverdue = 0;
      }
      if (this.checkList.indexOf("3") >= 0) {
        this.isPayment = 1;
      }
      if (this.checkList.indexOf("4") >= 0) {
        this.isPayment = 0;
      }
      this.getAllBorrow(
        1,
        10,
        this.search == "" ? 0 : this.search,
        this.isOverdue,
        this.isPayment
      );
    },
    visibleChange(value) {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelection(selection, row) {
      this.changePageCoreRecordData();
    },
    handleSizeChange(val) {
      this.changePageCoreRecordData();
      this.getAllBorrow(
        this.pageInfo.currentPage,
        val,
        this.search == "" ? 0 : this.search,
        this.isOverdue,
        this.isPayment
      );
    },
    handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.getAllBorrow(
        val,
        this.pageInfo.pageSize,
        this.search == "" ? 0 : this.search,
        this.isOverdue,
        this.isPayment
      );
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
        return Y + M + D;
      } else {
        return "--";
      }
    },
    realityDay(value) {
      var cha = new Date().getTime() - new Date(value).getTime();
      return Math.floor(cha / (24 * 3600 * 1000));
    },
    overDay(value) {
      var cha = new Date().getTime() - new Date(value).getTime();
      if (cha <= 0) {
        return 0;
      }
      return Math.floor(cha / (24 * 3600 * 1000));
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      let idKey = "borrowId";
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
      let idKey = "borrowId";
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
  created() {
    this.getAllBorrow(1, 10, 0, 2, 2);
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
  }
};
</script>

<style scoped>
.journal-borrow .borrow-table {
  margin: 15px;
}
.journal-borrow .el-table {
  font-size: 13px;
}
.journal-borrow .header {
  margin: 15px;
}
.journal-borrow .page-group {
  float: right;
  margin: 5px 10px 0 0;
}

.journal-borrow .checkbox-group {
  display: inline-block;
  margin-top: 10px;
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
