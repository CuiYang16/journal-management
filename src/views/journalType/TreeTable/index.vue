<template>
  <el-table :data="tableData" :row-style="showRow" v-bind="$attrs" v-on="$listeners" size="small" :highlight-current-row="true">
    <slot name="selection"/>
    <slot name="pre-column"/>
    <el-table-column
      v-for="item in columns"
      :label="item.label"
      :key="item.key"
      :width="item.width"
      :align="item.align||'center'"
      :header-align="item.headerAlign"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <slot :scope="scope" :name="item.key">
          <template v-if="item.expand">
            <span :style="{'padding-left':+scope.row._level*indent + 'px'} "/>
            <span
              v-show="showSperadIcon(scope.row)"
              class="tree-ctrl"
              @click="toggleExpanded(scope.$index)"
            >
              <i
                v-if="!scope.row._expand"
                class="el-icon-arrow-right"
                @click="getChildrens(scope.row,scope.$index)"
              />
              <i v-else class="el-icon-arrow-down"/>
            </span>
          </template>
          <template v-if="item.checkbox">
            <el-checkbox
              v-if="scope.row[defaultChildren]&&scope.row[defaultChildren].length>0"
              :style="{'padding-left':+scope.row._level*indent + 'px'} "
              :indeterminate="scope.row._select"
              v-model="scope.row._select"
              @change="handleCheckAllChange(scope.row)"
            />
            <el-checkbox
              v-else
              :style="{'padding-left':+scope.row._level*indent + 'px'} "
              v-model="scope.row._select"
              @change="handleCheckAllChange(scope.row)"
            />
          </template>
          {{ scope.row[item.key] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import treeToArray, { addAttrs } from "./eval.js";
import {getJournalTypeChildren} from '@/api/journalDetail'
export default {
  name: "TreeTable",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    defaultChildren: {
      type: String,
      default: "children"
    },
    indent: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      guard: 1,
      expandBefore: []
    };
  },
  computed: {
    children() {
      return this.defaultChildren;
    },
    tableData() {
      const data = this.data;
      if (this.data.length === 0) {
        return [];
      }
      addAttrs(data, {
        expand: this.defaultExpandAll,
        children: this.defaultChildren
      });

      const retval = treeToArray(data, this.defaultChildren);
      return retval;
    }
  },
  methods: {
    addBrother(row, data) {
      // if (row._parent) {
      //   row._parent.children.push(data);
      // } else {
      //   this.data.push(data);
      // }
      if (data) {
        this.data.push(data);
      }
    },
    addChild(row, data) {
      if (!row.children) {
        this.$set(row, "children", []);
      }
      row.children.push(data);
    },
    delete(row) {
      const { _index, _parent } = row;
      if (_parent) {
        _parent.children.splice(_index, 1);
      } else {
        this.data.splice(_index, 1);
      }
    },
    getData() {
      return this.tableData;
    },
    showRow: function({ row }) {
      const parent = row._parent;
      const show = parent ? parent._expand && parent._show : true;
      row._show = show;
      return show
        ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        : "display:none;";
    },
    showSperadIcon(record) {
      return record[this.children] && record[this.children].length > 0;
    },
    toggleExpanded(trIndex) {
      const record = this.tableData[trIndex];
      const expand = !record._expand;
      record._expand = expand;
      this.expandBefore = [];
      this.tableData.forEach(t => {
        this.expandBefore.push(t._expand);
      });
      
    },
    updateTreeNode(item) {
      return new Promise(resolve => {
        const { _id, _parent } = item;
        const index = _id.split("-").slice(-1)[0]; // get last index
        if (_parent) {
          _parent.children.splice(index, 1, item);
          resolve(this.data);
        } else {
          this.data.splice(index, 1, item);
          resolve(this.data);
        }
      });
    },
    handleCheckAllChange(row) {
      this.selcetRecursion(row, row._select, this.defaultChildren);
      this.isIndeterminate = row._select;
    },
    selcetRecursion(row, select, children = "children") {
      if (select) {
        this.$set(row, "_expand", true);
        this.$set(row, "_show", true);
      }
      const sub_item = row[children];
      if (sub_item && sub_item.length > 0) {
        sub_item.map(child => {
          child._select = select;
          this.selcetRecursion(child, select, children);
        });
      }
    },
    //自己添加
    getChildrens(row, index) {
      const that = this;
      let ids = [];
      if (row.children != null && row.children.length > 0) {
        row.children.forEach(c => {
          if (c.children == null || c.children.length == 0) {
            ids.push(c.typeId);
          }
        });

        if (ids.length > 0) {
          getJournalTypeChildren(ids).then(res=>{
            res.list.forEach(r => {
              for (let i = 0; i < row.children.length; i++) {
                if (r.parentId === row.children[i].typeId) {
                  that.addChild(row.children[i], r);
                }
              }
            });
            for (let i = 0; i < that.tableData.length; i++) {
              that.$set(that.tableData[i], "_expand", that.expandBefore[i]);
            }
          }).catch(error=>{
            this.$notify.error({
                  title: "错误",
                  message: "查询失败，请刷新重试！"
                });
            
          });
        }
      }
    }
  }
};
</script>

<style>
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  margin-right: 5px;
}
</style>
