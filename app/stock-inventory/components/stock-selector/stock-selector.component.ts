import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

/*import { StockCounterComponent } from '../stock-counter/stock-counter.component';*/

import { Product} from '../../models/product.interface';

@Component({
    selector: 'stock-selector',
    styleUrls: ['stock-selector.component.scss'],
    template: `
        <div class="stock-selector" [formGroup]="parent">
            <div formGroupName="selector">
                <select formControlName="product_id">
                    <option value="">Select Stock</option>
                    <option *ngFor="let product of products"
                        [value]="product.id"
                    >{{ product.name }}</option>
                </select>
                <stock-counter
                    [step]="10"
                    [min]="10"
                    [max]="1000"
                    formControlName="quantity"
                ></stock-counter>

                <button
                    [disabled]="stockExists || notSelected"
                    (click)="onAdd()"
                    type="button">Add Stock</button>

                <div
                    *ngIf="stockExists"
                    class="stock-selector__error">
                    Item already exists in the stock.
                </div>
            </div>
        </div>
    `
})

export class StockSelectorComponent {
    @Input()
    parent: FormGroup;

    @Input()
    products: Product[];

    @Output()
    added = new EventEmitter<any>();

    get notSelected() {
        return (!this.parent.get('selector.product_id').value);
    }

    get stockExists() {
        return (
            this.parent.hasError('stockExists') &&
                this.parent.get('selector.product_id').dirty
        );
    }

    onAdd() {
        this.added.emit(
            this.parent.get('selector').value);
        // to reset only one item for a form use patchvalue
        // setValue sets value to a specific value but need to provide all the controls
        this.parent.get('selector').reset({
            product_id: '',
            quantity: 10
        });
    }
}