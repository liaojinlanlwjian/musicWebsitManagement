<template>
    <div class="app-container">
        <div class="filter-container">
           
            <!-- <el-input v-model="operationrecordQuery.att1" placeholder="车辆号码" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att2" placeholder="载客开始时间" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att3" placeholder="载客结束时间" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att4" placeholder="重车里程" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att5" placeholder="空车里程" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att6" placeholder="总行驶里程" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att7" placeholder="现金收入" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att8" placeholder="卡金额" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att9" placeholder="联系电话" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att10" placeholder="报警信息" style="width: 120px;" class="filter-item"/>
            <el-input v-model="operationrecordQuery.att11" placeholder="自编号" style="width: 120px;" class="filter-item"/>
            <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleQueryByPage">查询</el-button>
            <el-button  :loading="downloadLoading" class="filter-item" type="primary" icon="excel" @click="handleDownload">导出</el-button>
            <el-button class="filter-item" type="primary" @click="handleAddOperationRecord">新增</el-button>
            <el-button class="filter-item" type="primary" @click="handleEditOperationRecord">编辑</el-button> -->
            <el-button class="filter-item" type="primary" @click="showOperationRecordInfo">查看</el-button>
            <el-button class="filter-item" type="danger" @click="handleBatchDeleted">删除</el-button>
        </div>
        <el-table :data="operationrecordsList"
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
             <el-table-column align="center" label="车辆号码" width="120">
                 <template slot-scope="{row}">
                     {{ row.att1 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="载客开始时间" width="120">
                 <template slot-scope="{row}">
                     {{ row.att2 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="载客结束时间" width="120">
                 <template slot-scope="{row}">
                     {{ row.att3 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="重车里程" width="120">
                 <template slot-scope="{row}">
                     {{ row.att4 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="空车里程" width="120">
                 <template slot-scope="{row}">
                     {{ row.att5 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="总行驶里程" width="120">
                 <template slot-scope="{row}">
                     {{ row.att6 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="现金收入" width="120">
                 <template slot-scope="{row}">
                     {{ row.att7 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="卡金额" width="120">
                 <template slot-scope="{row}">
                     {{ row.att8 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="联系电话" width="120">
                 <template slot-scope="{row}">
                     {{ row.att9 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="报警信息" width="120">
                 <template slot-scope="{row}">
                     {{ row.att10 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="自编号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att11 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="创建人" width="120">
                 <template slot-scope="{row}">
                     {{ row.createBy }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="创建人姓名" width="120">
                 <template slot-scope="{row}">
                     {{ row.createName }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="创建时间" width="200">
                 <template slot-scope="{row}">
                     {{ row.createDate }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="更新人" width="120">
                 <template slot-scope="{row}">
                     {{ row.updateBy }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="更新人姓名" width="120">
                 <template slot-scope="{row}">
                     {{ row.updateName }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="更新时间" width="200">
                 <template slot-scope="{row}">
                     {{ row.updateDate }}
                 </template>
             </el-table-column>
            
        </el-table>
        <el-pagination
                :current-page="operationrecordQuery.current"
                :page-sizes="[10, 20, 50, 100, 1000]"
                :page-size="operationrecordQuery.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @pagination="handleQueryByPage"
        />
        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
            <el-form :model="operationRecord" label-width="100px" label-position="left">   
                <el-row :gutter="20">
                <el-col :span="12"><div class="grid-content bg-purple">
                 <el-form-item label="车辆号码">
                    <el-input v-model="operationRecord.att1" placeholder="车辆号码" />
                </el-form-item>
                <el-form-item label="载客开始时间">
                    <el-input v-model="operationRecord.att2" placeholder="载客开始时间" />
                </el-form-item>
                <el-form-item label="载客结束时间">
                    <el-input v-model="operationRecord.att3" placeholder="载客结束时间" />
                </el-form-item>
                <el-form-item label="重车里程">
                    <el-input v-model="operationRecord.att4" placeholder="重车里程" />
                </el-form-item>
                <el-form-item label="空车里程">
                    <el-input v-model="operationRecord.att5" placeholder="空车里程" />
                </el-form-item>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple">
                 <el-form-item label="总行驶里程">
                    <el-input v-model="operationRecord.att6" placeholder="总行驶里程" />
                </el-form-item>
                <el-form-item label="现金收入">
                    <el-input v-model="operationRecord.att7" placeholder="现金收入" />
                </el-form-item>
                <el-form-item label="卡金额">
                    <el-input v-model="operationRecord.att8" placeholder="卡金额" />
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="operationRecord.att9" placeholder="联系电话" />
                </el-form-item>
                <el-form-item label="报警信息">
                    <el-input v-model="operationRecord.att10" placeholder="报警信息" />
                </el-form-item>    
                </div></el-col>
                </el-row>            
            </el-form>
            <div style="text-align:center;" v-if="!inputDisabled">
                <el-button type="danger" @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { deepClone,parseTime } from '@/utils'
    import waves from '@/directive/waves'
    import Pagination from '@/components/Pagination'
    import { queryByPage, getOperationRecord, getOperationRecords, addOperationRecord, updateOperationRecord, deleteOperationRecord,batchDeleted,batchCreateOrUpdate} from '@/api/operationrecord'

    export default {
        data() {
            return {
                inputDisabled:false,
                operationRecord: {},
                operationrecords: [],
                operationrecordsList: [],
                operationrecordQuery:{
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
            showOperationRecordInfo(row){

                if ((row && row.hasOwnProperty('id')) || this.multipleSelection.length === 1) {                   
                    this.dialogTitle = "查看运营采集"
                    this.dialogVisible = true
                    this.inputDisabled = true
                    this.dialogType = "show"
                    getOperationRecord(this.multipleSelection[0].id).then((response) =>{
                        this.operationRecord = response
                    });
                }else{
                    this.$message.error('请选择一条数据')
                    return
                }
            },
            getOperationRecord(){
                getOperationRecord().then(response => {
                    this.operationRecord = response
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
                queryByPage(this.operationrecordQuery).then(response => {
                    this.operationrecordsList = response.records
                    this.total = response.total
                    this.listLoading = false
                })
            },
            handleSizeChange: function(size) {
                this.listLoading = true
                this.operationrecordQuery.size = size
                this.handleQueryByPage()
            },
            handleCurrentChange: function(currentPage) {
                this.listLoading = true
                this.operationrecordQuery.current = currentPage
                this.handleQueryByPage()
            },
            handleDownload(){
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['主键','车辆号码','载客开始时间','载客结束时间','重车里程','空车里程','总行驶里程','现金收入','卡金额','联系电话','报警信息','自编号','创建人','创建人姓名','创建时间','更新人','更新人姓名','更新时间','乐观锁','删除标识字段','删除标识字段']
                    const filterVal = ['id','att1','att2','att3','att4','att5','att6','att7','att8','att9','att10','att11','createBy','createName','createDate','updateBy','updateName','updateDate','objectVersionNumber','isDeleted','isDeleted']
                    const data = this.formatJson(filterVal)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: '运营采集'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.operationrecordsList.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            handleAddOperationRecord() {
                this.dialogType = 'new'
                this.dialogTitle = "新增运营采集"
                this.dialogVisible = true
                this.operationrecord = {};
            },
            handleEditOperationRecord() {
                if (this.multipleSelection.length == 0) {
                    this.$message.error("请选择要编辑的数据！");
                    return;
                } else if (this.multipleSelection.length >= 2) {
                    this.$message.warning("只能编辑一条数据");
                    return;
                }
                this.dialogType = 'edit'
                this.dialogTitle = "编辑运营采集"
                this.dialogVisible = true
                this.operationRecord = this.multipleSelection[0];
                var row = this.operationRecord
                getOperationRecord(row.id).then(response => {
                    this.operationRecord = response
                })
            },
            async confirm() {
                const isEdit = this.dialogType === 'edit'
                this.dialogVisible = false
                if(this.dialogType === 'new'){
                    addOperationRecord(this.operationRecord).then(response => {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                        this.handleQueryByPage()
                    })
                }else if(this.dialogType === 'edit'){
                    updateOperationRecord(this.operationRecord).then(response => {
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

