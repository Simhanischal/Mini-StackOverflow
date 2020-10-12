import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question'; 

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
}) 
export class SearchComponent implements OnInit {
  searchString : string;
  questions : Question[];
  currentPageNumber:number = 1;
  perPage:number = 2;
  totalPages:number;
  pageQuestions: Question[];
  constructor(private ds : DataService , private activatedRoute : ActivatedRoute , private router : Router) { }
  
  ngOnInit(): void {
    setInterval(()=>{
      this.activatedRoute.paramMap.subscribe((params)=>{
        if(params.get("searchString")!=this.searchString){
          this.searchString = params.get("searchString");
          this.ds.searchQuestion(this.searchString).subscribe((result)=>{
            if(result.length == 0) alert('Could not find any matching results!!');
            else this.questions = result;
          });
        }
        this.totalPages = Math.ceil(this.questions.length/this.perPage);
        this.pageQuestions = this.questions.slice((this.currentPageNumber*this.perPage)-this.perPage,(this.currentPageNumber*this.perPage));
        }
        
      );
    },1000);
    // setTimeout(()=>{
    //   this.totalPages = Math.ceil(this.questions.length/this.perPage);
    //   this.pageQuestions = this.questions.slice((this.currentPageNumber*this.perPage)-this.perPage,(this.currentPageNumber*this.perPage));
    // },200);
  }

  handlePageChange(action){
    //alert(action);
    if(action==='prev' && this.currentPageNumber!=1){
      this.currentPageNumber -= 1;
      this.fetchPageData();
    }
    else if(action==='next' && this.currentPageNumber!=this.totalPages){
      this.currentPageNumber += 1;
      this.fetchPageData();
    }
    else if(action>=1 && action<=this.totalPages){
      this.currentPageNumber = action;
      this.fetchPageData();
    }
    else
      return;
  }

  fetchPageData(){
    // this.ngOnInit();
    this.totalPages = Math.ceil(this.questions.length/this.perPage);
    this.pageQuestions = this.questions.slice((this.currentPageNumber*this.perPage)-this.perPage,(this.currentPageNumber*this.perPage));
    //alert(this.totalPages);
  }

  askQuestion(){
    let email_id = sessionStorage.getItem('email_id');
    if(email_id==null){
      alert('Please Login to proceed further!');
      this.router.navigateByUrl('/login');
    } 
    else{
      this.router.navigateByUrl('/askQuestion');
    }
  }

}
