import request from '@/utils/request'
const path = ''

export function queryByPage(data) {
    return request({
        url: `${path}/v1/positionInformationController/queryByPage`,
        method: 'post',
        data
    })
}
export function getPositionInformation(id) {
    return request({
        url: `${path}/v1/positionInformationController/${id}`,
        method: 'get'
    })
}
export function getPositionInformations(data) {
    return request({
        url: `${path}/v1/positionInformationController/queryAll`,
        method: 'post',
        data
    })
}
export function addPositionInformation(data) {
    return request({
        url: `${path}/v1/positionInformationController/save`,
        method: 'post',
        data
    })
}

export function updatePositionInformation(data) {
    return request({
        url: `${path}/v1/positionInformationController/update`,
        method: 'put',
        data
    })
}

export function deletePositionInformation(id) {
    return request({
        url: `${path}/v1/positionInformationController/${id}`,
        method: 'delete'
    })
}
export function batchDeleted(data) {
    return request({
    url: `${path}/v1/positionInformationController/batchDeleted`,
    method: 'delete',
    data
    })
}
export function batchCreateOrUpdate(data) {
    return request({
    url: `${path}/v1/positionInformationController/batchCreateOrUpdate`,
    method: 'delete',
    data
    })
}
