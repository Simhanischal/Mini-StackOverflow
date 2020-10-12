import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Question } from '../question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions:Question[];
  session:Boolean;
  currentPageNumber:number = 1;
  pageQuestions:Question[];
  totalPages:number;
  perPage:number = 5;

  //questionAnswers:any;
  constructor(private ds : DataService , private router : Router) { }

  // @ViewChild(PaginationComponent) pagination: PaginationComponent;
  
  ngOnInit() {
    // this.currentPageNumber = 1;
    // alert('oninit');
    this.ds.getQuestions().subscribe((data)=>this.questions=data);
    setTimeout(()=>{
      this.totalPages = Math.ceil(this.questions.length/this.perPage);
      this.pageQuestions = this.questions.slice((this.currentPageNumber*this.perPage)-this.perPage,(this.currentPageNumber*this.perPage));
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
    this.totalPages = Math.ceil(this.questions.length/this.perPage);
    this.pageQuestions = this.questions.slice((this.currentPageNumber*this.perPage)-this.perPage,(this.currentPageNumber*this.perPage));
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

  // getQuestionAnswers(question_id){
  //   this.ds.getQuestionAnswers(question_id).subscribe((result)=>{
  //     this.questionAnswers = result;
  //     this.router.navigateByUrl('/questionAnswers');
  //   });
  // }
  } 
  
}