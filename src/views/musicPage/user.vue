<template>
    <div style="margin-left:10px">
        <div class="filter-container" style="margin-top:20px">
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
            <el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="50"
            >
            </el-table-column>
            <el-table-column align="center" label="账号" width="120">
              <template slot-scope="{ row }">
                {{ row.acc }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="姓名" width="160">
              <template slot-scope="{ row }">
                {{ row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="性别" width="100">
              <template slot-scope="{ row }">
                {{ row.sex }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="职务" width="120">
              <template slot-scope="{ row }">
                {{ row.work }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="角色" width="120">
              <template slot-scope="{ row }">
                {{ row.role }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="地址" width="160">
              <template slot-scope="{ row }">
                {{ row.adress }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="电话">
              <template slot-scope="{ row }">
                {{ row.tel }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="描述">
              <template slot-scope="{ row }">
                {{ row.des }}
              </template>
            </el-table-column>
          </el-table>
          <!-- 主表的分页 -->
          <el-pagination
            :current-page="Query.current"
            :page-sizes="[5]"
            :page-size="Query.size"
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
        <el-form-item label="账号" prop="bianhao">
          <el-input
            v-model="user.acc"
            style="width: 100%"
            :disabled="inputDisabled"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item label="密码" prop="psd">
          <el-input
            v-model="user.psd"
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
        <el-form-item label="联系电话" prop="phone">
          <el-input
            v-model="user.tel"
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
        <el-form-item label="地址" prop="phone">
          <el-input
            v-model="user.adress"
            style="width: 100%"
            :disabled="inputDisabled"
          />
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
            v-model="user.des"
          >
          </el-input>
        </el-form-item>
      </el-row>
        </el-form>
      <div style="text-align: center" v-if="!inputDisabled">
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
            user:{
              acc:'212',
              psd:'212',
              name:'212',
              role:'212',
              tel:'212',
              des:'212',
              adress:'212',
            },
            dialogVisible:false,
            listLoading:false,
            total:0,
            Query:{
              start:0,
              num:2,
            },
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
                psd: [
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
      this.handleQueryByPage()
      // let data = api.showFile('operatorManagement')
      // if (data == null || data == undefined) {
      //   this.total = this.tableList.length
      //   return
      // }
      // this.tableList = data
      // this.total = this.tableList.length
      
    },
    methods:{
        //监听row-click事件，实现选中
        rowClick(row, column, event) {
          this.$refs.serveTable.toggleRowSelection(row)
        },
        getUserMsg(id){
          this.$axios.get(`/api/user/querySingleUser/?id=` + id).then((response)=>{
            this.user = response.data.data[0]
          }).catch((response)=>{
            console.log(response);
          })
        },
        async showOperator(){
            if (this.multipleSelection == 0) {
                this.$message.error('请选择一条数据')
                return
            }
            await this.getUserMsg(this.multipleSelection[0].id)
            this.inputDisabled = true
            this.dialogTitle = '查看'
            this.dialogVisible = true
        },
        async deleteOperator(){
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
              this.$axios.delete(`/api/user/deleteSingUser/?id=` + this.multipleSelection[0].id).then((response)=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            this.handleQueryByPage()
              this.listLoading = false
            }).catch((response)=>{
              this.listLoading = false
              this.$message({
                type: 'info',
                message: '删除error'
              });    
            })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
        });
        },
        async editOperator(){
            if (this.multipleSelection.length == 0) {
                this.$message.error('请选择一条数据')
                return
            }
            await this.getUserMsg(this.multipleSelection[0].id)
            this.inputDisabled = false
            this.dialogTitle = '编辑'
            this.dialogVisible = true
        },
        addOperator(){
            this.dialogTitle = '增加'
            this.inputDisabled = false
            this.dialogVisible = true
            // this.user = {}
        },
        confirm(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = this.$qs.stringify(this.user)
            this.listLoading = true
            this.dialogVisible = false
            if(this.dialogTitle == '增加'){
              this.$axios.post(`/api/user/addSingUser`,data).then((response)=>{
                this.$message.success('添加成功')
                this.handleQueryByPage()
              }).catch((response)=>{
                console.log(response);
              })
            }else if(this.dialogTitle == '编辑'){
              this.$axios.post(`/api/user/editSingUser`,data).then((response)=>{
                this.$message.success('更新成功')
                this.handleQueryByPage()
              }).catch((response)=>{
                console.log(response);
              })
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
            console.log(val);
        }
        },
        handleSizeChange(){},
        handleCurrentChange(current){
          var m = new Map([[1, 0], [2, 5], [3, 10], [4, 15], [5, 20], [6, 25]]);
          this.Query.start =  m.get(current);
          console.log(this.Query.start);
          this.handleQueryByPage()
        },
        handleQueryByPage(){
          this.listLoading = true
          this.$axios.get('/api/user/queryAllUser/?start=' + this.Query.start).then((response)=>{
            this.tableList = response.data.data;
            this.total = response.data.paging.total[0].total
            this.listLoading = false
          }).catch((response)=>{
            console.log(response);
          })
        },
    }
}
</script>