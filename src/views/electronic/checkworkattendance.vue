<template>
    <div class="app-container">
        <div class="filter-container">
                       
            <!-- <el-input v-model="checkWorkAttendanceQuery.att1" placeholder="姓名" style="width: 120px;" class="filter-item"/>
            <el-input v-model="checkWorkAttendanceQuery.att2" placeholder="员工编号" style="width: 120px;" class="filter-item"/>           
            <el-input v-model="checkWorkAttendanceQuery.att4" placeholder="学历" style="width: 120px;" class="filter-item"/>
            <el-input v-model="checkWorkAttendanceQuery.att5" placeholder="职位" style="width: 120px;" class="filter-item"/>
            <el-input v-model="checkWorkAttendanceQuery.att6" placeholder="部门" style="width: 120px;" class="filter-item"/> -->
            <el-input v-model="checkWorkAttendanceQuery.att7" placeholder="性别" style="width: 120px;" class="filter-item"/>          
            <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleQueryByPage">查询</el-button>
            <el-button  :loading="downloadLoading" class="filter-item" type="primary" icon="excel" @click="handleDownload">导出</el-button>
            <el-button class="filter-item" type="primary" @click="handleAddCheckWorkAttendance">新增</el-button>
            <el-button class="filter-item" type="primary" @click="handleEditCheckWorkAttendance">编辑</el-button>
            <el-button class="filter-item" type="primary" @click="showCheckWorkAttendanceInfo">查看</el-button>
            <el-button class="filter-item" type="danger" @click="handleBatchDeleted">删除</el-button>
        </div>
        <el-table :data="checkWorkAttendancesList"
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
             <el-table-column align="center" label="姓名" width="120">
                 <template slot-scope="{row}">
                     {{ row.att1 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="员工编号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att2 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="RFID" width="120">
                 <template slot-scope="{row}">
                     {{ row.att3 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="学历" width="120">
                 <template slot-scope="{row}">
                     {{ row.att4 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="职位" width="120">
                 <template slot-scope="{row}">
                     {{ row.att5 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="部门" width="120">
                 <template slot-scope="{row}">
                     {{ row.att6 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="性别" width="120">
                 <template slot-scope="{row}">
                     {{ row.att7 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="出生日期" width="120">
                 <template slot-scope="{row}">
                     {{ row.att8 }}
                 </template>
             </el-table-column>
        </el-table>
        <el-pagination
                :current-page="checkWorkAttendanceQuery.current"
                :page-sizes="[10, 20, 50, 100, 1000]"
                :page-size="checkWorkAttendanceQuery.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @pagination="handleQueryByPage"
        />
        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
            <el-form :model="checkWorkAttendance" label-width="80px" label-position="left"> .
                <el-row :gutter="20">
                    <el-col :span="12"><div class="grid-content bg-purple">
                    <el-form-item label="姓名">
                    <el-input v-model="checkWorkAttendance.att1" placeholder="姓名" />
                    </el-form-item>
                    <el-form-item label="员工编号">
                        <el-input v-model="checkWorkAttendance.att2" placeholder="员工编号" />
                    </el-form-item>
                    <el-form-item label="RFID">
                        <el-input v-model="checkWorkAttendance.att3" placeholder="RFID" />
                    </el-form-item>
                    <el-form-item label="学历">
                        <el-select v-model="checkWorkAttendance.att4" placeholder="请选择">
                                <el-option
                                v-for="item in att4Options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
                   
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-form-item label="部门">
                            <el-select v-model="checkWorkAttendance.att6" placeholder="请选择">
                                <el-option
                                v-for="item in att6Options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-input v-model="checkWorkAttendance.att7" placeholder="性别" />
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <el-input v-model="checkWorkAttendance.att8" placeholder="出生日期" />
                        </el-form-item>    
                         <el-form-item label="职位">
                              <el-select v-model="checkWorkAttendance.att5" placeholder="请选择">
                                <el-option
                                v-for="item in att5Options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
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
    import { queryByPage, getCheckWorkAttendance, getCheckWorkAttendances, addCheckWorkAttendance, updateCheckWorkAttendance, deleteCheckWorkAttendance,batchDeleted,batchCreateOrUpdate} from '@/api/checkworkattendance'

    export default {
        data() {
            return {
                att4Options: [{
                value: '本科',
                label: '本科'
                }, {
                value: '大专',
                label: '大专'
                }, {
                value: '中专',
                label: '中专'
                }, {
                value: '初中',
                label: '初中'
                }],
                att6Options: [{
                value: '出租车部门',
                label: '出租车部门'
                }, {
                value: '财务部',
                label: '财务部'
                }, {
                value: '行政部',
                label: '行政部'
                }, {
                value: '销售部',
                label: '销售部'
                }],
                att5Options: [{
                value: '出租车司机',
                label: '出租车司机'
                }, {
                value: '经理',
                label: '经理'
                }, {
                value: '秘书',
                label: '秘书'
                }, {
                value: '董事长',
                label: '董事长'
                }],
                checkWorkAttendance: {},
                checkWorkAttendances: [],
                checkWorkAttendancesList: [],
                checkWorkAttendanceQuery:{
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
            showCheckWorkAttendanceInfo(row){

                if ((row && row.hasOwnProperty('id')) || this.multipleSelection.length === 1) {                   
                    this.dialogTitle = "查看司机考勤表"
                    this.dialogVisible = true
                    this.inputDisabled = true
                    this.dialogType = "show"
                    getCheckWorkAttendance(this.multipleSelection[0].id).then((response) =>{
                        this.checkWorkAttendance = response
                    });
                }else{
                     this.$message.error('请选择一条数据')
                     return
                }
            },
            getCheckWorkAttendance(){
                getCheckWorkAttendance().then(response => {
                    this.checkWorkAttendance = response
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
                queryByPage(this.checkWorkAttendanceQuery).then(response => {
                    this.checkWorkAttendancesList = response.records
                    this.total = response.total
                    this.listLoading = false
                })
            },
            handleSizeChange: function(size) {
                this.listLoading = true
                this.checkWorkAttendanceQuery.size = size
                this.handleQueryByPage()
            },
            handleCurrentChange: function(currentPage) {
                this.listLoading = true
                this.checkWorkAttendanceQuery.current = currentPage
                this.handleQueryByPage()
            },
            handleDownload(){
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['主键','姓名','员工编号','RFID','学历','职位','部门','性别','出生日期','创建人','创建人姓名','创建时间','更新人','更新人姓名','更新时间','乐观锁','删除标识字段','删除标识字段']
                    const filterVal = ['id','att1','att2','att3','att4','att5','att6','att7','att8','createBy','createName','createDate','updateBy','updateName','updateDate','objectVersionNumber','isDeleted','isDeleted']
                    const data = this.formatJson(filterVal)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: '司机考勤表'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.checkWorkAttendancesList.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            handleAddCheckWorkAttendance() {
                this.dialogType = 'new'
                this.dialogTitle = "新增司机考勤表"
                this.dialogVisible = true
                this.inputDisabled = false
                this.checkworkattendance = {};
            },
            handleEditCheckWorkAttendance() {
                if (this.multipleSelection.length == 0) {
                    this.$message.error("请选择要编辑的数据！");
                    return;
                } else if (this.multipleSelection.length >= 2) {
                    this.$message.warning("只能编辑一条数据");
                    return;
                }
                this.dialogType = 'edit'
                this.dialogTitle = "编辑司机考勤表"
                this.dialogVisible = true
                this.inputDisabled = false
                this.checkWorkAttendance = this.multipleSelection[0];
                var row = this.checkWorkAttendance
                getCheckWorkAttendance(row.id).then(response => {
                    this.checkWorkAttendance = response
                })
            },
            async confirm() {
                const isEdit = this.dialogType === 'edit'
                this.dialogVisible = false
                if(this.dialogType === 'new'){
                    addCheckWorkAttendance(this.checkWorkAttendance).then(response => {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                        this.handleQueryByPage()
                    })
                }else if(this.dialogType === 'edit'){
                    updateCheckWorkAttendance(this.checkWorkAttendance).then(response => {
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

