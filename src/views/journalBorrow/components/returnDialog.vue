<template>
  <div>
    <el-dialog title="归还杂志" :visible.sync="returnDialogValue.returnFormVisible" :close-on-click-modal="false">
      <span style="line-height:40px;">
        用户归还杂志逾期
        <strong>{{returnDialogValue.overDay}}</strong>天，需缴纳罚金
        <strong>{{returnDialogValue.penalty}}</strong>元
      </span>
      <el-form :model="returnFormValue">
        <el-form-item label="缴纳罚金">
          <el-switch v-model="returnFormValue.isPayment"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="returnDialogValue.returnFormVisible = false" size="small">取 消</el-button>
        <el-button
          type="primary"
          @click="returnSubmit"
          size="small"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["returnDialogValue"],
  data() {
    return {
      returnFormValue: {
        isPayment: false
      }
    };
  },
  methods: {
      returnSubmit(){
          this.$emit("returnSubmit",this.returnFormValue.isPayment);
          this.returnFormValue.isPayment=false;
      }
  },
  watch: {}
};
</script>