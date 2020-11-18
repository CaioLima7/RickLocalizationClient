import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListingComponent } from './listing/listing.component';
import { DetailsComponent } from './details/details.component';
import { BrowsingHistoryComponent } from './browsing-history/browsing-history.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ListingComponent,
    DetailsComponent,
    BrowsingHistoryComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,

    //BrowsingHistoryComponent
    MatTableModule,
    MatDialogModule,

    //Listing
    MatPaginatorModule,
    RouterModule
  ]
})
export class PagesModule { }
