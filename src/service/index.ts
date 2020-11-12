import { httpUtil } from 'geekbase'

const addOnlineHomeworkImage = '/service-question/online/homework/addOnlineHomeworkImage' // 学生拍照上传
const getOnlineHomeworkImageInfo = '/service-question/online/homework/getOnlineHomeworkImageInfo' // 根据id查询解析后的题目信息
const confirmOnlineHomeworkImageInfo = '/service-question/online/homework/confirmOnlineHomeworkImageInfo' // 保存学生确认后的答题信息

httpUtil.setRequestInterceptor(config => {
  return {
    ...config,
    headers: {
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIyNTk2ODQiLCJ0ZXJtaW5hbCI6InBjIiwidXVpZCI6IjAyNDlhYjFlNTkxOTRjN2JiYmZkMWY3NDM1ODRiM2U5IiwidGltZXN0YW1wIjoxNjAyMTIzNTM5ODExfQ.4mq0VQJcNZDpOycRmqPgd8van6BuJGSvr32kkw8g9X8"
    }
  }
}, _eror => {

})

export const addOnlineHomeworkImageInterface = (file: string, studentId: number) => {
  const formData = new FormData()
  const name = file.split('/')[file.split('/').length - 1]
  let fileData = { uri: file, type: 'multipart/form-data', name };
  formData.append('file', fileData)
  formData.append('studentId', studentId)
  return httpUtil.post(addOnlineHomeworkImage, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const getOnlineHomeworkImageInfoInterface = (id: string | number ) => {
  return httpUtil.get(getOnlineHomeworkImageInfo,  { 
    params: {id}
  } )
}

export const confirmOnlineHomeworkImageInfoInterface = (params: {
  onlineHomeworkImageId: number
  questionId:	number
  questionType:	string
  ownerAnswer:	string []
  questionUrl: string
}) => {
  return httpUtil.post(confirmOnlineHomeworkImageInfo, params, {})
}