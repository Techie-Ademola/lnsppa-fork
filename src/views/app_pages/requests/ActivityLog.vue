<template>
  <div class="editor-container">
    <el-card class="box-card">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="text-jumbo text-ginormous mb-0" v-if="checkPermission(['manage users'])">
          Manage Activity Log
        </h4>
        <div class="d-flex align-items-center">
          <el-input
            v-model="listQuery.search"
            placeholder="Search activities..."
            style="width: 200px"
            class="filter-item me-2"
            @input="handleSearch"
          />
        </div>
      </div>

      <el-table
          v-loading="loading"
        :key="tableKey"
        highlight-current-row
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="totalLog"
        :data="list"
        style="width: 100%; padding-top: 15px">
        <el-table-column label="S/N" width="50" align="center">
          <template slot-scope="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="Causer Name" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.causer.name || 'N/A' }}
          </template>
        </el-table-column>
        <el-table-column label="Description" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column label="Subject Type" min-width="150">
          <template slot-scope="scope">
            {{ formatSubjectType(scope.row.subject_type) }}
          </template>
        </el-table-column>
        <el-table-column label="Date" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.created_at | formatDate }}
          </template>
        </el-table-column>
      </el-table>

      <div class="d-flex justify-content-between align-items-center pt-4">
        <div class="showing_items">
          <span>
          Showing {{ from }} to {{ to }} of {{ totalLog }} entries
          </span>
        </div>
        <div class="d-flex align-items-center">
          <el-select
            v-model="pageSize"
            placeholder="Items per page"
            @change="handleSizeChange"
            style="width: 120px; margin-right: 10px;"
          >
            <el-option
              v-for="size in pageSizes"
              :key="size"
              :label="size"
              :value="size"
            />
          </el-select>
          <el-pagination
            small
            layout="prev, pager, next"
            v-show="totalLog > 0"
            :total="totalLog"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import axios from 'axios'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      loading: true,
      list: [],
      currentPage: 1,
      pageSize: 5,
      totalLog: 0,
      from: 0,
      to: 0,
      pageSizes: [5, 10, 15, 20, 50],
      listQuery: {
        search: "",
      },
    };
  },
  // computed: {
  //   paginatedList() {
  //     const filteredList = this.list.filter((activity) =>
  //       activity.causer.toLowerCase().includes(this.listQuery.search.toLowerCase()) ||
  //       activity.subject.toLowerCase().includes(this.listQuery.search.toLowerCase()) ||
  //       activity.description.toLowerCase().includes(this.listQuery.search.toLowerCase())
  //     );
  //     this.totalLog = filteredList.length;
  //     const start = (this.currentPage - 1) * this.pageSize;
  //     const end = this.pageSize === 'All' ? this.totalLog : start + this.pageSize;
  //     return filteredList.slice(start, end);
  //   }
  // },
  created() {
    this.fetchData();
  },
  methods: {
    checkPermission,

    formatSubjectType(type) {
      if (!type) return 'N/A';
      return type.split('\\').pop();
    },

    async fetchData() {
      this.loading = true;
      try {
        const response = await axios.get(
          this.dynamic_base_url('logs/activity-logs'),
          {
            headers: { Authorization: `Bearer ${getToken()}` },
            params: {
              page: this.currentPage,
              per_page: this.pageSize,
              search: this.listQuery.search
            }
          }
        );

        const { activities } = response.data.data;
        this.list = activities.data;
        this.totalLog = activities.total;
        this.from = activities.from;
        this.to = activities.to;
        this.currentPage = activities.current_page;
      } catch (error) {
        console.error("Error fetching activity logs:", error);
        this.$message.error('Failed to fetch activity logs');
      } finally {
        this.loading = false;
      }
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.fetchData();
    },

    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.fetchData();
    },

    handleSearch() {
      this.currentPage = 1;
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-container {
  padding: 32px;
  // background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

