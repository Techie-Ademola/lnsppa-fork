<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Account" name="account">
                <component
                  :is="'account'"
                  v-if="activeTab == 'account'"
                  :user="user"
                />
                <!-- <account :user="user" /> -->
              </el-tab-pane>
              <el-tab-pane label="Billing" name="billing-address">
                <component
                  :is="'billing'"
                  v-if="activeTab == 'billing-address'"
                  :user="user"
                />
                <!-- <billing :user="user" /> -->
              </el-tab-pane>
              <el-tab-pane
                v-if="isAdmin() == 'Super Admin'"
                label="Site Settings"
                name="update-settings"
              >
                <component
                  :is="'update-settings'"
                  v-if="activeTab == 'update-settings'"
                  :user="user"
                />
                <!-- <update-settings :user="user" /> -->
              </el-tab-pane>
              <el-tab-pane
                v-if="isAdmin() == 'Super Admin'"
                label="Domain Pricing"
                name="pricing"
              >
                <component
                  :is="'pricing'"
                  v-if="activeTab == 'pricing'"
                  :user="user"
                />
                <!-- <pricing :user="user" /> -->
              </el-tab-pane>
              <el-tab-pane
                v-if="isAdmin() == 'Super Admin'"
                label="Domain TLD"
                name="tld"
              >
                <component
                  :is="'tld-tab'"
                  v-if="activeTab == 'tld'"
                  :user="user"
                />
                <!-- <TLDTab :user="user" /> -->
              </el-tab-pane>
              <el-tab-pane
                v-if="isAdmin() == 'Super Admin'"
                label="Payment Gateway"
                name="gateway"
              >
                <component
                  :is="'gateway-tab'"
                  v-if="activeTab == 'gateway'"
                  :user="user"
                />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Billing from "./components/Billing";
import Account from "./components/Account";
import UpdateSettings from "./components/UpdateSettings";
import Pricing from "./components/Pricing.vue";
import TLDTab from "./components/TLDTab.vue";
import GatewayTab from "./components/GatewayTab.vue";
export default {
  name: "Profile",
  components: {
    UserCard,
    billing: Billing,
    account: Account,
    "update-settings": UpdateSettings,
    pricing: Pricing,
    "tld-tab": TLDTab,
    "gateway-tab": GatewayTab,
  },
  data() {
    return {
      user: {},
      activeTab: "account",
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    // console.log(`${process.env.SITE_NAME}`);
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar,
      };
    },
  },
};
</script>
