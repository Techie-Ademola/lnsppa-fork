<template>
  <div class="editor-container">
    <el-card class="box-card">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="text-jumbo text-ginormous mb-0">
          Manage Roles & Permissions
        </h4>
        <div class="d-flex align-items-center">
          <el-input
            v-model.trim="listQuery.search"
            placeholder="Search roles..."
            style="width: 200px"
            class="filter-item me-2"
            @input="handleSearch"
          />
          <el-button type="primary" class="ml-3" @click="showDialog = true">
            New Role
          </el-button>
        </div>
      </div>

      <el-table
        v-loading="isLoading"
        :data="allRoles"
        style="width: 100%; padding-top: 15px"
        :key="tableKey"
        highlight-current-row
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
      >
        <el-table-column label="S/N" width="50" align="center">
          <template slot-scope="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column label="Name" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="Permissions" min-width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.permissions.length">
            <el-tag
              v-for="(permission, index) in scope.row.permissions.slice(0, 2)"
              :key="index"
              type="primary"
              size="mini"
              class="mx-1"
            >
              {{ permission.name }}
            </el-tag>
            <el-tag
              v-if="scope.row.permissions.length > 2"
              type="warning"
              size="mini"
              class="mx-1"
            >
              +{{ scope.row.permissions.length - 2 }} more
            </el-tag>

            </div>
            <div v-else class="showing_items">
              <span>
                No permission assigned yet
             </span>
          </template>
        </el-table-column>

        <el-table-column label="Created At" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.created_at | formatDate }}
          </template>
        </el-table-column>

        <el-table-column label="Action" width="195" align="center">
          <template slot-scope="scope">
            <el-button-group>
              <!-- View Button -->
              <el-button
                tag="el-button"
                icon="el-icon-view"
                size="mini"
                @click="viewPerm(scope.row)"
              />

              <!-- Edit Button -->
              <el-button
                icon="el-icon-edit"
                size="mini"
                @click="editPerm(scope.row)"
              />

              <!-- Delete Button -->
              <el-button
                icon="el-icon-delete"
                size="mini"
                @click="showDeleteModal(scope.row)"
              />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

        <div class="d-block w-100 pt-4">
          <div class="d-flex justify-content-between align-items-center">
            <div class="showing_items">
              <span>
                Showing {{ from }} to {{ to }} of {{ total }} entries
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
                v-show="total > 0"
                :total="total"
                :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                @current-change="handlePageChange"
              />
            </div>
          </div>
        </div>

      <el-dialog width="600px" title="Create New Role" :visible.sync="showDialog">
        <el-form :model="newRole">
          <el-form-item label="Role Name">
            <el-input v-model="newRole.name" />
          </el-form-item>
          <el-form-item label="Permissions">
            <el-select
              v-model="newRole.permissions"
              multiple
              placeholder="Select permissions"
              class="w-100"
            >
              <el-option
                v-for="permission in allPermissions"
                :key="permission"
                :label="permission"
                :value="permission"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">Cancel</el-button>
          <el-button :loading="isUpdating" type="primary" @click="createRole">Create</el-button>
        </div>
      </el-dialog>

      <el-dialog
        :title="isEditing ? 'Edit Permissions' : 'View Permissions'"
        width="500px"
        :visible.sync="showPermissionsDialog"
      >
        <div class="permissions-container">
          <div class="role-name mb-3">
            <strong>Role:</strong> {{ currentRole ? currentRole.name : 'All' }}
          </div>

          <div class="mb-2">
            <el-checkbox
              v-model="selectAll"
              @change="handleSelectAll"
              :disabled="!isEditing"
            >
              Select All Permissions ({{ selectedPermissions.length }})
            </el-checkbox>
          </div>

          <el-divider />

          <div class="permissions-list">
            <el-checkbox-group
              v-model="selectedPermissionIds"
              @change="handlePermissionChange"
            >
              <div
                v-for="perm in permissions"
                :key="perm.id"
                class="permission-item"
              >
                <el-checkbox
                  :label="perm.id"
                  :disabled="!isEditing"
                >
                  {{ perm.name }}
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="showPermissionsDialog = false">
            {{ isEditing ? 'Cancel' : 'Close' }}
          </el-button>
          <el-button
          :loading="isUpdating"
            v-if="isEditing"
            type="primary"
            @click="savePermissions"
          >
            Save Changes
          </el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/utils/auth";
import _ from "lodash";

