<template>
  <div class="app-container px-0">
    <div class="wrap">
      <el-table
        :key="tableKey"
        v-loading="loader"
        border
        :data="domains"
        highlight-current-row
        style="width: 100%; min-width: 80em"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="totalDomains"
      >
        <el-table-column prop="domain_id" label="Domain ID" min-width="150">
          <template slot-scope="scope">
            <span class="text-primary py-3 d-block position-relative">{{
              scope.row["domain_id"]
            }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="domain_name" label="Domain Name" min-width="200">
          <template slot-scope="scope">
            <span class="py-3 d-block position-relative">{{
              scope.row["domain_name"]
            }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="domain_sld" label="Domain SLD" min-width="150">
                <template slot-scope="scope">
                  <span class="py-3 d-block position-relative">
                    {{ scope.row["domain_sld"] }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column prop="domain_tld" label="Domain TLD" min-width="150">
                <template slot-scope="scope">
                  <span class="py-3 d-block position-relative">
                    {{ scope.row["domain_tld"] }}
                  </span>
                </template>
              </el-table-column> -->

        <el-table-column prop="amount" label="Amount" min-width="150">
          <template slot-scope="scope">
            <span class="py-3 d-block position-relative">
              {{ $store.getters.currencyIcon
              }}{{ formatAmount(scope.row["amount"]) || "0.00" }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="Purchase Status" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 'FAILED'">
              <svg
                width="75"
                height="24"
                viewBox="0 0 75 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="75" height="24" rx="4" fill="#FEE2E2" />
                <circle cx="12" cy="12" r="3" fill="#F87171" />
                <path
                  d="M23.5688 17V6.81818H29.8827V8.14062H25.105V11.2429H29.4303V12.5604H25.105V17H23.5688ZM33.8476 17.169C33.3637 17.169 32.9262 17.0795 32.5351 16.9006C32.144 16.7183 31.8341 16.4548 31.6054 16.1101C31.38 15.7654 31.2673 15.3428 31.2673 14.8423C31.2673 14.4115 31.3502 14.0568 31.5159 13.7784C31.6816 13.5 31.9053 13.2796 32.1871 13.1172C32.4688 12.9548 32.7836 12.8321 33.1317 12.7493C33.4797 12.6664 33.8343 12.6035 34.1956 12.5604C34.653 12.5073 35.0242 12.4643 35.3092 12.4311C35.5943 12.3946 35.8014 12.3366 35.9307 12.2571C36.0599 12.1776 36.1246 12.0483 36.1246 11.8693V11.8345C36.1246 11.4003 36.0019 11.0639 35.7567 10.8253C35.5147 10.5866 35.1534 10.4673 34.6729 10.4673C34.1724 10.4673 33.778 10.5784 33.4896 10.8004C33.2046 11.0192 33.0074 11.2628 32.898 11.5312L31.501 11.2131C31.6667 10.7491 31.9086 10.3745 32.2268 10.0895C32.5483 9.80114 32.9179 9.59233 33.3355 9.46307C33.7531 9.33049 34.1923 9.2642 34.653 9.2642C34.9579 9.2642 35.281 9.30066 35.6224 9.37358C35.9671 9.44318 36.2886 9.57244 36.5869 9.76136C36.8885 9.95028 37.1354 10.2204 37.3277 10.5717C37.5199 10.9197 37.616 11.3722 37.616 11.929V17H36.1643V15.956H36.1047C36.0086 16.1482 35.8644 16.3371 35.6721 16.5227C35.4799 16.7083 35.233 16.8625 34.9314 16.9851C34.6298 17.1077 34.2685 17.169 33.8476 17.169ZM34.1707 15.9759C34.5817 15.9759 34.933 15.8946 35.2247 15.7322C35.5197 15.5698 35.7434 15.3577 35.8959 15.0959C36.0516 14.8307 36.1295 14.5473 36.1295 14.2457V13.2614C36.0765 13.3144 35.9738 13.3641 35.8213 13.4105C35.6721 13.4536 35.5015 13.4917 35.3092 13.5249C35.117 13.5547 34.9297 13.5829 34.7474 13.6094C34.5651 13.6326 34.4127 13.6525 34.29 13.669C34.0017 13.7055 33.7382 13.7668 33.4996 13.853C33.2642 13.9392 33.0753 14.0634 32.9328 14.2259C32.7936 14.3849 32.724 14.5971 32.724 14.8622C32.724 15.2301 32.8599 15.5085 33.1317 15.6974C33.4034 15.883 33.7498 15.9759 34.1707 15.9759ZM39.596 17V9.36364H41.0825V17H39.596ZM40.3467 8.18537C40.0882 8.18537 39.8661 8.09919 39.6805 7.92685C39.4982 7.75118 39.407 7.54238 39.407 7.30043C39.407 7.05516 39.4982 6.84635 39.6805 6.67401C39.8661 6.49834 40.0882 6.41051 40.3467 6.41051C40.6052 6.41051 40.8256 6.49834 41.0079 6.67401C41.1935 6.84635 41.2863 7.05516 41.2863 7.30043C41.2863 7.54238 41.1935 7.75118 41.0079 7.92685C40.8256 8.09919 40.6052 8.18537 40.3467 8.18537ZM44.5688 6.81818V17H43.0823V6.81818H44.5688ZM49.8598 17.1541C49.1075 17.1541 48.4595 16.9934 47.9159 16.6719C47.3757 16.3471 46.9581 15.8913 46.6631 15.3047C46.3714 14.7147 46.2256 14.0237 46.2256 13.2315C46.2256 12.4493 46.3714 11.7599 46.6631 11.1634C46.9581 10.5668 47.3691 10.1011 47.896 9.76633C48.4263 9.43158 49.0461 9.2642 49.7554 9.2642C50.1863 9.2642 50.6039 9.33546 51.0083 9.47798C51.4126 9.6205 51.7755 9.84422 52.097 10.1491C52.4185 10.4541 52.6721 10.8501 52.8577 11.3374C53.0433 11.8213 53.1361 12.4096 53.1361 13.1023V13.6293H47.0658V12.5156H51.6794C51.6794 12.1245 51.5999 11.7782 51.4408 11.4766C51.2817 11.1716 51.058 10.9313 50.7696 10.7557C50.4846 10.58 50.1498 10.4922 49.7654 10.4922C49.3477 10.4922 48.9832 10.5949 48.6716 10.8004C48.3634 11.0026 48.1247 11.2678 47.9557 11.5959C47.79 11.9207 47.7071 12.2737 47.7071 12.6548V13.5249C47.7071 14.0353 47.7966 14.4695 47.9756 14.8274C48.1579 15.1854 48.4114 15.4588 48.7362 15.6477C49.0611 15.8333 49.4405 15.9261 49.8747 15.9261C50.1565 15.9261 50.4133 15.8864 50.6453 15.8068C50.8773 15.724 51.0779 15.6013 51.2469 15.4389C51.4159 15.2765 51.5452 15.076 51.6347 14.8374L53.0416 15.0909C52.9289 15.5052 52.7268 15.8681 52.4351 16.1797C52.1468 16.4879 51.7838 16.7282 51.3463 16.9006C50.9121 17.0696 50.4166 17.1541 49.8598 17.1541ZM57.6441 17.1491C57.0276 17.1491 56.4774 16.9917 55.9935 16.6768C55.5129 16.3587 55.1351 15.9062 54.86 15.3196C54.5882 14.7296 54.4523 14.022 54.4523 13.1967C54.4523 12.3714 54.5899 11.6655 54.865 11.0788C55.1434 10.4922 55.5245 10.0431 56.0084 9.73153C56.4923 9.41998 57.0409 9.2642 57.654 9.2642C58.128 9.2642 58.5091 9.34375 58.7975 9.50284C59.0892 9.65862 59.3145 9.84091 59.4736 10.0497C59.636 10.2585 59.762 10.4425 59.8515 10.6016H59.941V6.81818H61.4275V17H59.9758V15.8118H59.8515C59.762 15.9742 59.6327 16.1598 59.4637 16.3686C59.298 16.5774 59.0693 16.7597 58.7776 16.9155C58.4859 17.0713 58.1081 17.1491 57.6441 17.1491ZM57.9722 15.8814C58.3998 15.8814 58.761 15.7687 59.056 15.5433C59.3543 15.3146 59.5797 14.9981 59.7322 14.5938C59.8879 14.1894 59.9658 13.7187 59.9658 13.1818C59.9658 12.6515 59.8896 12.1875 59.7371 11.7898C59.5847 11.392 59.3609 11.0821 59.066 10.8601C58.771 10.638 58.4064 10.527 57.9722 10.527C57.5248 10.527 57.1519 10.643 56.8536 10.875C56.5553 11.107 56.3299 11.4235 56.1775 11.8246C56.0283 12.2256 55.9537 12.678 55.9537 13.1818C55.9537 13.6922 56.03 14.1513 56.1824 14.5589C56.3349 14.9666 56.5603 15.2898 56.8586 15.5284C57.1602 15.7637 57.5314 15.8814 57.9722 15.8814Z"
                  fill="#991B1B"
                />
              </svg>
            </span>

            <span v-if="scope.row.status === 'PENDING'">
              <svg
                width="86"
                height="24"
                viewBox="0 0 86 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="86" height="24" rx="4" fill="#FEF3C7" />
                <circle cx="10.5" cy="12" r="3" fill="#FBBF24" />
                <path
                  d="M21.768 17V6.81818H25.3973C26.1894 6.81818 26.8457 6.96236 27.366 7.25071C27.8864 7.53906 28.2758 7.93347 28.5344 8.43395C28.7929 8.93111 28.9221 9.49124 28.9221 10.1143C28.9221 10.7408 28.7912 11.3042 28.5294 11.8047C28.2709 12.3018 27.8798 12.6963 27.3561 12.9879C26.8357 13.2763 26.1811 13.4205 25.3923 13.4205H22.8966V12.1179H25.2531C25.7536 12.1179 26.1596 12.0317 26.4711 11.8594C26.7827 11.6837 27.0114 11.4451 27.1572 11.1435C27.3031 10.8419 27.376 10.4988 27.376 10.1143C27.376 9.72988 27.3031 9.38849 27.1572 9.0902C27.0114 8.7919 26.781 8.55824 26.4662 8.3892C26.1546 8.22017 25.7436 8.13565 25.2332 8.13565H23.3042V17H21.768ZM33.7993 17.1541C33.0469 17.1541 32.3989 16.9934 31.8554 16.6719C31.3151 16.3471 30.8975 15.8913 30.6025 15.3047C30.3109 14.7147 30.165 14.0237 30.165 13.2315C30.165 12.4493 30.3109 11.7599 30.6025 11.1634C30.8975 10.5668 31.3085 10.1011 31.8355 9.76633C32.3658 9.43158 32.9856 9.2642 33.6949 9.2642C34.1257 9.2642 34.5434 9.33546 34.9477 9.47798C35.3521 9.6205 35.715 9.84422 36.0365 10.1491C36.358 10.4541 36.6115 10.8501 36.7971 11.3374C36.9827 11.8213 37.0756 12.4096 37.0756 13.1023V13.6293H31.0052V12.5156H35.6189C35.6189 12.1245 35.5393 11.7782 35.3802 11.4766C35.2211 11.1716 34.9974 10.9313 34.7091 10.7557C34.424 10.58 34.0893 10.4922 33.7048 10.4922C33.2872 10.4922 32.9226 10.5949 32.6111 10.8004C32.3028 11.0026 32.0642 11.2678 31.8952 11.5959C31.7294 11.9207 31.6466 12.2737 31.6466 12.6548V13.5249C31.6466 14.0353 31.7361 14.4695 31.915 14.8274C32.0973 15.1854 32.3509 15.4588 32.6757 15.6477C33.0005 15.8333 33.38 15.9261 33.8142 15.9261C34.0959 15.9261 34.3528 15.8864 34.5848 15.8068C34.8168 15.724 35.0173 15.6013 35.1863 15.4389C35.3554 15.2765 35.4846 15.076 35.5741 14.8374L36.9811 15.0909C36.8684 15.5052 36.6662 15.8681 36.3746 16.1797C36.0862 16.4879 35.7233 16.7282 35.2858 16.9006C34.8516 17.0696 34.3561 17.1541 33.7993 17.1541ZM40.2114 12.4659V17H38.7249V9.36364H40.1517V10.6065H40.2462C40.4218 10.2022 40.6969 9.87737 41.0715 9.6321C41.4493 9.38684 41.9249 9.2642 42.4983 9.2642C43.0187 9.2642 43.4744 9.37358 43.8655 9.59233C44.2566 9.80777 44.5599 10.1293 44.7753 10.5568C44.9907 10.9844 45.0985 11.513 45.0985 12.1428V17H43.6119V12.3217C43.6119 11.7682 43.4678 11.3357 43.1794 11.0241C42.8911 10.7093 42.495 10.5518 41.9912 10.5518C41.6465 10.5518 41.3399 10.6264 41.0715 10.7756C40.8063 10.9247 40.5959 11.1435 40.4401 11.4318C40.2876 11.7169 40.2114 12.0616 40.2114 12.4659ZM49.9507 17.1491C49.3343 17.1491 48.7841 16.9917 48.3002 16.6768C47.8196 16.3587 47.4417 15.9062 47.1666 15.3196C46.8949 14.7296 46.759 14.022 46.759 13.1967C46.759 12.3714 46.8965 11.6655 47.1716 11.0788C47.45 10.4922 47.8312 10.0431 48.3151 9.73153C48.799 9.41998 49.3475 9.2642 49.9607 9.2642C50.4346 9.2642 50.8158 9.34375 51.1041 9.50284C51.3958 9.65862 51.6212 9.84091 51.7803 10.0497C51.9427 10.2585 52.0686 10.4425 52.1581 10.6016H52.2476V6.81818H53.7341V17H52.2824V15.8118H52.1581C52.0686 15.9742 51.9394 16.1598 51.7703 16.3686C51.6046 16.5774 51.3759 16.7597 51.0843 16.9155C50.7926 17.0713 50.4147 17.1491 49.9507 17.1491ZM50.2789 15.8814C50.7064 15.8814 51.0677 15.7687 51.3627 15.5433C51.661 15.3146 51.8863 14.9981 52.0388 14.5938C52.1946 14.1894 52.2725 13.7187 52.2725 13.1818C52.2725 12.6515 52.1962 12.1875 52.0438 11.7898C51.8913 11.392 51.6676 11.0821 51.3726 10.8601C51.0776 10.638 50.713 10.527 50.2789 10.527C49.8314 10.527 49.4585 10.643 49.1602 10.875C48.8619 11.107 48.6366 11.4235 48.4841 11.8246C48.335 12.2256 48.2604 12.678 48.2604 13.1818C48.2604 13.6922 48.3366 14.1513 48.4891 14.5589C48.6415 14.9666 48.8669 15.2898 49.1652 15.5284C49.4668 15.7637 49.838 15.8814 50.2789 15.8814ZM55.8557 17V9.36364H57.3422V17H55.8557ZM56.6064 8.18537C56.3479 8.18537 56.1259 8.09919 55.9403 7.92685C55.758 7.75118 55.6668 7.54238 55.6668 7.30043C55.6668 7.05516 55.758 6.84635 55.9403 6.67401C56.1259 6.49834 56.3479 6.41051 56.6064 6.41051C56.865 6.41051 57.0854 6.49834 57.2677 6.67401C57.4533 6.84635 57.5461 7.05516 57.5461 7.30043C57.5461 7.54238 57.4533 7.75118 57.2677 7.92685C57.0854 8.09919 56.865 8.18537 56.6064 8.18537ZM60.8286 12.4659V17H59.3421V9.36364H60.7689V10.6065H60.8634C61.039 10.2022 61.3141 9.87737 61.6887 9.6321C62.0665 9.38684 62.5421 9.2642 63.1155 9.2642C63.6359 9.2642 64.0916 9.37358 64.4827 9.59233C64.8738 9.80777 65.1771 10.1293 65.3925 10.5568C65.6079 10.9844 65.7156 11.513 65.7156 12.1428V17H64.2291V12.3217C64.2291 11.7682 64.085 11.3357 63.7966 11.0241C63.5083 10.7093 63.1122 10.5518 62.6084 10.5518C62.2637 10.5518 61.9571 10.6264 61.6887 10.7756C61.4235 10.9247 61.213 11.1435 61.0573 11.4318C60.9048 11.7169 60.8286 12.0616 60.8286 12.4659ZM70.911 20.0227C70.3044 20.0227 69.7824 19.9432 69.3449 19.7841C68.9107 19.625 68.5561 19.4145 68.281 19.1527C68.0059 18.8909 67.8004 18.6042 67.6645 18.2926L68.9422 17.7656C69.0317 17.9115 69.151 18.0656 69.3002 18.228C69.4526 18.3937 69.6581 18.5346 69.9166 18.6506C70.1785 18.7666 70.5149 18.8246 70.9259 18.8246C71.4893 18.8246 71.955 18.687 72.3229 18.4119C72.6908 18.1402 72.8747 17.706 72.8747 17.1094V15.608H72.7803C72.6908 15.7704 72.5615 15.951 72.3925 16.1499C72.2268 16.3487 71.9981 16.5211 71.7064 16.6669C71.4147 16.8127 71.0352 16.8857 70.5679 16.8857C69.9647 16.8857 69.4211 16.7448 68.9372 16.4631C68.4566 16.178 68.0755 15.7588 67.7938 15.2053C67.5154 14.6484 67.3762 13.964 67.3762 13.152C67.3762 12.34 67.5137 11.6439 67.7888 11.0639C68.0672 10.4839 68.4484 10.0398 68.9323 9.73153C69.4162 9.41998 69.9647 9.2642 70.5779 9.2642C71.0518 9.2642 71.4346 9.34375 71.7263 9.50284C72.018 9.65862 72.245 9.84091 72.4074 10.0497C72.5731 10.2585 72.7007 10.4425 72.7902 10.6016H72.8996V9.36364H74.3563V17.169C74.3563 17.8253 74.2038 18.3639 73.8989 18.7848C73.594 19.2057 73.1813 19.5173 72.661 19.7195C72.1439 19.9216 71.5606 20.0227 70.911 20.0227ZM70.896 15.6527C71.3236 15.6527 71.6849 15.5533 71.9798 15.3544C72.2781 15.1522 72.5035 14.8639 72.656 14.4893C72.8118 14.1115 72.8896 13.6591 72.8896 13.1321C72.8896 12.6184 72.8134 12.166 72.661 11.7749C72.5085 11.3838 72.2848 11.0788 71.9898 10.8601C71.6948 10.638 71.3302 10.527 70.896 10.527C70.4486 10.527 70.0757 10.643 69.7774 10.875C69.4791 11.1037 69.2538 11.4152 69.1013 11.8097C68.9521 12.2041 68.8776 12.6449 68.8776 13.1321C68.8776 13.6326 68.9538 14.0717 69.1063 14.4496C69.2587 14.8274 69.4841 15.1224 69.7824 15.3345C70.084 15.5466 70.4552 15.6527 70.896 15.6527Z"
                  fill="#92400E"
                />
              </svg>
            </span>

            <span v-if="scope.row.status === 'APPROVED'">
              <svg
                width="106"
                height="24"
                viewBox="0 0 106 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="106" height="24" rx="4" fill="#D1FAE5" />
                <circle cx="15" cy="12" r="3" fill="#34D399" />
                <path
                  d="M27.4738 17H25.8431L29.5072 6.81818H31.282L34.9461 17H33.3154L30.4369 8.66761H30.3573L27.4738 17ZM27.7472 13.0128H33.037V14.3054H27.7472V13.0128ZM36.2971 19.8636V9.36364H37.7488V10.6016H37.8731C37.9593 10.4425 38.0836 10.2585 38.246 10.0497C38.4084 9.84091 38.6338 9.65862 38.9221 9.50284C39.2105 9.34375 39.5916 9.2642 40.0656 9.2642C40.6821 9.2642 41.2323 9.41998 41.7162 9.73153C42.2001 10.0431 42.5796 10.4922 42.8547 11.0788C43.1331 11.6655 43.2723 12.3714 43.2723 13.1967C43.2723 14.022 43.1347 14.7296 42.8596 15.3196C42.5845 15.9062 42.2067 16.3587 41.7261 16.6768C41.2455 16.9917 40.697 17.1491 40.0805 17.1491C39.6165 17.1491 39.237 17.0713 38.942 16.9155C38.6504 16.7597 38.4217 16.5774 38.2559 16.3686C38.0902 16.1598 37.9626 15.9742 37.8731 15.8118H37.7836V19.8636H36.2971ZM37.7538 13.1818C37.7538 13.7187 37.8317 14.1894 37.9875 14.5938C38.1433 14.9981 38.3686 15.3146 38.6636 15.5433C38.9586 15.7687 39.3199 15.8814 39.7474 15.8814C40.1916 15.8814 40.5628 15.7637 40.8611 15.5284C41.1594 15.2898 41.3847 14.9666 41.5372 14.5589C41.693 14.1513 41.7709 13.6922 41.7709 13.1818C41.7709 12.678 41.6946 12.2256 41.5422 11.8246C41.393 11.4235 41.1676 11.107 40.866 10.875C40.5677 10.643 40.1949 10.527 39.7474 10.527C39.3166 10.527 38.952 10.638 38.6537 10.8601C38.3587 11.0821 38.135 11.392 37.9825 11.7898C37.83 12.1875 37.7538 12.6515 37.7538 13.1818ZM44.9378 19.8636V9.36364H46.3895V10.6016H46.5138C46.5999 10.4425 46.7242 10.2585 46.8866 10.0497C47.049 9.84091 47.2744 9.65862 47.5628 9.50284C47.8511 9.34375 48.2323 9.2642 48.7062 9.2642C49.3227 9.2642 49.8729 9.41998 50.3568 9.73153C50.8407 10.0431 51.2202 10.4922 51.4953 11.0788C51.7737 11.6655 51.9129 12.3714 51.9129 13.1967C51.9129 14.022 51.7754 14.7296 51.5003 15.3196C51.2252 15.9062 50.8473 16.3587 50.3667 16.6768C49.8862 16.9917 49.3376 17.1491 48.7211 17.1491C48.2571 17.1491 47.8776 17.0713 47.5827 16.9155C47.291 16.7597 47.0623 16.5774 46.8966 16.3686C46.7309 16.1598 46.6032 15.9742 46.5138 15.8118H46.4243V19.8636H44.9378ZM46.3944 13.1818C46.3944 13.7187 46.4723 14.1894 46.6281 14.5938C46.7839 14.9981 47.0093 15.3146 47.3042 15.5433C47.5992 15.7687 47.9605 15.8814 48.3881 15.8814C48.8322 15.8814 49.2034 15.7637 49.5017 15.5284C49.8 15.2898 50.0254 14.9666 50.1778 14.5589C50.3336 14.1513 50.4115 13.6922 50.4115 13.1818C50.4115 12.678 50.3353 12.2256 50.1828 11.8246C50.0336 11.4235 49.8083 11.107 49.5067 10.875C49.2084 10.643 48.8355 10.527 48.3881 10.527C47.9572 10.527 47.5926 10.638 47.2943 10.8601C46.9993 11.0821 46.7756 11.392 46.6231 11.7898C46.4707 12.1875 46.3944 12.6515 46.3944 13.1818ZM53.5784 17V9.36364H55.0152V10.5767H55.0947C55.2339 10.1657 55.4792 9.84257 55.8305 9.60724C56.1852 9.36861 56.5862 9.24929 57.0336 9.24929C57.1265 9.24929 57.2358 9.2526 57.3618 9.25923C57.491 9.26586 57.5921 9.27415 57.665 9.28409V10.706C57.6054 10.6894 57.4993 10.6712 57.3469 10.6513C57.1944 10.6281 57.0419 10.6165 56.8895 10.6165C56.5381 10.6165 56.2249 10.6911 55.9498 10.8402C55.6781 10.986 55.4626 11.1899 55.3035 11.4517C55.1444 11.7102 55.0649 12.0052 55.0649 12.3366V17H53.5784ZM61.8946 17.1541C61.1787 17.1541 60.5539 16.9901 60.0203 16.6619C59.4867 16.3338 59.0724 15.8748 58.7774 15.2848C58.4825 14.6948 58.335 14.0054 58.335 13.2166C58.335 12.4245 58.4825 11.7318 58.7774 11.1385C59.0724 10.5452 59.4867 10.0845 60.0203 9.75639C60.5539 9.42827 61.1787 9.2642 61.8946 9.2642C62.6105 9.2642 63.2353 9.42827 63.7689 9.75639C64.3025 10.0845 64.7168 10.5452 65.0118 11.1385C65.3068 11.7318 65.4543 12.4245 65.4543 13.2166C65.4543 14.0054 65.3068 14.6948 65.0118 15.2848C64.7168 15.8748 64.3025 16.3338 63.7689 16.6619C63.2353 16.9901 62.6105 17.1541 61.8946 17.1541ZM61.8996 15.9062C62.3636 15.9062 62.7481 15.7836 63.053 15.5384C63.3579 15.2931 63.5833 14.9666 63.7291 14.5589C63.8783 14.1513 63.9529 13.7022 63.9529 13.2116C63.9529 12.7244 63.8783 12.277 63.7291 11.8693C63.5833 11.4583 63.3579 11.1286 63.053 10.88C62.7481 10.6314 62.3636 10.5071 61.8996 10.5071C61.4323 10.5071 61.0445 10.6314 60.7362 10.88C60.4313 11.1286 60.2043 11.4583 60.0551 11.8693C59.9093 12.277 59.8364 12.7244 59.8364 13.2116C59.8364 13.7022 59.9093 14.1513 60.0551 14.5589C60.2043 14.9666 60.4313 15.2931 60.7362 15.5384C61.0445 15.7836 61.4323 15.9062 61.8996 15.9062ZM73.3865 9.36364L70.6173 17H69.0264L66.2522 9.36364H67.8481L69.782 15.2401H69.8616L71.7906 9.36364H73.3865ZM77.8149 17.1541C77.0625 17.1541 76.4146 16.9934 75.871 16.6719C75.3308 16.3471 74.9131 15.8913 74.6182 15.3047C74.3265 14.7147 74.1807 14.0237 74.1807 13.2315C74.1807 12.4493 74.3265 11.7599 74.6182 11.1634C74.9131 10.5668 75.3241 10.1011 75.8511 9.76633C76.3814 9.43158 77.0012 9.2642 77.7105 9.2642C78.1414 9.2642 78.559 9.33546 78.9633 9.47798C79.3677 9.6205 79.7306 9.84422 80.0521 10.1491C80.3736 10.4541 80.6272 10.8501 80.8128 11.3374C80.9984 11.8213 81.0912 12.4096 81.0912 13.1023V13.6293H75.0209V12.5156H79.6345C79.6345 12.1245 79.555 11.7782 79.3959 11.4766C79.2368 11.1716 79.0131 10.9313 78.7247 10.7557C78.4397 10.58 78.1049 10.4922 77.7204 10.4922C77.3028 10.4922 76.9382 10.5949 76.6267 10.8004C76.3184 11.0026 76.0798 11.2678 75.9108 11.5959C75.7451 11.9207 75.6622 12.2737 75.6622 12.6548V13.5249C75.6622 14.0353 75.7517 14.4695 75.9307 14.8274C76.113 15.1854 76.3665 15.4588 76.6913 15.6477C77.0161 15.8333 77.3956 15.9261 77.8298 15.9261C78.1115 15.9261 78.3684 15.8864 78.6004 15.8068C78.8324 15.724 79.0329 15.6013 79.202 15.4389C79.371 15.2765 79.5003 15.076 79.5898 14.8374L80.9967 15.0909C80.884 15.5052 80.6818 15.8681 80.3902 16.1797C80.1018 16.4879 79.7389 16.7282 79.3014 16.9006C78.8672 17.0696 78.3717 17.1541 77.8149 17.1541ZM85.5992 17.1491C84.9827 17.1491 84.4325 16.9917 83.9486 16.6768C83.468 16.3587 83.0902 15.9062 82.8151 15.3196C82.5433 14.7296 82.4074 14.022 82.4074 13.1967C82.4074 12.3714 82.545 11.6655 82.82 11.0788C83.0985 10.4922 83.4796 10.0431 83.9635 9.73153C84.4474 9.41998 84.9959 9.2642 85.6091 9.2642C86.0831 9.2642 86.4642 9.34375 86.7526 9.50284C87.0442 9.65862 87.2696 9.84091 87.4287 10.0497C87.5911 10.2585 87.7171 10.4425 87.8066 10.6016H87.896V6.81818H89.3825V17H87.9308V15.8118H87.8066C87.7171 15.9742 87.5878 16.1598 87.4188 16.3686C87.253 16.5774 87.0244 16.7597 86.7327 16.9155C86.441 17.0713 86.0632 17.1491 85.5992 17.1491ZM85.9273 15.8814C86.3548 15.8814 86.7161 15.7687 87.0111 15.5433C87.3094 15.3146 87.5348 14.9981 87.6872 14.5938C87.843 14.1894 87.9209 13.7187 87.9209 13.1818C87.9209 12.6515 87.8447 12.1875 87.6922 11.7898C87.5397 11.392 87.316 11.0821 87.021 10.8601C86.7261 10.638 86.3615 10.527 85.9273 10.527C85.4798 10.527 85.107 10.643 84.8087 10.875C84.5104 11.107 84.285 11.4235 84.1325 11.8246C83.9834 12.2256 83.9088 12.678 83.9088 13.1818C83.9088 13.6922 83.9851 14.1513 84.1375 14.5589C84.29 14.9666 84.5154 15.2898 84.8137 15.5284C85.1153 15.7637 85.4865 15.8814 85.9273 15.8814Z"
                  fill="#065F46"
                />
              </svg>
            </span>

            <!-- <span class="py-3 d-block position-relative">
                {{ scope.row["status"] || '0.00' }}
              </span> -->
          </template>
        </el-table-column>

        <el-table-column prop="domain_created_at" label="Date" min-width="200">
          <template slot-scope="scope">
            <span class="py-3 d-block position-relative">
              {{ scope.row.domain_created_at ? formatDate(scope.row["domain_created_at"]) : "---" }}
              {{ scope.row.domain_created_at ? moment(scope.row["domain_created_at"]).format("HH:mm A") : "---" }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="domain_expires"
          label="Expiration Date"
          min-width="200"
        >
          <template slot-scope="scope">
            <span class="py-3 d-block position-relative">
              {{ scope.row.domain_expires ? formatDate(scope.row["domain_expires"]) : "---" }}
              {{ scope.row.domain_expires ? moment(scope.row["domain_expires"]).format("HH:mm A") : "---" }}
            </span>
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
                  @click="viewDomain(scope.row)"
                >
                  View
                </li>
                <!-- <li
                  tabindex="-1"
                  class="el-dropdown-menu__item py-1"
                  @click="deleteDomain(scope.row)"
                >
                  Delete
                </li> -->
                <li
                  tabindex="-1"
                  class="el-dropdown-menu__item py-1"
                  v-if="scope.row.status === 'APPROVED'"
                  @click="RenewDomain(scope.row)"
                >
                  Renew
                </li>
                <li
                  tabindex="-1"
                  class="el-dropdown-menu__item py-1"
                  v-if="scope.row.status === 'APPROVED'"
                  @click="askToChangeDNS(scope.row)"
                >
                  Change DNS
                </li>
                <!--
                <li
                  tabindex="-1"
                  class="el-dropdown-menu__item py-1"
                  v-if="scope.row.status === 'APPROVED'"
                  @click="SuspendDomain(scope.row)"
                >
                  Suspend
                </li>
                -->
                <li
                  tabindex="-1"
                  v-if="isAdmin() == 'Super Admin' && scope.row.status === 'PENDING'"
                  class="el-dropdown-menu__item py-1"
                  @click="reRunQuery(scope.row)"
                >
                  Re-run Purchase
                </li>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <!-- Pagination -->
    <div class="mt-4" style="width: fit-content; margin-left: auto">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="totalDomains"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        @current-change="handlePageChange"
      />
    </div>

    <!-- <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
            <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
              <el-table-column prop="key" label="Channel" />
              <el-table-column prop="pv" label="Pv" />
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
            </span>
          </el-dialog> -->

    <div>
      <el-dialog
        title="Confirm Delete"
        :visible.sync="showDeleteModal"
        width="30%"
        @close="handleClose"
      >
        <p>Are you sure you want to delete this domain?</p>
        <div class="modal-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="danger" @click="handleDeleteConfirm"
            >Confirm</el-button
          >
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="Confirm Switch"
        :visible.sync="showSwitchModal"
        width="30%"
        @close="handleClose"
      >
        <p>Are you sure you want to switch your previous DNS?</p>
        <div class="modal-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button
            type="primary"
            :loading="isLoading"
            @click="handleChangeDNS"
            >Confirm</el-button
          >
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="Domain Details"
        :visible.sync="selectedDomainModal"
        style="width: 80em; max-width: 95%; margin: auto"
        class="pb-0 mb-0 selectedDomainModal"
        @close="handleClose"
      >
        <SelectedDomainContent :selected_domain="selectedDomain" />
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="Renew Your Domain"
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
                  <el-input
                    id="domain_name"
                    v-model.trim="createPrc.sld"
                    disabled
                  />
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
                    disabled
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
                <label for="title">Year Validity</label>
                <el-select
                  v-model="createPrc.year"
                  placeholder="Select Years..."
                  class="phone-code selectedYears w-100 mt-2 mt-sm-0"
                  @change="handleYearsChange(domain, $event)"
                >
                  <el-option
                    v-for="year in 10"
                    :key="year"
                    :label="`${year} Year${year > 1 ? 's' : ''}`"
                    :value="year"
                  />
                </el-select>
                <!-- <el-input id="title" v-model.trim="" class="col-12" /> -->
              </el-col>
            </el-form-item>

            <el-form-item class="mb-0 pb-0">
              <el-col>
                <div class="" style="width: fit-content; margin-left: auto">
                  <el-button @click="handleClose">Cancel</el-button>

                  <el-button
                    :loading="isLoading"
                    type="primary"
                    style="background-color: #42b983 !important; border: none"
                    @click.native.prevent="handleConfirmRenew"
                    >Renew Domain</el-button
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
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import axios from "axios";
import { getToken } from "@/utils/auth";
import SelectedDomainContent from "./SelectedDomain.vue";
import moment from "moment";

export default {
  components: { Pagination, SelectedDomainContent },
  props: {
    filters: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showTrfDomainModal: false,
      TLDLists: [],
      domains: [],
      loader: true,
      isLoading: false,
      currentPage: 1,
      pageSize: 0,
      totalDomains: 0,
      showDeleteModal: false,
      showSwitchModal: false,
      tableKey: 0,
      DomId: "",
      selectedDomain: {},
      selectedDomainModal: false,
      TLDId: "",
      selectedTLDItem: {},
      createPrc: {
        sld: "",
        tld_id: "",
        year: "",
      },
    };
  },
  created() {
    this.$bus.$on("admin_domain_purchased", this.handleDomainPurchased);
  },
  mounted() {
    this.fetchTLDLists();
    this.fetchDomains();
  },
  watch: {
    filters: {
      handler: "fetchDomains",
      deep: true,
    },
    currentPage: "fetchDomains",
  },
  methods: {
    moment,
    handleYearsChange(domain, event) {},

    askToChangeDNS(item) {
      this.selectedTLDItem = item;
      this.showSwitchModal = true;
    },

    handleChangeDNS() {
      let payload = {
        old_ip: "127.0.0.2",
        new_ip: "127.0.0.1",
        name_server: `dns1.${this.selectedTLDItem.domain_sld}.${this.selectedTLDItem.domain_tld}`,
      };

      this.isLoading = true;
      axios
        .post(this.dynamic_base_url(`client/domain/change-dns`), payload, {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          if (
            response.data.status ||
            response.data.data.status_code === "200"
          ) {
            this.$message.success(response.data.message);
            this.fetchDomains();

            this.isLoading = false;
            this.showSwitchModal = false;
            this.selectedTLDItem = {};
          }
        })
        .catch((error) => {
          console.log(error);
          const errorRes = error.response.data;
          if (errorRes.status >= 400 || errorRes.status === false) {
            if (errorRes.data.status_code === "200") {
              this.$message.success(errorRes.data.message);
              this.fetchDomains();

              this.isLoading = false;
              this.showSwitchModal = false;
              this.selectedTLDItem = {};
            }
            // this.$message.error(errorRes.message);
          } else {
            this.$message.error("An error occurred while re-running purchase.");
          }
          this.isLoading = false;
          this.showSwitchModal = false;
          this.selectedTLDItem = {};
        });
    },

    handleConfirmRenew() {
      if (this.createPrc.year) {
        let payload = {
          domain_id: this.selectedTLDItem.domain_id,
          num_years: String(this.createPrc.year),
        };
        this.isLoading = true;

        axios
          .post(this.dynamic_base_url(`client/domain/renew`), payload, {
            headers: { Authorization: "Bearer " + getToken() },
          })
          .then((response) => {
            this.$message.success(response.data.message);

            this.isLoading = false;
            this.showTrfDomainModal = false;
            this.createPrc = {
              sld: "",
              tld_id: "",
              year: "",
            };
            this.fetchDomains();
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
            this.isLoading = false;
            this.showTrfDomainModal = false;
            this.createPrc.year = "";
          });
      } else {
        this.$message.error("Kindly select a year to proceed");
      }
    },

    RenewDomain(item) {
      this.selectedTLDItem = item;
      this.showTrfDomainModal = true;
      this.createPrc.tld_id = `.${this.selectedTLDItem.domain_tld}`;
      this.createPrc.sld = this.selectedTLDItem.domain_sld;
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
    formatDate(dateString) {
      const options = { day: "numeric", month: "short", year: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", options);
    },
    handleDomainPurchased() {
      // console.log("Domain purchased event received. Refreshing domains...");
      this.fetchDomains();
    },
    fetchDomains() {
      this.loader = true;

      const params = {
        page: this.currentPage,
        // pageSize: this.pageSize,
        ...this.filters,
      };

      axios
        .get(this.dynamic_base_url("client/domains"), {
          headers: { Authorization: "Bearer " + getToken() },
          params,
        })
        .then((response) => {
          if (response.data.status === true) {
            this.totalDomains = response.data.data.total;
            this.domains = response.data.data.data;
            this.pageSize = response.data.data.per_page;
          } else {
            console.error("Failed to fetch domain data");
          }
          this.loader = false;
        })
        .catch((error) => {
          const errorRes = error.response.data;
          if (errorRes.status >= 400 || errorRes.status === false) {
            this.$message.error(errorRes.message);
          } else {
            this.$message.error(
              "Error fetching domain data. Please try again later."
            );
          }
          this.loader = false;
        });
    },

    reRunQuery(row) {
      // Implement re-run query functionality here
      this.loader = true;

      axios
        .post(
          this.dynamic_base_url(`admin/domains/re-run-purchase`),
          {
            tranx_id: row.invoice_id,
          },
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        )
        .then((response) => {
          this.$message.success(response.data.message);

          this.loader = false;
          this.fetchDomains();
        })
        .catch((error) => {
          console.log(error);
          const errorRes = error.response.data;
          if (errorRes.status >= 400 || errorRes.status === false) {
            this.$message.error(errorRes.message);
          } else {
            this.$message.error("An error occurred while re-running purchase.");
          }
          this.loader = false;
        });
    },
    viewDomain(row) {
      this.selectedDomain = row;
      this.selectedDomainModal = true;
      // this.$router.push({
      //   name: 'view-domain-cat',
      //   params: { id: row.DomainNameID }
      // })
    },
    SuspendDomain(row) {
      console.log("Selected domain:", row);
    },
    deleteDomain(val) {
      this.showDeleteModal = true;
      this.DomId = val.domain_id;
    },
    handleClose() {
      this.showTrfDomainModal = false;
      this.selectedTLDItem = {};
      this.TLDId = {};
      this.showDeleteModal = false;
      this.showSwitchModal = false;
      this.DomId = "";
      this.createPrc = {
        sld: "",
        tld_id: "",
        year: "",
      };
    },
    handleDeleteConfirm() {
      console.log("Assigned ID :", this.DomId);
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchDomains();
    },

    formatAmount(amount) {
      if (typeof amount === "string" && amount.includes(",")) {
        amount = amount.replace(/,/g, "");
      }

      const numericAmount = parseFloat(amount);

      // Check if numericAmount is a valid number
      if (!isNaN(numericAmount)) {
        return numericAmount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }

      return amount;
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  overflow-x: auto;
}

.selectedDomainModal::-webkit-scrollbar,
.selectedDomainModal::-webkit-scrollbar-track {
  appearance: none;
}
</style>
