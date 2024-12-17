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
    getBucketItems(bucketId: number,paramsObj: any) {
        const url = `${BASE_URL}/buckets/${bucketId}/items`;
        let params = new HttpParams()
            .set('page', paramsObj.page)
            .set('limit', paramsObj.limit);
        if (paramsObj.query) {
            params = params.set('query', paramsObj.query);
        }
        if (paramsObj.done > -1) {
            params = params.set('done', paramsObj.done);
        }
        return this.httpClient.get(url, {params});
    }

    createBucketItem(bucketId: number, data: any) {
        const url = `${BASE_URL}/buckets/${bucketId}/items`;
        return this.httpClient.post(url, data);
    }

    updateBucketItem(bucketId: number, itemId: number, data: any) {
        const url = `${BASE_URL}/buckets/${bucketId}/items/${itemId}`;
        return this.httpClient.patch(url, data);
    }

    deleteBucketItem(bucketId: number, itemId: number) {
        const url = `${BASE_URL}/buckets/${bucketId}/items/${itemId}`;
        const data = {id: itemId}
        return this.httpClient.delete(url, {body: data});
    }
}
