<template>
  <div id="fair-add-dialog">
    <el-dialog title="添加书展信息" :visible.sync="addDialogValue.addDialogVisible">
      <el-form :model="addFormValue" ref="fairAddForm" :rules="addRules">
        <el-form-item label="书展名称" :label-width="formLabelWidth" prop="fairName">
          <el-input v-model="addFormValue.fairName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="书展主题" :label-width="formLabelWidth" prop="fairTheme">
          <el-input v-model="addFormValue.fairTheme" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="书展时间" :label-width="formLabelWidth" prop="journalDate">
          <el-date-picker
            v-model="addFormValue.journalDate"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="书展地点" :label-width="formLabelWidth" prop="fairSite">
          <el-input v-model="addFormValue.fairSite" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="主办方" :label-width="formLabelWidth" prop="fairHost">
          <el-input v-model="addFormValue.fairHost" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="赞助商" :label-width="formLabelWidth" prop="sponsor">
          <el-input v-model="addFormValue.sponsor" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="承办者" :label-width="formLabelWidth" prop="organizer">
          <el-input v-model="addFormValue.organizer" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="书展海报" :label-width="formLabelWidth" prop="fimg">
          <el-input v-model="addFormValue.fimg" class="hide"></el-input>
          <el-upload
            ref="fairUpload"
            class="upload-demo"
            :data="uploadData"
            :auto-upload="false"
            :on-change="handleChange"
            :on-exceed="onExceed"
            :on-error="onError"
            :on-success="onSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
            list-type="picture"
            accept=".jpg, .jpeg, .png"
            action="http://127.0.0.1:8888/jm-fair/journal-fair/upload/fairimg"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb，只允许上传一张</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth" prop="fairDescribe">
          <tinymce ref="tinymce" v-model="addFormValue.fairDescribe" :height="200" id='tinymce'/>
        </el-form-item>

        <el-form-item label="是否已删除" :label-width="formLabelWidth" prop="isDelete">
          <el-switch v-model="addFormValue.isDelete" :disabled="true"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogValue.addDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addJournalFairSubmit()" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
#fair-add-dialog .hide {
  display: none;
}
</style>

<script>
import Tinymce from "@/components/Tinymce";

export default {
  props: ["addDialogValue"],
  components: { Tinymce },
  data() {
    return {
      formLabelWidth: "100px",
      addFormValue: {
        fairName: "",
        fairTheme: "",
        fairSite: "",
        fairStartTime: "",
        fairEndTime: "",
        fairHost: "",
        sponsor: "",
        organizer: "",
        isDelete: false,
        fairDescribe: "",
        fimg: "",
        journalDate: []
      },
      addRules: {
        fairName: [
          { required: true, message: "请输入书展名称", trigger: "blur" }
        ],
        fairTheme: [
          { required: true, message: "请输入书展主题", trigger: "blur" }
        ],
        fairSite: [
          { required: true, message: "请输入书展地点", trigger: "blur" }
        ],
        fairHost: [
          { required: true, message: "请输入主办方名称", trigger: "blur" }
        ],
        sponsor: [
          { required: true, message: "请输入赞助商名称", trigger: "blur" }
        ],
        organizer: [
          { required: true, message: "请输入承办商名称", trigger: "blur" }
        ],

        fairDescribe: [
          { required: true, message: "请输入书展描述", trigger: "blur" }
        ],
        fimg: [{ required: true, message: "请选择图片", trigger: "change" }],
        journalDate: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      },
      uploadData: {
        fairInformationId: ""
      },
      fileList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + Number(3600 * 1000 * 24 * 7));
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + Number(3600 * 1000 * 24 * 30));
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + Number(3600 * 1000 * 24 * 90));
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    addJournalFairSubmit() {
      this.$refs["fairAddForm"].validate(valid => {
        if (valid) {
          this.addFormValue.fairStartTime = this.addFormValue.journalDate[0];
          this.addFormValue.fairEndTime = this.addFormValue.journalDate[1];
          this.$emit("addJournalFairSubmit", this.addFormValue);
         
        } else {
          return false;
        }
      });
    },
    handleChange(file, fileList) {
      const isLt500K = file.size / 1024 / 1024 < 0.5;
      if (!isLt500K) {
        this.$message.error("上传头像图片大小不能超过500k!");
        this.$refs.fairUpload.clearFiles();
      } else {
        this.addFormValue.fimg = file.name;
      }
    },
    handleRemove(file, fileList) {
      this.addFormValue.fimg = "";
    },
    onExceed(files, fileList) {
      this.$notify.error({
        title: "错误",
        duration: 4500,
        message: "超出上传限制最大图片数"
      });
    },
    onSuccess(response, file, fileList) {
      if (response.val == 1) {
        this.$refs.fairUpload.clearFiles();
        this.$emit("getJournalFairs","add");
      }
    },
    onError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        duration: 4500,
        message: "上传图片失败" + err
      });
    }
  },
  watch: {
    "addDialogValue.addDialogVisible": {
      handler(newValue) {
        if (newValue == false) {
          this.$refs.fairAddForm.clearValidate();
        }
      }
    }
  }
};
</script>