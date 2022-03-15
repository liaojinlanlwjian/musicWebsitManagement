<template>
  <div style="margin-left:30px" >
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="终端管理" name="first">
        <div class="filter-container" style="margin-top:20px">
            <el-button class="filter-item" type="primary" @click="addTerminalmanagement">添加</el-button>
            <el-button class="filter-item" type="danger" @click="handleBatchDeleted">删除</el-button>
        </div>
            <el-table :data="alarmmanagementList"
                  @selection-change="handleSelectionChange"
                  style="width: 95%;"
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
             <el-table-column align="center" type="index" label="序号" width="120">
             </el-table-column>
             <el-table-column align="center" label="终端名称" width="120">
                 <template slot-scope="{row}">
                     {{ row.att1 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="终端位置" width="120">
                 <template slot-scope="{row}">
                     {{ row.att2 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="有效时长" width="120">
                 <template slot-scope="{row}">
                     {{ row.att3 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="终端责任人" width="120">
                 <template slot-scope="{row}">
                     {{ row.att4 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="终端大小" width="120">
                 <template slot-scope="{row}">
                     {{ row.att5 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="终端利用期限" width="120">
                 <template slot-scope="{row}">
                     {{ row.att6 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="终端附属" width="120">
                 <template slot-scope="{row}">
                     {{ row.att7 }}
                 </template>
             </el-table-column>
             <el-table-column align="center" label="终端作用" width="120">
                 <template slot-scope="{row}">
                     {{ row.att8 }}
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
    <el-tab-pane label="终端升级" name="second">
        <div style="width:100%;height:300px;margin:0px auto;text-align:center;line-height:300px">
            <el-button type="primary" v-loading="btnShow" @click="upgrade">升级到最新版本</el-button>
        </div>
    </el-tab-pane>
    </el-tabs>
            
            
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
            <el-form :model="operationRecord" label-width="100px" label-position="left">   
                <el-row :gutter="20">
                <el-col :span="12"><div class="grid-content bg-purple">
                 <el-form-item label="终端名称">
                    <el-input v-model="operationRecord.att1"  />
                </el-form-item>
                <el-form-item label="终端位置">
                    <el-input v-model="operationRecord.att2"/>
                </el-form-item>
                <el-form-item label="有效时长">
                    <el-input v-model="operationRecord.att3"  />
                </el-form-item>
                <el-form-item label="终端责任人">
                    <el-input v-model="operationRecord.att4" />
                </el-form-item>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple">
                 <el-form-item label="终端大小">
                    <el-input v-model="operationRecord.att6"  />
                </el-form-item>
                <el-form-item label="终端利用期限">
                    <el-input v-model="operationRecord.att7" />
                </el-form-item>
                <el-form-item label="终端附属">
                    <el-input v-model="operationRecord.att8" />
                </el-form-item>
                <el-form-item label="终端作用">
                    <el-input v-model="operationRecord.att9" />
                </el-form-item>
                </div></el-col>
                </el-row>            
            </el-form>
            <div style="text-align:center;">
                <el-button type="danger" @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import { queryByPage} from '@/api/operationrecord'
export default {
data() {
      return {
          btnShow:false,
        data: [{
          id: 1,
          label: '终端管理',
        }, {
          id: 2,
          label: '终端升级',
        }],
        defaultProps: {
          label: 'label'
        },
        selectedNode: {},
        multipleSelection:[],
        alarmmanagementList:[
            {
                att1: '终端01',
                att2: 'windows01',
                att3: '39天',
                att4: '张三',
                att5: '1GB',
                att6: '一个月',
                att7: '调试系统',
                att8: '超级管理员',
                id:'2'
            },
        ],
        listLoading:false,
        positionInformationQuery:{
            size: 10,
            current: 1,
            optimizeCountSql: true,
            optimizeJoinOfCountSql: true,
            searchCount: true
        },
        total:0,
        dialogVisible:false,
        dialogTitle:'增加终端',
        operationRecord:{},
        activeName: 'first'
      }},
      created(){
    this.handleQueryByPage()
      },
methods:{
    upgrade(){
        this.btnShow = true
        setTimeout(() => {
            this.$message.info('当前已是最新版本')
            this.btnShow = false
        }, 800);
    },
    handleClick(tab, event) {
        if (this.activeName == 'first') {
            this.handleQueryByPage()
        }
      },
    confirm(){
        this.listLoading = true
        setTimeout(() => {
            this.dialogVisible = false
            this.$message.success('增加成功')
            this.alarmmanagementList.push(this.operationRecord)
            sessionStorage.setItem('alarmmanagementList',JSON.stringify(this.alarmmanagementList));
            this.handleQueryByPage()
    }, 800);
        
    },
    handleBatchDeleted(){
        if(this.alarmmanagementList.length == 0){
        this.$message.error('请选择操作记录！')
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.listLoading = true
              setTimeout(() => {
              let index = this.multipleSelection[0].rowIndex
              this.alarmmanagementList.splice(index,1)
              sessionStorage.setItem('alarmmupgradeanagementList',JSON.stringify(this.alarmmanagementList));
              this.total = this.alarmmanagementList.length
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.listLoading = false
              this.$refs.serveTable.clearSelection()
              }, 500);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
        });
    },
    addTerminalmanagement(){
      this.operationRecord = {}
      this.dialogVisible = true
    },
    handleSelectionChange(val) {
        if (val.length > 1) {
        this.$refs.serveTable.clearSelection();
        this.$refs.serveTable.toggleRowSelection(val.pop());
        } else {
            this.multipleSelection = val;
        }
        
    },
    handleQueryByPage(){
        this.listLoading = true
        setTimeout(() => {
            this.listLoading = false
            let data = JSON.parse(sessionStorage.getItem('alarmmanagementList'))
            if (data == null || data == undefined) {
                this.total = this.alarmmanagementList.length
                console.log(this.alarmmanagementList);
                this.alarmmanagementList = this.alarmmanagementList
            }else{
                this.alarmmanagementList = data
                this.total = data.length
            }
            
        }, 800);
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
}
}
</script>

<style>

</style>