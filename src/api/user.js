import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token, userId) {
  return request({
    url: `/user/show/${userId}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function fetchAllUsers(token, filter_params) {
  return request({
    url: `/user/users`,
    method: 'get',
    body: filter_params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
