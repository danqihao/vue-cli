<!-- 魏彬祥 2018.4.12 -->
<template>
  <section>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="line-height:36px">
          <span style="font-size:16px">基础信息</span>
          <el-button style="float: right;" type="primary" size="medium">增加项目</el-button>
      </div>
       <el-form :inline="true" :model="basicInformation" label-width="100px">
        <el-col :span=24>
          <el-form-item label="设备名称" >
            <el-select placeholder="请选择（必选）" v-model="basicInformation.planType">
              <el-option value="月度保养"></el-option>
              <el-option value="假期保养"></el-option>
              <el-option value="年度保养"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划名称" >
            <el-input  placeholder="请选择（必选）" clearable></el-input>
          </el-form-item>
           <el-form-item label="创建者" >
            <el-input  placeholder="请选择（必选）" @focus="selectStaff('creator')" clearable></el-input>
          </el-form-item>
          <el-form-item label="总负责人" >
            <el-input  placeholder="请选择（必选）" @focus="selectStaff('planPrincipal')" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </section>
</template>
<script>
export default {
  name: 'AddMaintain',
  data () {
    return {
      basicInformation: {
        planName: '',
        planNum: '',
        planType: '',
        creator: '',
        planPrincipal: '',
        createDate: ''
      },
      creatorName: '',
      planPrincipalName: '',
      projects: []
    }
  },
  methods: {
    // 选择人员
    selectStaff (type) {
      this.$mesStaff.show({
        type: 'all',
        reRender: true,
        selectedIds: []
      }).then((data) => {
        if (type === 'creator') {
          this.basicInformation.creator = data.rows[0].role_staff_id
          this.creatorName = data.rows[0].role_staff_name
        } else if (type === 'planPrincipal') {
          this.basicInformation.planPrincipal = data.rows[0].role_staff_id
          this.planPrincipalName = data.rows[0].role_staff_name
        }
      })
    }
  }
}
</script>
<style>

</style>
