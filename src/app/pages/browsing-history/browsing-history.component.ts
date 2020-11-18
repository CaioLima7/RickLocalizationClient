import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-browsing-history',
  templateUrl: './browsing-history.component.html',
  styleUrls: ['./browsing-history.component.scss']
})
export class BrowsingHistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['number', 'date', 'title'];

  //model: Navigation[] = new Array<Navigation>();
  //data: NavigationPagination[] = new Array<NavigationPagination>();
  data: Navigation[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  idRick: string;

  constructor(private _http: HttpClient,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    debugger;
    this.idRick = this._route.snapshot.params.id;
  }

  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getNavigationWithPagination(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          debugger;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;

          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
    ).subscribe(data => {
      this.data = new Array<Navigation>();
      data.forEach(item => this.data.push(item));
    });
  }

  getNavigationWithPagination(sort: string, order: string, page: number): Observable<NavigationPagination> {
    let url = "".concat(environment.BASE_URL_API, "Rick/RickNavigationsWithPagination", "".concat("/", sort, "/", order, "/", page.toString(), "/", this.idRick));
    let response = this._http.get<NavigationPagination>(url);
    return response;
  }
}


export interface Navigation {
  travelName: string;
  date: string;
  id: number;
  //navigation: number;
  //rickId: number;
}


export interface NavigationPagination {
  items: Navigation[];
  total_count: number;
}
