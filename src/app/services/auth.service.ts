import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private SellerApi = environment.sellerApi;
  private menuUrl = environment.menuUrl;
  private adminUrl = environment.adminUrl;

  constructor(private http: HttpClient) {}

  Header = () => {
    // console.log(localStorage.getItem('token'));

    let headers = new HttpHeaders();
    headers = headers.append("content-type", "application/json");
    headers = headers.append("Accept", "application/json");
    headers = headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    //  console.log(headers)
    return { headers };
  };

  HeaderDemo = () => {
    // console.log(localStorage.getItem('token'));

    let headers = new HttpHeaders();
    headers = headers.append("content-type", "application/json");
    headers = headers.append("Accept", "application/json");
    headers = headers.append(
      "Authorization",
      `Bearer eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjdjNTUzMiIsInJvbGVJZCI6Ijg0YWJiNmQ5Iiwicm9sZSI6Mywic3ViUm9sZSI6Nzc3LCJpYXQiOjE3MDA2NTA4NTQsImV4cCI6MTcwMzI0Mjg1NH0.AMWclmwAcXjDXSybQ4vHRvjIhzdsFhXcnJ7t8OWc9154lRrRd11fvxxGsqzzVj1PexFA_ojqmLS1aqx_tHF_KSBJ_RS67itr33jsHnAxGofz3xo7KPtgPOvbZ5rw2rnO2oO7HWNUx93qbv-qRxaNxri5voR-8hqN36f08_PUe-r2-nNsB-0WBRXYS-bfxDPutB7iU0gwJTrBde-72Wji4D-GNlLb1pAFjoCxgsY5wGBpPDSUr0abj1uAOc6NZpQU8YV68P2P4KNArCrCk7M-GUeSkaQJRDQjZTtrea2bEWC1AZ50dy113IXS1ZrxhGDxe917uiUNcnVL0INtNO5U4C1bqyVYMFFiSNX2LJwPgyp3W5of51cWTo89hLbE_toSz1FOaUQbPiM9gdB6ivW5E0CF976PVyOi3vpOfOUlTaVzrJIMhpmYDSLjQQ_2laDWT14h_YRfuaRiiosub5hHF1Io37WxNTcWvVYfCZaAQwbyYxu-pp-_mQk2aMwrx7RWrifMRL5aq3jzIx_yEm39wgdOnfVVb1xnZo7fGZDWvdPEOOKSbRY9mdPi_TXXQzwNUhroK_AjL4Hz-rQlukXfKGTY3SFGyIEEtRUCYgQkFLdyhTw3AqLGwGjkdbNjT9KrodaC0H-cW_6IjGSS0x3wex-pKhKzDRbkOfipNcQMhmE`
    );
    //  console.log(headers)
    return { headers };
  };
  

  loginWithMobileNumber(body: any) {
    return this.http.post<any>(this.apiUrl + "login", body).pipe(
      map((user: any) => {
        if (user.status) {
          /*   localStorage.setItem('info', user.items?.user_type)
        localStorage.setItem('token', user.items?.token) */
        }
        return user;
      })
    );
  }

  otpValidate(body: any) {
    return this.http.post(this.apiUrl + "verify", body).pipe(
      map((user: any) => {
        if (user.status) {
          localStorage.setItem("token", user.items?.token);
        }
        return user;
      })
    );
  }

  // change outlet status
  changeOutletStatus(outletId: any) {
    return this.http
      .get(this.menuUrl + "outlet/status/" + outletId, this.Header())
      .pipe(
        map((list: any) => {
          return list;
        })
      );
  }

  getAllSeller() {
    return this.http.get<any>(this.SellerApi + "seller", this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // accept order
  getAcceptOrder(body: any) {
    return this.http
      .post<any>(this.SellerApi + "status", body, this.Header())
      .pipe(
        map((list: any) => {
          return list;
        })
      );
  }

  // get all order of seller
  getAllOrderofSeller(status: any) {
    return this.http
      .get(this.SellerApi + `/seller?status=${status}`, this.Header())
      .pipe(
        map((list: any) => {
          return list;
        })
      );
  }

  // get seller outlet
  getSellerOutlet(mode: any) {
    return this.http
      .get(this.menuUrl + `outlet/seller?mode=${mode}`, this.Header())
      .pipe(
        map((list: any) => {
          return list;
        })
      );
  }

  // get all cuisine
  getAllCuisine() {
    return this.http.get(this.menuUrl + "outlet/cuisine", this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // add seller outlet
  addOutlet(body: any) {
    return this.http.post(this.menuUrl + "outlet", body, this.Header()).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // edit outlet
  editOutletById(outletId: any, body: any) {
    return this.http
      .post(this.menuUrl + "outlet/update/" + outletId, body, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  // change outlet status
  changeOutletstatus(outletId: any) {
    return this.http
      .get(this.menuUrl + "outlet/status/" + outletId, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // get all ticket details
  getAllTicket(status: any) {
    return this.http
      .get(this.adminUrl + `/v1/support?status=${status}`, this.HeaderDemo())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // view ticket details
  ViewTicketDetails(ticketId: any) {
    return this.http
      .get(this.adminUrl + "/v1/support/details/" + ticketId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // get All data home page
  allDataHomePage() {
    return this.http.get(this.SellerApi + "seller/profit", this.Header()).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
