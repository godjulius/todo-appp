import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BASE_URL} from "../../core/constant/ApiConstant";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    httpClient = inject(HttpClient);

    getBuckets(paramsObj: any) {
        const url = `${BASE_URL}/buckets`;
        let params = new HttpParams()
            .set('limit', paramsObj.limit)
            .set('page', paramsObj.page);
        if (paramsObj.query) {
           params = params.set('query', paramsObj.query);
            console.log(params);
        }
        return this.httpClient.get(url, {params});
    }
}
