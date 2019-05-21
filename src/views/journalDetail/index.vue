<template>
  <div id="journal">
    <div class="header">
      <el-row type="flex" :gutter="0" justify="end">
        <ElCol :span="11">
          <div class="checkbox-group">
            <el-checkbox
              label="可借阅状态"
              :disabled="notBorrowStatus"
              v-model="borrowStatus"
              @change="borrowStatusChange"
            ></el-checkbox>
            <el-checkbox
              label="不可借阅状态"
              :disabled="borrowStatus"
              v-model="notBorrowStatus"
              @change="notBorrowStatusChange"
            ></el-checkbox>
            <el-checkbox
              label="去激活状态"
              :disabled="notDeleteStatus"
              v-model="deleteStatus"
              @change="deleteStatusChange"
            ></el-checkbox>
            <el-checkbox
              label="激活状态"
              :disabled="deleteStatus"
              v-model="notDeleteStatus"
              @change="notDeleteStatusChange"
            ></el-checkbox>
          </div>
        </ElCol>

        <el-col :span="5">
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
              style="margin-bottom:3px;"
              @click="addJournal"
            >添加杂志</el-button>
          </el-button-group>
        </el-col>
      </el-row>
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
        @select-all="handleSelection">
        
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand" label-width="120px">
              <el-form-item label="杂志图片" prop="journalImg">
                <el-popover placement="right" width="240" trigger="hover">
                  <img
                    :src="(props.row.journalImg==null||props.row.journalImg=='')?require('F:/MyWorkSpace/bishe-vue/journal-door/static/journal-img/1555556540064-journal-timg.jpg'):require('F:/MyWorkSpace/bishe-vue/journal-door/static/journal-img/'+props.row.journalImg)"
                    width="210"
                    height="300"
                  >
                  <img
                    :src="(props.row.journalImg==null||props.row.journalImg=='')?require('F:/MyWorkSpace/bishe-vue/journal-door/static/journal-img/1555556540064-journal-timg.jpg'):require('F:/MyWorkSpace/bishe-vue/journal-door/static/journal-img/'+props.row.journalImg)"
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
                <span>{{ (props.row.publishTime==null||props.row.publishTime=="")?"--":dateFormat(null,null,props.row.publishTime,null,'date') }}</span>
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
              <el-row type="flex" class="row-bg">
                  <el-form-item label="商品描述" style="width:100%">
                  <el-popover placement="right" trigger="hover" width="840" >
                      <div v-html="props.row.description"></div>
                        <el-button slot="reference" size="mini" type="primary">预览</el-button>
    
                         </el-popover>
                          
                  </el-form-item>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <el-form-item label="附加图片" style="padding-top:20px;">
                    <span v-for="i in props.row.journalImages" style="margin-right:15px;padding-top:20px;">
                      <el-popover placement="right" width="240" trigger="hover">
                        <img :src="require('F:/MyWorkSpace/bishe-vue/journal-door/static/journal-img/'+i.name)" width="210" height="300">

                        <img
                          :src="require('F:/MyWorkSpace/bishe-vue/journal-door/static/journal-img/'+i.name)"
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

        <el-table-column label="ID" prop="journalId" width="100"></el-table-column>

        <el-table-column label="名称" prop="journalName"></el-table-column align="center">

        <el-table-column
          label="入库时间"
          prop="journalJoinTime"
          :formatter="dateFormat"
          width="150"
           align="center"
        ></el-table-column>

        <el-table-column label="是否可借阅" prop="isBorrow" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isBorrow==false?'danger':'success'">{{scope.row.isBorrow==false?"否":"是"}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="期号" prop="issue" align="center" ></el-table-column>

        <el-table-column label="杂志级别" prop="journalLevel" align="center" :formatter="journalLevelFormmatter"></el-table-column>
        <el-table-column label="库存" prop="inventory" align="center" ></el-table-column>
        <el-table-column label="已删除" prop="isDelete" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDelete==false?'danger':'success'">{{scope.row.isDelete==false?"否":"是"}}</el-tag> 
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
#journal .describe-form {
  position: relative;
  float: right;
  width: 80%;
  max-height: 60px;
  overflow-x: hidden;
  overflow-y: auto;
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
  font-size: 13px;
}
#journal .page-group {
  float: right;
  margin: 5px 10px 0 0;
}
#journal .checkbox-group {
  margin-top: 10px;
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
import BackToTop from "@/components/BackToTop";

