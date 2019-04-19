<template>
  <div id="journal">
    <div class="header">
      <el-button-group style="float:right;">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          :disabled="multipleBtnVisible"
          @click="delMultipleJournalDetail"
        >批量删除</el-button>
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          style="float:right;margin-bottom:3px;margin-right:5px;"
          @click="addJournal"
        >添加杂志</el-button>
      </el-button-group>
    </div>

    <div class="journal-data">
      <el-table
      ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        :highlight-current-row="true"
        size="mini"
        @expand-change="expandChange"
        @selection-change="handleSelectionChange"
        @select="handleSelection"
        @select-all="handleSelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand" label-width="120px">
              <el-form-item label="杂志图片" prop="journalImg">
                <el-popover placement="right" width="240" trigger="hover">
                  <img
                    :src="(props.row.journalImg==null||props.row.journalImg=='')?require('E:/img/1555556540064-journal-timg.jpg'):require('E:/img/'+props.row.journalImg)"
                    width="210"
                    height="300"
                  >
                  <img
                    :src="(props.row.journalImg==null||props.row.journalImg=='')?require('E:/img/1555556540064-journal-timg.jpg'):require('E:/img/'+props.row.journalImg)"
                    width="70"
                    height="100"
                    slot="reference"
                  >
                </el-popover>
              </el-form-item>
              <el-form-item label="作者">
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item label="出版时间">
                <span>{{ (props.row.publishTime==null||props.row.publishTime=="")?"--":dateFormat(null,null,props.row.publishTime) }}</span>
              </el-form-item>
              <el-form-item label="卷号">
                <span>{{ props.row.reelNumber }}</span>
              </el-form-item>
              <el-form-item label="总期号">
                <span>{{ props.row.totalIssue }}</span>
              </el-form-item>
              <el-form-item label="国内统一刊号">
                <span>{{ props.row.cn }}</span>
              </el-form-item>
              <el-form-item label="国际标准书号">
                <span>{{ props.row.isbn }}</span>
              </el-form-item>
              <el-form-item label="国际标准刊号">
                <span>{{ props.row.issn }}</span>
              </el-form-item>
              <el-form-item label="出版周期">
                <span>{{ props.row.publicationCycle }}</span>
              </el-form-item>
              <el-form-item label="出版社">
                <span>{{ props.row.publishingHouse }}</span>
              </el-form-item>
              <el-form-item label="主办" prop="journalHost">
                <span>{{ props.row.journalHost }}</span>
              </el-form-item>
              <el-form-item label="是否国外">
                <span>{{ props.row.isForeign==true?'是':'否' }}</span>
              </el-form-item>
              <el-form-item label="出版地区">
                <span>{{ (props.row.publishingArea==null||props.row.publishingArea=="")?props.row.isForeign==true?"国外":"--":publishingAreaFormat(props.row.publishingArea) }}</span>
              </el-form-item>
              <el-form-item label="出版语言">
                <span>{{ (props.row.jounalLanguage==null||props.row.jounalLanguage=="")?"--":jounalLanguageFormat(props.row.jounalLanguage) }}</span>
              </el-form-item>
              <el-form-item label="国外代号">
                <span>{{ props.row.foreignCodes }}</span>
              </el-form-item>
              <el-form-item label="国内代号">
                <span>{{ props.row.domesticCode }}</span>
              </el-form-item>
              <el-form-item label="开本">
                <span>{{ props.row.format }}</span>
              </el-form-item>
              <el-form-item label="页数">
                <span>{{ props.row.pageNumber }}</span>
              </el-form-item>
  
              <el-form-item label="资料类别">
                <span>{{ props.row.type==null?"--":(props.row.type.typeName==null||props.row.type.typeName=="")?"--":props.row.type.typeName }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>

              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <el-form-item label="附加图片">
                    <span v-for="i in props.row.journalImages" style="margin-right:15px">
                      <el-popover placement="right" width="240" trigger="hover">
                        <img :src="require('E:/img/'+i.name)" width="210" height="300">

                        <img
                          :src="require('E:/img/'+i.name)"
                          width="70"
                          height="100"
                          slot="reference"
                        >
                      </el-popover>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="ID" prop="journalId"></el-table-column>

        <el-table-column label="名称" prop="journalName"></el-table-column align="center">

        <el-table-column
          label="入库时间"
          prop="journalJoinTime"
          sortable
          :formatter="dateFormat"
          width="150"
           align="center"
        ></el-table-column>

        <el-table-column label="是否可借阅" prop="isBorrow" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.isBorrow==false?"否":"是"}}</div>
          </template>
        </el-table-column>

        <el-table-column label="期号" prop="issue" align="center" ></el-table-column>

        <el-table-column label="杂志级别" prop="journalLevel" align="center"></el-table-column>

        <el-table-column label="已删除" prop="isDelete" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.isDelete==false?"否":"是"}}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template class="templateClass" slot-scope="scope">
            <el-button type="text" @click="editJournal(scope.row)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
            <el-button type="text" @click="delJournalDetail(scope.row)">
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
      <add-dialog ref="addDialog" :addDialogValue="addDialogValue" @addSubmit="addSubmit"></add-dialog>
      <edit-dialog ref="editDialog" :editDialogValue="editDialogValue" @editSubmit="editSubmit"></edit-dialog>
      <el-dialog title="删除杂志信息" :visible.sync="delDialogVisible">
        <span>请选择删除方式：</span>
        <div style="margin-top:20px">
          <el-radio-group v-model="delType" size="small">
            <el-radio :label="0" border>彻底删除</el-radio>
            <el-radio :label="1" border>改变已删除状态</el-radio>
          </el-radio-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="delDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
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
  width: 50%;
}
#journal {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#journal .header {
  margin: 15px;
}
#journal .journal-data {
  margin: 15px;
}
#journal .journal-data .el-table__body tr.current-row {
  font-weight: 900;
  color: #303133;
}
#journal .el-table {
  padding-top: 15px;
  font-size: 13px;
}
#journal .page-group {
  float: right;
  margin: 5px;
}
</style>

