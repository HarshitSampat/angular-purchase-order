import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PurchaseOrder,
  VendorDetails,
} from '../../interfaces/purchase-order.interface';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit {
  poOrderDetails: PurchaseOrder | null = null;
  itemKeys: Array<any> = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Replace 'your-json-file-path' with the actual path to your JSON file.
    this.http
      .get<PurchaseOrder>('../../assets/purchase-order.json')
      .subscribe((data: any) => {
        this.poOrderDetails = data;

        this.addEmptyRowsIfNeeded();

        if (this.poOrderDetails) {
          this.itemKeys = Object.keys(this.poOrderDetails.Items[0]);
        }
      });
  }

  addEmptyRowsIfNeeded() {
    const minRowCount = 8;
    if (this.poOrderDetails) {
      if (this.poOrderDetails.Items.length < minRowCount) {
        const itemsToAdd = minRowCount - this.poOrderDetails.Items.length;

        for (let i = 0; i < itemsToAdd; i++) {
          this.poOrderDetails.Items.push({
            SrNo: '',
            ProductName: '',
            Quantity: -1,
            UnitPrice: -1,
          });
        }
      }
    }
  }

  countTotal(qty: number, unitPrice: number) {
    let total: number = -1;
    if (qty !== -1 && unitPrice !== -1) {
      total = qty * unitPrice;
    }
    if (total >= 0) return total;
    else return;
  }

  countTotalexTax(Items: Array<any>) {
    var total: number = 0;
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].UnitPrice !== -1 && Items[i].Quantity !== -1)
        total += Items[i].UnitPrice * Items[i].Quantity;
    }
    if (total >= 0) return total;
    else return 0;
  }

  countSubTotal(
    Discount: number,
    CGST: number,
    SGST: number,
    otherCost: number
  ) {
    let subTotal: number = 0;
    let totalExtax: number = 0;
    if (this.poOrderDetails)
      totalExtax = this.countTotalexTax(this.poOrderDetails.Items);

    let afterDisCount: number = totalExtax - Discount;
    let minusCGST: number = (afterDisCount * CGST) / 100;
    let minusSGST: number = (afterDisCount * SGST) / 100;

    subTotal = afterDisCount - (minusCGST - minusSGST) + otherCost;

    return afterDisCount;
  }
}
