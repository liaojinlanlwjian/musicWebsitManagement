<template>
    <div>
        <div style="margin-left:10px" class="filter-container">
            <div style="display: flex;margin-top:20px">
              <el-button class="filter-item" type="primary"  @click="addSingr"
                >增加歌手</el-button
              >
              <el-button class="filter-item" type="primary" @click="showMusic"
                >查看歌手歌曲</el-button
              >
              <el-button class="filter-item" type="primary" @click="editSInger"
                >修改</el-button
              >
              <el-button class="filter-item" type="primary" @click="deleteSinger"
                >移除</el-button
              >
            </div>
          </div>
          <el-table
            :data="tableList"
            @selection-change="tableChange"
            style="width: 100%;margin-top:20px;margin-left:12px"
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
            <el-table-column align="center" label="歌手" min-width="140">
              <template slot-scope="{ row }">
                {{ row.singer_name }}

              </template>
            </el-table-column>
            <el-table-column align="center" label="歌手图片" min-width="200">
              <template slot-scope="{ row }">
                <img
                    style="min-width:60px;height:60px;border-radius:50%"
                    :src="row.singer_pic">
              </template>
            </el-table-column>
            <el-table-column align="center" label="歌手信息" min-width="120">
              <template slot-scope="{ row }">
                {{ row.singer_msg }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="歌手所在地区" min-width="140">
              <template slot-scope="{ row }">
                {{ row.singer_place }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建者" min-width="140">
             <template slot-scope="{ row }">
                {{ row.create_by }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" min-width="140">
             <template slot-scope="{ row }">
                {{ row.create_time }}
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
        :model="singer"
        ref="singer"
        :rules="rules"
        label-width="100px"
        label-position="left"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
     
         <div style="width:100%;text-align:center;margin-bottom:15px">
           <div style="width:100px;height:100px;border-radius:100px;background:#fafafa;margin:auto;box-shadow:2px 2px 10px #909090;">
            <img :src="touxiangSrc" style="width:100%;height:100%;border-radius:100px" >
          </div>
        <el-button round size="mini" style="margin-top:10px" @click="selectPic">更换默认歌手图片</el-button>
         </div>
          
        <el-form-item label="歌手姓名" prop="singer_name">
          <el-input
            v-model="singer.singer_name"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="歌手简介" prop="singer_msg">
          <el-input
            v-model="singer.singer_msg"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="所在地区">
          <el-input
            v-model="singer.singer_place"
            style="width: 100%"
          />
        </el-form-item>
        </el-form>
      <div style="text-align: center" >
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm('singer')">确认</el-button>
      </div>
      </el-dialog>
      <el-dialog
      :visible.sync="uploadDialog"
      title="上传图片"
      >
      <el-upload
  class="upload-demo"
  ref="upload"
  action=""
  :on-change="changeFile"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器</el-button>
</el-upload>
      </el-dialog>
        <!-- 歌手音乐 -->
        <el-dialog
        :visible.sync="singerMusicDialog"
        title=""
        :fullscreen="true"
        :modal-append-to-body="true"
        
        >
     <musicList
     :singer-name="singerName"
     ></musicList>
      </el-dialog>
    </div>
</template>
<script>
import {getTime} from '../../utils/getCurrentTime'
import musicList from '../musicPage/musicmange.vue'
export default {
    components:{
        musicList
    },
    data(){
        return{
            singerName:'',
            singerMusicDialog:false,
            uploadDialog:false,
            fileList:[],
            touxiangSrc:'http://localhost:3001/img/1648969137940.jpeg',
            dialogTitle:'增加',
            multipleSelection:[],
            inputDisabled:false,
            singer:{
                place:'中国',
            },
            dialogVisible:false,
            listLoading:false,
            loading:false,
            total:0,
            Query:{
              start:0,
              num:2,
            },
            tableList:[],
            rules:{
                 singer_name: [
                { required: true, message: "歌手名称不能为空", trigger: "blur" },
                ],
                singer_msg: [
                { required: true, message: "歌手简介不能为空", trigger: "blur" },
                ],
            },
        }
    },
    created(){
      this.handleQueryByPage()
    },
    methods:{
        //查看歌手的歌曲
        showMusic(){
            if (this.multipleSelection.length == 0) {
                this.$message.error('请选择一条数据')
                return
            }
            this.singerMusicDialog = true
            this.singerName =  this.multipleSelection[0].singer_name
            console.log(this.singerName);
        },
        //监听row-click事件，实现选中
        rowClick(row, column, event) {
          this.$refs.serveTable.toggleRowSelection(row)
        },
        deleteSinger(){
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
              this.$axios.delete(`/api/singer/deleteSinger/?id=` + this.multipleSelection[0].id).then((response)=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            this.handleQueryByPage()
              this.listLoading = false
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
        });
        },
        editSInger(){
            if (this.multipleSelection.length == 0) {
                this.$message.error('请选择数据')
                return
            }
             this.dialogTitle = '编辑'
            this.dialogVisible = true
            console.log(this.multipleSelection);
            this.singer = this.multipleSelection[0]
        },
        addSingr(){
            this.dialogTitle = '增加'
            this.dialogVisible = true
            this.singer = {}
        },
        // 获取单个歌手学习
        async querySinger(id){
            let res = await this.$axios.get(`/api/singer/getSinger/?id=` + id)
            this.singer = res.data.data[0]
        },
        confirm(formName){
         this.$refs[formName].validate((valid) => {
          if (valid) {
              this.singer['src'] = this.touxiangSrc
              this.singer['user'] = 'admin'
              this.singer['time'] = getTime()
           let data = this.$qs.stringify(this.singer)
           if (this.dialogTitle == '增加') {
                this.$axios.post(`/api/singer/addSinger`,data).then((response)=>{
                this.$message.success('添加成功')
                this.dialogVisible = false
                this.handleQueryByPage()
              }).catch((response)=>{
                console.log(response);
              })
           }
           else if(this.dialogTitle == '编辑'){
               this.$axios.post(`/api/singer/editSinger`,data).then((response)=>{
                this.$message.success('编辑成功')
                this.dialogVisible = false
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
          this.$axios.get('/api/singer/queryByPageSinger/?start=' + this.Query.start).then((response)=>{
             this.tableList = response.data.data;
            this.total = response.data.paging.total[0].total
            this.listLoading = false
          }).catch((response)=>{
            console.log(response);
          })
        },
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
            this.touxiangSrc ='http://localhost:3001' + res.data.data
          }).catch((err)=>{
            this.$message.error('上传失败，请重试')
          })
          return
          },
    }
}
</script>