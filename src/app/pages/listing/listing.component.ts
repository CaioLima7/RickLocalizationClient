import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface Card {
  title: string;
  subtitle: string;
  text: string;
}

const DATA: Card[] = [
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  },
  {
    title: 'Shiba Inu 2',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  },
  {
    title: 'Shiba Inu 3',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  },
  {
    title: 'Shiba Inu 4',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  },
  {
    title: 'Shiba Inu 5',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  },
  {
    title: 'Shiba Inu 6',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  },
  {
    title: 'Shiba Inu 7',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  },
  {
    title: 'Shiba Inu 8',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  },
  {
    title: 'Shiba Inu 9',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  },
  {
    title: 'Shiba Inu 10',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
  }
];

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;

  //model: Array<ModelCards>;
  model: ModelCards[];
  dataSource: MatTableDataSource<any>;
  //dataSource: MatTableDataSource<ModelCards> = new MatTableDataSource<ModelCards>(this.model);
  //dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);

  //length = 100;
  //pageSize = 10;
  //pageSizeOptions: number[] = [5, 10, 25, 100];



  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getCards();
    debugger;
    //this.dataSource = new MatTableDataSource(this.model);

    console.log(this.obs);
  }

  pagination() {
    this.dataSource = new MatTableDataSource(this.model);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  getCards() {
    let url = "".concat(environment.BASE_URL_API, "Rick/ListingCards");
    this.model = new Array<ModelCards>();
    this.http.get(url).subscribe(res => {

      let length = res['length'];

      for (var i = 0; i < length; i++) {

        let array = new ModelCards(); 
        array.RickId = res[i].rick;
        array.FileNameRick = res[i].imgFileRick;
        array.FileNameMorty = res[i].imgFileMorty;

        this.model.push(array);
      }
      this.pagination();
    }, err => {
      console.error(err)
    })
  }



  //onPaginateChange(data) {
  //  this.filteredArray = this.colleges.slice(0, data.pageSize);
  //}
}

class ModelCards{
  RickId: number
  FileNameRick: string
  FileNameMorty: string
}
