<template>
  <div id="journal-type">
    <div class="header">
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        style="float:right;margin-bottom:3px;margin-right:5px;"
        @click="addTypeDialog(null,'top',null)"
      >添加杂志类别</el-button>
    </div>
    <div class="data-table">
      <trees-tables
        ref="TreeTable"
        :data="tableData"
        :default-expand-all="false"
        :columns="columns"
        :indent="20"
        default-children="children"
        row-key="typeId"
        @selection-change="selectChange"
      >
        <template slot="operation" slot-scope="{scope}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button
              size="mini"
              type="text"
              class="el-icon-edit-outline"
              @click="editTypeDialog(scope.row,scope.$index)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="添加子类别" placement="top-start">
            <el-button
              size="mini"
              type="text"
              @click="addTypeDialog(scope.row,'children',scope.$index)"
              :disabled="scope.row.typeLevel===3"
            >
              <i class="el-icon-circle-plus-outline"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button size="mini" type="text" @click="delJournalType(scope.row,scope.$index)">
              <i class="el-icon-delete" style="color: red"></i>
            </el-button>
          </el-tooltip>
        </template>
        <template slot="sort" slot-scope="{scope}">
          <!-- 上移 -->
          <span @click="toUp(scope.row,scope.$index)" v-if="scope.row.typeLevel==1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangshang4"></use>
            </svg>
          </span>
          <!-- 下移 -->
          <span @click="toDown(scope.row,scope.$index)" v-if="scope.row.typeLevel==1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia4"></use>
            </svg>
          </span>
        </template>
      </trees-tables>
    </div>

    <div class="add-dialog">
      <el-dialog title="添加杂志类别" :visible.sync="addDialogVisible" :close-on-click-modal="false">
        <el-form :model="addFormValue" :rules="rules" ref="addform" status-icon>
          <el-form-item label="类别名称" label-width="100px" prop="typeName">
            <el-input v-model="addFormValue.typeName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别描述" label-width="100px" prop="typeDescribe">
            <el-input type="textarea" v-model="addFormValue.typeDescribe"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="addTypeSubmit" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="edit-dialog">
      <el-dialog title="编辑杂志类别" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form :model="editFormValue" :rules="rules" ref="editform" status-icon>
          <el-form-item label="类别名称" label-width="100px" prop="typeName">
            <el-input v-model="editFormValue.typeName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别描述" label-width="100px" prop="typeDescribe">
            <el-input type="textarea" v-model="editFormValue.typeDescribe"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="updateItem" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="del-dialog">
      <el-dialog
        title="确认删除"
        :visible.sync="delDialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <span class="del-span">
          <el-tag v-for="(name,index) in delNames" :key="index" type="info">{{name}}</el-tag>
        </span>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="delDialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="deleteSubmit();">确 定</el-button>
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
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-left: 5px;
}
#journal-type .data-table {
  margin: 15px;
}

#journal-type .data-table .el-table__body tr.current-row {
  font-weight: 900;
  color: #303133;
}

#journal-type .header {
  margin: 10px;
}
#journal-type {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#journal-type .el-table {
  padding-top: 15px;
  font-size: 13px;
}

#journal-type .del-span .el-tag {
  margin-right: 3px;
}
</style>


<script>
import TreesTables from "./TreeTable";
import {
  getJournalType,
  createJournalType,
  updateJournalType,
  deleteJournalType,
  upJournalType,
  downJournalType
} from "@/api/journalDetail";
import BackToTop from "@/components/BackToTop";

