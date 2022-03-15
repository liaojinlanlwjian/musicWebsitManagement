import request from '@/utils/request'
const path = ''

export function queryByPage(data) {
    return request({
        url: `${path}/v1/administrativeEnforcementController/queryByPage`,
        method: 'post',
        data
    })
}
export function getAdministrativeEnforcement(id) {
    return request({
        url: `${path}/v1/administrativeEnforcementController/${id}`,
        method: 'get'
    })
}
export function getAdministrativeEnforcements(data) {
    return request({
        url: `${path}/v1/administrativeEnforcementController/queryAll`,
        method: 'post',
        data
    })
}
export function addAdministrativeEnforcement(data) {
    return request({
        url: `${path}/v1/administrativeEnforcementController/save`,
        method: 'post',
        data
    })
}

export function updateAdministrativeEnforcement(data) {
    return request({
        url: `${path}/v1/administrativeEnforcementController/update`,
        method: 'put',
        data
    })
}

export function deleteAdministrativeEnforcement(id) {
    return request({
        url: `${path}/v1/administrativeEnforcementController/${id}`,
        method: 'delete'
    })
}
export function batchDeleted(data) {
    return request({
    url: `${path}/v1/administrativeEnforcementController/batchDeleted`,
    method: 'delete',
    data
    })
}
export function batchCreateOrUpdate(data) {
    return request({
    url: `${path}/v1/administrativeEnforcementController/batchCreateOrUpdate`,
    method: 'delete',
    data
    })
}
