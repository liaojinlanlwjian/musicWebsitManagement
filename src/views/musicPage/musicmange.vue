<template>
    <div>
        <div class="filter-container">
            <div style="display: flex">
              <el-button class="filter-item" type="primary"  @click="showOperator"
                >查看</el-button
              >
              <el-button class="filter-item" type="primary" @click="addOperator"
                >增加</el-button
              >
              <el-button class="filter-item" type="primary"  @click="editOperator"
                >修改</el-button
              >
              <el-button class="filter-item" type="danger"  @click="deleteOperator"
                >删除</el-button
              >
            </div>
          </div>
          <el-table
            :data="tableList"
            @selection-change="tableChange"
            style="width: 90%;margin-top:20px"
            border
            ref="serveTable"
            v-loading="listLoading"
            @row-click="rowClick"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="80"
            >
            </el-table-column>
            <el-table-column align="center" label="编号" width="117">
              <template slot-scope="{ row }">
                {{ row.bianhao }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="姓名" width="280">
              <template slot-scope="{ row }">
                {{ row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="性别" width="200">
              <template slot-scope="{ row }">
                {{ row.sex }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="职务" width="150">
              <template slot-scope="{ row }">
                {{ row.work }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="角色" width="200">
              <template slot-scope="{ row }">
                {{ row.role }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注" width="200">
              <template slot-scope="{ row }">
                {{ row.remark }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="电话">
              <template slot-scope="{ row }">
                {{ row.phone }}
              </template>
            </el-table-column>
          </el-table>
          <!-- 主表的分页 -->
          <el-pagination
            :current-page="editingAndResearchManagementQuery.current"
            :page-sizes="[10, 20, 50, 100, 1000]"
            :page-size="editingAndResearchManagementQuery.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @pagination="handleQueryByPage"
          />
          <!-- 增加弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
    >
      <el-form
        :model="user"
        :rules="rules"
        ref="user"
        label-width="100px"
        label-position="left"
      >
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-purple">
        <el-form-item label="编号" prop="bianhao">
          <el-input
            v-model="user.bianhao"
            style="width: 100%"
            :disabled="inputDisabled"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="user.password"
            style="width: 100%"
            :disabled="inputDisabled"
            type="password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="user.sex" placeholder="请选择" :disabled="inputDisabled">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
 
        </el-form-item>
         <el-form-item label="姓名" prop="name">
          <el-input
            v-model="user.name"
            style="width: 100%"
            :disabled="inputDisabled"
            placeholder=" 用户名称"
          />
        </el-form-item>
         
        </div>
        </el-col  >
        <el-col :span="11" style="margin-left: 55px">
          <div class="grid-content bg-purple">
          <el-form-item label="角色">
          <el-input
            v-model="user.role"
            style="width: 100%"
            :disabled="inputDisabled"
          />
        </el-form-item>
        <el-form-item label="phone" prop="phone">
          <el-input
            v-model="user.phone"
            style="width: 100%"
            :disabled="inputDisabled"
          />
        </el-form-item>
           <el-form-item label="备注">
          <el-input
            v-model="user.remark"
            style="width: 100%"
            :disabled="inputDisabled"
          />
        </el-form-item>
        <el-form-item label="职务" prop="roleIds">
          <el-select
            v-model="user.work"
            :disabled="inputDisabled"
            @change="selectDisposeCode"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        </div>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label=" 用户描述" prop="description">
          <el-input
            :disabled="inputDisabled"
            style="width: 100%"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="user.description"
          >
          </el-input>
        </el-form-item>
      </el-row>
        </el-form>
      <div style="text-align: center">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm('user')">确认</el-button>
      </div>
      </el-dialog>
    </div>
</template>
<script>
// import {default as api} from '../../store/saveData'
export default {
    data(){
        return{
            dialogTitle:'增加',
            multipleSelection:[],
            inputDisabled:false,
            user:{},
            dialogVisible:false,
            listLoading:false,
            total:0,
            editingAndResearchManagementQuery:{},
            tableList:[
                {
                    bianhao: '2016-05-02',
                    name: '王小虎',
                    sex: '男',
                    work: '董事长',
                    role: '超级管理员',
                    remark: '小心点',
                    phone: ' 1518 弄'
                },
                {
                    bianhao: '07716',
                    name: '王小猪',
                    sex: '男',
                    work: '副董事长',
                    role: '超级管理员',
                    remark: '千万小心点',
                    phone: ' 1519 弄'
                },
            ],
            sexOptions:[{
                value: '男',
                label: '男'
                }, {
                value: '女',
                label: '女'
            }], 
            rules:{
                 name: [
                { required: true, message: "请选择用户的角色", trigger: "blur" },
                ],
                password: [
                { required: true, message: "请输入地址", trigger: "blur" },
                ],
                account: [
                { required: true, message: "请选择用户的部门", trigger: "blur" },
                ],
            },
            options: [
              {
                value: '总经理',
                label: '总经理'
                },
                {
                value: '秘书',
                label: '秘书'
                }, {
                value: '董事长',
                label: '董事长'
            }
            ],
        }
    },
    created(){
      let data = api.showFile('operatorManagement')
      if (data == null || data == undefined) {
        this.total = this.tableList.length
        return
      }
      this.tableList = data
      this.total = this.tableList.length
      
    },
    methods:{
        //监听row-click事件，实现选中
        rowClick(row, column, event) {
          this.$refs.serveTable.toggleRowSelection(row)
        },
        showOperator(){
            if (this.multipleSelection == 0) {
                this.$message.error('请选择一条数据')
                return
            }
            this.user = this.multipleSelection[0]
            this.dialogTitle = '查看'
            this.dialogVisible = true
        },
        deleteOperator(){
            if (this.multipleSelection.length == 0) {
                this.$message.error('请选择一条数据')
                return
            }
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.listLoading = true
              setTimeout(() => {
              this.tableList.splice(this.multipleSelection[0],1)
              api.saveFile(this.tableList,'operatorManagement')
              this.total = this.tableList.length
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$refs.serveTable.clearSelection()
              this.listLoading = false
              }, 500);
             
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
        });
        },
        editOperator(){
            if (this.multipleSelection.length == 0) {
                this.$message.error('请选择一条数据')
                return
            }
            this.user = this.multipleSelection[0]
            this.user.password = '00000'
            this.user.description = '无'
            this.dialogTitle = '修改'
            this.dialogVisible = true
        },
        addOperator(){
            this.dialogTitle = '增加'
            this.dialogVisible = true
            this.user = {}
        },
        confirm(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            this.listLoading = true
            this.dialogVisible = false
            if(this.dialogTitle == '增加'){
              setTimeout(() => {
              this.$message.success('增加成功')
              this.tableList.push(this.user)
              api.saveFile(this.tableList,'operatorManagement')
              this.listLoading = false
              this.total = this.tableList.length
              }, 500);
            }else if(this.dialogTitle == '修改'){
              setTimeout(() => {
              this.$message.success('修改成功')
              this.multipleSelection[0] = this.user
              api.saveFile(this.tableList,'operatorManagement')
              this.listLoading = false
              }, 500);
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        },
        //角色选择的chang事件
        selectDisposeCode(ids) {   
        
        },
        //table的选择
        tableChange(val) {
        if (val.length > 1) {
        this.$refs.serveTable.clearSelection();
        this.$refs.serveTable.toggleRowSelection(val.pop());
        } else {
            this.multipleSelection = val;
        }
        },
        handleSizeChange(){},
        handleCurrentChange(){},
        handleQueryByPage(){},
    }
}
</script>