import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    /*Forward Ref makes sure the class is available or hoisted at setting up*/
    useExisting: forwardRef(() => StockCounterComponent),
    multi: true
};

@Component({
    selector: 'stock-counter',
    providers: [COUNTER_CONTROL_ACCESSOR],
    styleUrls: ['stock-counter.component.scss'],
    template: `
        <div class="stock-counter"
             [class.focused]="focus">
            <div>
                <div
                    tabindex="0"
                    (keydown)="onKeyDown($event)"
                    (blur)="onBlur($event)"
                    (focus)="onFocus($event)">
                    <p>{{ value }}</p>
                    <div>
                        <button
                            [disabled]="value === max"
                            type="button"
                            (click)="increment()">+</button>
                        <button
                            [disabled]="value === min"
                            type="button"
                            (click)="decrement()">-</button>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class StockCounterComponent implements ControlValueAccessor{

    private onTouch: Function;
    private onModelChange: Function;

    registerOnTouched(fn) {
        this.onTouch = fn;
    }

    registerOnChange(fn) {
        this.onModelChange = fn;
    }

    writeValue(value) {
        this.value = value || 0;
    }

    @Input() step: number = 10;
    @Input() min: number = 10;
    @Input() max: number = 1000;

    value: number = this.min;

    focus: boolean;

    increment() {
        if (this.value < this.max){
            this.value = this.value + this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }

    decrement() {
        if (this.value > this.min){
            this.value = this.value - this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }

    onKeyDown(event: KeyboardEvent) {
        const handlers = {
            ArrowDown: () => this.decrement(),
            ArrowUp: () => this.increment()
        };
        console.log(event.code);
        if (handlers[event.code]) {
            handlers[event.code]();
            event.preventDefault();
            event.stopPropagation();
        }
        this.onTouch();
    }

    onBlur(event: FocusEvent) {
        this.focus = false;
        event.preventDefault();
        event.stopPropagation();
        this.onTouch();
    }

    onFocus(event: FocusEvent) {
        this.focus = true;
        event.preventDefault();
        event.stopPropagation();
        this.onTouch();
    }
}