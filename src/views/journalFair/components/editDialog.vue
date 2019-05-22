<template>
  <div id="fair-add-dialog">
    <el-dialog title="编辑书展信息" :visible.sync="editDialogValue.editDialogVisible">
      <el-form :model="editDialogValue.editFormValue" ref="fairEditForm" :rules="editRules">
        <el-form-item label="书展名称" :label-width="formLabelWidth" prop="fairName">
          <el-input v-model="editDialogValue.editFormValue.fairName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="书展主题" :label-width="formLabelWidth" prop="fairTheme">
          <el-input v-model="editDialogValue.editFormValue.fairTheme" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="书展时间" :label-width="formLabelWidth" prop="journalDate">
          <el-date-picker
            v-model="editDialogValue.editFormValue.journalDate"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            :default-time="['8:00:00', '18:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="书展地点" :label-width="formLabelWidth" prop="fairSite">
          <el-input v-model="editDialogValue.editFormValue.fairSite" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="主办方" :label-width="formLabelWidth" prop="fairHost">
          <el-input v-model="editDialogValue.editFormValue.fairHost" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="赞助商" :label-width="formLabelWidth" prop="sponsor">
          <el-input v-model="editDialogValue.editFormValue.sponsor" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="承办者" :label-width="formLabelWidth" prop="organizer">
          <el-input v-model="editDialogValue.editFormValue.organizer" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="书展海报" :label-width="formLabelWidth" prop="fimg">
          <el-input v-model="editDialogValue.editFormValue.fimg" class="hide"></el-input>
          <el-upload
            ref="fairUploadEdit"
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
            action="http://127.0.0.1:8888/jm-fair/journal-fair/update/fairimg"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb，只允许上传一张</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth" prop="fairDescribe">
          <tinymce
            ref="editTinymce"
            v-model="editDialogValue.editFormValue.fairDescribe"
            :height="200"
            id="edit-tinymce"
          />
        </el-form-item>

        <el-form-item label="是否已删除" :label-width="formLabelWidth" prop="isDelete">
          <el-switch v-model="editDialogValue.editFormValue.isDelete"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogValue.editDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="editJournalFairSubmit">确 定</el-button>
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
  props: ["editDialogValue"],
  components: { Tinymce },
  data() {
    return {
      formLabelWidth: "100px",

      editRules: {
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
    editJournalFairSubmit() {
      this.$refs["fairEditForm"].validate(valid => {
        if (valid) {
          this.editDialogValue.editFormValue.fairStartTime = this.editDialogValue.editFormValue.journalDate[0];
          this.editDialogValue.editFormValue.fairEndTime = this.editDialogValue.editFormValue.journalDate[1];
          this.$emit(
            "editJournalFairSubmit",
            this.editDialogValue.editFormValue
          );
        } else {
          return false;
        }
      });
    },
    handleChange(file, fileList) {
      const isLt500K = file.size / 1024 / 1024 < 0.5;
      if (!isLt500K) {
        this.$message.error("上传头像图片大小不能超过500k!");
        this.$refs.fairUploadEdit.clearFiles();
      } else {
        this.editDialogValue.editFormValue.fimg = file.name;
      }
    },
    handleRemove(file, fileList) {
      this.editDialogValue.editFormValue.fimg = "";
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
       // this.$refs.fairUploadEdit.clearFiles();
        this.$emit("getJournalFairs","edit");
      }
    },
    onError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        duration: 4500,
        message: "上传图片失败，请刷新后编辑重新上传"
      });
    }
  },
  watch: {
    "editDialogValue.editDialogVisible": {
      handler(newValue) {
        if (newValue == false) {
          this.$refs.fairEditForm.clearValidate();
        } else {
          this.fileList = [
            {
              name: this.editDialogValue.editFormValue.fairImg,
              url: require("F:/MyWorkSpace/bishe-vue/journal-door/static/fair-img/" +
                this.editDialogValue.editFormValue.fairImg)
            }
          ];
        }
      }
    }
  }
};
</script>