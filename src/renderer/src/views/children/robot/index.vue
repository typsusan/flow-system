<template>
  <div class="robot-main">
    <el-row>
      <el-col :span="24">
        <div class="desktop-main-title">
          <h2>机器人列表矩阵</h2>
        </div>
      </el-col>
    </el-row>

    <!-- 条件搜索区域 -->
    <el-form :model="searchForm" class="search-form" style="margin-left: 30px;margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="searchForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址">
            <el-input v-model="searchForm.address" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-col>
        <el-button @click="handleSearch">添加</el-button>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="default" @click="resetSearch">重置</el-button>
      </el-row>

    </el-form>

    <!-- 表格区域 -->
    <el-row style="margin-left: 30px;">
      <el-col :span="24">
        <el-table
          :data="filteredTableData"
          style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-row style="text-align: center">
      <el-col :span="24" style="padding-top: 15px; display: flex; justify-content: center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredTableData.length">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '张小明', address: '北京市朝阳区建国路 12 号' },
        { date: '2016-05-03', name: '李小红', address: '广州市天河区珠江新城 6 号' }
      ],
      searchForm: {
        name: '',
        address: '',
        date: ''
      },
      currentPage: 1,
      pageSize: 5,
      filteredData: [] // 用于条件查询后的数据
    };
  },
  computed: {
    filteredTableData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.filteredData.slice(startIndex, startIndex + this.pageSize);
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1; // 切换每页数量时重置为第一页
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSearch() {
      this.filteredData = this.tableData.filter((item) => {
        const matchesName = this.searchForm.name
          ? item.name.includes(this.searchForm.name)
          : true;
        const matchesAddress = this.searchForm.address
          ? item.address.includes(this.searchForm.address)
          : true;
        const matchesDate = this.searchForm.date
          ? new Date(item.date) >= new Date(this.searchForm.date[0]) &&
          new Date(item.date) <= new Date(this.searchForm.date[1])
          : true;
        return matchesName && matchesAddress && matchesDate;
      });
      this.currentPage = 1; // 查询后重置分页
    },
    resetSearch() {
      this.searchForm = { name: '', address: '', date: '' };
      this.filteredData = this.tableData;
      this.currentPage = 1;
    }
  },
  created() {
    // 初始化数据
    this.filteredData = this.tableData;
  }
};
</script>

<style>
.robot-main {
  width: 100%;
  height: auto;
}
.desktop-main-title {
  width: auto;
  height: 100px;
  line-height: 100px;
  margin-left: 30px;
}
.search-form {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
