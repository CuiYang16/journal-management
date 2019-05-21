<template>
  <div id="edit-dialog">
    <el-dialog
      title="编辑杂志期刊"
      :visible.sync="editDialogValue.editFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="editDialogValue.editValue" status-icon ref="editform" :rules="editRules">
        <el-form-item label="杂志期刊名称" :label-width="formLabelWidth" prop="journalName">
          <el-input v-model="editDialogValue.editValue.journalName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="杂志期刊级别" :label-width="formLabelWidth" prop="journalLevel">
          <el-select
            v-model="editDialogValue.editValue.journalLevel"
            filterable
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in journalLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="出版地区" :label-width="formLabelWidth" prop="publishingArea">
              <el-select
                v-model="editDialogValue.editValue.publishingArea"
                filterable
                placeholder="请选择"
                :disabled="editDialogValue.editValue.isForeign==true"
                clearable
              >
                <el-option
                  v-for="item in publishingAreaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.short }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label-width="formLabelWidth" prop="isForeign">
              <el-checkbox v-model="editDialogValue.editValue.isForeign">国外</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="杂志期刊语言" :label-width="formLabelWidth" prop="jounalLanguage">
          <el-select v-model="editDialogValue.editValue.jounalLanguage" placeholder="请选择" clearable>
            <el-option
              v-for="item in languageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出版周期" :label-width="formLabelWidth" prop="publicationCycle">
          <el-select
            v-model="editDialogValue.editValue.publicationCycle"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in publicationCycleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开本" :label-width="formLabelWidth" prop="format">
          <el-select
            v-model="editDialogValue.editValue.format"
            filterable
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in formatOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.desc }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入库时间" :label-width="formLabelWidth" prop="journalJoinTime">
          <el-date-picker
            v-model="editDialogValue.editValue.journalJoinTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="出版时间" :label-width="formLabelWidth" prop="publishTime">
          <el-date-picker
            v-model="editDialogValue.editValue.publishTime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="杂志作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="editDialogValue.editValue.author" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="卷号" :label-width="formLabelWidth" prop="reelNumber">
          <el-input
            v-model="editDialogValue.editValue.reelNumber"
            autocomplete="off"
            placeholder="请输入非零开头的数字!"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="期号" :label-width="formLabelWidth" prop="issue">
          <el-input
            v-model="editDialogValue.editValue.issue"
            autocomplete="off"
            placeholder="格式：2019-1/2019-11"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="总期号" :label-width="formLabelWidth" prop="totalIssue">
          <el-input
            v-model="editDialogValue.editValue.totalIssue"
            autocomplete="off"
            placeholder="请输入非零开头的数字!"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="国内统一刊号" :label-width="formLabelWidth" prop="cn">
          <el-input
            v-model="editDialogValue.editValue.cn"
            autocomplete="off"
            placeholder="格式：CN11-1111/AA或CN11-111/A"
          ></el-input>
        </el-form-item>
        <el-form-item label="国际标准书号" :label-width="formLabelWidth" prop="isbn">
          <el-input
            v-model="editDialogValue.editValue.isbn"
            autocomplete="off"
            placeholder="格式：978 0 596 52068 7或9780596520687"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="国际标准刊号" :label-width="formLabelWidth" prop="issn">
          <el-input
            v-model="editDialogValue.editValue.issn"
            autocomplete="off"
            placeholder="格式：1111-1111"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="出版社" :label-width="formLabelWidth" prop="publishingHouse">
          <el-input
            v-model="editDialogValue.editValue.publishingHouse"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="主办方" :label-width="formLabelWidth" prop="journalHost">
          <el-input v-model="editDialogValue.editValue.journalHost" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="国外代号" :label-width="formLabelWidth" prop="foreignCodes">
          <el-input
            v-model="editDialogValue.editValue.foreignCodes"
            autocomplete="off"
            placeholder="格式：M1234或M123"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="国内代号" :label-width="formLabelWidth" prop="domesticCode">
          <el-input
            v-model="editDialogValue.editValue.domesticCode"
            autocomplete="off"
            placeholder="格式：1-111"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="页数" :label-width="formLabelWidth" prop="pageNumber">
          <el-input
            v-model="editDialogValue.editValue.pageNumber"
            autocomplete="off"
            placeholder="请输入非零开头的数字!"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input
            v-model="editDialogValue.editValue.price"
            autocomplete="off"
            placeholder="格式：1或1.1或1.11!"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="类别" :label-width="formLabelWidth" prop="journalType">
          <el-cascader
            v-model="editDialogValue.editValue.journalType"
            :options="typeOptions"
            :props="props"
            change-on-select
          ></el-cascader>
        </el-form-item>

        <el-form-item label="库存量" :label-width="formLabelWidth" prop="inventory">
          <el-input-number
            v-model="editDialogValue.editValue.inventory"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="是否可借阅" :label-width="formLabelWidth" prop="isBorrow">
          <el-switch v-model="editDialogValue.editValue.isBorrow"></el-switch>
        </el-form-item>

        <el-form-item label="是否已删除" :label-width="formLabelWidth" prop="isDelete">
          <el-switch v-model="editDialogValue.editValue.isDelete"></el-switch>
        </el-form-item>

        <el-form-item label="杂志期刊封面" :label-width="formLabelWidth" prop="jimg">
          <el-input v-model="editDialogValue.editValue.jimg" class="hide"></el-input>
          <el-upload
            ref="upload"
            :data="imgData"
            :headers="headers"
            action="http://127.0.0.1:8888/jm-journal/journal-detail/upload/jounal-img"
            :file-list="fileList"
            :limit="1"
            list-type="picture"
            :auto-upload="false"
            :on-change="handleChange"
            :on-exceed="onExceed"
            :on-remove="handleRemove"
            accept=".jpg, .jpeg, .png"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，只允许上传一张</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="附加图像" :label-width="formLabelWidth" prop="journalImages">
          <el-upload
            ref="upload2"
            action="http://127.0.0.1:8888/jm-journal/journal-detail/upload/jounal-imgs"
            list-type="picture-card"
            :file-list="fileList2"
            :data="imgData"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="4"
            :on-change="handleChange2"
            :on-exceed="onExceed"
            multiple
            accept=".jpg, .jpeg, .png"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，最多允许上传四张</div>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
          <tinymce v-model="editDialogValue.editValue.description" :height="200"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogValue.editFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editSubmit" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
