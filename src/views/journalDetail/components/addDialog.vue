<template>
  <div>
    <el-dialog title="添加杂志期刊" :visible.sync="addFormVisible">
      <el-form :model="addFormValue">
        <el-form-item label="杂志期刊名称" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.journalName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="杂志期刊封面" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.journalImg" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="杂志作者" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="杂志期刊级别" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.journalLevel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="杂志期刊入库时间" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.journalJoinTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="杂志期刊出版时间" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.publishTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="杂志期刊卷号" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.reelNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="杂志期刊期号" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.issue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="杂志期刊总期号" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.totalIssue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="国内统一刊号" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.cn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="国际标准书号" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="国际标准刊号" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.issn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版周期" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.publicationCycle" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.publishingHouse" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主办方" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.journalHost" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="国外" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.isForeign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版地区" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.publishingArea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="杂志期刊语言" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.jounalLanguage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="国外代号" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.foreignCodes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="国内代号" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.domesticCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开本" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.format" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="页数" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.pageNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可借阅" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.isBorrow" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.typeId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否已删除" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.isDelete" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="addFormValue.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addFormVisible: false,
      addFormValue: {
        journalName: "",
        journalImg: "",
        author: "",
        journalLevel: 0,
        journalJoinTime: "",
        publishTime: "",
        reelNumber: 0,
        issue: "",
        totalIssue: 0,
        cn: "",
        isbn: "",
        issn: "",
        publicationCycle: 0,
        publishingHouse: "",
        journalHost: "",
        isForeign: false,
        publishingArea: 0,
        jounalLanguage: "",
        foreignCodes: "",
        domesticCode: "",
        format: 0,
        pageNumber: "",
        isBorrow: false,
        price: 0,
        description: "",
        isDelete: false,
        typeId: ""
      }
    };
  },
  methods: {},
  mounted() {},
  watch: {}
};
</script>