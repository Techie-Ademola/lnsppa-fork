<template>
  <div class="editor-container">
    <!-- Preloader -->
    <div>
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">Active Users</div>
              <count-to
                :start-val="0"
                :end-val="102400"
                :duration="2600"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('messages')">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">Inactive Users</div>
              <count-to
                :start-val="0"
                :end-val="81212"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('purchases')">
            <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="component" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">Processed Users</div>
              <count-to
                :start-val="0"
                :end-val="9280"
                :duration="3200"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shoppings')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="example" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">Declined Users</div>
              <count-to
                :start-val="0"
                :end-val="13600"
                :duration="3600"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-col>
      </el-row>

      <el-card class="box-card">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="text-jumbo text-ginormous mb-0">Manage Users</h4>
          <div class="d-flex align-items-center">
            <el-input
              v-model.trim="listQuery.search"
              placeholder="Search users..."
              style="width: 250px"
              class="filter-item me-2"
              @input="handleSearch"
            />
            <el-button
              type="primary"
              class="ml-3"
              @click="showCreateUserDialog = true"
            >
              Create New User
            </el-button>
          </div>
        </div>

        <el-table
          v-loading="loading"
          :data="paginatedList"
          style="width: 100%; padding-top: 15px"
          :key="tableKey"
          highlight-current-row
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="totalUsers"
        >
          <el-table-column label="S/N" width="50" align="center">
            <template slot-scope="scope">
              {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Name" min-width="150">
            <template slot-scope="scope">
              {{ scope.row["name"] }}
            </template>
          </el-table-column>
          <el-table-column prop="email" label="Email" min-width="150">
            <template slot-scope="scope">
              {{ scope.row["email"] }}
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="Date" min-width="150">
            <template slot-scope="scope">
              {{ scope.row["created_at"] | formatDate }}
            </template>
          </el-table-column>

          <el-table-column
            prop="status"
            label="Actions"
            align="center"
            width="200"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-dropdown
                class="avatar-container right-menu-item hover-effect"
                trigger="click"
              >
                <div class="avatar-wrapper px-3 py-2">
                  <i class="bi bi-three-dots-vertical" />
                </div>
                <el-dropdown-menu slot="dropdown" style="width: 180px">
                  <li
                    tabindex="-1"
                    class="el-dropdown-menu__item py-1"
                    @click="handleEdit(scope.row, scope.$index)"
                  >
                    Edit
                  </li>
                  <li
                    tabindex="-1"
                    class="el-dropdown-menu__item py-1"
                    @click="handleChangeUserRole(scope.row, scope.$index)"
                  >
                    Change Role
                  </li>
                  <!-- <li
                    tabindex="-1"
                    class="el-dropdown-menu__item py-1"
                    @click="deleteUser(scope.row)"
                  >
                    Delete User
                  </li> -->
                  <!-- <li
                  tabindex="-1"
                  v-if="isAdmin() == 'admin' && scope.row.status === 'PENDING'"
                  class="el-dropdown-menu__item py-1"
                  @click="reRunQuery(scope.row)"
                >
                  Re-run Purchase
                </li> -->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>

          <!-- <el-table-column label="Price" width="195" align="center">
            <template slot-scope="scope">
              {{ $store.getters.currencyIcon
              }}{{ scope.row.price | toThousandFilter }}
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="Status" width="100" align="center">
            <template slot-scope="{ row }">
              <el-tag :type="row.status | statusFilter">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="Action" width="195" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  tag="el-button"
                  icon="el-icon-view"
                  size="mini"
                  @click="viewUser(scope.row)"
                />

                <el-button
                  icon="el-icon-edit"
                  size="mini"
                  @click="editUser(scope.row)"
                />

                <el-button
                  icon="el-icon-delete"
                  size="mini"
                  @click="showDeleteModal(scope.row)"
                />
              </el-button-group>
            </template>
          </el-table-column> -->
        </el-table>

        <div class="d-block w-100 pt-4">
          <div class="d-flex justify-content-between align-items-center">
            <div class="showing_items">
              <span>
                Showing {{ from }} to {{ to }} of {{ totalUsers }} entries
              </span>
            </div>

            <div class="d-flex align-items-center">
              <el-select
                style="width: 120px"
                v-model="pageSize"
                placeholder="Items per page"
                @change="handleSizeChange"
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
                v-show="totalUsers > 0"
                :total="totalUsers"
                :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                @current-change="handlePageChange"
              />
            </div>
          </div>
        </div>

        <el-dialog
          width="600px"
          title="Create New User"
          :visible.sync="showCreateUserDialog"
        >
          <el-form :model="newUser">
            <el-form-item label="Name">
              <el-input v-model.trim="newUser.name" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model.trim="newUser.email" />
            </el-form-item>

            <el-form-item label="Attach Role">
              <el-select
                v-model="newUser.selected_role_id"
                placeholder="Select a role"
                class="w-100"
              >
                <el-option
                  v-for="role in allRoles"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id"
                />
              </el-select>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="showCreateUserDialog = false">Cancel</el-button>
            <el-button :loading="isCreating" type="primary" @click="createUser"
              >Create</el-button
            >
          </div>
        </el-dialog>

        <el-dialog
          width="500px"
          title="Edit User"
          :visible.sync="showEditUserDialog"
        >
          <el-form :model="editUser">
            <el-form-item label="Name">
              <el-input v-model.trim="editUser.name" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model.trim="editUser.email" />
            </el-form-item>

            <!-- <el-form-item label="Attach Role">
              <el-select
                v-model="editUser.selected_role_id"
                placeholder="Select a role"
                class="w-100"
              >
                <el-option
                  v-for="role in allRoles"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id"
                />
              </el-select>
            </el-form-item> -->
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="showEditUserDialog = false">Cancel</el-button>
            <el-button :loading="isUpdating" type="primary" @click="updateUser"
              >Update</el-button
            >
          </div>
        </el-dialog>

        <el-dialog
          width="500px"
          title="Attach Role to User"
          :visible.sync="showChangeUserRoleDialog"
        >
          <el-form :model="changeUserRole">
            <el-form-item label="Attach Role">
              <el-select
                v-model="changeUserRole.new_user_role"
                placeholder="Select a role"
                class="w-100"
              >
                <el-option
                  v-for="role in allRoles"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id"
                />
              </el-select>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="showChangeUserRoleDialog = false">Cancel</el-button>
            <el-button
              :loading="isCreating"
              type="primary"
              @click="updateChangedRole"
              >Confirm</el-button
            >
          </div>
        </el-dialog>

        <el-dialog
          title="Confirm Delete"
          :visible.sync="showDeleteModal"
          width="30%"
          @close="handleClose"
        >
          <p>Are you sure you want to delete this domain?</p>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="danger" @click="handleDeleteConfirm"
              >Confirm</el-button
            >
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { transactionList } from "@/api/remote-search";
import CountTo from "vue-count-to";
import axios from "axios";
import { getToken } from "@/utils/auth";
import { fetchAllUsers } from "@/api/user";
import _ from "lodash";

export default {
  components: {
    CountTo,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
  },
  data() {
    return {
      loading: false,
      isCreating: false,
      isUpdating: false,
      showCreateUserDialog: false,
      tableKey: 0,
      showEditUserDialog: false,
      showChangeUserRoleDialog: false,
      showDeleteModal: false,
      userId: null,
      list: [],
      currentPage: 1,
      pageSize: 5,
      totalUsers: 0,
      from: 0,
      to: 0,
      pageSizes: [5, 10, 15, 20],
      listQuery: {
        search: "",
      },
      newUser: {
        name: "",
        email: "",
        selected_role_id: "",
      },
      editUser: {
        id: "",
        name: "",
        email: "",
        selected_role_id: "",
      },
      changeUserRole: {
        id: null,
        new_user_role: "",
      },
      allRoles: [],
    };
  },
  computed: {
    paginatedList() {
      // const filteredList = this.list.filter((user) =>
      //   user.name.toLowerCase().includes(this.listQuery.search.toLowerCase())
      // );
      // this.totalUsers = filteredList.length;
      // const start = (this.currentPage - 1) * this.pageSize;
      // const end = start + this.pageSize;
      // this.from = start + 1;
      // this.to = Math.min(end, this.totalUsers);
      // return filteredList.slice(start, end);

      return this.list;
    },
  },
  created() {
    this.fetchData();
    this.fetchRoles();
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },

    async fetchData() {
      const params = {
        page: this.currentPage,
        per_page: this.pageSize,
        search: this.listQuery.search,
      };

      try {
        this.loading = true;

        const response = await axios.get(this.dynamic_base_url(`user/users`), {
          headers: { Authorization: `Bearer ${getToken()}` },
          params: params,
        });

        const data = response.data.data.users;
        this.list = data.data;
        this.totalUsers = data.total;
        this.from = data.from;
        this.to = data.to;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$message.error("Error fetching users");
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
    handleSearch: _.debounce(function () {
      this.currentPage = 1;
      this.fetchData();
    }, 300),
    async createUser() {
      if (
        this.newUser.email &&
        this.newUser.name &&
        this.newUser.selected_role_id
      ) {
        this.newUser.password = "password";
        const payload = this.newUser;
        // console.log("New User Data:", payload);
        this.isCreating = true;

        try {
          const response = await axios.post(
            this.dynamic_base_url(`user/users`),
            payload,
            {
              headers: { Authorization: `Bearer ${getToken()}` },
            }
          );

          this.$message.success(response.data.message);
          this.showCreateUserDialog = false;
          this.isCreating = false;

          this.newUser = {
            name: "",
            email: "",
            selected_role_id: "",
          };
          this.fetchData();
        } catch (error) {
          const errorRes = error.response.data;

          console.error("Error fetching data:", error);
          if (errorRes.status >= 400 || errorRes.status !== "success") {
            this.$message.error(errorRes.message);
          } else {
            this.$message.error("Error creating new user.");
          }
          this.isCreating = false;
          this.showCreateUserDialog = false;

          this.newUser = {
            name: "",
            email: "",
            selected_role_id: "",
          };
        }
      } else {
        this.$message.error("Kindly fill all fields!");
        return;
      }
    },

    handleChangeUserRole(row, index) {
      // console.log("Row index:", row, index);
      if (row.roles.length) {
      this.changeUserRole = {
        id: row.id,
        new_user_role: row.roles[0].id,
      };
      } else {
        this.changeUserRole.id = row.id;
      };

      this.showChangeUserRoleDialog = true;
    },

    handleEdit(row, index) {
      // console.log("Row index:", index);
      if (row.roles.length) {
        this.editUser = {
          id: row.id,
          name: row.name,
          email: row.email,
          selected_role_id: row.roles[0].id,
          // selected_role_id: row.roles ? row.roles.map(role => role.id) : [],
        };
      } else {
        this.editUser = {
          id: row.id,
          name: row.name,
          email: row.email,
          selected_role_id: null,
        };
      }
      // console.log("Editing user:", this.editUser);

      this.showEditUserDialog = true;
    },

    async updateChangedRole() {
      if (this.changeUserRole.new_user_role) {
        const payload = {
          role_id: this.changeUserRole.new_user_role,
        };

        this.isUpdating = true;

        try {
          const response = await axios.post(
            this.dynamic_base_url(`acl/users/${this.changeUserRole.id}/roles`),
            payload,
            {
              headers: { Authorization: `Bearer ${getToken()}` },
            }
          );

          this.$message.success(response.data.message);
          this.showChangeUserRoleDialog = false;
          this.isUpdating = false;

          this.changeUserRole = {
            new_user_role: "",
          };
          this.fetchData();
        } catch (error) {
          const errorRes = error.response.data;

          console.error("Error fetching data:", error);
          if (errorRes.status >= 400 || errorRes.status !== "success") {
            this.$message.error(errorRes.message);
          } else {
            this.$message.error("Error updating role.");
          }
          this.isUpdating = false;
          this.showChangeUserRoleDialog = false;

          this.changeUserRole = {
            new_user_role: "",
          };
        }
      } else {
        this.$message.error("Kindly select a role!");
      }
    },

    async updateUser() {
      if (
        this.editUser.email &&
        this.editUser.name
      ) {
        const payload = this.editUser;
        // console.log("New User Data:", payload);
        this.isUpdating = true;

        try {
          const response = await axios.put(
            this.dynamic_base_url(`user/users/${this.editUser.id}`),
            payload,
            {
              headers: { Authorization: `Bearer ${getToken()}` },
            }
          );

          this.$message.success(response.data.message);
          this.showEditUserDialog = false;
          this.isUpdating = false;

          this.editUser = {
            name: "",
            email: "",
            selected_role_id: "",
          };
          this.fetchData();
        } catch (error) {
          const errorRes = error.response.data;

          console.error("Error fetching data:", error);
          if (errorRes.status >= 400 || errorRes.status !== "success") {
            this.$message.error(errorRes.message);
          } else {
            this.$message.error("Error updating user.");
          }
          this.isUpdating = false;
          this.showEditUserDialog = false;

          this.editUser = {
            name: "",
            email: "",
            selected_role_id: "",
          };
        }
      } else {
        this.$message.error("Kindly fill all fields!");
        return;
      }
    },

    async fetchRoles() {
      try {
        const response = await axios.get(this.dynamic_base_url(`acl/roles`), {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        this.allRoles = response.data.data.roles;
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },

    handleDeleteConfirm() {
      // console.log("Assigned ID :", this.userId);
    },

    deleteUser(val) {
      // console.log("delete user data:", val);
      this.userId = val.id;
      this.showDeleteModal = true;
    },
    handleClose() {
      this.showDeleteModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .preloader {
    text-align: center;
    font-size: 20px;
    padding: 20px;
  }

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

