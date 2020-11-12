import { cacheUtil, cache as _cache } from 'geekbase'

const cache = {
    ..._cache,
    clearAll: cacheUtil.clearAll,
    // account
    saveAccount: async (value: any) => {
        await cacheUtil.saveData('account', value)
    },
    getAccount: async () => {
        return await cacheUtil.getData('account')
    },
    // token & account
    saveTokenAccount: async (token: string, account: string, userId: string) => {
        let kvs = [
            ['token', token],
            ['account', account],
            ['userId', userId]
        ]
        await cacheUtil.saveDatas(kvs)
    },
    saveUserId: async (userId: string) => {
        await cacheUtil.saveData('userId', userId)
    },
    getUserId: async () => {
        return await cacheUtil.getData('userId')
    },
    saveStudentId: async (value: any) => {
        await cacheUtil.saveData('studentId', value || '')
    },

    getStudentId: async () => {
        return await cacheUtil.getData('studentId')
    },

    saveQuestionnaireNoMoreVisible: async (studentId: string) => {
        console.log('调查问卷', '存值【不再显示】', 'questionnaire_nomorevisible_' + studentId)
        await cacheUtil.saveData('questionnaire_nomorevisible_' + studentId, 'true')
    },

    getQuestionnaireNoMoreVisible: async (studentId: string) => {
        let v = await cacheUtil.getData('questionnaire_nomorevisible_' + studentId)
        console.log('调查问卷', '取值【不再显示】', 'questionnaire_nomorevisible_' + studentId, v, !!v)
        return !!v
    },

    // selectedIndex
    saveSelectedStudentIndex: async (index: number | undefined | null | string) => {
        let i = (index === undefined || index === null || index === '') ? 0 : index
        await cacheUtil.saveData('selectedStudentIndex', i + '')
    },

    getSelectedStudentIndex: async () => {
        let indexStr: string = await cacheUtil.getData('selectedStudentIndex')
        // eslint-disable-next-line radix
        return parseInt(indexStr)
    },

    // testUrl
    saveTestUrl: async (url: string) => {
        let testUrlListJson = await cacheUtil.getData('testUrlList')
        let newTestUrlListJson = testUrlListJson ? testUrlListJson + '+' + url : url
        await cacheUtil.saveData('testUrlList', newTestUrlListJson)
    },
    getTestUrlList: async () => {
        let testUrlListJson = await cacheUtil.getData('testUrlList')
        if (!testUrlListJson) return []
        return testUrlListJson.split('+')
    },
    clearTestUrlList: async () => {
        await cacheUtil.saveData('testUrlList', '')
    }

}

export default cache
