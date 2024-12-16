import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BASE_URL} from "../../core/constant/ApiConstant";

@Injectable({
    providedIn: 'root'
})
export class BucketsService {
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

    patchBucket(id: string, data: any) {
        const url = `${BASE_URL}/buckets/${id}`;
        return this.httpClient.patch(url, data);
    }

    createBucket(data: any) {
        const url = `${BASE_URL}/buckets`;
        return this.httpClient.post(url, data);
    }

    deleteBucket(_id: string) {
        const url = `${BASE_URL}/buckets/${_id}`;
        const data = {id: _id}
        return this.httpClient.delete(url, {body: data});
    }
}
