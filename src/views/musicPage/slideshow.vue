<template>
  <div style="margin-left: 10px">
    <div style="margin-top: 20px" class="filter-container">
      <div style="display: flex">
        <el-button class="filter-item" type="primary" @click="addSildesShow"
          >增加</el-button
        >
        <el-button class="filter-item" type="danger" @click="deleteSildesShow"
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
      <el-table-column align="center" label="轮播图" width="500">
        <template slot-scope="{ row }">
          <img style="width: 360px; height: 120px" :src="row.src" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="轮播图alt" width="140">
        <template slot-scope="{ row }">
          {{ row.alt }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建者" width="140">
        <template slot-scope="{ row }">
          {{ row.created_by }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="140">
        <template slot-scope="{ row }">
          {{ row.created_time }}
        </template>
      </el-table-column>
    </el-table>
     <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      :modal-append-to-body="false"
    >
      <el-form
        :model="sildesShow"
        label-width="100px"
        label-position="left"
      >
              <el-form-item label="轮播图alt" prop="bianhao">
                <el-input
                  v-model="sildesShow.alt"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item label="轮播图">
                <el-button type="primary" @click="selectPic" size="mini"
                  >上传轮播图封面</el-button
                >
              </el-form-item>
              <el-form-item label="轮播图封面">
                <img
                  style="width: 500px; height: 200px; margin: 12px"
                  :src="sildesShow.src"
                />
              </el-form-item>
      </el-form>
      <div style="text-align: center" >
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="uploadDialog" title="上传轮播图">
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
import { getTime } from "../../utils/getCurrentTime";
export default {
  data() {
    return {
        sildesShow:{
            src:'http://localhost:3001/img/1649079527182.jpeg'
        },
      tableList: [],
      listLoading: false,
      multipleSelection: [],
      dialogTitle: "",
      dialogVisible: false,
      chooseFile: {},
      fileList: [],
      uploadDialog: false,
    };
  },
  mounted() {
    this.handleQueryByPage();
  },
  methods: {
      confirm(){
        this.sildesShow['time'] = getTime()
        this.sildesShow['user'] = 'admin'
        let data = this.$qs.stringify(this.sildesShow)
        this.$axios.post(`/api/slideshow/addslideshow`,data).then((response)=>{
                this.$message.success('添加成功')
                this.handleQueryByPage()
                this.fileList = []
                this.dialogVisible = false
              }).catch((response)=>{
                console.log(response);
              })
      },
    addSildesShow() {
      this.dialogTitle = "增加";
      this.dialogVisible = true;
      this.sildesShow = {}
    },
    deleteSildesShow() {
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
              this.$axios.delete(`/api/slideshow/deleteslideshow/?id=` + this.multipleSelection[0].id).then((response)=>{
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
    handleQueryByPage() {
      this.listLoading = true;
      this.$axios
        .get("/api/slideshow/getslideshow")
        .then((response) => {
          this.tableList = response.data.data;
          this.listLoading = false;
        })
        .catch((response) => {
          console.log(response);
        });
    },

    selectPic() {
      this.uploadDialog = true;
    },
    changeFile(file) {
      this.chooseFile = file;
    },
    upload() {
      if (Object.keys(this.chooseFile).length == 0) {
        this.$message.error("请先选择图片");
        return;
      }
      var formData = new FormData();
      //创建formdata对象
      formData.append("file", this.chooseFile.raw);
      // 将文件信息 append 进入formdata对象  key值 为后台 single 设置的值
      this.$axios
        .post("/api/music/upload", formData, {
          Headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.uploadDialog = false;
          this.$message.success("上传成功");
          this.sildesShow.src = "http://localhost:3001" + res.data.data;
        })
        .catch((err) => {
          this.$message.error("上传失败，请重试");
        });
      return;
    },
    //监听row-click事件，实现选中
    rowClick(row, column, event) {
      this.$refs.serveTable.toggleRowSelection(row);
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
  },
};
</script>

<style>
</style>