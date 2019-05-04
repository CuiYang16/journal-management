<template>
  <div id="journal-fair">
    <div class="header">
      <el-row type="flex" :gutter="0" justify="end">
        <el-col :span="10">
          <div style="margin-top:10px;">
            <el-checkbox-group v-model="checkList" @change="checkChange">
              <el-checkbox label="1" :disabled="checkList.indexOf('2')>=0">已删除状态</el-checkbox>
              <el-checkbox label="2" :disabled="checkList.indexOf('1')>=0">未删除状态</el-checkbox>
              <el-checkbox label="3" :disabled="checkList.indexOf('4')>=0">已过期书展</el-checkbox>
              <el-checkbox label="4" :disabled="checkList.indexOf('3')>=0">未过期书展</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>

        <el-col :span="5">
          <el-button-group style="float:right;">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              :disabled="multipleBtnVisible"
              @click="delJournalFairMul"
            >批量删除</el-button>

            <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              style="margin-bottom:3px;"
              @click="addJournalFair"
            >添加书展信息</el-button>
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
        :highlight-current-row="true"
        @selection-change="handleSelectionChange"
        @select="handleSelection"
        @select-all="handleSelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" class="demo-table-expand" label-width="80px">
              <el-form-item label="书展海报">
                <el-popover placement="right" width="240" trigger="hover">
                  <img
                    :src="(props.row.fairImg==null||props.row.fairImg=='')?require('E:/img/1555556540064-journal-timg.jpg'):require('E:/img/'+props.row.fairImg)"
                    width="210"
                    height="300"
                  >
                  <img
                    :src="(props.row.fairImg==null||props.row.fairImg=='')?require('E:/img/1555556540064-journal-timg.jpg'):require('E:/img/'+props.row.fairImg)"
                    width="70"
                    height="100"
                    slot="reference"
                  >
                </el-popover>
              </el-form-item>
              <el-form-item label="书展地点">
                <span>{{ props.row.fairSite }}</span>
              </el-form-item>
              <el-form-item label="主办方">
                <span>{{ props.row.fairHost }}</span>
              </el-form-item>
              <el-form-item label="赞助商">
                <span>{{ props.row.sponsor }}</span>
              </el-form-item>
              <el-form-item label="承办方">
                <span>{{ props.row.organizer }}</span>
              </el-form-item>
              <el-form-item label="创建者">
                <span>{{ props.row.fairUserShow.userName }}</span>
              </el-form-item>
              <el-form-item label="书展简介">
                <el-popover placement="top" trigger="hover">
                  <div v-html="props.row.fairDescribe"></div>
                  <el-button slot="reference" size="mini" type="primary">预览</el-button>
                  <div slot="reference" class="describe-form">{{ props.row.fairDescribe }}</div>
                </el-popover>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="fairInformationId" width="100"></el-table-column>
        <el-table-column label="书展名称" prop="fairName" align="center"></el-table-column>
        <el-table-column label="书展主题" prop="fairTheme" align="center"></el-table-column>
        <el-table-column
          label="开始时间"
          prop="fairStartTime"
          :formatter="dateFormat"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          label="结束时间"
          prop="fairEndTime"
          :formatter="dateFormat"
          width="150"
          align="center"
        ></el-table-column>

        <el-table-column label="去激活" prop="isDelete" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isDelete==false?'danger':'success'"
            >{{scope.row.isDelete==false?"否":"是"}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="参与用户" align="center">
          <template slot-scope="scope">
            <el-popover placement="left" width="280" trigger="click">
              <div>
                <el-button
                  :loading="downloadLoading"
                  type="primary"
                  @click="handleDownload(scope.row.fairName)"
                >导出excel</el-button>
              </div>
              <el-table :data="scope.row.fairUsers.users" element-loading-text="拼命加载中" v-loading="listLoading">
                <el-table-column width="90" prop="userName" label="姓名"></el-table-column>
                <el-table-column width="150" prop="userPhone" label="电话"></el-table-column>
              </el-table>
              <el-button slot="reference" type="text">查看用户</el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template class="templateClass" slot-scope="scope">
            <el-button type="text" @click="editJournalFair(scope.row)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
            <el-button type="text" @click="delJournalFair(scope.row)">
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
      <add-dialog
        ref="fairAddDialog"
        :addDialogValue="addDialogValue"
        @addJournalFairSubmit="addJournalFairSubmit"
        @getJournalFairs="getJournalFairs"
      ></add-dialog>
      <edit-dialog
        ref="fairEditDialog"
        :editDialogValue="editDialogValue"
        @editJournalFairSubmit="editJournalFairSubmit"
        @getJournalFairs="getJournalFairs"
      ></edit-dialog>
      <el-dialog title="删除杂志信息" :visible.sync="delDialogVisible">
        <span>请选择删除方式：</span>
        <div style="margin-top:20px">
          <el-radio-group v-model="delType" size="small">
            <el-radio :label="0" border>彻底删除</el-radio>
            <el-radio :label="1" border>改变已删除状态</el-radio>
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

<style scoped>
#journal-fair .data-table {
  margin: 15px;
}
#journal-fair .header {
  margin: 15px;
}
#journal-fair .el-table {
  font-size: 13px;
}
#journal-fair .page-group {
  float: right;
  margin: 5px 10px 0 0;
}
#journal-fair .describe-form {
  width: 100%;
  max-height: 60px;
  overflow-x: hidden;
  overflow-y: auto;
}
#journal-fair {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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


