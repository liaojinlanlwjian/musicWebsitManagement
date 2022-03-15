<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="administrativeenforcementQuery.att8" placeholder="执法人员编号" style="width: 120px;" class="filter-item"/>                 
            <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleQueryByPage">查询</el-button>
            <el-button  :loading="downloadLoading" class="filter-item" type="primary" icon="excel" @click="handleDownload">导出</el-button>
            <el-button class="filter-item" type="primary" @click="handleAddAdministrativeEnforcement">新增</el-button>
            <el-button class="filter-item" type="primary" @click="handleEditAdministrativeEnforcement">编辑</el-button>
            <el-button class="filter-item" type="primary" @click="showAdministrativeEnforcementInfo">查看</el-button>
            <el-button class="filter-item" type="danger" @click="handleBatchDeleted">删除</el-button>
        </div>
        <el-table :data="administrativeenforcementsList"
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
             <el-table-column align="center" label="编号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att1 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="执法人员" width="120">
                 <template slot-scope="{row}">
                     {{ row.att2 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="车牌号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att3 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="驾史证编号" width="120">
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
             <el-table-column align="center" label="状态" width="120">
                 <template slot-scope="{row}">
                     {{ row.att7 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="执法人员编号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att8 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="照片" width="120">
                 <template slot-scope="{row}">
                     {{ row.att9 }}
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
                :current-page="administrativeenforcementQuery.current"
                :page-sizes="[10, 20, 50, 100, 1000]"
                :page-size="administrativeenforcementQuery.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @pagination="handleQueryByPage"
        />
        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :fullscreen="true">
            <el-form :model="administrativeEnforcement" label-width="80px" label-position="left">
               
                <el-form-item label="编号">
                    <el-input v-model="administrativeEnforcement.att1" placeholder="编号" />
                </el-form-item>
                <el-form-item label="执法人员">
                    <el-input v-model="administrativeEnforcement.att2" placeholder="执法人员" />
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-input v-model="administrativeEnforcement.att3" placeholder="车牌号" />
                </el-form-item>
                <el-form-item label="驾史证编号">
                    <el-input v-model="administrativeEnforcement.att4" placeholder="驾史证编号" />
                </el-form-item>
                <el-form-item label="违法时间">
                    <el-input v-model="administrativeEnforcement.att5" placeholder="违法时间" />
                </el-form-item>
                <el-form-item label="违法地点">
                    <el-input v-model="administrativeEnforcement.att6" placeholder="违法地点" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="administrativeEnforcement.att7" placeholder="状态" />
                </el-form-item>
                <el-form-item label="执法人员编号">
                    <el-input v-model="administrativeEnforcement.att8" placeholder="执法人员编号" />
                </el-form-item>
                <el-form-item label="照片">
                    <el-input v-model="administrativeEnforcement.att9" placeholder="照片" />
                </el-form-item>               
            </el-form>
            <div style="text-align:center;">
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
    import { queryByPage, getAdministrativeEnforcement, getAdministrativeEnforcements, addAdministrativeEnforcement, updateAdministrativeEnforcement, deleteAdministrativeEnforcement,batchDeleted,batchCreateOrUpdate} from '@/api/administrativeenforcement'

    export default {
        data() {
            return {
                administrativeEnforcement: {},
                administrativeenforcements: [],
                administrativeenforcementsList: [],
                administrativeenforcementQuery:{
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
            showAdministrativeEnforcementInfo(row){
                if((row && row.hasOwnProperty('id')) || this.multipleSelection.length === 1) {
                    this.dialogTitle = "查看行政执法记录"
                    this.dialogVisible = true
                    this.inputDisabled = true
                    this.dialogType = "show"
                    getAdministrativeEnforcement(this.multipleSelection[0].id).then((response) =>{
                        this.administrativeEnforcement = response
                    });
                    return
                } else {
                    this.$message.error('请选择一条数据')
                    return
                }
                  
            },
            getAdministrativeEnforcement(){
                getAdministrativeEnforcement().then(response => {
                    this.administrativeEnforcement = response
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
                queryByPage(this.administrativeenforcementQuery).then(response => {
                    this.administrativeenforcementsList = response.records
                    this.total = response.total
                    this.listLoading = false
                })
            },
            handleSizeChange: function(size) {
                this.listLoading = true
                this.administrativeenforcementQuery.size = size
                this.handleQueryByPage()
            },
            handleCurrentChange: function(currentPage) {
                this.listLoading = true
                this.administrativeenforcementQuery.current = currentPage
                this.handleQueryByPage()
            },
            handleDownload(){
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['主键','编号','执法人员','车牌号','驾史证编号','违法时间','违法地点','状态','执法人员编号','照片','创建人','创建人姓名','创建时间','更新人','更新人姓名','更新时间','乐观锁','删除标识字段','删除标识字段']
                    const filterVal = ['id','att1','att2','att3','att4','att5','att6','att7','att8','att9','createBy','createName','createDate','updateBy','updateName','updateDate','objectVersionNumber','isDeleted','isDeleted']
                    const data = this.formatJson(filterVal)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: '行政执法记录'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.administrativeenforcementsList.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            handleAddAdministrativeEnforcement() {
                this.dialogType = 'new'
                this.dialogTitle = "新增行政执法记录"
                this.dialogVisible = true
                this.administrativeEnforcement = {};
            },
            handleEditAdministrativeEnforcement() {
                if (this.multipleSelection.length == 0) {
                    this.$message.error("请选择要编辑的数据！");
                    return;
                } else if (this.multipleSelection.length >= 2) {
                    this.$message.warning("只能编辑一条数据");
                    return;
                }
                this.dialogType = 'edit'
                this.dialogTitle = "编辑行政执法记录"
                this.dialogVisible = true
                this.administrativeEnforcement = this.multipleSelection[0];
                var row = this.administrativeEnforcement
                getAdministrativeEnforcement(row.id).then(response => {
                    this.administrativeEnforcement = response
                })
            },
            async confirm() {
                const isEdit = this.dialogType === 'edit'
                this.dialogVisible = false
                if(this.dialogType === 'new'){
                    addAdministrativeEnforcement(this.administrativeEnforcement).then(response => {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                        this.handleQueryByPage()
                    })
                }else if(this.dialogType === 'edit'){
                    updateAdministrativeEnforcement(this.administrativeEnforcement).then(response => {
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

