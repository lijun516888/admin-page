<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div v-if="showSearch" class="filter-container">
      <el-form :inline="true" :model="listQuery" class="form-inline">
        <el-form-item label="">
          <el-input v-model="listQuery.userName" placeholder="用户名" clearable size="small"/>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="listQuery.isEnabled" placeholder="状态" clearable size="small">
            <el-option label="全部" value="-1"/>
            <el-option label="正常" value="1"/>
            <el-option label="禁用" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker v-model="dateTime" :picker-options="pickerOptions" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" align="right" clearable size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="handleFilter">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作 -->
    <el-row style="margin-bottom: 10px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-tooltip content="刷新" placement="bottom">
          <el-button v-waves type="warning" icon="el-icon-refresh" circle />
        </el-tooltip>
        <el-tooltip content="添加" placement="bottom">
          <el-button v-waves type="success" icon="el-icon-plus" circle @click="createPlan" />
        </el-tooltip>
        <el-tooltip content="搜索" placement="bottom">
          <el-button v-waves type="primary" icon="el-icon-search" circle />
        </el-tooltip>
        <el-tooltip content="删除" placement="bottom">
          <el-button v-waves :loading="deleting" :disabled="buttonDisabled" type="danger" icon="el-icon-delete" circle />
        </el-tooltip>
        <el-tooltip content="更多" placement="bottom">
          <el-dropdown trigger="click" placement="bottom" style="margin-left: 10px;">
            <el-button :disabled="buttonDisabled" type="Info" circle>
              <i class="el-icon-more"/>
            </el-button>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="1">设为正常</el-dropdown-item>
              <el-dropdown-item command="0">设为禁用</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :height="tableHeight"
      @selection-change="handleSelectionChange"
      @row-click="clickRow"
      stripe
      border
      fit
      style="width: 100%;"
      >
      
      <el-table-column type="selection" width="50" align="center"/>
      
      <el-table-column label="部门" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.branch }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="分类" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskDesc }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务创建者" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskCreator }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskCreateTime }}</span>
        </template>
      </el-table-column>
     
     <el-table-column label="操作" align="center" width="120px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button v-waves class="table-action-button-padding" type="primary" icon="el-icon-edit-outline" circle />
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button v-waves class="table-action-button-padding" :loading="scope.row.delete" type="danger" icon="el-icon-delete" circle />
          </el-tooltip>
        </template>
      </el-table-column>
      
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.psize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <planForm ref="planForm" @updateRow="updateRow"></planForm>

  </div>
</template>

<script>
import { getList } from '@/api/oa'
import waves from '@/directive/waves'
import { parseTime, pickerOptions, getArrByKey } from '@/utils'
import planForm from './plan/form'

export default {
  name: 'oaTask',
  components: { planForm },
  directives: {
    waves
  },
  data() {
    return {
      tableHeight: window.innerHeight - 250,
      tableKey: 0,
      list: null,
      total: null,
      selectedRows: [],
      listLoading: true,
      showSearch: false,
      listQuery: {
        page: 1,
        psize: 10,
        isEnabled: '-1',
        userName: '',
        phone: '',
        realName: '',
        startTime: '',
        endTime: ''
      },
      buttonDisabled: true,
      deleting: false,
      dateTime: '',
      pickerOptions: pickerOptions,
      currentIndex: -1
    }
  },
  watch: {
    dateTime: function(val) {
      this.listQuery.startTime = val[0]
      this.listQuery.endTime = val[1]
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    createPlan() {
      this.$refs.planForm.create()
    },
    updateRow(plan) {
      debugger
      console.log(plan)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchList()
    },
    handleSizeChange(val) {
      this.listQuery.psize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchList()
    }
  }
}
</script>
<style scoped>
.table-action-button-padding {
    padding: 3px;
  }
</style>
