<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 24}"
        :xl="{span: 24}"
        style="margin-bottom:30px;"
      >
        <box-card :boxChartData="boxChartData"/>
      </el-col>
    </el-row>
    <panel-group :groupChartData="groupChartData"/>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import BoxCard from "./components/BoxCard";
import { userChart } from "@/api/user";
import { journalChart } from "@/api/journalDetail";
import { borrowChart } from "@/api/borrow.js";
import { fairChart } from "@/api/journalFair";


export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,

    BoxCard
  },
  data() {
    return {
      groupChartData: [0,0,0,0],
      boxChartData: [0,0,0]
    };
  },
  methods: {},
  mounted() {
    userChart()
      .then(res => {
        let a = res.str.split(",");
        this.$set(this.groupChartData,0,Number(a[0]));
      
        this.$set(this.boxChartData,0, Number(((Number(a[1]) / Number(a[0])) * 100).toFixed(0)));
      })
      .catch(error => {
        this.groupChartData[0] = 0;
        this.boxChartData[0] = 0;
      });
    journalChart()
      .then(res => {
        let a = res.str.split(",");
        this.$set(this.groupChartData,1,Number(a[0]));
        this.$set(this.boxChartData,1, Number(((Number(a[1]) / Number(a[0])) * 100).toFixed(0)));
      })
      .catch(error => {
        this.groupChartData[1] = 0;
        this.boxChartData[1] = 0;
      });

    borrowChart()
      .then(res => {
        let a = res.str.split(",");
        this.$set(this.groupChartData,2,Number(a[0]));
      })
      .catch(error => {
        this.groupChartData[2] = 0;
      });

    fairChart()
      .then(res => {
        let a = res.msg.split(",");
        this.$set(this.groupChartData,3,Number(a[0]));
        this.$set(this.boxChartData,2, Number(((Number(a[1]) / Number(a[0])) * 100).toFixed(0)));
      })
      .catch(error => {
        this.groupChartData[3] = 0;
        this.boxChartData[2] = 0;
      });
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
