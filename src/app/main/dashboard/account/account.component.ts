import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OutletServiceService } from 'app/services/outlet-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  sellerData:any
  constructor(private outletService: OutletServiceService) { }

  ngOnInit(): void {
    this.sellInfo();
  }

  sellInfo() {
    this.outletService.getSellerInfo().subscribe((data: any) => {
      this.sellerData = data.items;
    });
  }
}
