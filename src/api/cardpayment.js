import request from '@/utils/request'
const path = ''

export function queryByPage(data) {
    return request({
        url: `${path}/v1/cardPaymentController/queryByPage`,
        method: 'post',
        data
    })
}
export function getCardPayment(id) {
    return request({
        url: `${path}/v1/cardPaymentController/${id}`,
        method: 'get'
    })
}
export function getCardPayments(data) {
    return request({
        url: `${path}/v1/cardPaymentController/queryAll`,
        method: 'post',
        data
    })
}
export function addCardPayment(data) {
    return request({
        url: `${path}/v1/cardPaymentController/save`,
        method: 'post',
        data
    })
}

export function updateCardPayment(data) {
    return request({
        url: `${path}/v1/cardPaymentController/update`,
        method: 'put',
        data
    })
}

export function deleteCardPayment(id) {
    return request({
        url: `${path}/v1/cardPaymentController/${id}`,
        method: 'delete'
    })
}
export function batchDeleted(data) {
    return request({
    url: `${path}/v1/cardPaymentController/batchDeleted`,
    method: 'delete',
    data
    })
}
export function batchCreateOrUpdate(data) {
    return request({
    url: `${path}/v1/cardPaymentController/batchCreateOrUpdate`,
    method: 'delete',
    data
    })
}
