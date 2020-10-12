import { Component, OnInit, Output , EventEmitter , Input} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor(private ds:DataService) { }

  @Input() totalPages:number;
  @Input() currentPageNumber:number;
  @Output() onPageChange = new EventEmitter();

  // totalPages:number;
  ngOnInit(): void {
    // this.totalPages = this.ds.totalPages;
  }
  
  handlePageChange(action){
    // alert(action);
    // if(action==='prev' && this.ds.currentPageNumber!=1)
    //   this.ds.currentPageNumber -= 1;
    // else if(action==='next' && this.ds.currentPageNumber<this.ds.totalPages)
    //   this.ds.currentPageNumber += 1;
    // else if(action>=1 && action<=this.ds.totalPages)
    //   this.ds.currentPageNumber = action;
    // else
    //   alert('no');
    // this.totalPages = this.ds.totalPages;
    this.onPageChange.emit(action);
  }

}
