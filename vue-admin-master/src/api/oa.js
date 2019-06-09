import request from '@/utils/request'

export function getList(query) {
	return request({
		url: '/mobile/oa/task',
		method: 'post',
		data: query
	})
}