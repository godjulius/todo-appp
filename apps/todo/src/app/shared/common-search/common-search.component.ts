import {Component, DestroyRef, inject, input, OnChanges, output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {BehaviorSubject, debounceTime, distinctUntilChanged} from "rxjs";

@Component({
    selector: 'app-common-search',
    standalone: true,
    imports: [CommonModule, MatFormField, MatIcon, MatIconButton, MatInput, MatLabel, MatSuffix],
    templateUrl: './common-search.component.html',
    styleUrl: './common-search.component.scss',
})
export class CommonSearchComponent {
    filterChange = output<string>()
    label = input<string>('')
    query = input<string>('')
    changeObservable = new  BehaviorSubject<string | undefined>(undefined)
    destroyRef = inject(DestroyRef)
    constructor() {
        const outputSubs = this.changeObservable
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((value) => {
                if (value !== undefined) {
                    this.filterChange.emit(value)
                }
            })
        this.destroyRef.onDestroy(() => {
            outputSubs.unsubscribe()
        })
    }

    handleInput(event: any) {
        this.changeObservable.next(event.target.value);
    }
}
