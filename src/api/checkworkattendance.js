import request from '@/utils/request'
const path = ''

export function queryByPage(data) {
    return request({
        url: `${path}/v1/checkWorkAttendanceController/queryByPage`,
        method: 'post',
        data
    })
}
export function getCheckWorkAttendance(id) {
    return request({
        url: `${path}/v1/checkWorkAttendanceController/${id}`,
        method: 'get'
    })
}
export function getCheckWorkAttendances(data) {
    return request({
        url: `${path}/v1/checkWorkAttendanceController/queryAll`,
        method: 'post',
        data
    })
}
export function addCheckWorkAttendance(data) {
    return request({
        url: `${path}/v1/checkWorkAttendanceController/save`,
        method: 'post',
        data
    })
}

export function updateCheckWorkAttendance(data) {
    return request({
        url: `${path}/v1/checkWorkAttendanceController/update`,
        method: 'put',
        data
    })
}

export function deleteCheckWorkAttendance(id) {
    return request({
        url: `${path}/v1/checkWorkAttendanceController/${id}`,
        method: 'delete'
    })
}
export function batchDeleted(data) {
    return request({
    url: `${path}/v1/checkWorkAttendanceController/batchDeleted`,
    method: 'delete',
    data
    })
}
export function batchCreateOrUpdate(data) {
    return request({
    url: `${path}/v1/checkWorkAttendanceController/batchCreateOrUpdate`,
    method: 'delete',
    data
    })
}
