import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'stock-branch',
    styleUrls: ['stock-branch.component.scss'],
    template: `
        <div class="stock-branch" [formGroup]="parent">
            <div formGroupName="store">
              <input formControlName="branch"
                type="text" placeholder="Branch ID">
              <div class="error"
                   *ngIf="required('branch')">
                Branch ID is required.
              </div>
              <div class="error"
                   *ngIf="invalid">
                Invalid branch code: 1 letter, 3 numbers
              </div>
              <div class="error"
                   *ngIf="unknown">
                Unknown Branch, please check the ID
              </div>

              <input formControlName="code"
                type="text" placeholder="Manager Code">
              <div class="error"
                   *ngIf="required('code')">
                Manager ID is required.
              </div>
            </div>
        </div>
    `
})

export class StockBranchComponent {
    @Input()
    parent: FormGroup

    required(name: string) {
        return (this.parent.get(`store.${name}`).hasError('required')
            && this.parent.get(`store.${name}`).touched)
    }

    get invalid() {
        return (
            this.parent.get('store.branch').hasError('invalidBranch')
                && this.parent.get('store.branch').dirty &&
                    !this.required('branch')
        );
    }

    get unknown() {
        return(
            this.parent.get('store.branch').hasError('unknownBranch')
                && this.parent.get('store.branch').dirty
        );
    }
}