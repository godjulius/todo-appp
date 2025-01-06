import {Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-counter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './counter.component.html',
    styleUrl: './counter.component.scss',
})
export class CounterComponent implements OnChanges {
    @Input() millisecond = 0
    @Output() timerEnd = new EventEmitter<void>()
    timer = signal({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    })
    isRunning = false
    remainingTime = 0
    intervalRef: ReturnType<typeof setTimeout> | undefined = undefined
    ngOnChanges(changes: SimpleChanges) {
        if (changes['millisecond']) {
            console.log(this.millisecond)
            clearInterval(this.intervalRef)
            this.setDisplayedTime(this.millisecond)
        }
    }

    startCountdown() {
        this.intervalRef = setInterval(() => {
            this.calculateTime()
        }, 500)
    }

    calculateTime() {
        this.setDisplayedTime(this.remainingTime)
        this.remainingTime -= 500
        if (this.remainingTime <= 0) {
            this.setDisplayedTime(0)
            clearInterval(this.intervalRef)
            this.intervalRef = undefined
            this.timerEnd.emit()
            return
        }
    }

    setDisplayedTime(milliseconds: number) {
        this.timer.set({
            hour: Math.floor(milliseconds / 3600000),
            minute: Math.floor((Math.floor(milliseconds % 3600000)) / 60000),
            second: Math.floor((Math.floor(milliseconds % 60000)) / 1000),
            millisecond: milliseconds % 1000
        })
    }

    start() {
        this.isRunning = true
        this.remainingTime = this.millisecond
        clearInterval(this.intervalRef)
        this.startCountdown()
    }

    stop() {
        this.isRunning = false
        this.remainingTime = this.millisecond
        this.setDisplayedTime(this.millisecond)
        clearInterval(this.intervalRef)
        this.intervalRef = undefined
    }

    handlePauseResume() {
        this.isRunning = !this.isRunning
        if (this.isRunning) {
            this.startCountdown()
        } else {
            clearInterval(this.intervalRef)
            this.intervalRef = undefined
        }
    }
}
