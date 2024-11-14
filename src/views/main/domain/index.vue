<template>
  <div class="icons-container">
    <div
      class="get_domain_btn d-flex d-none d-lg-block pe-3"
      v-if="isAdmin() == 'Super Admin'"
    >
      <el-button
        size="small"
        type="primary"
        class="btn btn-primary text-white pull-right d-flex align-items-center"
        @click.native.prevent="showTrfDomainModal = true"
      >
        <i
          class="bi bi-plus d-inline"
          style="font-size: 1.2em; vertical-align: middle; padding-right: 5px"
        />
        <span
          class="pl-1 d-inline"
          style="font-size: 1.2em; vertical-align: middle"
          >Transfer<span class="d-none d-lg-inline"> Domain</span></span
        >
      </el-button>

      <el-button
        size="small"
        type="primary"
        class="btn btn-primary text-white pull-right d-flex align-items-center"
        @click.native.prevent="showFundModal = true"
      >
        <i
          class="bi bi-plus d-inline"
          style="font-size: 1.2em; vertical-align: middle; padding-right: 5px"
        />
        <span
          class="pl-1 d-inline"
          style="font-size: 1.2em; vertical-align: middle"
          >Fund<span class="d-none d-lg-inline"> Enom</span></span
        >
      </el-button>

      <el-button
        size="small"
        type="primary"
        class="btn btn-primary text-white pull-right d-flex align-items-center"
        @click.native.prevent="showEditModal = true"
      >
        <i
          class="bi bi-plus d-inline"
          style="font-size: 1.2em; vertical-align: middle; padding-right: 5px"
        />
        <span
          class="pl-1 d-inline"
          style="font-size: 1.2em; vertical-align: middle"
          ><span class="d-none d-lg-inline">Get </span>New Domain</span
        >
      </el-button>
    </div>

    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="All Domains" name="all-domains">
        <el-row :gutter="8">
          <el-col
            :xs="{ span: 24 }"
            :sm="{ span: 24 }"
            :md="{ span: 24 }"
            :lg="{ span: 24 }"
            :xl="{ span: 24 }"
            style="margin-bottom: 30px"
          >
            <div
              class="filter-container d-flex justify-content-start flex-column flex-lg-row align-items-start ml-auto"
              style=""
            >
              <div
                class="d-flex d-block d-lg-none align-items-center w-100 mb-2"
              >
                <div class="get_domain_btn d-flex pe-3">
                  <el-button
                    size="small"
                    type="primary"
                    class="btn btn-primary text-white pull-right d-flex align-items-center"
                    @click.native.prevent="showTrfDomainModal = true"
                  >
                    <i
                      class="bi bi-plus d-inline"
                      style="
                        font-size: 1.2em;
                        vertical-align: middle;
                        padding-right: 5px;
                      "
                    />
                    <span
                      class="pl-1 d-inline"
                      style="font-size: 1.2em; vertical-align: middle"
                      >Transfer<span class="d-none d-lg-inline">
                        Domain</span
                      ></span
                    >
                  </el-button>

                  <el-button
                    v-if="isAdmin() == 'Super Admin'"
                    size="small"
                    type="primary"
                    class="btn btn-primary text-white pull-right d-flex align-items-center"
                    @click.native.prevent="showFundModal = true"
                  >
                    <i
                      class="bi bi-plus d-inline"
                      style="
                        font-size: 1.2em;
                        vertical-align: middle;
                        padding-right: 5px;
                      "
                    />
                    <span
                      class="pl-1 d-inline"
                      style="font-size: 1.2em; vertical-align: middle"
                      >Fund<span class="d-none d-lg-inline"> Enom</span></span
                    >
                  </el-button>

                  <el-button
                    v-if="isAdmin() == 'Super Admin'"
                    size="small"
                    type="primary"
                    class="btn btn-primary text-white pull-right d-flex align-items-center"
                    @click.native.prevent="showEditModal = true"
                  >
                    <i
                      class="bi bi-plus d-inline"
                      style="
                        font-size: 1.2em;
                        vertical-align: middle;
                        padding-right: 5px;
                      "
                    />
                    <span
                      class="pl-1 d-inline"
                      style="font-size: 1.2em; vertical-align: middle"
                      ><span class="d-none d-lg-inline">Get </span>New
                      Domain</span
                    >
                  </el-button>
                </div>
              </div>
              <div class="d-flex justify-content-start flex-column flex-md-row">
                <el-date-picker
                  v-model="filters.dateRange"
                  type="daterange"
                  range-separator="to"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  class="w-100 mb-2"
                />
                <el-select
                  v-model="filters.status"
                  placeholder="Select status"
                  clearable
                  class="mx-0 ms-md-3 mb-2 w-100"
                >
                  <el-option class="text-capitalize" label="Approved" value="APPROVED"></el-option>
                  <el-option class="text-capitalize" label="Pending" value="PENDING"></el-option>
                  <el-option class="text-capitalize" label="Failed" value="FAILED"></el-option>
                  <el-option class="text-capitalize" label="Suspended" value="SUSPENDED"></el-option>
                  <el-option class="text-capitalize"
                    label="Expiring Soon (One Month)"
                    value="expiring-soon"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <!-- <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilterChange"
        />
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-refresh"
          @click="handleFilterChange"
        /> -->

            <component
              :is="'all-domains-table'"
              ref="table-all-domains"
              v-if="activeTab == 'all-domains'"
              :filters="formattedFilters"
            />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Enoms" v-if="isAdmin() == 'Super Admin'" name="all-enoms">
        <el-row :gutter="8">
          <el-col
            :xs="{ span: 24 }"
            :sm="{ span: 24 }"
            :md="{ span: 24 }"
            :lg="{ span: 24 }"
            :xl="{ span: 24 }"
            style="margin-bottom: 30px"
          >
            <!-- <el-date-picker
              v-model="filters.dateRange"
              type="daterange"
              range-separator="to"
              start-placeholder="Start date"
              end-placeholder="End date"
              @change="handleFilterChange"
            />
            <el-select
              v-model="filters.status"
              placeholder="Select status"
              @change="handleFilterChange"
              clearable
              class="ms-3"
            >
              <el-option label="Approved" value="APPROVED"></el-option>
              <el-option label="Pending" value="PENDING"></el-option>
              <el-option label="Failed" value="FAILED"></el-option>
              <el-option label="Suspended" value="SUSPENDED"></el-option>
              <el-option
                label="Expiring Soon (One Month)"
                value="expiring-soon"
              ></el-option>
            </el-select> -->
            <component
              :is="'all-enoms-table'"
              ref="table-all-enoms"
              v-if="activeTab == 'all-enoms'"
            />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Transferred Domains" name="transferred-domains">
        <el-row :gutter="8">
          <el-col
            :xs="{ span: 24 }"
            :sm="{ span: 24 }"
            :md="{ span: 24 }"
            :lg="{ span: 24 }"
            :xl="{ span: 24 }"
            style="margin-bottom: 30px"
          >
            <!-- <el-date-picker
              v-model="filters.dateRange"
              type="daterange"
              range-separator="to"
              start-placeholder="Start date"
              end-placeholder="End date"
              @change="handleFilterChange"
            />
            <el-select
              v-model="filters.status"
              placeholder="Select status"
              @change="handleFilterChange"
              clearable
              class="ms-3"
            >
              <el-option label="Approved" value="APPROVED"></el-option>
              <el-option label="Pending" value="PENDING"></el-option>
              <el-option label="Failed" value="FAILED"></el-option>
              <el-option label="Suspended" value="SUSPENDED"></el-option>
              <el-option
                label="Expiring Soon (One Month)"
                value="expiring-soon"
              ></el-option>
            </el-select> -->
            <component
              :is="'transferred-domains-table'"
              ref="table-transferred-domains"
              v-if="activeTab == 'transferred-domains'"
              :filters="formattedFilters"
            />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="All Domains" name="all-domains">
        <el-row :gutter="8">
          <el-col
            :xs="{ span: 24 }"
            :sm="{ span: 24 }"
            :md="{ span: 24 }"
            :lg="{ span: 24 }"
            :xl="{ span: 24 }"
            style="margin-bottom: 30px"
          >
            <component
              :is="'all-domains-table'"
              v-if="activeTab == 'all-domains'"
            />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Enoms" v-if="isAdmin() == 'Super Admin'" name="all-enoms">
        <el-row :gutter="8">
          <el-col
            :xs="{ span: 24 }"
            :sm="{ span: 24 }"
            :md="{ span: 24 }"
            :lg="{ span: 24 }"
            :xl="{ span: 24 }"
            style="margin-bottom: 30px"
          >
            <component
              :is="'all-enoms-table'"
              v-if="activeTab == 'all-enoms'"
            />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs> -->

    <div>
      <el-dialog
        title="Get New Domain"
        :visible.sync="showEditModal"
        width="40%"
        class="pb-0 mb-0"
        @close="handleClose"
      >
        <el-form
          ref="createTLDForm"
          :model="searchForm"
          @submit.native.prevent="handleSubmit"
        >
          <el-row :gutter="20" class="mb-0 pb-0">
            <el-form-item>
              <el-col>
                <label for="title">Domain Name</label>
                <el-tooltip
                  v-model="capsTooltip"
                  content="Caps lock is On"
                  placement="top"
                  manual
                >
                  <el-input
                    id="title"
                    v-model.trim="searchForm.searchQuery"
                    placeholder=""
                    @change="handleChange"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @input="handleChange"
                  />
                </el-tooltip>

                <label for="TLDId" class="mt-2">Select TLD</label><br />
                <el-select
                  v-model="TLDId"
                  placeholder="Select TLD"
                  class="w-100"
                  @select="handleChange"
                  @input="handleChange"
                  @change="handleChange"
                >
                  <el-option
                    v-for="tld in TLDLists"
                    :key="tld.tld_id"
                    :label="`.${tld.name}`"
                    :value="tld.tld_id"
                    class="position-relative"
                  >
                    <div
                      @click="getSelected(tld)"
                      class="w-100 h-100 position-absolute bg-none"
                      style="background: none !important"
                    >
                      .{{ tld.name }}
                    </div>
                  </el-option>
                </el-select>

                <div v-if="searchResult" class="" style="line-height: 1.5">
                  <span
                    v-if="searchResult.data.status_code == 210"
                    class="text-success font-weight-bold"
                    >{{ searchResult.message }}</span
                  >
                  <span
                    v-if="searchResult.data.status_code == 211"
                    class="text-danger font-weight-bold"
                    >{{ searchResult.message }}</span
                  >
                  <span
                    v-if="searchResult.data.status_code == 827"
                    class="text-danger font-weight-bold"
                    >{{ searchResult.message }}</span
                  >
                </div>
              </el-col>
            </el-form-item>

            <el-form-item class="mb-0 pb-0">
              <el-col>
                <div class="" style="width: fit-content; margin-left: auto">
                  <el-button @click="handleClose">Cancel</el-button>

                  <el-button
                    v-if="searchResult.message === 'Domain available'"
                    :loading="loading"
                    type="primary"
                    style="background-color: #42b983 !important; border: none"
                    @click.native.prevent="updateSessionStorage()"
                    >Get Domain Now</el-button
                  >

                  <el-button
                    v-else
                    :loading="loading"
                    type="primary"
                    style="background-color: #42b983 !important; border: none"
                    :disabled="disableaddcart"
                    @click.native.prevent="handleCheckAvailability"
                  >
                    Check Availability
                  </el-button>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="Add Funds to Enom"
        :visible.sync="showFundModal"
        width="40%"
        class="pb-0 mb-0"
        @close="handleClose"
      >
        <el-form ref="FundEnomForm" :model="fundObj">
          <!--
          :model="searchForm"
          @submit.native.prevent="handleSubmit" -->
          <el-row :gutter="20" class="mb-0 pb-0">
            <el-form-item>
              <el-col>
                <label for="amount">Amount to Fund</label>
                <el-input
                  id="amount"
                  placeholder=""
                  v-model.trim="fundObj.price"
                />
              </el-col>
            </el-form-item>

            <el-form-item class="mb-0 pb-0">
              <el-col>
                <div class="" style="width: fit-content; margin-left: auto">
                  <el-button @click="handleClose">Cancel</el-button>

                  <el-button
                    :loading="loading"
                    type="primary"
                    style="background-color: #42b983 !important; border: none"
                    @click.native.prevent="handleFunding"
                  >
                    Fund
                  </el-button>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="Transfer Your Domain"
        :visible.sync="showTrfDomainModal"
        width="40%"
        class="pb-0 mb-0"
        @close="handleClose"
      >
        <el-form ref="createPrcForm" :model="createPrc">
          <el-row :gutter="20" class="mb-0 pb-0">
            <div class="d-flex">
              <el-form-item>
                <el-col>
                  <label for="domain_name">Domain Name</label>
                  <el-tooltip
                    v-model="capsTooltip"
                    content="Caps lock is On"
                    placement="top"
                    manual
                  >
                    <el-input
                      id="domain_name"
                      v-model.trim="createPrc.sld"
                      placeholder=""
                      @change="handleChange"
                      @keyup.native="checkCapslock"
                      @blur="capsTooltip = false"
                      @input="handleChange"
                    />
                  </el-tooltip>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-col>
                  <label for="tld_id">TLD Name</label>
                  <!-- <el-input id="title" v-model.trim="" class="col-12" /> -->
                  <el-select
                    id="tld_id"
                    v-model="createPrc.tld_id"
                    placeholder="Select Name"
                    class="w-100"
                  >
                    <el-option
                      v-for="tld in TLDLists"
                      :key="tld.tld_id"
                      :label="`.${tld.name}`"
                      :value="tld.tld_id"
                    />
                  </el-select>
                </el-col>
              </el-form-item>
            </div>

            <el-form-item>
              <el-col>
                <label for="title">Auth Key</label>
                <el-input
                  id="title"
                  v-model.trim="createPrc.auth_key"
                  class="col-12"
                />
              </el-col>
            </el-form-item>

            <el-form-item class="mb-0 pb-0">
              <el-col>
                <div class="" style="width: fit-content; margin-left: auto">
                  <el-button @click="handleClose">Cancel</el-button>

                  <el-button
                    :loading="loading"
                    type="primary"
                    style="background-color: #42b983 !important; border: none"
                    @click.native.prevent="handleTrfDomain"
                    >Transfer</el-button
                  >
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import clipboard from "@/utils/clipboard";
import svgIcons from "./svg-icons";
import elementIcons from "./element-icons";
import AllDomainTable from "./components/all-domain-table.vue";
import AllEnomsTable from "./components/all-enoms-table.vue";
import TransferredDomainsTable from "./components/transferred-domains.vue";
import axios from "axios";
import { getToken } from "@/utils/auth";
import dayjs from "dayjs"; // Use dayjs for date manipulation

