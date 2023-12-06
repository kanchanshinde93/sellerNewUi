import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OutletServiceService } from 'app/services/outlet-service.service';
import { BlockUI, NgBlockUI } from "ng-block-ui";
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  sellerData:any
  constructor(private outletService: OutletServiceService) { }

  ngOnInit(): void {
    this.sellInfo();
  }

  sellInfo() {
    this.blockUI.start();
    this.outletService.getSellerInfo().subscribe((data: any) => {
      this.blockUI.stop();
      this.sellerData = data.items;
    });
  }
}
