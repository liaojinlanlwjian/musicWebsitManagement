import request from '@/utils/request'
const path = ''

export function queryByPage(data) {
    return request({
        url: `${path}/v1/speedAlarmController/queryByPage`,
        method: 'post',
        data
    })
}
export function getSpeedAlarm(id) {
    return request({
        url: `${path}/v1/speedAlarmController/${id}`,
        method: 'get'
    })
}
export function getSpeedAlarms(data) {
    return request({
        url: `${path}/v1/speedAlarmController/queryAll`,
        method: 'post',
        data
    })
}
export function addSpeedAlarm(data) {
    return request({
        url: `${path}/v1/speedAlarmController/save`,
        method: 'post',
        data
    })
}

export function updateSpeedAlarm(data) {
    return request({
        url: `${path}/v1/speedAlarmController/update`,
        method: 'put',
        data
    })
}

export function deleteSpeedAlarm(id) {
    return request({
        url: `${path}/v1/speedAlarmController/${id}`,
        method: 'delete'
    })
}
export function batchDeleted(data) {
    return request({
    url: `${path}/v1/speedAlarmController/batchDeleted`,
    method: 'delete',
    data
    })
}
export function batchCreateOrUpdate(data) {
    return request({
    url: `${path}/v1/speedAlarmController/batchCreateOrUpdate`,
    method: 'delete',
    data
    })
}
