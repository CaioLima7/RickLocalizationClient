import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { error } from '@angular/compiler/src/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation-register',
  templateUrl: './navigation-register.component.html',
  styleUrls: ['./navigation-register.component.scss']
})
export class NavigationRegisterComponent implements OnInit {
  travelName: string;
  date: Date;
  resp: string;
  idRick: number;


  constructor(
    public dialog: MatDialog,
    private _http: HttpClient,
    private _route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.idRick = parseInt(this._route.children[0].snapshot.params.id);
  }

  sendDate() {
    debugger;
    let url = "".concat(environment.BASE_URL_API, "Operations/RegisterNavigation");
    var body = {
      "travelName": this.travelName,
      "date": this.date,
      "rickId": this.idRick
    };

    this._http.post(url, body).subscribe(resp => {
      this.resp = resp.toString();
      alert(`OK!, id = ${resp}`)
    }, err => {
        alert(err);
    })
  }

}