export default {
  components: { TreesTables, BackToTop },
  data() {
    return {
      tableData: [],
      addDialogVisible: false,
      addType: "",
      addRow: {},
      trIndex: 0,
      addFormValue: {
        typeName: "",
        typeDescribe: ""
      },
      editDialogVisible: false,
      editFormValue: {},
      delDialogVisible: false,
      delNames: [],
      delIds: [],
      delRow: {},
      rules: {
        typeName: [
          { required: true, message: "请填写类型名称", trigger: "blur" }
        ]
      },
      columns: [
        {
          label: "类别名称",
          key: "typeName",
          expand: true,
          align: "left",
          width: 200
        },
        {
          label: "类别描述",
          key: "typeDescribe"
        },
        {
          label: "操作",
          key: "operation",
          width: 150
        },
        {
          label: "排序",
          key: "sort",
          width: 100
        }
      ],
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
    toUp(row, trIndex) {
      this.trIndex = trIndex;
      const { _id, _parent } = row;
      const index = _id.split("-").slice(-1)[0];
      if (trIndex != 0) {
        upJournalType(row.typeId, row.typeIndex)
          .then(response => {
            if (response.val >= 2) {
              let preRowF = this.tableData[index - 1];
              let temp = this.tableData[index - 1].typeIndex;

              preRowF.typeIndex = this.tableData[index].typeIndex;
              this.tableData[index].typeIndex = temp;

              this.tableData.splice(index - 1, 1, this.tableData[index]);
              this.tableData.splice(index, 1, preRowF);
              this.$notify({
                title: "成功",
                message: "上移子类别信息成功",

                type: "success"
              });
              this.toggleExpandedRecursion(this.trIndex - 1);
            }
          })
          .catch(error => {
            console.log(error);

            this.$notify.error({
              title: "错误",

              message: "上移失败，请刷新重试！"
            });
          });
      } else {
        this.$notify.error({
          title: "错误",

          message: "第一条数据不可上移"
        });
      }
    },
    toDown(row, trIndex) {
      this.trIndex = trIndex;
      const { _id, _parent } = row;
      const index = _id.split("-").slice(-1)[0];
      if (index != this.tableData.length - 1) {
        downJournalType(row.typeId, row.typeIndex)
          .then(response => {
            if (response.val >= 2) {
              let nextRowF = this.tableData[Number(index) + 1];
              let temp = this.tableData[Number(index) + 1].typeIndex;

              nextRowF.typeIndex = this.tableData[index].typeIndex;
              this.tableData[index].typeIndex = temp;

              this.tableData.splice(
                Number(index) + 1,
                1,
                this.tableData[index]
              );
              this.tableData.splice(index, 1, nextRowF);
              this.$notify({
                title: "成功",

                message: "下子类别信息成功",
                type: "success"
              });
              this.toggleExpandedRecursion(this.trIndex - 1);
            }
          })
          .catch(error => {
            console.log(error);

            this.$notify.error({
              title: "错误",

              message: "下移失败，请刷新重试！"
            });
          });
      } else {
        this.$notify.error({
          title: "错误",

          message: "最后一条数据不可下移"
        });
      }
    },
    addTypeDialog(row, type, trIndex) {
      this.addDialogVisible = !this.addDialogVisible;
      this.addType = type;
      this.addRow = row;
      this.trIndex = trIndex;
    },
    addTypeSubmit() {
      this.$refs["addform"].validate(valid => {
        if (valid) {
          if (this.addType === "children") {
            createJournalType(this.addRow.typeId, this.addFormValue)
              .then(response => {
                if (response.journalType != null) {
                  this.$refs.TreeTable.addChild(
                    this.addRow,
                    response.journalType
                  );
                  this.$notify({
                    title: "成功",

                    message: "添加子类别信息成功",
                    type: "success"
                  });
                  this.addFormValue = {
                    typeName: "",
                    typeDescribe: ""
                  };
                }
                this.addDialogVisible = !this.addDialogVisible;
              })
              .catch(error => {
                this.$notify.error({
                  title: "错误",

                  message: "添加失败，请刷新重试！"
                });
                this.addDialogVisible = !this.addDialogVisible;
              });
          }

          if (this.addType === "top") {
            createJournalType(-1, this.addFormValue)
              .then(response => {
                if (response.journalType != null) {
                  this.$refs.TreeTable.addBrother(
                    this.addRow,
                    response.journalType
                  );
                  this.$notify({
                    title: "成功",

                    message: "添加顶级类别信息成功",
                    type: "success"
                  });
                  this.addFormValue = {
                    typeName: "",
                    typeDescribe: ""
                  };
                }
                this.addDialogVisible = !this.addDialogVisible;
              })
              .catch(error => {
                console.log(error);
                this.$notify.error({
                  title: "错误",

                  message: "添加失败，请刷新重试！"
                });
                this.addDialogVisible = !this.addDialogVisible;
              });
          }
          this.toggleExpandedRecursion(this.trIndex);
          return true;
        } else {
          return false;
        }
      });
    },
    editTypeDialog(row, trIndex) {
      this.editFormValue = Object.assign({}, row);
      this.editDialogVisible = !this.editDialogVisible;
    },
    async updateItem() {
      this.$refs["editform"].validate(valid => {
        if (valid) {
          const editValue = {
            typeId: this.editFormValue.typeId,
            typeName: this.editFormValue.typeName,
            typeDescribe: this.editFormValue.typeDescribe
          };
          updateJournalType(editValue)
            .then(response => {
              if (response.val == 1) {
                this.$refs.TreeTable.updateTreeNode(this.editFormValue);
                this.toggleExpandedRecursion(this.trIndex);
                this.$notify({
                  title: "成功",

                  message: "编辑类别信息成功",
                  type: "success"
                });
                this.editDialogVisible = !this.editDialogVisible;
              }
            })
            .catch(error => {
              console.log(error);
              this.$notify.error({
                title: "错误",

                message: "编辑失败，请刷新重试！"
              });
              this.editDialogVisible = !this.editDialogVisible;
            });
        }
      });
    },
    delJournalType(row, trIndex) {
      this.delRow = row;
      this.delNames = [];
      this.delIds = [];
      this.trIndex = trIndex;
      this.delNames.push(row.typeName);
      this.delIds.push(row.typeId);
      this.delRecursion(row);
      this.delDialogVisible = !this.delDialogVisible;
    },
    deleteSubmit() {
      this.delDialogVisible = !this.delDialogVisible;
      deleteJournalType(this.delIds)
        .then(response => {
          if (response.val === this.delIds.length) {
            this.$refs.TreeTable.delete(this.delRow);
            this.$notify({
              title: "成功",

              message: "删除类别信息成功",
              type: "success"
            });
            this.toggleExpandedRecursion(this.trIndex);
          } else if (response.val == -1) {
            this.$notify.error({
              title: "错误",
              message: "类别已被关联，请确认后重试！"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: "错误",

            message: "删除失败，请刷新重试！"
          });
        });
    },
    delRecursion(row) {
      if (row.children != null &&
        row.children.length > 0 &&
        typeof row.children != "undefined"
      ) {
        for (var i = 0; i < row.children.length; i++) {
          this.delNames.push(row.children[i].typeName);
          this.delIds.push(row.children[i].typeId);
          this.delRecursion(row.children[i]);
        }
      } else {
        return;
      }
    },
    toggleExpandedRecursion(trIndex) {
      for (let i = 0; i < this.$refs.TreeTable.tableData.length; i++) {
        this.$set(
          this.$refs.TreeTable.tableData[i],
          "_expand",
          this.$refs.TreeTable.expandBefore[i]
        );
      }
    },
    selectChange(val) {
      console.log(val);
    }
  },
  watch: {
    addDialogVisible: {
      handler(newValue) {
        if (newValue == false) {
          if (this.$refs["addform"] != undefined) {
            this.$refs["addform"].clearValidate();
          }
        }
      }
    },
    editDialogVisible: {
      handler(newValue) {
        if (newValue == false) {
          if (this.$refs["editform"] != undefined) {
            this.$refs["editform"].clearValidate();
          }
        }
      }
    }
  },
  created() {
    getJournalType()
      .then(response => {
        this.tableData = response.list;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>