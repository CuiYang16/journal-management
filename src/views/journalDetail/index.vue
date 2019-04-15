<template>
  <div id="journal">
    <div class="header">
      <el-button-group style="float:right;">
        <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          style="float:right;margin-bottom:3px;margin-right:5px;"
        >添加杂志</el-button>
      </el-button-group>
    </div>

    <div class="journal-data">
      <el-table
        :data="tableData"
        style="width: 100%"
        :highlight-current-row="true"
        size="mini"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="杂志图片">
                <span>{{ props.row.journalImg }}</span>
              </el-form-item>
              <el-form-item label="作者">
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item label="出版时间">
                <span>{{ props.row.publishTime }}</span>
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
              <el-form-item label="主办">
                <span>{{ props.row.host }}</span>
              </el-form-item>
              <el-form-item label="是否国外">
                <span>{{ props.row.isForeign }}</span>
              </el-form-item>
              <el-form-item label="出版地区">
                <span>{{ props.row.publishingArea }}</span>
              </el-form-item>
              <el-form-item label="出版语言">
                <span>{{ props.row.jounalLanguage }}</span>
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
              <el-form-item label="国外代号">
                <span>{{ props.row.foreignCodes }}</span>
              </el-form-item>
              <el-form-item label="资料类别">
                <span>{{ props.row.typeId }}</span>
              </el-form-item>

              <el-form-item label="商品描述">
                <span>{{ props.row.describe }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="journalId"></el-table-column>
        <el-table-column label="商品名称" prop="journalName"></el-table-column>
        <el-table-column label="入库时间" prop="journalJoinTime" sortable :formatter="dateFormat" width="150"></el-table-column>
        <el-table-column label="是否可借阅" prop="isBorrow"></el-table-column>
        <el-table-column label="期号" prop="issue"></el-table-column>
        <el-table-column label="杂志级别" prop="journalLevel"></el-table-column>
        <el-table-column label="是否已删除" prop="isDelete"></el-table-column>
        <el-table-column label="操作" align="center">
          <template class="templateClass" slot-scope="scope">
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
</style>

<script>
import { getJournals } from "@/api/journalDetail";

export default {
  data() {
    return {
      tableData: [
        {
          journalId: "12987122",
          journalName: "好滋好味鸡蛋仔",
          journalImg: "江浙小吃、小吃零食",
          author: "荷兰优质淡奶，奶香浓而不腻",
          journalLevel: "上海市普陀区真北路",
          journalJoinTime: "王小虎夫妻店",
          publishTime: "10333",
          reelNumber: 111,
          issue: "10333",
          totalIssue: "10333",
          cn: "10333",
          isbn: "10333",
          issn: "10333",
          publicationCycle: "10333",
          publishingHouse: "10333",
          host: "10333",
          isForeign: 1,
          publishingArea: "10333",
          jounalLanguage: "10333",
          foreignCodes: "10333",
          domesticCode: "10333",
          format: "10333",
          pageNumber: "10333",
          isBorrow: "10333",
          price: "10333",
          describe: "10333",
          isDelete: "10333",
          typeId: "10333"
        },
        {
          journalId: "12987122",
          journalName: "好滋好味鸡蛋仔",
          journalImg: "江浙小吃、小吃零食",
          author: "荷兰优质淡奶，奶香浓而不腻",
          journalLevel: "上海市普陀区真北路",
          journalJoinTime: "王小虎夫妻店",
          publishTime: "10333",
          reelNumber: 111,
          issue: "10333",
          totalIssue: "10333",
          cn: "10333",
          isbn: "10333",
          issn: "10333",
          publicationCycle: "10333",
          publishingHouse: "10333",
          host: "10333",
          isForeign: 1,
          publishingArea: "10333",
          jounalLanguage: "10333",
          foreignCodes: "10333",
          domesticCode: "10333",
          format: "10333",
          pageNumber: "10333",
          isBorrow: "10333",
          price: "10333",
          describe: "10333",
          isDelete: "10333",
          typeId: "10333"
        },
        {
          journalId: "12987122",
          journalName: "好滋好味鸡蛋仔",
          journalImg: "江浙小吃、小吃零食",
          author: "荷兰优质淡奶，奶香浓而不腻",
          journalLevel: "上海市普陀区真北路",
          journalJoinTime: "王小虎夫妻店",
          publishTime: "10333",
          reelNumber: 111,
          issue: "10333",
          totalIssue: "10333",
          cn: "10333",
          isbn: "10333",
          issn: "10333",
          publicationCycle: "10333",
          publishingHouse: "10333",
          host: "10333",
          isForeign: 1,
          publishingArea: "10333",
          jounalLanguage: "10333",
          foreignCodes: "10333",
          domesticCode: "10333",
          format: "10333",
          pageNumber: "10333",
          isBorrow: "10333",
          price: "10333",
          describe: "10333",
          isDelete: "10333",
          typeId: "10333"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    dateFormat: function(row, column,cellValue, index) {
      
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
    }
  },
  mounted() {
    getJournals()
      .then(response => {
        this.tableData = response.list;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>