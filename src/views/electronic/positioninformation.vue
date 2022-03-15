<template>
    <div class="app-container">
        
        <div class="filter-container" style="margin-top:30px">   
            <el-input v-model="positionInformationQuery.att10" placeholder="车牌号" style="width: 120px;" class="filter-item"/>
            <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleQueryByPage">查询</el-button>
            <!-- <el-button  :loading="downloadLoading" class="filter-item" type="primary" icon="excel" @click="handleDownload">导出</el-button> -->
            <!-- <el-button class="filter-item" type="primary" @click="handleAddPositionInformation">新增</el-button> -->
            <!-- <el-button class="filter-item" type="primary" @click="handleEditPositionInformation">编辑</el-button> -->
            <!-- <el-button class="filter-item" type="primary" @click="showPositionInformationInfo">查看</el-button> -->
            <!-- <el-button class="filter-item" type="danger" @click="handleBatchDeleted">删除</el-button> -->
        </div>
         <el-tabs v-model="activeName">
            <el-tab-pane label="车辆信息" name="first">
                 <el-table :data="positionInformationsList"
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
             <el-table-column align="center" label="车牌号" width="120">
                 <template slot-scope="{row}">
                     {{ row.att1 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="工作状态" width="120">
                 <template slot-scope="{row}">
                     {{ row.att2 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="卫星图" width="120">
                 <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleShow(scope.$index, scope.row)">查看</el-button>
                </template>
             </el-table-column>
             <el-table-column align="center" label="位置" width="120">
                 <template slot-scope="{row}">
                     {{ row.att3 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="速度" width="120">
                 <template slot-scope="{row}">
                     {{ row.att4 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="行驶状态" width="120">
                 <template slot-scope="{row}">
                     {{ row.att5 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="出发地点" width="120">
                 <template slot-scope="{row}">
                     {{ row.att6 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="目的地" width="120">
                 <template slot-scope="{row}">
                     {{ row.att7 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="定位时间" width="120">
                 <template slot-scope="{row}">
                     {{ row.att8 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="接收时间" width="120">
                 <template slot-scope="{row}">
                     {{ row.att9 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="报警信息" width="120">
                 <template slot-scope="{row}">
                     {{ row.att10 }}
                 </template>
             </el-table-column>
                 </el-table>
        <el-pagination
                :current-page="positionInformationQuery.current"
                :page-sizes="[10, 20, 50, 100, 1000]"
                :page-size="positionInformationQuery.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @pagination="handleQueryByPage"
        />
            </el-tab-pane>
            <el-tab-pane label="已出租车辆" name="second">
            </el-tab-pane>
            <el-tab-pane label="在公司车辆" name="third">
                 
            </el-tab-pane>
        </el-tabs>
        <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="11">
            <!-- <bm-driving start="广西壮族自治区南宁市良庆区龙堤路15号" end="南宁火车东站" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="autoRun"></bm-driving> -->
            <bm-driving :start="startPlace" :end="endPlace" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="autoRun"></bm-driving>
            <bml-lushu
                @stop="reset"
                :path="path"
                :icon="icon"
                :play="play"
                :rotation="true">
            </bml-lushu>
        </baidu-map>
       
        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :fullscreen="true">
            <el-form :model="positionInformation" label-width="80px" label-position="left">               
                <el-form-item label="车牌号">
                    <el-input v-model="positionInformation.att1" placeholder="车牌号" />
                </el-form-item>
                <el-form-item label="工作状态">
                    <el-input v-model="positionInformation.att2" placeholder="工作状态" />
                </el-form-item>
                <el-form-item label="起始经纬度">
                    <el-input v-model="positionInformation.att11" placeholder="工作状态" />
                </el-form-item>
                <el-form-item label="目的经纬度">
                    <el-input v-model="positionInformation.att12" placeholder="工作状态" />
                </el-form-item>
                <el-form-item label="位置">
                    <el-input v-model="positionInformation.att3" placeholder="位置" />
                </el-form-item>
                <el-form-item label="速度">
                    <el-input v-model="positionInformation.att4" placeholder="速度" />
                </el-form-item>
                <el-form-item label="行驶状态">
                    <el-input v-model="positionInformation.att5" placeholder="行驶状态" />
                </el-form-item>
                <el-form-item label="油路">
                    <el-input v-model="positionInformation.att6" placeholder="油路" />
                </el-form-item>
                <el-form-item label="电路">
                    <el-input v-model="positionInformation.att7" placeholder="电路" />
                </el-form-item>
                <el-form-item label="定位时间">
                    <el-input v-model="positionInformation.att8" placeholder="定位时间" />
                </el-form-item>
                <el-form-item label="接收时间">
                    <el-input v-model="positionInformation.att9" placeholder="接收时间" />
                </el-form-item>
                <el-form-item label="报警信息">
                    <el-input v-model="positionInformation.att10" placeholder="报警信息" />
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
    import { BmlLushu } from 'vue-baidu-map'
    import { queryByPage, getPositionInformation, getPositionInformations, addPositionInformation, updatePositionInformation, deletePositionInformation,batchDeleted,batchCreateOrUpdate} from '@/api/positioninformation'

    export default {
         components: {
            BmlLushu
        },
        data() {
            return {
                map: null,
                local: null,
                mk: null,
                latitude: '',
                longitude: '',
                keyWords: '',
                autoRun:false,
                startPlace:'',
                endPlace:'',
                activeName:'first',
                 play: false,
                    path: [],
                    icon: {
                        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
                        size: { width: 52, height: 26 },
                        opts: { anchor: { width: 27, height: 13 }}
                },
                positionInformation: {},
                positionInformations: [],
                positionInformationsList: [],
                positionInformationQuery:{
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
            this.handleQueryByPage();
        },
        methods: {
            
            handleShow(index,row){
                console.log(index);
                console.log(row.att11);
                console.log(JSON.parse(row.att11));
                // return
                this.startPlace = JSON.parse(row.att11)
                this.endPlace = JSON.parse(row.att12)
                this.autoRun = true
                this.play = true
                // this.handleSearchComplete()
            },
           
            reset() {
                this.play = false
            },
            handleSearchComplete(res) {
            console.log(res);
            this.path = res.getPlan(0).getRoute(0).getPath()
            console.log(this.path);
            console.log("ooooo");
            },
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
            showPositionInformationInfo(row){

                if ((row && row.hasOwnProperty('id')) || this.multipleSelection.length === 1) {
                   
                    this.dialogTitle = "查看位置信息表"
                    this.dialogVisible = true
                    this.inputDisabled = true
                    this.dialogType = "show"
                    getPositionInformation(this.multipleSelection[0].id).then((response) =>{
                        this.positionInformation = response
                    });
                }else{
                    this.$message.error('请选择一条数据')
                    return
                }
            },
            getPositionInformation(){
                getPositionInformation().then(response => {
                    this.positionInformation = response
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleBatchDeleted(){
                let ids = []
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
                queryByPage(this.positionInformationQuery).then(response => {
                    this.positionInformationsList = response.records
                    this.total = response.total
                    this.listLoading = false
                })
            },
            handleSizeChange: function(size) {
                this.listLoading = true
                this.positionInformationQuery.size = size
                this.handleQueryByPage()
            },
            handleCurrentChange: function(currentPage) {
                this.listLoading = true
                this.positionInformationQuery.current = currentPage
                this.handleQueryByPage()
            },
            handleDownload(){
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['主键','车牌号','工作状态','位置','速度','行驶状态','油路','电路','定位时间','接收时间','报警信息','创建人','创建人姓名','创建时间','更新人','更新人姓名','更新时间','乐观锁','删除标识字段','删除标识字段']
                    const filterVal = ['id','att1','att2','att3','att4','att5','att6','att7','att8','att9','att10','createBy','createName','createDate','updateBy','updateName','updateDate','objectVersionNumber','isDeleted','isDeleted']
                    const data = this.formatJson(filterVal)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: '位置信息表'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.positionInformationsList.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            handleAddPositionInformation() {
                this.dialogType = 'new'
                this.dialogTitle = "新增位置信息表"
                this.dialogVisible = true
                this.positioninformation = {};
            },
            handleEditPositionInformation() {
                if (this.multipleSelection.length == 0) {
                    this.$message.error("请选择要编辑的数据！");
                    return;
                } else if (this.multipleSelection.length >= 2) {
                    this.$message.warning("只能编辑一条数据");
                    return;
                }
                this.dialogType = 'edit'
                this.dialogTitle = "编辑位置信息表"
                this.dialogVisible = true
                this.positionInformation = this.multipleSelection[0];
                var row = this.positionInformation
                getPositionInformation(row.id).then(response => {
                    this.positionInformation = response
                })
            },
            async confirm() {
                const isEdit = this.dialogType === 'edit'
                this.dialogVisible = false
                if(this.dialogType === 'new'){

                    addPositionInformation(this.positionInformation).then(response => {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                        this.handleQueryByPage()
                    })
                }else if(this.dialogType === 'edit'){
                    updatePositionInformation(this.positionInformation).then(response => {
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

<style>
.map {
  width: 100%;
  height: 800px;
  margin-top: 40px;
}
</style>