export default {
  name: "Domain",

  components: {
    "all-domains-table": AllDomainTable,
    "all-enoms-table": AllEnomsTable,
    "transferred-domains-table": TransferredDomainsTable,
  },

  data() {
    return {
      svgIcons,
      activeTab: "all-domains",
      filters: {
        dateRange: "",
        status: "",
      },
      elementIcons,
      showEditModal: false,
      showFundModal: false,
      showTrfDomainModal: false,
      capsTooltip: false,
      TLDId: "",
      selectedTLDItem: {},
      TLDLists: [],
      disableaddcart: false,
      loading: false,
      searchForm: {
        searchQuery: "",
      },
      searchResult: {
        message: "",
        data: {
          status_code: null,
        },
      },
      fundObj: {
        price: null,
      },
      createPrc: {
        sld: "",
        tld_id: "",
        auth_key: "",
      },
      domains_tld: [],
    };
  },

  mounted() {
    this.fetchTLDLists();
  },
  computed: {
    formattedFilters() {
      let formattedFilters = { ...this.filters };
      if (this.filters.dateRange && this.filters.dateRange.length === 2) {
        formattedFilters.start_date = this.filters.dateRange[0];
        formattedFilters.end_date = this.filters.dateRange[1];
      }
      delete formattedFilters.dateRange;

      // Add logic for "Expiring Soon (One Month)"
      if (this.filters.status === "expiring-soon") {
        delete formattedFilters.status;
        const today = dayjs();
        formattedFilters.expiry_date = today
          .add(30, "day")
          .format("YYYY-MM-DD");
      }

      return formattedFilters;
    },
  },

  methods: {
    handleFilterChange() {
      // Trigger the table component to refetch the data with new filters
      this.$refs[`table-${this.activeTab}`].fetchDomains();
    },

    handleClose() {
      this.showEditModal = false;
      this.showFundModal = false;
      this.showTrfDomainModal = false;
      this.searchResult.message = "";
      this.selectedTLDItem = {};
      this.TLDId = {};
    },

    getSelected(val) {
      this.selectedTLDItem = val;
    },

    handleTrfDomain() {
      if (
        !this.createPrc.sld ||
        !this.createPrc.tld_id ||
        !this.createPrc.auth_key
      ) {
        this.$message.error("All fields are required!");
        return;
      }

      const payload = {
        domains: [this.createPrc],
      };

      this.loading = true;
      axios
        .post(this.dynamic_base_url(`admin/domains/transfer`), payload, {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          this.$message.success(response.data.message);
          this.loading = false;
          this.createPrc.tld_id = "";
          this.createPrc.sld = "";
          this.createPrc.auth_key = "";
          this.showTrfDomainModal = false;
          this.$bus.$emit("admin_domain_purchased");
        })
        .catch((error) => {
          const errorRes = error.response.data;
          if (errorRes.status >= 400 || errorRes.status === false) {
            this.$message.error(errorRes.message);
          } else {
            console.error("Error during pricing update:", error);
            this.$message.error("An error occurred during pricing update.");
          }
          this.loading = false;
        });
    },

    handleFunding() {

      if (
        !this.fundObj.price
      ) {
        this.$message.error("The amount field is required!");
        return;
      }
      this.loading = true;
      let parsedAmount = parseFloat(this.fundObj.price);

      const config = {
        headers: { Authorization: `Bearer ` + getToken() },
      };

      let amount = {
        amount: this.fundObj.price,
      };
      axios
        .post(this.dynamic_base_url(`admin/fund_account`), amount, config)
        .then((response) => {
          this.$message.success(response.data.message);
          this.showFundModal = false;
          this.loading = false;
          this.fundObj.price = 0;
        })
        .catch((error) => {
          // console.log('error res:', error.response);

          const errorRes = error.response.data;
          if (errorRes.status >= 400 || errorRes.status === false) {
            this.$message.error(errorRes.message);
          } else {
            console.error("Error during funding:", error);
            this.$message.error("An error occurred during funding process.");
          }
          // this.showFundModal = false;
          this.loading = false;
        });
    },

    fetchTLDLists() {
      axios
        .get(this.dynamic_base_url("admin/domains/tld"), {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          this.TLDLists = response.data.data;
        })
        .catch((error) => {
          const errorRes = error.response.data;
          if (errorRes.status >= 400 || errorRes.status === false) {
            this.$message.error(errorRes.message);
          } else {
            this.$message.error(
              "Error occurred while fetching settings. Please try again later."
            );
          }
        });
    },

    handleSubmit() {
      if (this.searchResult.message === "Domain available") {
        this.updateSessionStorage(this.searchResult.data, this.updatingIndex);
      } else {
        this.handleCheckAvailability();
      }
    },

    updateSessionStorage() {
      const searchQuery = this.searchForm.searchQuery.trim();
      if (searchQuery !== "") {
        let payload = {
          sld: searchQuery,
          tld_id: this.selectedTLDItem.tld_id,
        };

        this.loading = true;
        axios
          .post(
            this.dynamic_base_url(`admin/domains/run-purchase`),
            payload,

            {
              headers: { Authorization: "Bearer " + getToken() },
            }
          )
          .then((response) => {
            this.$message.success(response.data.message);
            this.$bus.$emit("admin_domain_purchased");

            this.loading = false;
            this.handleClose();
          })
          .catch((error) => {
            console.log(error);
            const errorRes = error.response.data;
            if (errorRes.status >= 400 || errorRes.status === false) {
              this.$message.error(errorRes.message);
            } else {
              this.$message.error(
                "An error occurred while re-running purchase."
              );
            }
            this.loading = false;
          });
      }

      // const selectedDomain = name;
      // const { domain_name, tld_id } = selectedDomain;

      // const [sld, tld] = domain_name.split(".");

      // // const domainExists = this.selectedDomains.some(
      // //   (domain) => domain.sld === sld && domain.tld === `.${tld}`
      // // );

      // const domainSldExists = this.selectedDomains.some(
      //   (domain) => domain.sld === sld
      // );
      // const domainTldExists = this.selectedDomains.some(
      //   (domain) => domain.sld === sld && domain.tld === `.${tld}`
      // );

      // if (domainTldExists) {
      //   this.$message.error("Domain already existed in cart.");
      //   this.cartStatus = true;
      //   return;
      // } else {
      //   this.cartStatus = false;
      //   // if (domainSldExists) {
      //   // this.$message.error("Domain name already existed in your cart items!");
      //   // return;
      //   // } else {
      //   // Update the selectedDomains at the specified index
      //   this.$set(this.selectedDomains, index, { sld, tld: `.${tld}`, tld_id });
      //   // }
      // }

      // // Update the sessionStorage
      // sessionStorage.setItem(
      //   "selectedDomains",
      //   JSON.stringify(this.selectedDomains)
      // );

      // // Show success message
      // this.$message.success("Domain updated successfully.");
      // this.showEditModal = false;
      // this.getCartPricings();
      // this.totalPrice = 0;
      // this.totalAmtVal = 0;
    },

    handleChange() {
      this.searchForm.searchQuery = this.searchForm.searchQuery
        .toLowerCase()
        .replace(/[^a-z0-9\-]/g, "");
      this.createPrc.sld = this.createPrc.sld
        .toLowerCase()
        .replace(/[^a-z0-9\-]/g, "");
      this.searchResult.message = "";
      this.disableaddcart = false;
    },

    handleCheckAvailability() {
      if (
        !this.selectedTLDItem.name ||
        !this.searchForm.searchQuery
      ) {
        this.$message.error("All fields are required!");
        return;
      }

      const searchQuery = this.searchForm.searchQuery.trim();
      if (searchQuery !== "") {
        this.loading = true;

        const tld = this.selectedTLDItem.name;
        const sld = searchQuery != null ? searchQuery : "";
        // console.log("selected tld :", `${sld}.${tld}`);

        this.resultLoading = true;
        axios
          .get(
            this.dynamic_base_url(`domains/search?tld=` + tld + `&sld=` + sld),
            {
              headers: { Authorization: "Bearer " + getToken() },
            }
          )
          .then((response) => {
            this.searchResult = response.data;
            this.searchResult.data.status_code !== null &&
            response.data.data.status_code == 210
              ? (this.disableaddcart = false)
              : (this.disableaddcart = true);
            // console.log("searchResult :", this.searchResult);
            this.loading = false;
            this.resultLoading = false;
          })
          .catch((error) => {
            const errorRes = error.response.data;
            if (errorRes.status >= 400 || errorRes.status === false) {
              this.$message.error(errorRes.message);
            } else {
              this.$message.error("An error occurred while fetching records.");
            }
            this.resultLoading = false;
            this.loading = false;
          });
      }
    },

    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },

    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`;
    },

    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`;
    },

    handleClipboard(text, event) {
      clipboard(text, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.icons-container {
  position: relative;
  margin: 10px 0 0 20px;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }
  .btn {
    white-space: nowrap;
  }

  .disabled {
    pointer-events: none;
  }

  .get_domain_btn {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 0px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 3px;

    button {
      white-space: nowrap !important;
      display: inline-block !important;
    }
  }
}
</style>
<style scoped>
.get_domain_btn * {
  white-space: nowrap;
}
@media screen and (max-width: 991px) {
  .get_domain_btn {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 0px;
    position: relative !important;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 3px;
  }
}
@media screen and (max-width: 576px) {
}
</style>
