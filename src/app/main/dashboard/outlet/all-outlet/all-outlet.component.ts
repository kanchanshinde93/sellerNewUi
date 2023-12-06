import { Component, OnInit, ViewChild } from "@angular/core";
import { ColumnMode, DatatableComponent, SelectionType, } from "@swimlane/ngx-datatable";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators, FormControl, } from "@angular/forms";
import { OutletServiceService } from "app/services/outlet-service.service";
import { Router } from "@angular/router";
import { ToastrserviceService } from "app/services/toastrservice.service";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: "app-all-outlet",
  templateUrl: "./all-outlet.component.html",
  styleUrls: ["./all-outlet.component.scss"],
})

export class AllOutletComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public openingHourdata = { hour: 13, minute: 30 };
  public closingHourdata = { hour: 13, minute: 30 };
  public meridianTP = true;



  formula: string = "All Outlet";
  editOutletForm: FormGroup;
  Submitted: Boolean = false;

  allOutletList: any;
  mode: Number = 2;
  outletId: any;
  newImage: any;
  editById: any;
  previousImage: any;
  downloadData: any;
  addOutletForm: FormGroup;
  cuisineList: any;
  cuisineArray = [];
  selectedImage: any;
  imageURL = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrserviceService,
    private modalService: NgbModal,
    private outletService: OutletServiceService
  ) { }

  ngOnInit(): void {
    this.allOutlet();
    // edit outlet form
    this.editOutletForm = this.fb.group({
      outletName: new FormControl("", Validators.required),
      outletImage: new FormControl([]),
      area: new FormControl("", Validators.required),
      shopAddress: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required]),
    });

    // add outlet form
    this.addOutletForm = this.fb.group({
      outletName: new FormControl("", [Validators.required]),
      outletImage: new FormControl("", [Validators.required]),
      type: new FormControl("Food", [Validators.required]),
      preparationTime: new FormControl("", [Validators.required]),
      area: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      isPureVeg: new FormControl("", [Validators.required]),
      shopAddress: new FormControl("", [Validators.required]),
      openingHour: new FormControl("", [Validators.required]),
      closingHour: new FormControl("", [Validators.required]),
      isFood: new FormControl(true, [Validators.required]),
      longitude: new FormControl(0, [Validators.required]),
      latitude: new FormControl(0, [Validators.required]),
    });
  }
  get b() {
    return this.editOutletForm.controls;
  }

  get f() {
    return this.addOutletForm.controls;
  }

  selectImage(event: any) {
    this.selectedImage = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL.push(event.target.result);
      this.addOutletForm.patchValue({
        fileSource: this.imageURL,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  cuisineCheck(cuisineId: any) {
    if (this.cuisineArray.includes(cuisineId)) {
      return true;
    } else {
      return false;
    }
  }

  formatTime(dateObject: any): any {
    let { hour, minute } = dateObject;
    let timeSet = "AM";
    if (hour >= 12) {
      timeSet = "PM";
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }
    minute = minute == 0 ? `0${minute}` : minute;
    return `${hour}:${minute} ${timeSet}`;
  }

  addOutletFormSubmit() {
    this.Submitted = true;

    if (this.addOutletForm.invalid) {

      console.log("Failed");

      return;
    } else {
      console.log("Success");

      this.addOutletForm.value.openingHour = this.formatTime(
        this.addOutletForm.value.openingHour
      );
      this.addOutletForm.value.closingHour = this.formatTime(
        this.addOutletForm.value.closingHour
      );
      this.addOutletForm.value.cuisine = this.cuisineArray;
      // this.addOutletForm.value.outletImage  = this.selectedImage;

      const openingHours: any = [
        `${this.addOutletForm.value.openingHour} - ${this.addOutletForm.value.closingHour}`,
      ];
      const formData = new FormData();
      formData.append("outletName", this.addOutletForm.value.outletName);
      formData.append("outletImage", this.selectedImage);
      formData.append("type", this.addOutletForm.value.type);
      formData.append(
        "preparationTime",
        this.addOutletForm.value.preparationTime
      );
      formData.append("area", this.addOutletForm.value.area);
      formData.append("isPureVeg", this.addOutletForm.value.isPureVeg);
      formData.append("cuisines", this.addOutletForm.value.cuisine);
      formData.append("shopAddress", this.addOutletForm.value.shopAddress);
      formData.append("openingHours", openingHours);
      formData.append("longitude", this.addOutletForm.value.longitude);
      formData.append("latitude", this.addOutletForm.value.latitude);
      formData.append("isFood", this.addOutletForm.value.isFood);
      formData.append("phone", this.addOutletForm.value.phone);

      this.outletService.addOutlet(formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.showSuccess(res.message, "Success!");

          this.addOutletForm.reset();
          this.modalService.dismissAll();
          this.allOutlet();
        } else {
          this.toastr.showError(res.message, "error!");
          this.addOutletForm.reset();
        }
      });
    }
  }

  modalCuisineAdd(data: any) {
    this.modalService.open(data, {
      centered: true,
    });
    this.allCuisine();
  }

  onCuisineSelect(cuisine: any) {
    if (this.cuisineArray.includes(cuisine.cuisineId)) {
      let index = this.cuisineArray.indexOf(cuisine.cuisineId);
      this.cuisineArray.splice(index, 1);
    } else {
      this.cuisineArray.push(cuisine.cuisineId);
    }
  }

  allCuisine() {
    this.outletService.getAllCuisine().subscribe((data: any) => {
      this.cuisineList = data.items;
    });
  }

  allOutlet() {
    this.blockUI.start()
    this.outletService.getAllOutlet(this.mode).subscribe((res: any) => {
      this.allOutletList = res.items;
      this.blockUI.stop()
      console.log(this.allOutletList);
    });
  }

  // redirected to outlet details
  showOutletDetail(outletDetails: any) {
    this.router.navigate(["/dashboard/outletDetails"], {
      state: { outletDetails },
    });
  }



  statusChange(event: any, data: any, outlet: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "md",
    });

    this.outletId = outlet.outletId;
  }

  // change outlet status Modal
  outletStatusChange() {
    this.blockUI.start("Please Wait....")
    this.outletService.chageOutletStatus(this.outletId).subscribe((res: any) => {
      this.blockUI.stop()
      if (res.status) {
        this.toastr.showSuccess(res.message, "Suceess!");
        this.allOutlet();
        this.modalService.dismissAll();
      } else {
        this.toastr.showError(res.message, "error!");
        this.allOutlet();
        this.modalService.dismissAll();
      }
    });
  }

  // edit outlet image
  outletImage(event: any) {
    this.newImage = event.target.files[0];
  }
  // open edit outlt modal
  openEditOutletModal(data: any, outletDetails: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
    this.editById = outletDetails.outletId;
    this.previousImage = outletDetails.outletImage;

    this.editOutletForm.patchValue({
      outletName: outletDetails.outletName,
      area: outletDetails.area,
      shopAddress: outletDetails.shopAddress,
      phone: outletDetails.phone,
    });
  }

  editOutletFormSubmit() {
    this.Submitted = true;
    if (this.editOutletForm.invalid) {
      return;
    } else {
      const formData = new FormData();
      formData.append("outletName", this.editOutletForm.value.outletName);
      formData.append("area", this.editOutletForm.value.area);
      formData.append("shopAddress", this.editOutletForm.value.shopAddress);
      formData.append("phone", this.editOutletForm.value.phone);

      if (this.newImage == undefined) {
        formData.append("outletImage", this.previousImage);
      } else {
        formData.append("outletImage", this.newImage);
      }

      this.outletService
        .editOutlet(this.editById, formData)
        .subscribe((data: any) => {
          if (data.status) {
            this.Submitted = false;

            this.toastr.showSuccess(data.message, "Success!");
            this.allOutlet();
            this.modalService.dismissAll();
          } else {
            this.toastr.showError(data.message, "error!");
            this.allOutlet();
          }
        });
    }
  }





  openAddOutletModal(data: any) {
    this.modalService.open(data, {
      centered: true,
      size: "lg",
    });
  }

  deleteOutlet(row: any) {
    console.log("===========>", row.outletId);
    this.outletService
      .deletData({ outletId: row.outletId })
      .subscribe((res: any) => {
        if (!res.status) {
          this.toastr.showError(res.message, "Error");
        }
        this.toastr.showSuccess(res.message, "Succes")
        this.allOutlet()
      });
  }
}
