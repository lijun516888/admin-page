import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username: username,
    password: password
  }
  return request({
    // url: '/admin/login/index',
    url: '/mobile/login.data',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    // url: '/admin/admin/getuser',
    url: '/mobile/doLoadUser.data',
    method: 'post'
  })
}

