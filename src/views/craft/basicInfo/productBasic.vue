/*
 * @Author:danqihao
 * @Date: 2018-04-08 17:43:48 
 * @Last Modified by: danqihao
 * @Last Modified time: 2018-04-16 19:06:15
 */

<template>
  <section>
    <el-row :gutter="20" class="toolbar">
        <el-col :span="12" >
            <el-button type="primary" size="medium" icon="el-icon-circle-plus" @click="addMaterial">新增</el-button>
            <el-button type="primary" size="medium" icon="el-icon-circle-plus" @click='productTypeManage'>成品类型管理</el-button>
        </el-col>
        <el-col :span="4" > 
            <el-select  placeholder="请选择类型" size="medium" @change="getTypeBasic()"  v-model="typeReq.productTypeId">
                <el-option  value="" label="全部类型"  size="medium"> </el-option>
                <el-option  v-for="(val,index) in productTypes" 
                :value="val.product_model_type_id"
                :key="index" 
                :label="val.product_type_name" 
                size="medium">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="4" > 
            <el-select  placeholder="请选择类型" size="medium" @change="search()" v-model="req.status">
                <el-option  value="0" label="启用" size="medium" ></el-option>
                <el-option  value="1" label="弃用" size="medium"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
            <el-input placeholder="请输入内容"  size="medium" v-model="req.keyWord" @keyup.native.enter="search()">
                <el-button slot="append" icon="el-icon-search" @click="search()" ></el-button>
            </el-input>
        </el-col>
    </el-row>
    <el-table :data="dataList"  style="width: 100%"  border>
        <el-table-column  type="index" >  </el-table-column>
        <el-table-column   label="成品名称"   prop="product_model_name">  </el-table-column>
        <el-table-column   label="成品编号"   prop="product_model_number">  </el-table-column>
        <el-table-column   label="型号"   prop="product_model_genre">  </el-table-column>
        <el-table-column   label="类型"> 
            <template slot-scope="scope"  >
                <el-select  placeholder="请选择类型" size="medium" :value="scope.row.product_model_type_id" disabled>
                    <el-option  v-for="(val,index) in productTypes" 
                    :value="val.product_model_type_id"
                    :key="index" 
                    :label="val.product_type_name" 
                    size="medium">
                    </el-option>
                </el-select>
            </template>
         </el-table-column>
        <el-table-column   label="单位"   prop="product_model_unit">  </el-table-column>
        <el-table-column   label="编辑"   prop=""  width="200"> 
            <template slot-scope="scope"  >
                <el-button size="small" icon="el-icon-view" @click="lookDetail(scope.row)" type="primary">详情</el-button>
                <el-button size="small" icon="el-icon-delete" @click="changeStatus(scope.row.product_model_id)" type="danger" v-if="scope.row.product_model_status == 0 ">弃用</el-button>
                <el-button size="small" icon="el-icon-delete" @click="changeStatus(scope.row.product_model_id)" type="primary" v-else>启用</el-button>
            </template>    
        </el-table-column>
    </el-table>
    <el-row>
        <el-col class="text-right">
            <el-pagination @current-change="handleCurrentChange" background  layout="total,prev,pager,next" :current-page="currenPage" :page-size="pagesize" :total=lines></el-pagination>
        </el-col>
    </el-row>

    <!--新增 start-->
    <el-dialog :visible.sync="visible.addForm" :close-on-click-modal="false" width="50%">
        <span slot="title" class="el-dialog__title">新增成品信息</span>
        <el-form :model="form" label-width="100px" :rules="rules" ref="form"   class="clearfix" size="small">
            <el-col :span="12">
                <el-form-item label="成品名称:" prop="modelName">
                    <el-input  auto-complete="off" size="medium" clearable placeholder="请输入内容(必填)"  v-model="form.modelName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="成品类型:" prop="typeId">
                    <el-select  placeholder="请选择类型" size="medium"   v-model="form.typeId">
                        <el-option  v-for="(val,index) in productTypes" 
                        :value="val.product_model_type_id"
                        :key="index" 
                        :label="val.product_type_name" 
                        size="medium">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="成品型号:" prop="modelGenre">
                    <el-input  auto-complete="off" size="medium" clearable placeholder="请输入内容(必填)" v-model="form.modelGenre"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="成品编号:" prop="modelNumber">
                    <el-input  auto-complete="off" size="medium" clearable placeholder="请输入内容(必填)" v-model="form.modelNumber"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="成品单位:" prop="modelUnit">
                    <el-input  auto-complete="off" size="medium" clearable placeholder="请输入内容(必填)" v-model="form.modelUnit"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="额定电压:" prop="ratedVoltage" class = "width">
                    <el-input placeholder="请输入内容" v-model="form.ratedVoltage" class="input-with-select" size="medium">
                        <el-select  slot="append" v-model="form.ratedVoltageUnit"   placeholder="请选择" class="input-with-select w_100">
                            <el-option  v-for="(val,index) in voltageUnit" 
                                :value="val"
                                :key="index" 
                                :label="val" 
                                size="medium">
                            </el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="开路电压:" prop="openVoltage" class = "width">
                    <el-input placeholder="请输入内容" v-model="form.openVoltage" class="input-with-select" size="medium">
                        <el-select  slot="append" v-model="form.openVoltageUnit"   placeholder="请选择" class="input-with-select w_100">
                            <el-option  v-for="(val,index) in voltageUnit" 
                                :value="val"
                                :key="index" 
                                :label="val" 
                                size="medium">
                            </el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="电池内阻:" prop="resistance" class = "width">
                    <el-input placeholder="请输入内容" v-model="form.resistance" class="input-with-select" size="medium">
                        <el-select  slot="append" v-model="form.resistanceUnit"   placeholder="请选择" class="input-with-select w_100">
                            <el-option  v-for="(val,index) in resistanceUnit" 
                                :value="val"
                                :key="index" 
                                :label="val" 
                                size="medium">
                            </el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="电池阻抗:" prop="impedance" class = "width">
                    <el-input placeholder="请输入内容" v-model="form.impedance" class="input-with-select" size="medium">
                        <el-select  slot="append" v-model="form.impedanceUnit"   placeholder="请选择" class="input-with-select w_100">
                            <el-option  v-for="(val,index) in resistanceUnit" 
                                :value="val"
                                :key="index" 
                                :label="val" 
                                size="medium">
                            </el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="成品外形:" prop="materialUnits">
                    <el-select  placeholder="请选择外形" size="medium" @change="search()" v-model="form.modelShape">
                        <el-option  value="方形电池" label="方形电池" size="medium" ></el-option>
                        <el-option  value="软包电池" label="软包电池" size="medium"></el-option>
                        <el-option  value="圆柱电池" label="圆柱电池" size="medium"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="成品尺寸:" prop="materialUnits">
                    <el-input  size="medium"  placeholder="长" v-model="form.modelUnit" class= "w_20" v-if="form.modelShape =='方形电池' || form.modelShape =='软包电池'"></el-input>
                    <el-input  size="medium"  placeholder="长" v-model="form.modelUnit" class= "w-30" v-if="form.modelShape =='圆柱电池'"></el-input>
                    *<el-input  size="medium"  placeholder="宽" v-model="form.modelUnit" class= "w_20" v-if="form.modelShape =='方形电池' || form.modelShape =='软包电池'"></el-input>
                    <el-input  size="medium"  placeholder="直径" v-model="form.modeDiameter" class= "w-30" v-if="form.modelShape =='圆柱电池'"></el-input>
                    <span v-if="form.modelShape =='方形电池' || form.modelShape =='软包电池'">*</span>
                    <el-input  size="medium"  placeholder="高" v-model="form.modelUnit" class= "w_20"  v-if="form.modelShape =='方形电池' || form.modelShape =='软包电池'"></el-input>
                    <el-select  v-model="form.resistanceUnit" size="medium" class= "w-30 pull_right">
                        <el-option  v-for="(val,index) in resistanceUnit" 
                            :value="val"
                            :key="index" 
                            :label="val" 
                            size="medium">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="20">
            <el-form-item label="保质期(月)" prop="materialShelfLife">
                <el-input-number  :min="1" :max="120"  v-model="form.materialShelfLife"></el-input-number>
            </el-form-item>
            </el-col>
        
        
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="visible.addForm = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="visible.addLoading">提交</el-button>
        </div>
    </el-dialog>
  </section>