#edit-dialog .hide {
  display: none;
}
</style>


<script>
import Vue from "vue";
import {
  uploadJournalImg,
  getAllJournalType,
  getJournalTypeChildren
} from "@/api/journalDetail";
import { getToken } from "@/utils/auth";
import { log } from "util";
import BackToTop from "@/components/BackToTop";
import {
  validNumber,
  validPrice,
  validIssue,
  validCN,
  validIssn,
  validIsbn,
  validForeignCodes,
  validDomesticCode
} from "@/utils/validate";
import Tinymce from "@/components/Tinymce";

export default {
  props: ["editDialogValue"],
  components: { BackToTop, Tinymce },
  data() {
    const validateNumber = (rule, value, callback) => {
      if (!validNumber(value)) {
        callback(new Error("请输入非零开头的数字!"));
      } else {
        callback();
      }
    };
    const validatePrice = (rule, value, callback) => {
      if (!validPrice(value)) {
        callback(new Error("请正确输入价格(1/1.1/1.11)!"));
      } else {
        callback();
      }
    };
    const validateYM = (rule, value, callback) => {
      if (!validIssue(value)) {
        callback(new Error("请正确输入期号(2019-1/2019-11)!"));
      } else {
        callback();
      }
    };
    const validateCN = (rule, value, callback) => {
      if (!validCN(value)) {
        callback(new Error("请正确输入国内统一刊号CN11-1111/AA或CN11-111/A)!"));
      } else {
        callback();
      }
    };
    const validateIssn = (rule, value, callback) => {
      if (!validIssn(value)) {
        callback(new Error("请正确输入国际标准刊号(1111-1111)!"));
      } else {
        callback();
      }
    };
    const validateIsbn = (rule, value, callback) => {
      if (!validIsbn(value)) {
        callback(
          new Error("请正确输入国际标准书号(978 0 596 52068 7/9780596520687)!")
        );
      } else {
        callback();
      }
    };
    const validateForeignCodes = (rule, value, callback) => {
      if (!validForeignCodes(value)) {
        callback(new Error("请正确输入国外代号(M1234或M123)!"));
      } else {
        callback();
      }
    };
    const validateDomesticCode = (rule, value, callback) => {
      if (!validDomesticCode(value)) {
        callback(new Error("请正确输入国外代号(1-111)!"));
      } else {
        callback();
      }
    };
    return {
      addFormVisible: false,

      editRules: {
        journalName: [
          { required: true, message: "请输入杂志名称", trigger: "blur" }
        ],
        jimg: [
          { required: true, message: "请选择杂志封面", trigger: "change" }
        ],
        author: [
          { required: false, message: "请输入作者名称", trigger: "blur" }
        ],
        journalLevel: [
          { required: true, message: "请选择杂志级别", trigger: "change" }
        ],
        journalJoinTime: [
          { required: true, message: "请选择入库时间", trigger: "change" }
        ],
        publishTime: [
          { required: true, message: "请选择出版时间", trigger: "change" }
        ],
        reelNumber: [
          { required: false },
          { trigger: "blur", validator: validateNumber }
        ],
        issue: [{ required: true, validator: validateYM, trigger: "blur" }],
        totalIssue: [
          { required: true, trigger: "blur", validator: validateNumber }
        ],
        cn: [{ required: true, validator: validateCN, trigger: "blur" }],
        isbn: [
          { required: false },
          { validator: validateIsbn, trigger: "blur" }
        ],
        issn: [{ required: true, validator: validateIssn, trigger: "blur" }],
        publicationCycle: [
          { required: true, message: "请选择出版周期", trigger: "change" }
        ],
        publishingHouse: [
          { required: false, message: "请输入出版社", trigger: "blur" }
        ],
        journalHost: [
          { required: true, message: "请输入主办方", trigger: "blur" }
        ],
        isForeign: [
          { required: false, message: "请选择是否国外", trigger: "change" }
        ],
        publishingArea: [
          { required: true, message: "请选择地区", trigger: "change" }
        ],
        jounalLanguage: [
          { required: true, message: "请选择杂志语言", trigger: "change" }
        ],
        foreignCodes: [
          { required: false },
          { validator: validateForeignCodes, trigger: "blur" }
        ],
        domesticCode: [
          { required: false },
          { validator: validateDomesticCode, trigger: "blur" }
        ],
        format: [{ required: true, message: "请选择开本", trigger: "change" }],
        pageNumber: [
          { required: true, validator: validateNumber, trigger: "blur" }
        ],
        inventory:[{
          required: true, message: "请输入库存量", trigger: "change"
        }],
        isBorrow: [
          { required: true, message: "请选择是否可借阅", trigger: "change" }
        ],
        price: [{ required: true, validator: validatePrice, trigger: "blur" }],
        description: [
          { required: true, message: "请输入简述", trigger: "blur" }
        ],
        isDelete: [
          { required: false, message: "请选择是否已删除", trigger: "change" }
        ],
        typeId: [
          { required: false, message: "请输入选择类别", trigger: "change" }
        ],
        journalType: [
          { required: true, message: "请输入选择类别", trigger: "change" }
        ]
      },
      fileList: [],
      fileList2: [],
      imgUrl: "",
      imgData: { journalId: "" },
      dialogImageUrl: "",
      dialogVisible: false,
      journalLevelOptions: [
        { value: 1, label: "国家级期刊" },
        { value: 2, label: "省级级期刊" },
        { value: 3, label: "核心期刊" }
      ],
      publicationCycleOptions: [
        { value: 1, label: "周刊" },
        { value: 2, label: "旬刊" },
        { value: 3, label: "半月刊" },
        { value: 4, label: "月刊" },
        { value: 5, label: "双月刊" },
        { value: 6, label: "季刊" },
        { value: 7, label: "半年刊" },
        { value: 8, label: "年刊" }
      ],
      formatOptions: [
        { value: 1, label: "2开", desc: "A1" },
        { value: 2, label: "4开", desc: "A2" },
        { value: 3, label: "8开", desc: "A3" },
        { value: 4, label: "16开", desc: "A4" },
        { value: 5, label: "32开", desc: "A5" },
        { value: 6, label: "64开", desc: "A6" }
      ],
      publishingAreaOptions: [
        { value: 1, label: "北京", short: "京" },
        { value: 2, label: "天津", short: "津" },
        { value: 3, label: "河北", short: "冀" },
        { value: 4, label: "山西", short: "晋" },
        { value: 5, label: "内蒙古", short: "蒙" },
        { value: 6, label: "辽宁", short: "辽" },
        { value: 7, label: "吉林", short: "吉" },
        { value: 8, label: "黑龙江", short: "黑" },
        { value: 9, label: "上海", short: "沪" },
        { value: 10, label: "江苏", short: "苏" },
        { value: 11, label: "浙江省", short: "浙" },
        { value: 12, label: "安徽", short: "皖" },
        { value: 13, label: "福建", short: "闽" },
        { value: 14, label: "江西", short: "赣" },
        { value: 15, label: "山东", short: "鲁" },
        { value: 16, label: "河南", short: "豫" },
        { value: 17, label: "湖北", short: "鄂" },
        { value: 18, label: "湖南", short: "湘" },
        { value: 19, label: "广东", short: "粤" },
        { value: 20, label: "广西", short: "桂" },
        { value: 21, label: "海南", short: "琼" },
        { value: 22, label: "重庆", short: "渝" },
        { value: 23, label: "四川", short: "川" },
        { value: 24, label: "贵州", short: "黔" },
        { value: 25, label: "云南", short: "滇" },
        { value: 26, label: "西藏", short: "藏" },
        { value: 27, label: "陕西", short: "陕" },
        { value: 28, label: "甘肃省", short: "甘" },
        { value: 29, label: "青海", short: "青" },
        { value: 30, label: "宁夏", short: "宁" },
        { value: 31, label: "新疆", short: "新" },
        { value: 32, label: "台湾", short: "台" },
        { value: 33, label: "香港特别行政区", short: "港" },
        { value: 34, label: "澳门" }
      ],
      languageOptions: [
        { value: 1, label: "中文" },
        { value: 2, label: "英文" },
        { value: 3, label: "俄文" },
        { value: 4, label: "法文" },
        { value: 5, label: "日文" }
      ],
      headers: {},
      props: {
        value: "typeId",
        label: "typeName",
        children: "children"
      },
      typeOptions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
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
      pickerOptions2: {
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
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#000000" // 按钮的背景颜色 The background color of the button
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    editSubmit() {
      this.$refs["editform"].validate(valid => {
        if (valid) {
          this.$emit("editSubmit", this.editDialogValue.editValue);
          return true;
        } else {
          return false;
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      const isLt500K = file.size / 1024 / 1024 < 0.5;
      if (!isLt500K) {
        this.$message.error("上传头像图片大小不能超过500k!");
        this.$refs.upload.clearFiles();
      } else {
        this.editDialogValue.editValue.jimg = file.name;
      }
    },
    handleChange2(file, fileList) {
      const isLt500K = file.size / 1024 / 1024 < 0.5;
      if (!isLt500K) {
        this.$message.error("上传头像图片大小不能超过500k!");
        fileList.pop();
      }
    },

    beforeAvatarUpload(file) {
      const isLt500K = file.size / 1024 / 1024 < 0.5;
      if (!isLt500K) {
        this.$message.error("上传头像图片大小不能超过500k!");
      }
      return isLt500K;
    },
    handleRemove(file, fileList) {
      this.editDialogValue.editValue.jimg = null;
    },
    handlePreview(file) {
      console.log(file);
    },
    onExceed(files, fileList) {
      this.$notify.error({
        title: "错误",
        duration: 3500,
        message: "超出上传限制最大图片数"
      });
    },
    delChildren(options) {
      for (var i = 0; i < options.length; i++) {
        if (options[i].children.length > 0) {
          this.delChildren(options[i].children);
        } else {
          Vue.delete(options[i], "children");
        }
      }
    }
  },
  mounted() {},
  watch: {
    "editDialogValue.editFormVisible": {
      handler(newValue) {
        if (newValue === true) {
          getAllJournalType()
            .then(response => {
              this.typeOptions = response.list;
              this.delChildren(this.typeOptions);
            })
            .catch(error => {
              console.log(error);
            });
          //类别转换
          this.editDialogValue.editValue.journalType = JSON.parse(
            this.editDialogValue.editValue.journalType
          );
          this.fileList = [];
          this.fileList2 = [];
          const journalImg = this.editDialogValue.editValue.journalImg;
          if (journalImg != null && journalImg != "") {
            this.fileList.push({
              name: journalImg,
              url: require("F:/MyWorkSpace/bishe-vue/journal-door/static/journal-img/" + journalImg)
            });
          }

          if (this.editDialogValue.editValue.journalImages.length > 0) {
            this.editDialogValue.editValue.journalImages.forEach(j => {
              this.fileList2.push({
                name: j.name,
                url: require("F:/MyWorkSpace/bishe-vue/journal-door/static/journal-img/" + j.name)
              });
            });
          }
          this.$nextTick(function() {
            this.$refs.editform.clearValidate();
          });
        } else {
          this.$refs.editform.clearValidate();
        }
      }
    },
    "editDialogValue.editValue.isForeign": {
      handler(newValue) {
        if (newValue == true) {
          this.editRules.publishingArea = {
            required: false,
            message: "请选择地区",
            trigger: "change"
          };
        } else {
          this.editRules.publishingArea = {
            required: true,
            message: "请选择地区",
            trigger: "change"
          };
        }
      }
    }
  }
};
</script>