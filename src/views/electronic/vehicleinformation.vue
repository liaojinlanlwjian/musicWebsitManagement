<template>
    <div class="app-container">
        <div class="filter-container">
            <!-- <el-input v-model="vehicleinformationQuery.att16" placeholder="车牌号" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att17" placeholder="车辆品牌" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att18" placeholder="车辆型号" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att19" placeholder="车辆类型" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att20" placeholder="车辆颜色" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att21" placeholder="载重(吨)" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att22" placeholder="座位数" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att1" placeholder="车辆油耗(升/百公里)" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att2" placeholder="初始里程(公里)" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att3" placeholder="发动机号" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att4" placeholder="车架号" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att5" placeholder="供应商" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att6" placeholder="购入价格(元)" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att7" placeholder="购入时间" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att8" placeholder="驾史员" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att9" placeholder="所属部门" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att10" placeholder="当前状态" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att11" placeholder="所属车主" style="width: 120px;" class="filter-item"/>
            <el-input v-model="vehicleinformationQuery.att12" placeholder="车主电话" style="width: 120px;" class="filter-item"/> -->
            <el-input v-model="vehicleinformationQuery.att13" placeholder="所属车队" style="width: 120px;" class="filter-item"/>   
            <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleQueryByPage">查询</el-button>
            <el-button  :loading="downloadLoading" class="filter-item" type="primary" icon="excel" @click="handleDownload">导出</el-button>
            <el-button class="filter-item" type="primary" @click="handleAddVehicleInformation">新增</el-button>
            <el-button class="filter-item" type="primary" @click="handleEditVehicleInformation">编辑</el-button>
            <el-button class="filter-item" type="primary" @click="showVehicleInformationInfo">查看</el-button>
            <el-button class="filter-item" type="danger" @click="handleBatchDeleted">删除</el-button>
        </div>
       
        <el-table :data="vehicleinformationsList"
                  @selection-change="handleSelectionChange"
                  style="width: 100%;margin-top:30px;"
                  border
                  ref="serveTable"
                  v-loading="listLoading"
                  @row-click="rowClick"
                  :row-style="rowStyle"
                  :row-class-name="rowClassName"
                  >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
             <el-table-column align="center" label="序号" width="120">
                 <template slot-scope="{row}">
                     {{ row.id }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车牌号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att16 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车辆品牌" width="120">
                 <template slot-scope="{row}">
                     {{ row.att17 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车辆型号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att18 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车辆类型" width="120">
                 <template slot-scope="{row}">
                     {{ row.att19 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车辆颜色" width="120">
                 <template slot-scope="{row}">
                     {{ row.att20 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="载重(吨)" width="120">
                 <template slot-scope="{row}">
                     {{ row.att21 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="座位数" width="120">
                 <template slot-scope="{row}">
                     {{ row.att22 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车辆油耗(升/百公里)" width="120">
                 <template slot-scope="{row}">
                     {{ row.att1 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="初始里程(公里)" width="120">
                 <template slot-scope="{row}">
                     {{ row.att2 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="发动机号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att3 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车架号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att4 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="供应商" width="120">
                 <template slot-scope="{row}">
                     {{ row.att5 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="购入价格(元)" width="120">
                 <template slot-scope="{row}">
                     {{ row.att6 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="购入时间" width="120">
                 <template slot-scope="{row}">
                     {{ row.att7 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="驾史员" width="120">
                 <template slot-scope="{row}">
                     {{ row.att8 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="所属部门" width="120">
                 <template slot-scope="{row}">
                     {{ row.att9 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="当前状态" width="120">
                 <template slot-scope="{row}">
                     {{ row.att10 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="所属车主" width="120">
                 <template slot-scope="{row}">
                     {{ row.att11 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车主电话" width="120">
                 <template slot-scope="{row}">
                     {{ row.att12 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="所属车队" width="120">
                 <template slot-scope="{row}">
                     {{ row.att13 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="是否停用" width="120">
                 <template slot-scope="{row}">
                     {{ row.att14 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="备注" width="120">
                 <template slot-scope="{row}">
                     {{ row.att15 }}
                 </template>
             </el-table-column>
        </el-table>
         <el-pagination
                :current-page="vehicleinformationQuery.current"
                :page-sizes="[10, 20, 50, 100, 1000]"
                :page-size="vehicleinformationQuery.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @pagination="handleQueryByPage"
        /> 
        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :fullscreen="true">
             <el-tabs v-model="activeName" type="card" >
                <el-tab-pane label="基本信息" name="first"> <div style="width:50%;margin:0px auto" >
                <el-form :model="vehicleInformation" label-width="160px" label-position="left">    
                    <el-row :gutter="20">
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-form-item label="车牌号">
                        <el-input v-model="vehicleInformation.att16" placeholder="车牌号" />
                        </el-form-item>
                        <el-form-item label="车辆品牌">
                            <el-input v-model="vehicleInformation.att17" placeholder="车辆品牌" />
                        </el-form-item>
                        <el-form-item label="车辆型号">
                            <el-input v-model="vehicleInformation.att18" placeholder="车辆型号" />
                        </el-form-item>
                        <el-form-item label="车辆类型">
                            <el-input v-model="vehicleInformation.att19" placeholder="车辆类型" />
                        </el-form-item>
                        <el-form-item label="车辆颜色">
                            <el-input v-model="vehicleInformation.att20" placeholder="车辆颜色" />
                        </el-form-item>
                        <el-form-item label="载重(吨)">
                            <el-input v-model="vehicleInformation.att21" placeholder="载重(吨)" />
                        </el-form-item>
                        <el-form-item label="座位数">
                            <el-input v-model="vehicleInformation.att22" placeholder="座位数" />
                        </el-form-item>
                        <el-form-item label="驾史员">
                        <el-input v-model="vehicleInformation.att8" placeholder="驾史员" />
                        </el-form-item>
                        <el-form-item label="所属部门">
                            <el-input v-model="vehicleInformation.att9" placeholder="所属部门" />
                        </el-form-item>
                        <el-form-item label="当前状态">
                            <el-input v-model="vehicleInformation.att10" placeholder="当前状态" />
                        </el-form-item>
                        <el-form-item label="所属车主">
                            <el-input v-model="vehicleInformation.att11" placeholder="所属车主" />
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-form-item label="车辆油耗(升/百公里)">
                        <el-input v-model="vehicleInformation.att1" placeholder="车辆油耗(升/百公里)" />
                        </el-form-item>
                        <el-form-item label="初始里程(公里)">
                            <el-input v-model="vehicleInformation.att2" placeholder="初始里程(公里)" />
                        </el-form-item>
                        <el-form-item label="发动机号">
                            <el-input v-model="vehicleInformation.att3" placeholder="发动机号" />
                        </el-form-item>
                        <el-form-item label="车架号">
                            <el-input v-model="vehicleInformation.att4" placeholder="车架号" />
                        </el-form-item>
                        <el-form-item label="供应商">
                            <el-input v-model="vehicleInformation.att5" placeholder="供应商" />
                        </el-form-item>
                        <el-form-item label="购入价格(元)">
                            <el-input v-model="vehicleInformation.att6" placeholder="购入价格(元)" />
                        </el-form-item>
                        <el-form-item label="购入时间">
                            <el-input v-model="vehicleInformation.att7" placeholder="购入时间" />
                        </el-form-item>
                        <el-form-item label="车主电话">
                        <el-input v-model="vehicleInformation.att12" placeholder="车主电话" />
                        </el-form-item>
                        <el-form-item label="所属车队">
                            <el-input v-model="vehicleInformation.att13" placeholder="所属车队" />
                        </el-form-item>
                        <el-form-item label="是否停用">
                            <el-input v-model="vehicleInformation.att14" placeholder="是否停用" />
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input v-model="vehicleInformation.att15" placeholder="备注" />
                        </el-form-item>            
                    </div></el-col>
                    </el-row>           
                </el-form>
            <div style="text-align:center;" v-if="inputDisabled">
                <el-button type="danger" @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
            </div></el-tab-pane>
                <el-tab-pane label="图片资料" :disabled="picDisabled" name="second">
                     <div class="block" style="text-align:center">
                        <img
                            style="width:50%;"
                            :src="require('../../assets/images/weigui1.jpg')">
                    </div>
                </el-tab-pane>
            </el-tabs>
           
        </el-dialog>
    </div>
</template>

<script>
    import util from '@/utils/table.js'
    import { deepClone,parseTime } from '@/utils'
    import Pagination from '@/components/Pagination'
    import { queryByPage, getVehicleInformation, getVehicleInformations, addVehicleInformation, updateVehicleInformation, deleteVehicleInformation,batchDeleted,batchCreateOrUpdate} from '@/api/vehicleinformation'

    export default {
        data() {
            return {
                activeName:'first',
                inputDisabled:true,
                picDisabled:true,
                vehicleInformation: {                
                    
                },
                vehicleinformations: [],
                vehicleinformationsList: [],
                vehicleinformationQuery:{
                    size: 10,
                    current: 1,
                    optimizeCountSql: true,
                    optimizeJoinOfCountSql: true,
                    searchCount: true
                },
                dialogVisible: false,
                dialogType: 'new',
                dialogTitle:'新增',
                listLoading: false,
                total: 0,
                loading: false,
                downloadLoading: false,
                multipleSelection: [],
                checkStrictly: false
            }
        },
        // components: {
        //     Pagination
        // },
        computed: {
            routesData() {
                return this.handleQueryByPage()
            }
        },
        created() {
            this.handleQueryByPage()
        },
        methods: {
            rowStyle({ row, rowIndex }) {
                Object.defineProperty(row, "rowIndex", {
                    //给每一行添加不可枚举属性rowIndex来标识当前行
                    value: rowIndex,
                    writable: true,
                    enumerable: false,
                });
            },
            //监听row-click事件，实现选中
            rowClick(row, column, event) {
                let refsElTable = this.$refs.serveTable; // 获取表格对象
                let findRow = this.multipleSelection.find(
                    (c) => c.rowIndex == row.rowIndex
                ); //找到选中的行
                if (findRow) {
                    refsElTable.toggleRowSelection(row, false); //如过重复选中，则取消选中
                    return;
                }
                refsElTable.toggleRowSelection(row, true); // 实现选中行中选中事件
            },
            //实现选中高亮
            rowClassName({ row, rowIndex }) {
                let rowName = "",
                    findRow = this.multipleSelection.find(
                        (c) => c.rowIndex === row.rowIndex
                    );
                if (findRow) {
                    rowName = "current-row ";
                }
                return rowName; //也可以再加上其他类名 如果有需求的话
            },
            showVehicleInformationInfo(row){

                if ((row && row.hasOwnProperty('id')) || this.multipleSelection.length === 1) {                 
                    this.dialogTitle = "查看车辆信息"
                    this.dialogVisible = true
                    this.inputDisabled = false
                    this.picDisabled = true
                    this.dialogType = "show"
                    getVehicleInformation(this.multipleSelection[0].id).then((response) =>{
                        this.vehicleInformation = response
                    });
                }else{
                    this.$message.error('请选择一条数据')
                    return
                }
            },
            getVehicleInformation(){
                getVehicleInformation().then(response => {
                    this.vehicleInformation = response
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleBatchDeleted(){
                let ids = []
                console.log(this.multipleSelection)
                if(this.multipleSelection.length == 0){
                    this.$message.error('请选择要删除的数据！');
                    return;
                }
                this.multipleSelection.forEach(row =>{
                    ids.push(row.id)
                })
                this.$confirm('确认删除?', '温馨提醒', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await batchDeleted(ids).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.handleQueryByPage()
                    })
                }).catch((err) => {
                    console.error(err)
                })
            },
            handleQueryByPage(){
                this.listLoading = true
                queryByPage(this.vehicleinformationQuery).then(response => {
                    
                    this.vehicleinformationsList = response.records
                    this.total = response.total
                    this.listLoading = false
                })
            },
            handleSizeChange: function(size) {
                this.listLoading = true
                this.vehicleinformationQuery.size = size
                this.handleQueryByPage()
            },
            handleCurrentChange: function(currentPage) {
                this.listLoading = true
                this.vehicleinformationQuery.current = currentPage
                this.handleQueryByPage()
            },
            handleDownload(){
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['主键','车牌号','车辆品牌','车辆型号','车辆类型','车辆颜色','载重(吨)','座位数','车辆油耗(升/百公里)','初始里程(公里)','发动机号','车架号','供应商','购入价格(元)','购入时间','驾史员','所属部门','当前状态','所属车主','车主电话','所属车队','是否停用','备注','创建人','创建人姓名','创建时间','更新人','更新人姓名','更新时间','乐观锁','删除标识字段','删除标识字段']
                    const filterVal = ['id','att16','att17','att18','att19','att20','att21','att22','att1','att2','att3','att4','att5','att6','att7','att8','att9','att10','att11','att12','att13','att14','att15','createBy','createName','createDate','updateBy','updateName','updateDate','objectVersionNumber','isDeleted','isDeleted']
                    const data = this.formatJson(filterVal)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: '车辆信息'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.vehicleinformationsList.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            handleAddVehicleInformation() {
                this.dialogType = 'new'
                this.dialogTitle = "新增车辆信息"
                this.dialogVisible = true
                this.picDisabled = true
                this.inputDisabled = true
                this.vehicleinformation = {};
            },
            handleEditVehicleInformation() {
                if (this.multipleSelection.length == 0) {
                    this.$message.error("请选择要编辑的数据！");
                    return;
                } else if (this.multipleSelection.length >= 2) {
                    this.$message.warning("只能编辑一条数据");
                    return;
                }
                this.dialogType = 'edit'
                this.dialogTitle = "编辑车辆信息"
                this.dialogVisible = true
                this.picDisabled = false
                this.inputDisabled = false
                this.vehicleInformation = this.multipleSelection[0];
                var row = this.vehicleInformation
                getVehicleInformation(row.id).then(response => {
                    this.vehicleInformation = response
                })
            },
            async confirm() {
                const isEdit = this.dialogType === 'edit'
                this.dialogVisible = false
                if(this.dialogType === 'new'){
                    addVehicleInformation(this.vehicleInformation).then(response => {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                        this.handleQueryByPage()
                    })
                }else if(this.dialogType === 'edit'){
                    updateVehicleInformation(this.vehicleInformation).then(response => {
                        this.$notify({
                            title: '温馨提醒',
                            dangerouslyUseHTMLString: true,
                            message: `操作成功`,
                            type: 'success'
                        })
                        this.handleQueryByPage()
                    })
                }


            }

        }
    }
</script>