</template>

<script>
    import utils from '../../../common/js/utils'
    import {queryProductModel,modifyProductModelStatus,queryProductTypeAboutModel,saveMaterialInfos,modifyMaterialInfo} from '../../../api/api' 
    import {mapGetters, mapActions} from 'vuex'


    export default {
        data () {
            return {
                req: {
                    type:"vague",
                    headNum:1,
                    status:"0",
                    keyWord:""
                },
                typeReq:{
                    type:"precise",
                    headNum:1,
                    status:"0",
                    productTypeId:""
                },
                dataList:[],
                lines:0, //条数
                currenPage:1, //当前页
                pagesize: 10,   //页码

                form:{
                    typeId: '',
                    modelName: '',
                    modelGenre: '',
                    modelNumber: '',
                    modelUnit:'',
                    ratedVoltage:'',//额定电压
                    ratedVoltageUnit:"V",//额定电压单位
                    openVoltage:'',
                    openVoltageUnit:'V',//开路电压单位
                    resistance:'',
                    resistanceUnit:'Ω',//内阻单位
                    impedance:"",
                    impedanceUnit:'Ω',//阻抗单位
                    modelShape: '方形电池',
                    modelLong:"",	 //长
                    modelWide:"",	 //宽
                    modelHigh:"",	 // 高
                    modeDiameter :"", //直径
                    modelSizeUnit:"",//产品尺寸单位
                    modelWeight:'',
                    modelWeightUnit:'',//产品重量单位
                    capacity:'',
                    capacityUnit:'',//额定容量单位
                    peculiarity: '',
                    chargeDischarge:'',
                    chargeDischargeUnit:'',//充放速率单位
                    selfDicharge:'',
                    selfDichargeUnit:'',	//自放电率单位
                    temperature:'',
                    temperatureUnit:'',	//使用温度单位
                    safety: '',
                    protection: '',
                    storageLife: '',
                    trait: '',
                    serviceableRange: '',
                    announcement: '',
                    describe: '',
                    creationStaff: '',
                    creationStaffId: '',
                },
                visible: {
                    listLoading: false,
                    addForm: true,
                    editForm: false,
                    addLoading: false,
                    editLoading: false
                },
                rules:{
                    materialName: [
                        { required: true, message: '请输入物料名称', trigger: 'blur' }
                    ],
                    materialTypeId: [
                        { required: true, message: '请选择物料类型', trigger: 'change' }
                    ],
                    materialStandard: [
                        { required: true, message: '请输入物料规格', trigger: 'blur' }
                    ],
                    materialModel: [
                        { required: true, message: '请输入物料型号', trigger: 'blur' }
                    ],
                    materialUnits: [
                        { required: true, message: '请输入物料单位', trigger: 'blur' }
                    ],
                    materialShelfLife: [
                        { required: true, message: '请输入保质期(月)', trigger: 'blur' }
                    ],
                },
                editType:""
            }
        },
        computed: {
            ...mapGetters(['productTypes','voltageUnit','currentUnit','resistanceUnit','weightUnit'
            ,'temperatureUnit','sizeUnit','rateUnit','capacityUnit'])
        },
        mounted () {
            this.initProductTypes()
            this.getBasic()
        },
        methods: {
            ...mapActions(['initProductTypes']),
            //  获取用户列表
            getBasic () {
                queryProductModel(this.req).then((data) => {
                    if (data.status === 0) {
                        this.dataList = data.map.productModels
                        this.lines = data.map.lines
                    }else{
                        this.dataList = []
                        this.lines = 0
                    }
                })
            },
            getTypeBasic () {
                this.typeReq.status =  this.req.status
                queryProductTypeAboutModel(this.typeReq).then((data) => {
                    if (data.status === 0) {
                        this.dataList = data.map.productType
                        this.lines = data.map.lines
                    }else{
                        this.dataList = []
                        this.lines = 0
                    }
                })
            },
            handleCurrentChange(val){
                if(this.typeReq.productTypeId==""){
                    this.req.headNum = (val - 1) * 10 + 1;
                    this.getBasic()
                }else{
                    this.req.headNum = (val - 1) * 10 + 1;
                    this.getTypeBasic()
                }
            
            },
            search(){
                this.req.headNum =  1;
                this.getBasic()
            },
            addMaterial () {
                this.editType ="新增"
                this.visible.addForm = true
                this.resetForm()
            },
            addSubmit(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                          this.$confirm('确定添加此条物料信息?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center:true
                        }).then(() => {
                            if(this.editType =="新增"){
                                saveMaterialInfos(
                                this.form
                                ).then((data) =>{
                                    if (data.status === 0) {
                                        this.$message({
                                            type: 'success',
                                            message: '添加成功'
                                        });
                                        this.visible.addForm = false
                                        this.getMaterials()
                                    }else{
                                        this.$message({
                                            type: 'danger',
                                            message: data.msg
                                        });
                                    }
                                })
                            }else if(this.editType =="编辑"){
                                modifyMaterialInfo(
                                this.form
                                ).then((data) =>{
                                    if (data.status === 0) {
                                        this.$message({
                                            type: 'success',
                                            message: '修改成功'
                                        });
                                        this.visible.addForm = false
                                        this.getMaterials()
                                    }else{
                                        this.$message({
                                            type: 'danger',
                                            message: data.msg
                                        });
                                    }
                                })
                            }
                           
                        })
                    } else {
                        this.$message({
                            type: 'danger',
                            message: '添加失败'
                        });
                    }
                });
            },
            changeStatus(val){
                const statusName  = this.req.status == "0"?"弃用":"启用"
                const statusType  = this.req.status == "0"?"deprecated":"recover"
                this.$confirm("确定"+statusName+"此条信息?", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center:true
                }).then(() => {
                    modifyProductModelStatus({
                        type:statusType,
                        'productModelIds[]':val
                    }).then((data) => {
                        if (data.status === 0) {
                            this.$message({
                                type: 'success',
                                message: statusName +'成功'
                            });
                            this.getBasic()
                        }else{
                            this.$message.error({message:  statusName +'失败'});
                        }
                    })
                })
            },
            lookDetail(row){
                this.$mesBasicInfoTable.show(
                '成品详情', {
                    table: {
                    props: ['成品名称:','产品编号:','成品型号:', '成品单位:', '额定电压:', '开路电压:','电池内阻:','电池抗阻:','成品外形:','成品尺寸:','成品重量:','额定容量:'
                    ,'充电特性:','充放速率:','自放电率:','使用温度:','安全性能:','环保性能:','存储寿命:','特点:','适用范围:','注意事项:','成品备注:','创建时间:','创建人员:','使用状态:'],
                    values: [row.product_model_name, row.product_model_number, row.product_model_genre, row.product_model_unit, row.product_model_rated_voltage +row.product_model_rated_voltage_unit,row.product_model_open_voltage +row.product_model_open_voltage_unit,
                        row.product_model_resistance + row.product_model_resistance_unit, row.product_model_impedance + row.product_model_impedance_unit,row.product_model_shape,
                        row.product_model_shape==="圆柱电池"?'长'+row.product_model_long +"直径"+row.product_model_diameter +row.product_model_size_unit:"长"+row.product_model_long +"宽"+row.product_model_wide  +"高"+row.product_model_high +row.product_model_size_unit ,
                        row.product_model_weight + row.product_model_weight_unit, row.product_model_capacity + row.product_model_capacity_unit,row.product_model_peculiarity,
                        row.product_model_charge_discharge + row.product_model_charge_discharge_unit, row.product_model_self_dicharge + row.product_model_self_dicharge_unit,row.product_model_temperature + row.product_model_temperature_unit,
                        row.product_model_safety,row.product_model_protection,row.product_model_storage_life,row.product_model_trait,row.product_model_serviceable_range,row.product_model_announcement,row.product_model_describe,
                        utils.formatDate.format(new Date( row.product_model_creation_time), 'yyyy-MM-dd hh:mm:ss'),row.product_model_creation_staff,row.product_model_status == "0"?"开启":"弃用"]
                    }
                })
            },
            productTypeManage(){
                this.$router.push({path: '/craft/basic/ProductType',query: {}})
            }
        

        },
        watch: {}
    }
</script>

<style scoped lang="scss">
.el-select .el-input {
    width: 130px;
}
.a .input-with-select .el-input-group__prepend {
    background-color: #fff !important;
    width: 230px !important;
}
.width .w_100{
    width: 100px;
}
.w_33{
    width: 33%;
}
.w_20{
    width: 20%;
}
.pull_left{
    float: left;
}
.pull_right{
    float: right;
}
</style>