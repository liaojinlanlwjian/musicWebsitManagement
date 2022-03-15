import request from '@/utils/request'
const path = ''

export function queryByPage(data) {
    return request({
        url: `${path}/v1/operationRecordController/queryByPage`,
        method: 'post',
        data
    })
}
export function getOperationRecord(id) {
    return request({
        url: `${path}/v1/operationRecordController/${id}`,
        method: 'get'
    })
}
export function getOperationRecords(data) {
    return request({
        url: `${path}/v1/operationRecordController/queryAll`,
        method: 'post',
        data
    })
}
export function addOperationRecord(data) {
    return request({
        url: `${path}/v1/operationRecordController/save`,
        method: 'post',
        data
    })
}

export function updateOperationRecord(data) {
    return request({
        url: `${path}/v1/operationRecordController/update`,
        method: 'put',
        data
    })
}

export function deleteOperationRecord(id) {
    return request({
        url: `${path}/v1/operationRecordController/${id}`,
        method: 'delete'
    })
}
export function batchDeleted(data) {
    return request({
    url: `${path}/v1/operationRecordController/batchDeleted`,
    method: 'delete',
    data
    })
}
export function batchCreateOrUpdate(data) {
    return request({
    url: `${path}/v1/operationRecordController/batchCreateOrUpdate`,
    method: 'delete',
    data
    })
}
