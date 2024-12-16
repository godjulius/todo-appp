import {PageEvent} from "@angular/material/paginator";

export interface PagedResultDto {
    items: any[]
    totalCount: number
}

export class PagedRequestDto {
    page: number | undefined
    limit: number | undefined
}

export abstract class PagedListingComponent  {
    // @ViewChild(MatPaginator) paginatorElement: MatPaginator | undefined
    public pageSize = 5
    public pageNumber = 1
    public totalPages = 1
    public totalItems = 100
    public isTableLoading = false
    public pageSizeOptions: number[] = [5 ,10, 20, 50, 100, 200]
    // public sortCol = ''
    // public sortDirection = ''

    constructor() {
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

    protected abstract list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void

    protected abstract delete(entity: any): void
}
