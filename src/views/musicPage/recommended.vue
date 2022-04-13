<template>
  <div>
    <div style="margin-left:10px" class="filter-container">
      <div style="display: flex;margin-top:20px">
        <el-button
          class="filter-item"
          type="primary"
          @click="addRecommended"
        >从主表中添加歌曲</el-button>
        <el-button
          class="filter-item"
          type="primary"
          @click="deleteRecommended"
        >移除</el-button>
      </div>
    </div>
    <el-table
      ref="serveTable"
      v-loading="listLoading"
      :data="tableList"
      style="width: 100%;margin-top:20px"
      border
      @selection-change="tableChange"
      @row-click="rowClick"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column align="center" label="序号" type="index" width="50" />
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
          <img style="width:60px;height:60px" :src="row.musicCover">
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
          {{ row.musicType }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否上线" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.musicStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
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
      :fullscreen="true"
    >
      <el-button type="primary" @click="addSingIn">添加</el-button>
      <div style="width:100%;height:220px">
        <el-table
          ref="serveTableSing"
          v-loading="listLoadingSing"
          :data="tableListSing"
          style="width: 70%"
          border
          @selection-change="tableChangeSing"
          @row-click="rowClickSing"
        >
          <el-table-column type="selection" width="40" />
          <el-table-column align="center" label="序号" type="index" width="50" />
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
              {{ row.musicType }}
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
              />
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
      <div v-if="tableShow">
        <h1>以下是选中的歌曲:</h1>
        <el-table :data="tableListCh" border style="width: 65%;margin-top:20px">
          <el-table-column align="center" label="序号" type="index" width="50" />
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
              {{ row.musicType }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="tableShow" style="text-align: center;margin-top:30px">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSing">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import {default as api} from '../../store/saveData'
export default {
  data() {
    return {
      dialogTitle: '增加',
      multipleSelection: [],
      multipleSelectionSing: [],
      multipleSelectionCh: [],
      inputDisabled: false,
      user: {},
      dialogVisible: false,
      listLoading: false,
      listLoadingSing: false,
      total: 0,
      totalSing: 0,
      Query: {
        start: 0,
        num: 2
      },
      singQuery: {
        start: 0,
        num: 2
      },
      tableList: [],
      tableListCh: [],
      tableListSing: [],
      tableShow: false
    }
  },
  created() {
    this.handleQueryByPage()
  },
  methods: {
    handleDelete(index, row) {
      this.tableListCh.splice(row, 1)
      this.$refs.serveTableSing.clearSelection(row)
    },
    addSingIn() {
      if (this.multipleSelectionSing.length === 0) {
        this.$message.error('请在主表选择要添加的歌曲')
        return
      }
      this.tableShow = true
      const data = this.multipleSelectionSing
      this.tableListCh = data
    },
    // 监听row-click事件，实现选中
    rowClick(row, column, event) {
      this.$refs.serveTable.toggleRowSelection(row)
    },
    rowClickSing(row, column, event) {
      this.$refs.serveTableSing.toggleRowSelection(row)
    },
    showOperator() {
      if (this.multipleSelection === 0) {
        this.$message.error('请选择一条数据')
        return
      }
      this.user = this.multipleSelection[0]
      this.dialogTitle = '查看'
      this.dialogVisible = true
    },
    deleteRecommended() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择一条数据')
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          this.$axios
            .delete(
              `/api/recommend/deleteSingRecommend/?id=` +
                this.multipleSelection[0].id
            )
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleQueryByPage()
              this.listLoading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addRecommended() {
      this.dialogTitle = '选择歌曲进行添加'
      this.tableShow = false
      this.dialogVisible = true
      this.handleQueryByPageSing()
      // this.user = {}
    },
    confirmSing() {
      const data = this.tableListCh
      this.$axios
        .post(`/api/recommend/batchInsertRecommend`, data)
        .then(response => {
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.handleQueryByPage()
        })
        .catch(response => {
          console.log(response)
        })
    },
    // 角色选择的chang事件
    selectDisposeCode(ids) {},
    // table的选择
    tableChange(val) {
      if (val.length > 1) {
        this.$refs.serveTable.clearSelection()
        this.$refs.serveTable.toggleRowSelection(val.pop())
      } else {
        this.multipleSelection = val
      }
    },
    // 主表table的选择
    tableChangeSing(val) {
      this.multipleSelectionSing = val
    },
    handleSizeChangeSing() {},
    handleCurrentChangeSing(current) {
      var m = new Map([[1, 0], [2, 5], [3, 10], [4, 15], [5, 20], [6, 25]])
      this.singQuery.start = m.get(current)
      this.handleQueryByPageSing()
    },
    handleSizeChange() {},
    handleCurrentChange(current) {
      var m = new Map([[1, 0], [2, 5], [3, 10], [4, 15], [5, 20], [6, 25]])
      this.Query.start = m.get(current)
      this.handleQueryByPage()
    },
    handleQueryByPage() {
      this.listLoading = true
      this.$axios
        .get('/api/recommend/queryAllRecommend/?start=' + this.Query.start)
        .then(response => {
          this.tableList = response.data.data.map(e => {
            e.musicStatus = Boolean(e.musicStatus)
            return e
          })
          this.tableList = response.data.data
          this.total = response.data.paging.total[0].total
          this.listLoading = false
        })
        .catch(response => {
          console.log(response)
        })
    },
    handleQueryByPageSing() {
      this.listLoadingSing = true
      this.$axios
        .get('/api/music/queryAllMusic/?start=' + this.singQuery.start)
        .then(response => {
          this.tableListSing = response.data.data.map(e => {
            e.musicStatus = Boolean(e.musicStatus)
            return e
          })
          const newArr = this.tableListSing.filter(item => {
            return !this.tableList.some(ele => ele.musicName === item.musicName)
          })
          this.tableListSing = newArr
          this.totalSing = response.data.paging.total[0].total
          this.listLoadingSing = false
        })
        .catch(response => {
          console.log(response)
        })
    }
  }
}
</script>
