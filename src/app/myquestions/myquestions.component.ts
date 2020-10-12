import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myquestions',
  templateUrl: './myquestions.component.html', 
  styleUrls: ['./myquestions.component.css']
})
export class MyquestionsComponent implements OnInit {
  myQuestions : Question[]
  user_id : string;
  session:Boolean;
  totalPages:number;
  pageQuestions:Question[]
  perPage:number = 2;
  currentPageNumber:number = 1;
  constructor(private ds : DataService , private activatedRoute : ActivatedRoute , private router : Router) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>this.user_id = params.get('user_id'));
    this.ds.getMyQuestions(this.user_id).subscribe((result)=>{
      if(result.length==0) alert('You have not asked any questions yet!');
      else this.myQuestions = result;
    },
    (err)=>{console.log(err);}
    );
    setTimeout(()=>{
      this.totalPages = Math.ceil(this.myQuestions.length/this.perPage);
      this.pageQuestions = this.myQuestions.slice((this.currentPageNumber*this.perPage)-this.perPage,(this.currentPageNumber*this.perPage));
    },200);
    
  }

  handlePageChange(action){
    // alert(action);
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
    this.totalPages = Math.ceil(this.myQuestions.length/this.perPage);
    this.pageQuestions = this.myQuestions.slice((this.currentPageNumber*this.perPage)-this.perPage,(this.currentPageNumber*this.perPage));
  }

  askQuestion(){
    //let email_id = sessionStorage.getItem('email_id');
    this.ds.getSession().subscribe((data)=>{
      this.session=data;
      if(this.session == true){ 
        alert(this.session);
        this.router.navigateByUrl('/askQuestion');
      } 
      else{
        alert(this.session);
        this.router.navigateByUrl('/login');
      }
    });
  }

}
