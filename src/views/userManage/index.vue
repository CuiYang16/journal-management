<template>
  <div class="user-manage" id="user-manage">
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
        <el-table-column label="最后登录" prop="lastLoginTime" align="center" show-overflow-tooltip :formatter="dateFormat"></el-table-column>
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
  </div>
</template>

<script>
import { getUsers, getRoles } from "@/api/user";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      tableData: [
        {
          userId: "12987122",
          userName: "好滋好味鸡蛋仔",
          userPhone: "13800000000",
          userEmail: "12345678@qq.com",
          userSex: "1",
          userHeadPortrait: "e1cf12c07bf6458992569e67927d767e.png",
          lastLoginTime: "2018-9-9",
          roles: [],
          permiassion: []
        },
        {
          userId: "12987122",
          userName: "好滋好味鸡蛋仔",
          userPhone: "13800000000",
          userEmail: "12345678@qq.com",
          userSex: "1",
          userHeadPortrait: "e1cf12c07bf6458992569e67927d767e.png",
          lastLoginTime: "2018-9-9"
        },
        {
          userId: "12987122",
          userName: "好滋好味鸡蛋仔",
          userPhone: "13800000000",
          userEmail: "12345678@qq.com",
          userSex: "1",
          userHeadPortrait: "e1cf12c07bf6458992569e67927d767e.png",
          lastLoginTime: "2018-9-9"
        },
        {
          userId: "12987122",
          userName: "好滋好味鸡蛋仔",
          userPhone: "13800000000",
          userEmail: "12345678@qq.com",
          userSex: "1",
          userHeadPortrait: "e1cf12c07bf6458992569e67927d767e.png",
          lastLoginTime: "2018-9-9"
        },
        {
          userId: "12987122",
          userName: "好滋好味鸡蛋仔",
          userPhone: "13800000000",
          userEmail: "12345678@qq.com",
          userSex: "1",
          userHeadPortrait: "e1cf12c07bf6458992569e67927d767e.png",
          lastLoginTime: "2018-9-9"
        },
        {
          userId: "12987122",
          userName: "好滋好味鸡蛋仔",
          userPhone: "13800000000",
          userEmail: "12345678@qq.com",
          userSex: "1",
          userHeadPortrait: "e1cf12c07bf6458992569e67927d767e.png",
          lastLoginTime: "2018-9-9"
        }
      ],
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
              getRoles(getToken())
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
