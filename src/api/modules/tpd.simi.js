export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
     * @description 请求项目中的文件
     * @param {String} url 文件地址
     */
    BASE_GET(url = '') {
        return request({
            baseURL: process.env.VUE_APP_API,
            url,
            method: 'get'
        })
    },
    BASE_POST(url = '', data = {}) {
        return request({
            baseURL: process.env.VUE_APP_API,
            url,
            method: 'post',
            data: data
        })
    },
    STANDARD_FIND(keyWord = '', pageNumber = 1, pageSize = 20) {
        return request({
            baseURL: process.env.VUE_APP_API,
            url: 'logic/SIMI/SearchStandard?keyWord=' + keyWord + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize,
            method: 'get'
        })
    }
})