<script>
import {
  getJournals,
  createJournals,
  getImgUrl,
  getImgs,
  updateJournals,
  delImgs,
  delJournal,
  delJournalTrue,
  delMulJournal,
  delMulJournalTrue
} from "@/api/journalDetail";
import AddDialog from "@/views/journalDetail/components/addDialog";
import EditDialog from "@/views/journalDetail/components/editDialog";
export default {
  components: {
    AddDialog,
    EditDialog
  },
  data() {
    return {
      tableData: [],
      imageList: [],
      delRow: {},
      delType: 1,
      delMul: false,
      multipleSelection: [],
      multipleSelectionAll: [],
      multipleBtnVisible: true,
      addDialogValue: {
        addFormVisible: false
      },
      editDialogValue: {
        editFormVisible: false,
        editValue: {}
      },
      delDialogVisible: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isFirstPage: false,
        isLastPage: false,
        size: 0,
        pages: 1
      }
    };
  },
  methods: {
    getJournal(currentPage, pageSize) {
      getJournals(currentPage, pageSize)
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
        });
    },
    addJournal() {
      this.addDialogValue.addFormVisible = !this.addDialogValue.addFormVisible;
    },
    addSubmit(addFormValue) {
      this.addDialogValue.addFormVisible = !this.addDialogValue.addFormVisible;
      addFormValue.typeId =
        addFormValue.journalType[addFormValue.journalType.length - 1];
      createJournals(addFormValue)
        .then(res => {
          if (res.val != 0) {
            this.$notify({
              title: "成功",
              duration: 1500,
              message: res.str,
              type: "success"
            });
            this.$refs.addDialog.imgData.journalId = res.val;
            this.$refs.addDialog.$refs.upload.submit();
            this.$refs.addDialog.$refs.upload2.submit();
            setTimeout(() => {
              this.getJournal(1, this.pageInfo.pageSize);
            }, 100);
          }
        })
        .catch(error => {
          console.log(error);

          this.$notify.error({
            title: "错误",
            duration: 3500,
            message: error
          });
        });
    },
    editJournal(row) {
      this.editDialogValue.editFormVisible = !this.editDialogValue
        .editFormVisible;
      this.editDialogValue.editValue = Object.assign({}, row);
    },
    editSubmit(editValue) {
      this.editDialogValue.editFormVisible = !this.editDialogValue
        .editFormVisible;
      updateJournals(editValue)
        .then(res => {
          if (res.val != 0) {
            this.$refs.editDialog.imgData.journalId = editValue.journalId;

            this.$refs.editDialog.$refs.upload.submit();
            delImgs(editValue.journalId)
              .then(res => {
                if (res.val == 1) {
                  this.$refs.editDialog.$refs.upload2.submit();
                }
              })
              .catch(error => {
                this.$notify.error({
                  title: "失败",
                  duration: 3500,
                  message: "图片上传失败，请刷新重试"
                });
                return;
              });

            setTimeout(() => {
              this.getJournal(
                this.pageInfo.currentPage,
                this.pageInfo.pageSize
              );
            }, 100);
            this.$notify({
              title: "成功",
              duration: 1500,
              message: res.str,
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: "失败",
            duration: 3500,
            message: "更新失败，请刷新重试"
          });
        });
    },
    delJournalDetail(row) {
      this.delMul = false;
      if (row.isDelete) {
        this.$notify.error({
          title: "失败",
          duration: 3500,
          message: "此条信息已删除！"
        });
        return;
      }
      this.delRow = row;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delSubmit() {
      this.delDialogVisible = !this.delDialogVisible;
      // 假删
      if (this.delType === 1 && this.delMul === false) {
        delJournal(this.delRow.journalId)
          .then(res => {
            if (res.val == 1) {
              for (var t of this.tableData) {
                if (t.journalId == this.delRow.journalId) {
                  this.$set(t, "isDelete", true);
                  break;
                }
              }

              this.$notify({
                title: "成功",
                duration: 1500,
                message: "修改删除状态成功!",
                type: "success"
              });
            } else {
              this.$notify.error({
                title: "失败",
                duration: 3500,
                message: "修改删除状态失败，请刷新重试"
              });
            }
          })
          .catch(error => {
            this.$notify.error({
              title: "失败",
              duration: 3500,
              message: "删除状态修改失败，请刷新重试"
            });
          });
      }
      // 真删
      if (this.delType === 0 && this.delMul === false) {
        delJournalTrue(this.delRow.journalId)
          .then(res => {
            this.delMul = true;
            if (res.val == 1) {
              if (this.pageInfo.isLastPage && this.tableData.length == 1) {
                this.getJournal(
                  this.pageInfo.currentPage - 1,
                  this.pageInfo.pageSize
                );
              } else {
                this.getJournal(
                  this.pageInfo.currentPage,
                  this.pageInfo.pageSize
                );
              }
              this.$notify({
                title: "成功",
                duration: 1500,
                message: "删除成功!",
                type: "success"
              });
            } else {
              this.$notify.error({
                title: "失败",
                duration: 3500,
                message: "删除失败，请刷新重试"
              });
            }
          })
          .catch(error => {
            this.$notify.error({
              title: "失败",
              duration: 3500,
              message: "删除失败，请刷新重试"
            });
          });
      }
      if (this.delMul === true) {
        const ids = [];
        this.multipleSelectionAll.forEach(m => {
          ids.push(m.journalId);
        });
          // 假批量删
          if (this.delType === 1) {
            delMulJournal(ids)
              .then(res => {
                if (res.val == ids.length) {
                  for (var t of this.tableData) {
                    for(var id of ids){
                      if (t.journalId == id) {
                      this.$set(t, "isDelete", true);
                     break;
                    }
                    }
                   
                  }

                  this.$notify({
                    title: "成功",
                    duration: 1500,
                    message: "批量修改删除状态成功!",
                    type: "success"
                  });
                } else {
                  this.$notify.error({
                    title: "失败",
                    duration: 3500,
                    message: "批量修改删除状态失败，请刷新重试"
                  });
                }
              })
              .catch(error => {
                console.log(error);
                
                this.$notify.error({
                  title: "失败",
                  duration: 3500,
                  message: "批量修改删除状态失败，请刷新重试"
                });
              });
          }
          if (this.delType === 0) {
            delMulJournalTrue(ids).then(res=>{
              if(res.val==ids.length){
                this.getJournal(this.pageInfo.currentPage,this.pageInfo.pageSize);
                this.multipleSelectionAll=[];
                this.$notify({
                    title: "成功",
                    duration: 1500,
                    message: "批量删除成功!",
                    type: "success"
                  });
              }else{
                this.$notify.error({
                  title: "失败",
                  duration: 3500,
                  message: "批量删除失败，请刷新重试"
                });
              }
            }).catch(error=>{
              console.log(error);
              
              this.$notify.error({
                  title: "失败",
                  duration: 3500,
                  message: "批量删除失败，请刷新重试"
                });
            });
          }
        
      }
    },
    delMultipleJournalDetail() {
      this.delMul=true;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delMultipleJournalDetailSubmit() {},
    handleSizeChange(val) {
      this.changePageCoreRecordData();
      this.getJournal(this.pageInfo.currentPage, val);
    },
    handleCurrentChange(val) {
      console.log(this.multipleSelectionAll);

      this.changePageCoreRecordData();
      this.getJournal(val, this.pageInfo.pageSize);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelection(selection, row) {
      this.changePageCoreRecordData();
    },
    expandChange(row, expandedRows) {
      getImgUrl(row.journalId)
        .then(res => {
          if (res.str != null) {
            //row.journalImg == res.str;
            this.$set(row, "journalImg", res.str);
          }
        })
        .catch(error => {
          console.log(error);
        });
      getImgs(row.journalId)
        .then(res => {
          this.$set(row, "journalImages", res.list);
          //this.imageList = res.list;
        })
        .catch(error => {
          console.log(error);
        });
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
    publishingAreaFormat(Value) {
      const publishingArea = this.$refs.addDialog.publishingAreaOptions;
      for (var i = 0; i < publishingArea.length; i++) {
        if (publishingArea[i].value === Value) {
          return publishingArea[i].label;
        }
      }
      return "--";
    },
    jounalLanguageFormat(value) {
      const jounalLanguage = this.$refs.addDialog.languageOptions;
      for (var j of jounalLanguage) {
        if (j.value === value) {
          return j.label;
        }
      }
      return "--";
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      let idKey = "journalId";
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
      let idKey = "journalId";
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
    this.getJournal(1, this.pageInfo.pageSize);
  }
};
</script>