<template>
  <div style="margin-left: 10px">
    <div style="margin-top: 20px" class="filter-container">
      <div style="display: flex">
        <el-button class="filter-item" type="primary" @click="showOperator"
          >查看</el-button
        >
        <el-button class="filter-item" type="primary" @click="addOperator"
          >增加</el-button
        >
        <el-button class="filter-item" type="primary" @click="editOperator"
          >修改</el-button
        >
        <el-button class="filter-item" type="danger" @click="deleteOperator"
          >删除</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableList"
      @selection-change="tableChange"
      style="width: 100%; margin-top: 20px"
      border
      ref="serveTable"
      v-loading="listLoading"
      @row-click="rowClick"
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column align="center" label="序号" type="index" width="50">
      </el-table-column>
      <el-table-column align="center" label="歌曲名称" width="147">
        <template slot-scope="{ row }">
          {{ row.musicName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="歌手" width="140">
        <template slot-scope="{ row }">
          {{ row.musicSinger }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="音乐封面" width="200">
        <template slot-scope="{ row }">
          <img style="width: 60px; height: 60px" :src="row.musicCover" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="访问量" width="120">
        <template slot-scope="{ row }">
          {{ row.musicTraffic }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="下载量" width="120">
        <template slot-scope="{ row }">
          {{ row.musicDownloads }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者" width="140">
        <template slot-scope="{ row }">
          {{ row.musicAuthor }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="歌曲类型" width="140">
        <template slot-scope="{ row }">
          <el-tag type="success">{{ row.musicType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否上线" width="140">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.musicStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
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
      :modal-append-to-body="false"
    >
      <el-form
        :model="music"
        :rules="rules"
        ref="music"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-form-item label="歌曲名称" prop="bianhao">
                <el-input
                  v-model="music.musicName"
                  style="width: 100%"
                  :disabled="inputDisabled"
                />
              </el-form-item>
              <el-form-item label="歌曲作者">
                <el-input
                  v-model="music.musicAuthor"
                  style="width: 100%"
                  :disabled="inputDisabled"
                />
              </el-form-item>
              <el-form-item label="歌手">
                <el-input
                  v-model="music.musicSinger"
                  style="width: 100%"
                  :disabled="inputDisabled"
                />
              </el-form-item>
              <el-form-item label="歌曲访问量">
                <el-input
                  v-model="music.musicTraffic"
                  style="width: 100%"
                  :disabled="inputDisabled"
                />
              </el-form-item>
              <el-form-item label="歌曲信息" prop="roleIds">
                <el-input
                  v-model="music.musicMsg"
                  style="width: 100%"
                  :disabled="inputDisabled"
                />
              </el-form-item>
              <el-form-item label="歌曲类型" prop="roleIds">
                <el-select
                  v-model="music.musicType"
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
              <el-form-item label="是否上线">
                <el-switch
                  v-model="music.musicStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="1"
                  inactive-value="0"
                >
                </el-switch>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="11" style="margin-left: 55px">
            <div class="grid-content bg-purple">
              <el-form-item label="歌曲下载量">
                <el-input
                  v-model="music.musicDownloads"
                  style="width: 100%"
                  :disabled="inputDisabled"
                />
              </el-form-item>
              <el-form-item label="歌曲API" prop="phone">
                <el-input
                  v-model="music.musicApi"
                  style="width: 100%"
                  :disabled="inputDisabled"
                />
              </el-form-item>
              <el-form-item label="歌曲封面">
                <el-button type="primary" @click="selectPic" size="mini"
                  >上传歌曲封面</el-button
                >
                <!-- <el-input
            v-model="music.musicCover"
            style="width: 100%"
            :disabled="inputDisabled"
          /> -->
              </el-form-item>
              <el-form-item label="歌曲封面">
                <img
                  style="width: 200px; height: 200px; margin: 12px"
                  :src="music.musicCover"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="歌词" prop="description">
            <el-input
              :disabled="inputDisabled"
              style="width: 100%"
              type="textarea"
              :rows="4"
              placeholder="请输入歌词"
              v-model="music.des"
            >
            </el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div style="text-align: center" v-if="!inputDisabled">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm('music')">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="uploadDialog" title="上传图片">
      <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :on-change="changeFile"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="upload"
          >上传到服务器</el-button
        >
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import { defaults } from 'js-cookie'
// import {default as api} from '../../store/saveData'
export default {
  props:{
    singerName:{
      type:String,
    }
  },
    data(){
        return{
          tableList:[],
          chooseFile:{},
          fileList:[],
          uploadDialog:false,
            dialogTitle:'增加',
            multipleSelection:[],
            inputDisabled:false,
            music:{
              musicStatus:false,
              musicCover:'',
              musicAuthor:''
            },
            dialogVisible:false,
            listLoading:false,
            total:0,
            Query:{
              start:0,
              num:2,
            },
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
                value: '情歌',
                label: '情歌'
                },
                {
                value: '摇滚',
                label: '摇滚'
                },
                {
                value: '电音',
                label: '电音'
                },{
                value: '外国',
                label: '外国'
                }, {
                value: '古风',
                label: '古风'
            }
            ],
        }
    },
    watch:{
      singerName:{
        handler(val){
          if (val) {
            console.log(val);
            this.handleQueryByPage()
          }
        }
      }
    },
    created(){
     this.handleQueryByPage()
     
    },
        methods:{
        selectPic(){
          this.uploadDialog = true
        },
        changeFile(file){
          this.chooseFile = file
        },
        upload(){    
          if (Object.keys(this.chooseFile).length == 0) {
            this.$message.error('请先选择图片')
            return
          }       
          var formData = new FormData()
          //创建formdata对象
          formData.append("file",this.chooseFile.raw)  
          // 将文件信息 append 进入formdata对象  key值 为后台 single 设置的值  
          this.$axios.post('/api/music/upload',formData,{
            Headers:{
              "Content-Type":"multipart/form-data"
            }
          }).then(res=>{
            this.uploadDialog = false
            this.$message.success('上传成功')
            this.music.musicCover ='http://localhost:3001' + res.data.data
          }).catch((err)=>{
            this.$message.error('上传失败，请重试')
          })
          return
          },
        //监听row-click事件，实现选中
        rowClick(row, column, event) {
          this.$refs.serveTable.toggleRowSelection(row)
        },
        getUserMsg(id){
          this.$axios.get(`/api/music/querySingleMusic/?id=` + id).then((response)=>{
            this.music = response.data.data[0]
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
              this.$axios.delete(`/api/music/deleteSingMusic/?id=` + this.multipleSelection[0].id).then((response)=>{
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
            this.music.musicSinger = this.singerName
        },
        confirm(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.music.musicStatus == false) {
              this.music.musicStatus = 0
            }else{
              this.music.musicStatus = 1
            }
            let data = this.$qs.stringify(this.music)
            this.listLoading = true
            this.dialogVisible = false
            if(this.dialogTitle == '增加'){
              this.$axios.post(`/api/music/addSingMusic`,data).then((response)=>{
                this.$message.success('添加成功')
                this.handleQueryByPage()
                this.fileList = []
              }).catch((response)=>{
                console.log(response);
              })
            }else if(this.dialogTitle == '编辑'){
              this.$axios.post(`/api/music/editSingMusic`,data).then((response)=>{
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
         this.handleQueryByPage()
        },
        handleQueryByPage(){
          this.listLoading = true
          if (this.singerName == undefined) {
            this.$axios.get('/api/music/queryAllMusic/?start=' + this.Query.start).then((response)=>{
            this.tableList = response.data.data
            this.total = response.data.paging.total[0].total
            this.listLoading = false
          }).catch((response)=>{
            console.log(response);
          })
          }else{
            console.log(this.singerName);
            this.$axios.get('/api/music/getSingerMusic/?singerName=' + this.singerName).then((response)=>{
            this.tableList = response.data.data
            this.total = response.data.data.length
            this.listLoading = false
          }).catch((response)=>{
            console.log(response);
          })
          }
            
        },
    }
}
</script>