export default {
  components: {
    AddDialog,
    EditDialog,
    BackToTop
  },
  data() {
    return {
      tableData: [],
      imageList: [],
      selectType: "",
      selectValue: "",
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
      },
      borrowStatus: false,
      deleteStatus: false,
      notBorrowStatus: false,
      notDeleteStatus: false,
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
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
    getJournal(
      currentPage,
      pageSize,
      isBorrow,
      isDelete,
      notBorrowStatus,
      notDeleteStatus
    ) {
      let b = 2;
      let d = 2;
      if (this.borrowStatus) {
        b = 1;
      }
      if (this.deleteStatus) {
        d = 1;
      }
      if (this.notBorrowStatus) {
        b = 0;
      }
      if (this.notDeleteStatus) {
        d = 0;
      }

      getJournals(currentPage, pageSize, b, d)
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
              duration: 3500,
              message: res.str,
              type: "success"
            });
            this.$refs.addDialog.imgData.journalId = res.val;
            this.$refs.addDialog.$refs.upload.submit();
            this.$refs.addDialog.$refs.upload2.submit();
            setTimeout(() => {
              this.getJournal(
                1,
                this.pageInfo.pageSize,
                this.borrowStatus,
                this.deleteStatus,
                this.notBorrowStatus,
                this.notDeleteStatus
              );
            }, 100);
            this.$nextTick(function() {
              this.$refs.addDialog.$refs.addform.resetFields();
              this.$refs.addDialog.$refs.infoTinymce.setContent("");
            });
          }
        })
        .catch(error => {
          console.log(error);

          this.$notify.error({
            title: "错误",
            duration: 4500,
            message: error
          });
        });
    },
    editJournal(row) {
      this.editDialogValue.editFormVisible = !this.editDialogValue
        .editFormVisible;
      this.editDialogValue.editValue = Object.assign({}, row);
      this.$set(
        this.editDialogValue.editValue,
        "jimg",
        this.editDialogValue.editValue.journalImg
      );
    },
    editSubmit(editValue) {
      this.editDialogValue.editFormVisible = !this.editDialogValue
        .editFormVisible;
        editValue.typeId=editValue.journalType[editValue.journalType.length-1];
      updateJournals(editValue)
        .then(res => {
          if (res.val != 0) {
            this.$refs.editDialog.imgData.journalId = editValue.journalId;

            this.$refs.editDialog.$refs.upload.submit();
            delImgs(editValue.journalId)
              .then(res => {
                //if (res.val == 1) {
                  this.$refs.editDialog.$refs.upload2.submit();
               // }
              })
              .catch(error => {
                this.$notify.error({
                  title: "失败",
                  duration: 4500,
                  message: "图片上传失败，请刷新重试"
                });
                return;
              });

            setTimeout(() => {
              this.getJournal(
                this.pageInfo.currentPage,
                this.pageInfo.pageSize,
                this.borrowStatus,
                this.deleteStatus,
                this.notBorrowStatus,
                this.notDeleteStatus
              );
            }, 100);
            this.$notify({
              title: "成功",
              duration: 3500,
              message: res.str,
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: "失败",
            duration: 4500,
            message: "更新失败，请刷新重试"
          });
        });
    },
    delJournalDetail(row) {
      this.delMul = false;
      
      this.delRow = row;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delSubmit() {
      this.delDialogVisible = !this.delDialogVisible;
      // 假删
      if (this.delType === 1 && this.delMul === false) {
        if (this.delRow.isDelete) {
        this.$notify.error({
          title: "失败",
          duration: 4500,
          message: "此条信息已是删除状态！"
        });
        return;
      }
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
                duration: 3500,
                message: "修改删除状态成功!",
                type: "success"
              });
              this.multipleSelectionAll = [];
              this.$refs.multipleTable.clearSelection();
            } else {
              this.$notify.error({
                title: "失败",
                duration: 4500,
                message: "修改删除状态失败，请刷新重试"
              });
            }
          })
          .catch(error => {
            this.$notify.error({
              title: "失败",
              duration: 4500,
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
                  this.pageInfo.pageSize,
                  this.borrowStatus,
                  this.deleteStatus,
                  this.notBorrowStatus,
                  this.notDeleteStatus
                );
              }else {
                this.getJournal(
                  this.pageInfo.currentPage,
                  this.pageInfo.pageSize,
                  this.borrowStatus,
                  this.deleteStatus,
                  this.notBorrowStatus,
                  this.notDeleteStatus
                );
              }
              this.$notify({
                title: "成功",
                duration: 3500,
                message: "删除成功!",
                type: "success"
              });
            }else if(res.val ==-1){
                this.$notify.error({
                  title: "失败",
                  
                  message: "杂志信息被关联，请确认后重试！"
                });
              }  else {
              this.$notify.error({
                title: "失败",
                duration: 4500,
                message: "删除失败，请刷新重试"
              });
            }
          })
          .catch(error => {
            this.$notify.error({
              title: "失败",
              duration: 4500,
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
                  for (var id of ids) {
                    if (t.journalId == id) {
                      this.$set(t, "isDelete", true);
                      break;
                    }
                  }
                }

                this.$notify({
                  title: "成功",
                  duration: 3500,
                  message: "批量修改删除状态成功!",
                  type: "success"
                });
                this.multipleSelectionAll = [];
                this.$refs.multipleTable.clearSelection();
              } else {
                this.$notify.error({
                  title: "失败",
                  duration: 4500,
                  message: "批量修改删除状态失败，请刷新重试"
                });
              }
            })
            .catch(error => {
              console.log(error);

              this.$notify.error({
                title: "失败",
                duration: 4500,
                message: "批量修改删除状态失败，请刷新重试"
              });
            });
        }
        if (this.delType === 0) {
          delMulJournalTrue(ids)
            .then(res => {
              if (res.val == ids.length) {
                this.getJournal(
                  this.pageInfo.currentPage,
                  this.pageInfo.pageSize,
                  this.borrowStatus,
                  this.deleteStatus,
                  this.notBorrowStatus,
                  this.notDeleteStatus
                );
                this.multipleSelectionAll = [];
                this.$notify({
                  title: "成功",
                  duration: 3500,
                  message: "批量删除成功!",
                  type: "success"
                });
              }else if(res.val ==-1){
                this.$notify.error({
                  title: "失败",
                  
                  message: "杂志信息被关联，请确认后重试！"
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
      }
    },
    borrowStatusChange() {
      this.getJournal(
        1,
        this.pageInfo.pageSize,
        this.borrowStatus,
        this.deleteStatus,
        this.notBorrowStatus,
        this.notDeleteStatus
      );
    },
    deleteStatusChange() {
      this.getJournal(
        1,
        this.pageInfo.pageSize,
        this.borrowStatus,
        this.deleteStatus,
        this.notBorrowStatus,
        this.notDeleteStatus
      );
    },
    notBorrowStatusChange() {
      this.getJournal(
        1,
        this.pageInfo.pageSize,
        this.borrowStatus,
        this.deleteStatus,
        this.notBorrowStatus,
        this.notDeleteStatus
      );

    },
    notDeleteStatusChange() {
      this.getJournal(
        1,
        this.pageInfo.pageSize,
        this.borrowStatus,
        this.deleteStatus,
        this.notBorrowStatus,
        this.notDeleteStatus
      );
    },
    delMultipleJournalDetail() {
      this.delMul = true;
      this.delDialogVisible = !this.delDialogVisible;
    },
    delMultipleJournalDetailSubmit() {},
    handleSizeChange(val) {
      this.changePageCoreRecordData();
      this.getJournal(
        this.pageInfo.currentPage,
        val,
        this.borrowStatus,
        this.deleteStatus,
        this.notBorrowStatus,
        this.notDeleteStatus
      );
    },
    handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.getJournal(
        val,
        this.pageInfo.pageSize,
        this.borrowStatus,
        this.deleteStatus,
        this.notBorrowStatus,
        this.notDeleteStatus
      );
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

    dateFormat: function(row, column, cellValue, index,type) {
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
        if(type=="date"){return Y + M + D;
        }
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
    journalLevelFormmatter(row, column, cellValue, index) {
      const journalLevel = this.$refs.addDialog.journalLevelOptions;
      for (var j of journalLevel) {
        if (j.value === cellValue) {
          return j.label;
        }
      }
      return "--";
    },
    selectable(row) {
      if (row.isDelete) {
        return false;
      } else {
        return true;
      }
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
  created() {
    this.getJournal(1, this.pageInfo.pageSize, "", "", "", "");
  }
};
</script>