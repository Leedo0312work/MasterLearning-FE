import { fetchBlockAccount, fetchGetListAccount, fetchUpdateAccount } from "~/services/account"

export const getListAccount = async (limit:any, page:any) => {
    const response = await fetchGetListAccount(limit, page)
    return response.data
}

export const getUpdateAccount  = async (data: any) => {
    const response = await fetchUpdateAccount(data)
    return response.data.result
}

export const getBlockAccount  = async (user_id: string) => {
    const response = await fetchBlockAccount(user_id)
    return response.data
}