import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CounterComponent} from "../../shared/counter/counter.component";
import {CommonButtonComponent} from "../../shared/common-button/common-button.component";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-demo-counter',
    standalone: true,
    imports: [CommonModule, CounterComponent, CommonButtonComponent, FormsModule],
    templateUrl: './demo-counter.component.html',
    styleUrl: './demo-counter.component.scss',
})
export class DemoCounterComponent {
    @ViewChild('counter1') counter1!: CounterComponent
    enteredTime = 10;
    start() {
        this.counter1.start()
    }

    stop() {
        this.counter1.stop()
    }

    handlePauseResume() {
        this.counter1.handlePauseResume()
    }
}
