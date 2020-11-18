import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './pages/listing/listing.component';
import { DetailsComponent } from './pages/details/details.component';
import { BrowsingHistoryComponent } from './pages/browsing-history/browsing-history.component';


const rotas: Routes = [
  {
    path: 'listing', component: ListingComponent,
  },
  {
    path: 'details/:id', component: DetailsComponent,
  },
  {
    path: 'browsing-history/:id', component: BrowsingHistoryComponent,
  },
  {
    path: '',
    component: ListingComponent
  },
  {
    path: '**',
    component: ListingComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
