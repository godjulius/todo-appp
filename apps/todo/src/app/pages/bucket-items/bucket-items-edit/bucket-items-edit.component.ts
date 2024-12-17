import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BucketsService} from "../../../shared/services/buckets.service";
import {BaseComponent} from "../../../core/base.component";
import {finalize} from "rxjs";

@Component({
    selector: 'app-bucket-items-edit',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon, MatSlideToggleModule],
    templateUrl: './bucket-items-edit.component.html',
    styleUrl: './bucket-items-edit.component.scss',
})
export class BucketItemsEditComponent extends BaseComponent{
    matData = inject(MAT_DIALOG_DATA)
    bucketsService = inject(BucketsService)
    dialogRef = inject(MatDialogRef<BucketItemsEditComponent>)
    title = signal('')
    isDone = signal(false)
    isCreate = signal(false)

    constructor() {
        super()
        console.log(this.matData)
        if (this.matData && !this.matData.isCreate) {
            this.title.set(this.matData.content)
            this.isDone.set(this.matData.done)
        } else {
            this.isCreate.set(true)
        }
    }

    createItem() {
        this.loadingService.startLoading()
        const createSubs = this.bucketsService.createBucketItem(this.matData.bucketId, {
            content: this.title(),
            done: this.isDone()
        })
            .pipe(
                finalize(() => {
                    this.loadingService.stopLoading()
                })
            )
            .subscribe((res) => {
                console.log(res)
                this.dialogRef.close(true);
            })
        this.destroyRef.onDestroy(() => {
            createSubs.unsubscribe()
        })
    }

    updateItem() {
        const payload = {
            content: this.title(),
            done: this.isDone()
        }
        this.loadingService.startLoading()
        const updateSubs = this.bucketsService.updateBucketItem(this.matData.bucketId, this.matData.id, payload)
            .pipe(
                finalize(() => {
                    this.loadingService.stopLoading()
                })
            )
            .subscribe((res) => {
                console.log(res)
                this.dialogRef.close(true);
            })

        this.destroyRef.onDestroy(() => {
            updateSubs.unsubscribe()
        })
    }

    handleDeleteItem() {
        this.loadingService.startLoading()
        const deleteSubs = this.bucketsService.deleteBucketItem(this.matData.bucketId, this.matData.id)
            .pipe(
                finalize(() => {
                    this.loadingService.stopLoading()
                })
            )
            .subscribe((res) => {
                console.log(res)
                this.dialogRef.close(true);
            })

        this.destroyRef.onDestroy(() => {
            deleteSubs.unsubscribe()
        })
    }
}
