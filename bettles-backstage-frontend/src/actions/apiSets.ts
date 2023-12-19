import GLOBAL_VAR from "../globalAttr/globalVar";
import api from "./api";
import { GetOrederList, PostOrder } from "./apiInterface";

export default class ApiSets{
    /**
     * // ✎NOTE: ---------〖order - 取得訂單紀錄〗---------
     */
    static async get_orders_list<TResponse>(GOL:GetOrederList):Promise<TResponse>{
        // url = http://localhost:8000/get_orders_list?id=1&fromtime=123&totime=123
        let params = {
            type:"get_orders_list",
            data:{}
        }
        let _url = `${GLOBAL_VAR.API_HOST}/${params.type}?id=${GOL.id}&month=${GOL.month+1}`
        return api( _url, "GET", params.type, JSON.stringify(params.data))
    }
    /**
     * // ✎NOTE: ---------〖order - 新增訂單〗---------
     */
    static async post_order<TResponse>(ORDER:PostOrder):Promise<TResponse>{
        // url = http://localhost:8000/create_order?id=1&fromtime=123&totime=123
        let params = {
            type:"create_order",
            data:ORDER
        }
        let _url = `${GLOBAL_VAR.API_HOST}/${params.type}`
        return api( _url, "POST", params.type, JSON.stringify(params.data))
    }
    /**
     * // ✎NOTE: ---------〖order - 刪除訂單〗---------
     */
    static async delete_order<TResponse>(id:number):Promise<TResponse>{
        // url = http://localhost:8000/create_order?id=1&fromtime=123&totime=123
        let params = {
            type:"delete_order",
        }
        let _url = `${GLOBAL_VAR.API_HOST}/${params.type}?id=${id}`
        return api( _url, "DELETE", params.type)
    }

    /**
     * // ✎NOTE: ---------〖customer - 取得客戶資料〗---------
     */
    static async get_customers_list<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/get_customers_list
        let params = {
            type:"get_customers_list",
            data:{}
        }
        let _url = `${GLOBAL_VAR.API_HOST}/${params.type}`
        return api( _url, "GET", params.type, JSON.stringify(params.data))
    }
    /**
     * // ✎NOTE: ---------〖order - 刪除訂單〗---------
     */
    static async delete_customers<TResponse>(id:number):Promise<TResponse>{
        // url = http://localhost:8000/delete_customers?id=1
        let params = {
            type:"delete_customers",
        }
        let _url = `${GLOBAL_VAR.API_HOST}/${params.type}?id=${id}`
        return api( _url, "DELETE", params.type)
    }
}