export default {
  data() {
    return {
      isLoading: false,
      showDialog: false,
      allRoles: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      from: 0,
      to: 0,
      pageSizes: [5, 10, 15, 20],
      listQuery: {
        search: "",
      },
      newRole: {
        name: "",
        permissions: [],
      },
      allPermissions: [],
      tableKey: 0,
      showPermissionsDialog: false,
      permissions: [], // All permissions from API
      selectedPermissionIds: [], // Array of selected permission IDs
      selectedPermissions: [], // Array of selected permission objects
      selectAll: false,
      currentRole: null, // Add this to track the current role being edited
      isEditing: false, // Add this to track if we're editing or viewing
      isUpdating: false,
    };
  },

  created() {
    this.fetchRoles();
    this.fetchPermissions();
  },

  methods: {
    async fetchRoles() {
      this.isLoading = true;
      try {
        const response = await axios.get(this.dynamic_base_url(`acl/roles`), {
          headers: { Authorization: `Bearer ${getToken()}` },
          params: {
            page: this.currentPage,
            per_page: this.pageSize,
            search: this.listQuery.search,
          },
        });

        const { roles } = response.data.data;
        this.allRoles = roles;
        this.total = roles.length;
        this.from = (this.currentPage - 1) * this.pageSize + 1;
        this.to = Math.min(this.currentPage * this.pageSize, this.total);

        // Extract unique permissions from roles for the permission selector
        const allPerms = new Set();
        roles.forEach((role) => {
          role.permissions.forEach((perm) => {
            allPerms.add(perm.name);
          });
        });
        this.allPermissions = Array.from(allPerms);
      } catch (error) {
        console.error("Error fetching roles:", error);
        this.$message.error("Failed to fetch roles");
      } finally {
        this.isLoading = false;
      }
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.fetchRoles();
    },

    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.fetchRoles();
    },

    handleSearch: _.debounce(function () {
      this.currentPage = 1;
      this.fetchRoles();
    }, 300),

    async createRole() {
      if (!this.newRole.name || !this.newRole.permissions.length) {
        this.$message.error("Please fill in all required fields");
        return;
      }

      try {
        this.isUpdating = true;

        const response = await axios.post(
          this.dynamic_base_url("acl/roles"),
          this.newRole,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );

        this.$message.success("Role created successfully");
        this.showDialog = false;
        this.newRole = { name: "", permissions: [] };
        this.fetchRoles();
        this.isUpdating = false;
      } catch (error) {
        console.error("Error creating role:", error);
        this.$message.error("Failed to create role");
        this.isUpdating = false;
      }
    },

    // Fetch permissions from API
    async fetchPermissions() {
      try {
        const response = await axios.get(
          this.dynamic_base_url("acl/permissions?Ac"),
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        this.permissions = response.data.data.permissions;
      } catch (error) {
        console.error("Error fetching permissions:", error);
        this.$message.error("Failed to fetch permissions");
      }
    },

    // Handle individual permission selection
    handlePermissionChange(selectedIds) {
      this.selectedPermissions = this.permissions.filter((perm) =>
        selectedIds.includes(perm.id)
      );

      // Update selectAll checkbox state
      this.selectAll = selectedIds.length === this.permissions.length;

      // console.log("Selected Permissions:", this.selectedPermissions);
    },

    // Handle select all checkbox
    handleSelectAll(value) {
      if (value) {
        // Select all permissions
        this.selectedPermissionIds = this.permissions.map((perm) => perm.id);
        this.selectedPermissions = [...this.permissions];
      } else {
        // Deselect all permissions
        this.selectedPermissionIds = [];
        this.selectedPermissions = [];
      }
    },

    // Open permissions dialog
    openPermissionsDialog(role = null) {
      this.showPermissionsDialog = true;
      if (role) {
        // If editing existing role, pre-select its permissions
        this.selectedPermissionIds = role.permissions.map((perm) => perm.id);
        this.selectedPermissions = role.permissions;
        this.selectAll =
          this.selectedPermissionIds.length === this.permissions.length;
      } else {
        // Reset selections for new role
        this.selectedPermissionIds = [];
        this.selectedPermissions = [];
        this.selectAll = false;
      }
    },

    // Save permissions
    async savePermissions() {
      if (!this.isEditing) {
        this.showPermissionsDialog = false;
        return; // Don't save if just viewing
      }

      const payload = {
        role_id: this.currentRole.id,
        permissions: this.selectedPermissionIds,
      };

      // console.log("savePermissions payload:", payload);

      if (this.selectedPermissionIds.length) {
        this.isUpdating = true;
        try {
          const payload = {
            role_id: this.currentRole.id,
            permissions: this.selectedPermissionIds,
          };

          const response = await axios.post(
            this.dynamic_base_url(
              `acl/roles/${this.currentRole.id}/permissions?Acc`
            ),
            payload,
            {
              headers: { Authorization: `Bearer ${getToken()}` },
            }
          );

          this.$message.success("Permissions updated successfully");
          this.showPermissionsDialog = false;
          this.fetchRoles(); // Refresh the roles list
        this.isUpdating = false;

        } catch (error) {
        this.isUpdating = false;
          console.error("Error updating permissions:", error.response.data.message);
          if (error && error.response) {
            this.$message.error(error.response.data.message);
          } else {
            this.$message.error("Failed to update permissions");
          }
        }

      } else {
          this.$message.error("Select at least one permission to proceed");

      }
    },

    // View permissions for a role
    viewPerm(role) {
      this.currentRole = role;
      this.isEditing = false;
      this.openPermissionsDialog(role);
    },

    // Edit permissions for a role
    editPerm(role) {
      this.currentRole = role;
      this.isEditing = true;
      this.openPermissionsDialog(role);
    },

    // ... other methods ...
  },
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

<style lang="scss" scoped>
.permissions-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 15px;
}

.role-name {
  font-size: 16px;
}

.permissions-list {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
}

.permission-item {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-divider {
  margin: 12px 0;
}

/* Custom scrollbar styles */
.permissions-list::-webkit-scrollbar {
  width: 6px;
}

.permissions-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.permissions-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.permissions-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

