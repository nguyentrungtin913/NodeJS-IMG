import { Response } from "express";
export function pagination(res: Response, list: any, name: string, code: string, msgKey: string, description: string, totalElement: any, page: any, limit: any) {
    let totalPage = 1;

    if (totalElement > limit) {
        totalPage = Math.ceil(totalElement / limit);
    }else{
        totalPage=1;
    }   
    let result = {
        "code": code,
        "msgKey": msgKey,
        "description": description,
        "data": {
            [name]: list,
            "pagination":{
                "total": totalElement,
                "perPage": limit,
                "currentPage":page,
                "lastPage": totalPage
            }
        }
    }
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(result));
}
