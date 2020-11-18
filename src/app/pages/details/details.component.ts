import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { NavigationRegisterComponent } from '../../modals/navigation-register/navigation-register.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  idRick: number;
  dimension: string;
  description: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  openDialog() {
    this.dialog.open(NavigationRegisterComponent);
  }

  ngOnInit(): void {
    this.idRick = this.route.snapshot.params.id;

    this.getRickDetails(this.idRick);
  }

  getRickDetails(idRick) {
    let url = "".concat(environment.BASE_URL_API, "Rick/RickDetails/", idRick);
    this.http.get(url).subscribe(res => {
      this.dimension = res['Dimension'];
      this.description = 'teste';
    }, err => {
      console.error(err)
    })
  }

}
