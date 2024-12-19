import {PageEvent} from "@angular/material/paginator";
import {BaseComponent} from "./base.component";
import {DestroyRef, inject} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

export interface PagedResultDto {
    items: any[]
    totalCount: number
}

export class PagedRequestDto {
    page: number | undefined
    limit: number | undefined
}

export abstract class PagedListingComponent extends BaseComponent {
    // @ViewChild(MatPaginator) paginatorElement: MatPaginator | undefined
    router = inject(Router)
    route = inject(ActivatedRoute)
    public pageSize = 5
    public pageNumber = 1
    public totalPages = 1
    public totalItems = 100
    public isTableLoading = false
    public pageSizeOptions: number[] = [5 ,10, 20, 50, 100, 200]
    paramObj = {
        limit: 10,
        page: 1,
        query: '',
        done: -1
    }
    // public sortCol = ''
    // public sortDirection = ''

    protected constructor() {
        super()
    }


    refresh(): void {
        this.getDataPage(this.pageNumber)
    }

    public showPaging(result: PagedResultDto, pageNumber: number): void {
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1

        this.totalItems = result.totalCount
        this.pageNumber = pageNumber
    }

    public getDataPage(page: number): void {
        const req = new PagedRequestDto()
        req.limit = this.pageSize
        req.page = page

        this.isTableLoading = true
        this.list(req, page, () => {
            this.isTableLoading = false
        })
    }

    // sortChange(event: Sort) {
    //     this.sortCol = event.active
    //     this.sortDirection = event.direction
    //     this.refresh()
    // }

    handleSearch() {
        this.pageNumber = 1
        // this.paginatorElement!.pageIndex = this.pageNumber - 1
        this.refresh()
    }

    public pageChanged(page: PageEvent) {
        this.pageNumber = page.pageIndex + 1
        this.pageSize = page.pageSize
        this.refresh()
    }

    pageChangedV2(page: PageEvent) {
        this.router.navigate([], {
            queryParams: {
                page: page.pageIndex + 1,
                limit: page.pageSize,
                query: this.paramObj.query
            }
        })
        this.pageNumber = page.pageIndex + 1
        this.pageSize = page.pageSize
        //no require refresh because of paramsChanged already handle it
        // this.refresh()
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    protected abstract list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void

    protected abstract delete(entity: any): void

    paramsChanged() {
        const paramSubs = this.route.queryParams.subscribe((params) => {
            if (params['page']) {
                this.pageNumber = params['page']
            }
            if (params['limit']) {
                this.pageSize = params['limit']
            }
            if (params['query']) {
                this.paramObj.query = params['query']
            } else {
                this.paramObj.query = ''
            }
            this.refresh()
        })
        this.destroyRef.onDestroy(() => {
            paramSubs.unsubscribe();
        })
    }
}
