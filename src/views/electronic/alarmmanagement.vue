<template>
  <div>
    <el-row :gutter="20">
        <el-col :span="4" style="padding-left:78px;padding-top:20px"><div class="grid-content bg-purple">
            <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                check-on-click-node
                highlight-current
                @check-change="changeNode"
                @check="nodeClick"
                :props="defaultProps">
            </el-tree>
        </div></el-col>
        <el-col :span="20"><div class="grid-content bg-purple">
            <el-table :data="alarmmanagementList"
                  @selection-change="handleSelectionChange"
                  style="width: 95%;margin-top:30px;"
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
        </div></el-col>
    </el-row>
    
  </div>
</template>

<script>
import { queryByPage} from '@/api/operationrecord'
export default {
data() {
      return {
        data: [{
          id: 1,
          label: '超速告警',
        }, {
          id: 2,
          label: '疲劳驾驶告警',
        }, {
          id: 3,
          label: '超时停车告警',
        },{
          id: 4,
          label: '区域告警',
        },{
          id: 5,
          label: '线路告警',
        },{
          id: 6,
          label: '信号丢失告警',
        }],
        defaultProps: {
          label: 'label'
        },
        selectedNode: {},
        multipleSelection:[],
        alarmmanagementList:[],
        listLoading:false,
        positionInformationQuery:{
            size: 10,
            current: 1,
            optimizeCountSql: true,
            optimizeJoinOfCountSql: true,
            searchCount: true
        },
        total:0,

      }},
methods:{
    nodeClick(data ){
        if(data.id == 2){
            this.alarmmanagementList = [
                {
                    att1:"桂K0826",
                    att2:"行驶中",
                    att3:"南宁市朝阳广场",
                    att4:"90m/s",
                    att5:"超速",
                    att6:"南宁市博物馆",
                    att7:"南宁市朝阳广场",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"超速违规",
                },
                {
                    att1:"桂K77488",
                    att2:"行驶中",
                    att3:"南宁市朝阳广场",
                    att4:"90m/s",
                    att5:"超速",
                    att6:"南宁市博物馆",
                    att7:"南宁市朝阳广场",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"超速违规",
                },
                {
                    att1:"桂A33000",
                    att2:"行驶中",
                    att3:"南宁市朝阳广场",
                    att4:"90m/s",
                    att5:"超速",
                    att6:"南宁市博物馆",
                    att7:"南宁市朝阳广场",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"超速违规",
                },
                {
                    att1:"桂Y22448",
                    att2:"行驶中",
                    att3:"南宁市朝阳广场",
                    att4:"90m/s",
                    att5:"超速",
                    att6:"南宁市博物馆",
                    att7:"南宁市朝阳广场",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"超速违规",
                }
            ]
            
        }else if(data.id == 1){
            this.handleQueryByPage();
        }else if(data.id == 3){
            this.alarmmanagementList = [
                {
                    att1:"粤B77478",
                    att2:"停车",
                    att3:"南宁市动物园",
                    att4:"45m/s",
                    att5:"停车超时",
                    att6:"南宁市园博园",
                    att7:"南宁市动物园",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"停车超时违规",
                },
                {
                    att1:"粤K99969",
                    att2:"停车",
                    att3:"南宁市动物园",
                    att4:"45m/s",
                    att5:"停车超时",
                    att6:"南宁市园博园",
                    att7:"南宁市动物园",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"停车超时违规",
                },
                {
                    att1:"粤L9958",
                    att2:"行驶中",
                    att3:"南宁市园博园",
                    att4:"45m/s",
                    att5:"停车超时",
                    att6:"南宁市朝阳广场",
                    att7:"南宁市园博园",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"停车超时违规",
                }
            ]
        }else if(data.id == 4){
            this.alarmmanagementList = [
                {
                    att1:"京B33644",
                    att2:"停车",
                    att3:"南宁市动物园",
                    att4:"45m/s",
                    att5:"停车超时",
                    att6:"南宁市园博园",
                    att7:"南宁市动物园",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"区域告警",
                },
                {
                    att1:"京DL9958",
                    att2:"停车",
                    att3:"南宁市园博园",
                    att4:"45m/s",
                    att5:"停车超时",
                    att6:"南宁市朝阳广场",
                    att7:"南宁市园博园",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"区域告警",
                }
            ]
        }else if(data.id == 5){
            this.alarmmanagementList = [
                {
                    att1:"闽B77478",
                    att2:"行驶中",
                    att3:"南宁市动物园",
                    att4:"45m/s",
                    att5:"停车超时",
                    att6:"南宁市园博园",
                    att7:"南宁市动物园",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"线路告警",
                },
                {
                    att1:"闽L9958",
                    att2:"停车",
                    att3:"南宁市园博园",
                    att4:"45m/s",
                    att5:"停车超时",
                    att6:"南宁市朝阳广场",
                    att7:"南宁市园博园",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"线路告警",
                }
            ]
        }else if(data.id == 6){
            this.alarmmanagementList = [
                {
                    att1:"南B77478",
                    att2:"行驶中",
                    att3:"南宁市动物园",
                    att4:"45m/s",
                    att5:"停车超时",
                    att6:"南宁市园博园",
                    att7:"南宁市动物园",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"信号丢失告警",
                },
                {
                    att1:"南L9958",
                    att2:"行驶中",
                    att3:"南宁市园博园",
                    att4:"45m/s",
                    att5:"停车超时",
                    att6:"南宁市朝阳广场",
                    att7:"南宁市园博园",
                    att8:"中午11.58",
                    att9:"中午12.00",
                    att10:"信号丢失告警",
                }
            ]
        }
        this.total = this.alarmmanagementList.length
    },
    //选择
    changeNode(data, checked, node) {
      if (checked) {
        this.selectedNode = data;
        this.$refs.tree.setCheckedNodes([data]);
        // this.handleQueryByPage();
      } else {
        this.alarmmanagementList = [];
      }
      
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    handleQueryByPage(){
        this.listLoading = true
        queryByPage(this.positionInformationQuery).then(response => {
            this.alarmmanagementList = response.records
            this.total = response.total
            this.listLoading = false
        })
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