<script>
import { getToken } from "@/utils/auth";
import {
  getJournalFairs,
  createJournalFairs,
  updateJournalFairs,
  delJournalFairs
} from "@/api/journalFair";
import { parseTime } from "@/utils";
import AddDialog from "./components/addDialog";
import EditDialog from "./components/editDialog";
import BackToTop from "@/components/BackToTop";

export default {
  components: { AddDialog, EditDialog, BackToTop },
  data() {
    return {
      tableData: [],
      userFairData: [{ userName: "aaa", userPhone: "222" }],
      checkList: [],
      isDeleteValue: 2,
      overdueValue: 2,
      listLoading: false,
      downloadLoading: false,
      filename: "",
      autoWidth: true,
      bookType: "xlsx",
      addDialogValue: {
        addDialogVisible: false
      },
      editDialogValue: {
        editDialogVisible: false,
        editFormValue: {}
      },
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
    getJournalFairInfo(pageNum, pageSize, isDelete, overdue) {
      getJournalFairs(pageNum, pageSize, isDelete, overdue)
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
          this.$message({
            message: "初始化信息失败，请刷新重试！",
            type: "error"
          });
        });
    },
    checkChange() {
      this.isDeleteValue = 2;
      this.overdueValue = 2;
      if (this.checkList.indexOf("1") >= 0) {
        this.isDeleteValue = 1;
      }
      if (this.checkList.indexOf("2") >= 0) {
        this.isDeleteValue = 0;
      }
      if (this.checkList.indexOf("3") >= 0) {
        this.overdueValue = 1;
      }
      if (this.checkList.indexOf("4") >= 0) {
        this.overdueValue = 0;
      }
      this.getJournalFairInfo(
        1,
        this.pageInfo.pageSize,
        this.isDeleteValue,
        this.overdueValue
      );
    },
    addJournalFair() {
      this.addDialogValue.addDialogVisible = !this.addDialogValue
        .addDialogVisible;
    },
    addJournalFairSubmit(addFormValue) {
      this.addDialogValue.addDialogVisible = !this.addDialogValue
        .addDialogVisible;
      createJournalFairs(addFormValue, getToken())
        .then(res => {
          if (res.val == 1) {
            this.$refs.fairAddDialog.uploadData.fairInformationId = Number(
              res.msg
            );
            this.$refs.fairAddDialog.$refs.fairUpload.submit();
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "失败",

            message: "更新书展信息失败！"
          });
        });
    },
    editJournalFair(row) {
      this.editDialogValue.editFormValue = Object.assign({}, row);
      this.editDialogValue.editFormValue.journalDate = [
        this.editDialogValue.editFormValue.fairStartTime,
        this.editDialogValue.editFormValue.fairEndTime
      ];
      this.$set(this.editDialogValue.editFormValue, "fimg", row.fairImg);
      this.editDialogValue.editDialogVisible = !this.editDialogValue
        .editDialogVisible;
    },
    editJournalFairSubmit(editValue) {
      console.log(editValue);
      this.editDialogValue.editDialogVisible = !this.editDialogValue
        .editDialogVisible;
      updateJournalFairs(editValue)
        .then(res => {
          if (res.val == 1) {
            this.$refs.fairEditDialog.uploadData.fairInformationId = Number(
              editValue.fairInformationId
            );
            this.$refs.fairEditDialog.$refs.fairUploadEdit.submit();
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "失败",

            message: "更新书展信息失败！"
          });
        });
    },
    getJournalFairs(type) {
      if (type == "add") {
        this.getJournalFairInfo(
          1,
          this.pageInfo.pageSize,
          this.isDeleteValue,
          this.overdueValue
        );
        this.$notify({
          title: "成功",

          message: "操作成功！",
          type: "success"
        });
        this.$nextTick(function() {
          this.$refs.fairAddDialog.$refs.fairAddForm.resetFields();
          this.$refs.fairAddDialog.$refs.tinymce.setContent("");
        });
      }
      if (type == "edit") {
        this.getJournalFairInfo(
          this.pageInfo.currentPage,
          this.pageInfo.pageSize,
          this.isDeleteValue,
          this.overdueValue
        );
        this.$notify({
          title: "成功",

          message: "操作成功！",
          type: "success"
        });
      }
    },
    delJournalFair(row) {
      this.delMul = false;

      this.delRow = row;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delJournalFairMul() {
      this.delMul = true;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delSubmit() {
      this.delDialogVisible = !this.delDialogVisible;
      // 更新状态
      if (this.delType == 1) {
        if (this.delMul) {
          const ids = [];
          this.multipleSelectionAll.forEach(m => {
            ids.push(m.fairInformationId);
          });
          delJournalFairs(0, 3, ids)
            .then(res => {
              if (res.val == ids.length) {
                for (var t of this.tableData) {
                  for (var id of ids) {
                    if (t.fairInformationId == id) {
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
              this.$notify.error({
                title: "失败",

                message: "批量去激活失败，请刷新重试"
              });
            });
        } else {
          if (this.delRow.isDelete) {
            this.$notify.error({
              title: "失败",

              message: "此条信息已是删除状态！"
            });
            return;
          }
          delJournalFairs(this.delRow.fairInformationId, 1, [])
            .then(res => {
              if (res.val == 1) {
                for (var t of this.tableData) {
                  if (t.fairInformationId == this.delRow.fairInformationId) {
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
              this.$notify.error({
                title: "失败",

                message: "去激活失败，请刷新重试"
              });
            });
        }
      }
      //彻底删除
      if (this.delType == 0) {
        if (this.delMul) {
          const ids = [];
          this.multipleSelectionAll.forEach(m => {
            ids.push(m.fairInformationId);
          });
          delJournalFairs(0, 4, ids)
            .then(res => {
              if (res.val == ids.length) {
                this.getJournalFairInfo(
                  this.pageInfo.currentPage,
                  this.pageInfo.pageSize,
                  this.isDeleteValue,
                  this.overdueValue
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
              this.$notify.error({
                title: "失败",

                message: "批量删除失败，请刷新重试"
              });
            });
        } else {
          delJournalFairs(this.delRow.fairInformationId, 2, [])
            .then(res => {
              if (res.val == 1) {
                if (this.pageInfo.isLastPage && this.tableData.length == 1) {
                  this.getJournalFairInfo(
                    this.pageInfo.currentPage - 1,
                    this.pageInfo.pageSize,
                    this.isDeleteValue,
                    this.overdueValue
                  );
                } else {
                  this.getJournalFairInfo(
                    this.pageInfo.currentPage,
                    this.pageInfo.pageSize,
                    this.isDeleteValue,
                    this.overdueValue
                  );
                }
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
              this.$notify.error({
                title: "失败",

                message: "删除失败，请刷新重试"
              });
            });
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelection(selection, row) {
      this.changePageCoreRecordData();
    },
    handleSizeChange(val) {
      this.changePageCoreRecordData();
      this.getJournalFairInfo(
        this.pageInfo.currentPage,
        val,
        this.isDeleteValue,
        this.overdueValue
      );
    },
    handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.getJournalFairInfo(
        val,
        this.pageInfo.pageSize,
        this.isDeleteValue,
        this.overdueValue
      );
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      let idKey = "fairInformationId";
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
      let idKey = "fairInformationId";
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
    },
    handleDownload(fairName) {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const multiHeader = [];
        const tHeader = ["用户名", "用户联系方式"];
        const filterVal = ["userName", "userPhone"];
        const list = this.userFairData;
        const data = this.formatJson(filterVal, list);
        const merges = [];
        excel.export_json_to_excel({
          multiHeader,
          header: tHeader,
          data,
          filename: "参展名单-" + fairName,
          merges,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
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
        return Y + M + D + h + m + s;
      } else {
        return "--";
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
    this.getJournalFairInfo(
      1,
      this.pageInfo.pageSize,
      this.isDeleteValue,
      this.overdueValue
    );
  }
};
</script>