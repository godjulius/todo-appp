import {inject, Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHandlerFn, HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {CookieStorageService} from "./cookie-storage.service";
import {AUTH_TOKEN} from "../constant/AppConstant";
import {Router} from "@angular/router";
import {ToastMsgService} from "../../shared/toast-msg/toast-msg.service";

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
    private readonly requests: Array<HttpRequest<any>> = []
    router = inject(Router)
    toastMsgService = inject(ToastMsgService)

    constructor(private cookieService: CookieStorageService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authToken = this.cookieService.getCookie(AUTH_TOKEN);
        // Clone the request to add the new header
        let headers = new HttpHeaders()
        // if (!request.headers.has('Content-Type')) {
        //   headers = headers.append('Content-Type', 'application/json');
        // }
        if (authToken) {
            headers = headers.append('Authorization', 'Bearer ' + authToken);
        }

        const cloneRequest = request.clone({headers})
        const authRequest = cloneRequest
        this.requests.push(authRequest)

        return next.handle(cloneRequest)
            .pipe(
                catchError((error: any) => {
                    if (error.status === 401) {
                        // Handle 401 error
                        // Todo: show toast error
                        this.toastMsgService.addError({title: 'Error', message: `Unauthorized`})
                        this.cookieService.deleteCookie(AUTH_TOKEN);
                        this.router.navigate(['/login']);
                        return throwError(() => new Error())
                    } else if (error.status === 422) {
                        // Handle 422 error
                        this.toastMsgService.addError({title: 'Error', message: `Unprocessable Content`})
                        return throwError(() => new Error())
                    } else {
                        // Handle 400 error
                        this.toastMsgService.addError({title: 'Error', message: `Bad Request, ${error.error}`})
                        return throwError(() => new Error())
                    }
                    // return throwError(() => new Error())
                }),
                finalize(() => {
                    const index = this.requests.indexOf(authRequest)
                    if (index >= 0) {
                        this.requests.splice(index, 1)
                    }
                })
            )
    }
}

export function commonInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    return next(req);
}
