<template>
    <div class="app-container">
        <div class="filter-container">                      
            <!-- <el-input v-model="speedAlarmQuery.att1" placeholder="号牌号码" style="width: 120px;" class="filter-item"/>
            <el-input v-model="speedAlarmQuery.att2" placeholder="车辆分类" style="width: 120px;" class="filter-item"/>    
            <el-input v-model="speedAlarmQuery.att4" placeholder="号牌颜色" style="width: 120px;" class="filter-item"/>
            <el-input v-model="speedAlarmQuery.att5" placeholder="违法时间" style="width: 120px;" class="filter-item"/>
            <el-input v-model="speedAlarmQuery.att6" placeholder="违法地点" style="width: 120px;" class="filter-item"/>
            <el-input v-model="speedAlarmQuery.att7" placeholder="车辆类型" style="width: 120px;" class="filter-item"/>
            <el-input v-model="speedAlarmQuery.att8" placeholder="车辆颜色" style="width: 120px;" class="filter-item"/>  
            <el-input v-model="speedAlarmQuery.att10" placeholder="名称" style="width: 120px;" class="filter-item"/>
            <el-input v-model="speedAlarmQuery.att11" placeholder="限速" style="width: 120px;" class="filter-item"/>
            <el-input v-model="speedAlarmQuery.att12" placeholder="违法行为代码" style="width: 120px;" class="filter-item"/>
            <el-input v-model="speedAlarmQuery.att15" placeholder="布控开始时间" style="width: 120px;" class="filter-item"/>
            <el-input v-model="speedAlarmQuery.att16" placeholder="结束时间" style="width: 120px;" class="filter-item"/> -->
            <el-input v-model="speedAlarmQuery.att17" placeholder="是否布控" style="width: 120px;" class="filter-item"/>       
            <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleQueryByPage">查询</el-button>
            <!-- <el-button  :loading="downloadLoading" class="filter-item" type="primary" icon="excel" @click="handleDownload">导出</el-button> -->
            <!-- <el-button class="filter-item" type="primary" @click="handleAddSpeedAlarm">新增</el-button> -->
            <!-- <el-button class="filter-item" type="primary" @click="handleEditSpeedAlarm">编辑</el-button> -->
            <el-button class="filter-item" type="primary" @click="showSpeedAlarmInfo">查看</el-button>
            <!-- <el-button class="filter-item" type="danger" @click="handleBatchDeleted">删除</el-button> -->
        </div>
        <el-table :data="speedAlarmsList"
                  @selection-change="handleSelectionChange"
                  style="width: 100%;margin-top:30px;"
                  border
                  ref="serveTable"
                  v-loading="listLoading"
                  @row-click="rowClick"
                  :row-style="rowStyle"
                  :row-class-name="rowClassName">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
             <el-table-column align="center" label="序号" width="120">
                 <template slot-scope="{row}">
                     {{ row.id }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="号牌号码" width="120">
                 <template slot-scope="{row}">
                     {{ row.att1 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车辆分类" width="120">
                 <template slot-scope="{row}">
                     {{ row.att2 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="号牌种类" width="120">
                 <template slot-scope="{row}">
                     {{ row.att3 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="号牌颜色" width="120">
                 <template slot-scope="{row}">
                     {{ row.att4 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="违法时间" width="120">
                 <template slot-scope="{row}">
                     {{ row.att5 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="违法地点" width="120">
                 <template slot-scope="{row}">
                     {{ row.att6 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车辆类型" width="120">
                 <template slot-scope="{row}">
                     {{ row.att7 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车辆颜色" width="120">
                 <template slot-scope="{row}">
                     {{ row.att8 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="实际值" width="120">
                 <template slot-scope="{row}">
                     {{ row.att18 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="抓拍值" width="120">
                 <template slot-scope="{row}">
                     {{ row.att9 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="名称" width="120">
                 <template slot-scope="{row}">
                     {{ row.att10 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="限速" width="120">
                 <template slot-scope="{row}">
                     {{ row.att11 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="违法行为代码" width="120">
                 <template slot-scope="{row}">
                     {{ row.att12 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="名称" width="120">
                 <template slot-scope="{row}">
                     {{ row.att13 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="罚款金额" width="120">
                 <template slot-scope="{row}">
                     {{ row.att14 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="布控开始时间" width="120">
                 <template slot-scope="{row}">
                     {{ row.att15 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="结束时间" width="120">
                 <template slot-scope="{row}">
                     {{ row.att16 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="是否布控" width="120">
                 <template slot-scope="{row}">
                     {{ row.att17 }}
                 </template>
             </el-table-column>
        </el-table>
        <el-pagination
                :current-page="speedAlarmQuery.current"
                :page-sizes="[10, 20, 50, 100, 1000]"
                :page-size="speedAlarmQuery.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @pagination="handleQueryByPage"
        />
        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :fullscreen="true">
            <div style="width:50%;margin:0px auto">
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="6"><div class="grid-content bg-purple">
                    <img
                    style="width:100%;"
                    :src="require('../../assets/images/weigui1.jpg')">    
                    </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple-light">
                    <img
                    style="width:100%;"
                    :src="require('../../assets/images/weigui2.jpg')">       
                    </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">
                    <img
                    style="width:100%;"
                    :src="require('../../assets/images/weigui3.jpg')">       
                    </div></el-col>
                </el-row>
            </div>
            <div style="width:50%;margin:0px auto">
            <el-form :model="speedAlarm" label-width="80px" label-position="left">
                <el-form-item label="号牌号码">
                    <el-input v-model="speedAlarm.att1" placeholder="号牌号码" />
                </el-form-item>
                <el-form-item label="车辆分类">
                    <el-input v-model="speedAlarm.att2" placeholder="车辆分类" />
                </el-form-item>
                <el-form-item label="号牌种类">
                    <el-input v-model="speedAlarm.att3" placeholder="号牌种类" />
                </el-form-item>
                <el-form-item label="号牌颜色">
                    <el-input v-model="speedAlarm.att4" placeholder="号牌颜色" />
                </el-form-item>
                <el-form-item label="违法时间">
                    <el-input v-model="speedAlarm.att5" placeholder="违法时间" />
                </el-form-item>
                <el-form-item label="违法地点">
                    <el-input v-model="speedAlarm.att6" placeholder="违法地点" />
                </el-form-item>
                <el-form-item label="车辆类型">
                    <el-input v-model="speedAlarm.att7" placeholder="车辆类型" />
                </el-form-item>
                <el-form-item label="车辆颜色">
                    <el-input v-model="speedAlarm.att8" placeholder="车辆颜色" />
                </el-form-item>
                <el-form-item label="实际值">
                    <el-input v-model="speedAlarm.att18" placeholder="实际值" />
                </el-form-item>
                <el-form-item label="抓拍值">
                    <el-input v-model="speedAlarm.att9" placeholder="抓拍值" />
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="speedAlarm.att10" placeholder="名称" />
                </el-form-item>
                <el-form-item label="限速">
                    <el-input v-model="speedAlarm.att11" placeholder="限速" />
                </el-form-item>
                <el-form-item label="违法行为代码">
                    <el-input v-model="speedAlarm.att12" placeholder="违法行为代码" />
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="speedAlarm.att13" placeholder="名称" />
                </el-form-item>
                <el-form-item label="罚款金额">
                    <el-input v-model="speedAlarm.att14" placeholder="罚款金额" />
                </el-form-item>
                <el-form-item label="布控开始时间">
                    <el-input v-model="speedAlarm.att15" placeholder="布控开始时间" />
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-input v-model="speedAlarm.att16" placeholder="结束时间" />
                </el-form-item>
                <el-form-item label="是否布控">
                    <el-input v-model="speedAlarm.att17" placeholder="是否布控" />
                </el-form-item>               
            </el-form>
            <div style="text-align:center;">
                <el-button type="danger" @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { deepClone,parseTime } from '@/utils'
    import waves from '@/directive/waves'  
    import Pagination from '@/components/Pagination'
    import { queryByPage, getSpeedAlarm, getSpeedAlarms, addSpeedAlarm, updateSpeedAlarm, deleteSpeedAlarm,batchDeleted,batchCreateOrUpdate} from '@/api/speedalarm'

    export default {
        data() {
            return {
                speedAlarm: {},
                speedAlarms: [],
                speedAlarmsList: [],
                speedAlarmQuery:{
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
            showSpeedAlarmInfo(row){

                if ((row && row.hasOwnProperty('id')) || this.multipleSelection.length === 1) {                    
                    this.dialogTitle = "查看超速报警表"
                    this.dialogVisible = true
                    this.inputDisabled = true
                    this.dialogType = "show"
                    getSpeedAlarm(this.multipleSelection[0].id).then((response) =>{
                        this.speedAlarm = response
                    });
                }else{
                    this.$message.error('请选择一条数据')
                    return
                }
            },
            getSpeedAlarm(){
                getSpeedAlarm().then(response => {
                    this.speedAlarm = response
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
                queryByPage(this.speedAlarmQuery).then(response => {
                    this.speedAlarmsList = response.records
                    this.total = response.total
                    this.listLoading = false
                })
            },
            handleSizeChange: function(size) {
                this.listLoading = true
                this.speedAlarmQuery.size = size
                this.handleQueryByPage()
            },
            handleCurrentChange: function(currentPage) {
                this.listLoading = true
                this.speedAlarmQuery.current = currentPage
                this.handleQueryByPage()
            },
            handleDownload(){
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['主键','号牌号码','车辆分类','号牌种类','号牌颜色','违法时间','违法地点','车辆类型','车辆颜色','实际值','抓拍值','名称','限速','违法行为代码','名称','罚款金额','布控开始时间','结束时间','是否布控','创建人','创建人姓名','创建时间','更新人','更新人姓名','更新时间','乐观锁','删除标识字段','删除标识字段']
                    const filterVal = ['id','att1','att2','att3','att4','att5','att6','att7','att8','att18','att9','att10','att11','att12','att13','att14','att15','att16','att17','createBy','createName','createDate','updateBy','updateName','updateDate','objectVersionNumber','isDeleted','isDeleted']
                    const data = this.formatJson(filterVal)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: '超速报警表'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.speedAlarmsList.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            handleAddSpeedAlarm() {
                this.dialogType = 'new'
                this.dialogTitle = "新增超速报警表"
                this.dialogVisible = true
                this.speedalarm = {};
            },
            handleEditSpeedAlarm() {
                if (this.multipleSelection.length == 0) {
                    this.$message.error("请选择要编辑的数据！");
                    return;
                } else if (this.multipleSelection.length >= 2) {
                    this.$message.warning("只能编辑一条数据");
                    return;
                }
                this.dialogType = 'edit'
                this.dialogTitle = "编辑超速报警表"
                this.dialogVisible = true
                this.speedAlarm = this.multipleSelection[0];
                var row = this.speedAlarm
                getSpeedAlarm(row.id).then(response => {
                    this.speedAlarm = response
                })
            },
            async confirm() {
                const isEdit = this.dialogType === 'edit'
                this.dialogVisible = false
                if(this.dialogType === 'new'){
                    addSpeedAlarm(this.speedAlarm).then(response => {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                        this.handleQueryByPage()
                    })
                }else if(this.dialogType === 'edit'){
                    updateSpeedAlarm(this.speedAlarm).then(response => {
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

