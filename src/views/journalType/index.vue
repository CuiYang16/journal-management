<template>
  <div id="journal-type">

      <div class="data-table">
    <el-table :data="tableData1" style="width: 100%" row-key="id" lazy :load="load" size="mini">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    </div>
  </div>
</template>

<style scoped>
#journal-type .data-table{
    margin: 15px;
}

#journal-type .el-table {
  padding-top: 15px;
  font-size: 13px;
}
</style>


<script>
export default {
  data() {
    return {
      tableData1: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    load(tree, treeNode, resolve) {
        console.log(tree,treeNode);
        
      resolve([
        {
          id: 31,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: 32,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ]);
    }
  },
  watch: {},
  mounted() {}
};
</script>