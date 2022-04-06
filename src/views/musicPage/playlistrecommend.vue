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
        <el-button class="filter-item" type="info" @click="showmusic"
          >查看歌单音乐</el-button
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
      <el-table-column align="center" label="歌单名称" width="340">
        <template slot-scope="{ row }">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="歌单信息" width="240">
        <template slot-scope="{ row }">
          {{ row.msg }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="歌单封面" width="200">
        <template slot-scope="{ row }">
          <img style="width: 60px; height: 60px" :src="row.cover" />
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
      <el-table-column align="center" label="是否上线" width="140">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.playlistStatus"
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
        :model="playlist"
        :rules="rules"
        ref="playlist"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <div class="grid-content bg-purple">
            <el-form-item label="歌单名称" prop="name">
              <el-input
                v-model="playlist.name"
                style="width: 100%"
                :disabled="inputDisabled"
              />
            </el-form-item>
            <el-form-item label="歌单信息" prop="msg">
              <el-input
                v-model="playlist.msg"
                style="width: 100%"
                :disabled="inputDisabled"
              />
            </el-form-item>
          </div>
          <div class="grid-content bg-purple">
            <el-form-item label="歌单封面">
              <el-button type="primary" @click="selectPic" size="mini"
                >上传歌单封面</el-button
              >
            </el-form-item>
            <el-form-item label="歌单封面" prop="cover">
              <img
                style="width: 200px; height: 200px; margin: 12px"
                :src="playlist.cover"
              />
            </el-form-item>
          </div>
        </el-row>
      </el-form>
      <div style="text-align: center" v-if="!inputDisabled">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm('playlist')">确认</el-button>
      </div>
    </el-dialog>
    <!-- 歌单包含音乐弹窗 -->
    <el-dialog
      :visible.sync="dialogVisiblePlaylist"
      :title="dialogTitlePlaylist"
      :modal-append-to-body="false"
      width="70%"
    >
      <el-button @click="addmusic" style="margin:20px">增加音乐</el-button>
      <el-table :data="tableListPlayList" v-loading="playListLoading" border style="width: 100%">
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
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDeletePlayList(scope.$index, scope.row)"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 上传图片 -->
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
    <!-- 增加音乐弹窗 -->
    <el-dialog
      :visible.sync="dialogVisibleAddMusic"
      :title="dialogTitleAddMusic"
      :fullscreen="true"
    >
      <el-button type="primary" @click="addSingIn">添加</el-button>
      <div style="width: 100%; height: 220px">
        <el-table
          :data="tableListSing"
          @selection-change="tableChangeSing"
          style="width: 70%"
          border
          ref="serveTableSing"
          v-loading="listLoadingSing"
          @row-click="rowClickSing"
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
        <!-- 歌曲总表的分页 -->
        <el-pagination
          :current-page="singQuery.current"
          :page-sizes="[5]"
          :page-size="singQuery.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSing"
          @size-change="handleSizeChangeSing"
          @current-change="handleCurrentChangeSing"
          @pagination="handleQueryByPageSing"
        />
      </div>
      <div style="margin-top: 120px" v-if="tableShow">
        <h1>以下是选中的歌曲:</h1>
        <el-table :data="tableListCh" border style="width: 65%">
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
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >移除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center; margin-top: 30px" v-if="tableShow">
        <el-button type="danger" @click="dialogVisibleAddMusic = false"
          >取消</el-button
        >
        <el-button type="primary" @click="confirmSing">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { defaults } from "js-cookie";
// import {default as api} from '../../store/saveData'
import { getTime } from "../../utils/getCurrentTime";
export default {
  props: {
    singerName: {
      type: String,
    },
  },
  data() {
    return {
      playListLoading:false,
      tableListPlayList: [],
      dialogVisiblePlaylist: false,
      dialogTitlePlaylist: "",
      tableListCh: [],
      totalSing: 0,
      listLoadingSing: false,
      multipleSelectionSing: [],
      tableListSing: [],
      tableShow: false,
      dialogTitleAddMusic: "",
      dialogVisibleAddMusic: false,
      tableList: [],
      chooseFile: {},
      fileList: [],
      singQuery: {
        start: 0,
        num: 2,
      },
      uploadDialog: false,
      dialogTitle: "增加",
      multipleSelection: [],
      inputDisabled: false,
      playlist: {
        cover: "http://localhost:3001/img/1648864832508.jpeg",
      },
      dialogVisible: false,
      listLoading: false,
      total: 0,
      Query: {
        start: 0,
        num: 2,
      },
      rules: {
        name: [{ required: true, message: "请输入歌单名称", trigger: "blur" }],
        msg: [{ required: true, message: "请输入歌单信息", trigger: "blur" }],
        // cover: [
        // { required: true, message: "请上传歌单封面", trigger: "blur" },
        // ],
      },
    };
  },
  created() {
    this.handleQueryByPage();
  },
  methods: {
    handleDeletePlayList(index,row){
        this.$axios.delete(`/api/playlistmusic/deleteplaylistmusic/?id=` + row.id).then((response)=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            this.handleQueryPlayListMusic()
            })
    },
    showmusic() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择歌单");
        return;
      }
      this.handleQueryPlayListMusic()
      this.dialogVisiblePlaylist = true;
      this.dialogTitlePlaylist = this.multipleSelection[0].name + '  ' + '的歌单音乐'
     
    },
    handleQueryPlayListMusic(){
        this.playListLoading = true
         this.$axios
        .get(
          "/api/playlistmusic/queryByPageplaylistmusic/?playListId=" +
            this.multipleSelection[0].id
        )
        .then((response) => {
          this.tableListPlayList = response.data.data;
          this.playListLoading = false
        })
        .catch((response) => {
          console.log(response);
          this.playListLoading = false
        });
    },
    handleDelete(index, row) {
      this.tableListCh.splice(row, 1);
      this.$refs.serveTableSing.clearSelection(row);
    },
    addSingIn() {
      if(this.multipleSelectionSing.length == 0){
          this.$message.error("请选择数据");
          return
      }
      this.tableShow = true;
      let data = this.multipleSelectionSing;
      this.tableListCh = data;
    },
    confirmSing() {
      let data = this.tableListCh.map((e) => {
        e["playListId"] = this.multipleSelection[0].id;
        return e;
      });
      this.$axios
        .post(`/api/playlistmusic/addplaylistmusic`, data)
        .then((response) => {
          this.$message.success("添加成功");
          this.dialogVisibleAddMusic = false;
         this.handleQueryPlayListMusic()
        })
        .catch((response) => {
          console.log(response);
        });
    },
    //给歌单增加音乐
    addmusic() {
      this.dialogTitleAddMusic = "选择歌曲进行添加";
      this.tableShow = false;
      this.dialogVisibleAddMusic = true;
      this.handleQueryByPageSing();
    },
    handleQueryByPageSing() {
      this.listLoadingSing = true;
      this.$axios
        .get("/api/music/queryAllMusic/?start=" + this.singQuery.start)
        .then((response) => {
          this.tableListSing = response.data.data.map((e) => {
            e.musicStatus = Boolean(e.musicStatus);
            return e;
          });
          let newArr = this.tableListSing.filter((item) => {
            return !this.tableListPlayList.some(
              (ele) => ele.musicName === item.musicName
            );
          });
          this.tableListSing = newArr;
          this.totalSing = response.data.paging.total[0].total;
          this.listLoadingSing = false;
        })
        .catch((response) => {
          console.log(response);
        });
    },
    handleSizeChangeSing() {},
    handleCurrentChangeSing(current) {
      var m = new Map([
        [1, 0],
        [2, 5],
        [3, 10],
        [4, 15],
        [5, 20],
        [6, 25],
      ]);
      this.singQuery.start = m.get(current);
      this.handleQueryByPageSing();
    },
    //主表table的选择
    tableChangeSing(val) {
      this.multipleSelectionSing = val;
    },
    rowClickSing(row, column, event) {
      this.$refs.serveTableSing.toggleRowSelection(row);
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
          this.playlist.cover = "http://localhost:3001" + res.data.data;
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
    getUserMsg(id) {
      this.$axios
        .get(`/api/playlist/getSingplaylistcommend/?id=` + id)
        .then((response) => {
          this.playlist = response.data.data[0];
        })
        .catch((response) => {
          console.log(response);
        });
    },
    async showOperator() {
      if (this.multipleSelection == 0) {
        this.$message.error("请选择一条数据");
        return;
      }
      await this.getUserMsg(this.multipleSelection[0].id);
      this.inputDisabled = true;
      this.dialogTitle = "查看";
      this.dialogVisible = true;
    },
    async deleteOperator() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择一条数据");
        return;
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.listLoading = true;
          this.$axios
            .delete(
              `/api/playlist/deleteSingplaylistcommend/?id=` +
                this.multipleSelection[0].id
            )
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.handleQueryByPage();
              this.listLoading = false;
            })
            .catch((response) => {
              this.listLoading = false;
              this.$message({
                type: "info",
                message: "删除error",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async editOperator() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择一条数据");
        return;
      }
      await this.getUserMsg(this.multipleSelection[0].id);
      this.inputDisabled = false;
      this.dialogTitle = "编辑";
      this.dialogVisible = true;
    },
    addOperator() {
      this.dialogTitle = "增加";
      this.inputDisabled = false;
      this.dialogVisible = true;
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.playlist);
          this.playlist["user"] = "admin";
          this.playlist["time"] = getTime();
          let data = this.$qs.stringify(this.playlist);
          this.listLoading = true;
          this.dialogVisible = false;
          if (this.dialogTitle == "增加") {
            this.$axios
              .post(`/api/playlist/addSingplaylistcommend`, data)
              .then((response) => {
                this.$message.success("添加成功");
                this.handleQueryByPage();
                this.fileList = [];
              })
              .catch((response) => {
                console.log(response);
              });
          } else if (this.dialogTitle == "编辑") {
            this.$axios
              .post(`/api/playlist/editSingplaylistcommend`, data)
              .then((response) => {
                this.$message.success("更新成功");
                this.handleQueryByPage();
              })
              .catch((response) => {
                console.log(response);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //角色选择的chang事件
    selectDisposeCode(ids) {},
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
    handleSizeChange() {},
    handleCurrentChange(current) {
      var m = new Map([
        [1, 0],
        [2, 5],
        [3, 10],
        [4, 15],
        [5, 20],
        [6, 25],
      ]);
      this.Query.start = m.get(current);
      this.handleQueryByPage();
    },
    handleQueryByPage() {
      this.listLoading = true;
      this.$axios
        .get("/api/playlist/getAllplaylistcommend/?start=" + this.Query.start)
        .then((response) => {
          this.tableList = response.data.data;
          this.total = response.data.paging.total[0].total;
          this.listLoading = false;
          console.log(this.tableList);
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
};
</script>