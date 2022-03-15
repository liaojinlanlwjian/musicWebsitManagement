import request from '@/utils/request'
const path = ''

export function queryByPage(data) {
    return request({
        url: `${path}/v1/vehicleInformationController/queryByPage`,
        method: 'post',
        data
    })
}
export function getVehicleInformation(id) {
    return request({
        url: `${path}/v1/vehicleInformationController/${id}`,
        method: 'get'
    })
}
export function getVehicleInformations(data) {
    return request({
        url: `${path}/v1/vehicleInformationController/queryAll`,
        method: 'post',
        data
    })
}
export function addVehicleInformation(data) {
    return request({
        url: `${path}/v1/vehicleInformationController/save`,
        method: 'post',
        data
    })
}

export function updateVehicleInformation(data) {
    return request({
        url: `${path}/v1/vehicleInformationController/update`,
        method: 'put',
        data
    })
}

export function deleteVehicleInformation(id) {
    return request({
        url: `${path}/v1/vehicleInformationController/${id}`,
        method: 'delete'
    })
}
export function batchDeleted(data) {
    return request({
    url: `${path}/v1/vehicleInformationController/batchDeleted`,
    method: 'delete',
    data
    })
}
export function batchCreateOrUpdate(data) {
    return request({
    url: `${path}/v1/vehicleInformationController/batchCreateOrUpdate`,
    method: 'delete',
    data
    })
}
