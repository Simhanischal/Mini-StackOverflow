import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'] 
})
export class AskQuestionComponent implements OnInit {
  constructor(private ds : DataService , private router : Router) { }
  email : string ;
  author:string;
  ngOnInit(): void {
    //this.email = sessionStorage.getItem('email_id')
    this.author = sessionStorage.getItem('user_id');
    //this.ds.getAuthor(this.email).subscribe((data)=>this.ds.author = data);
  }

  onSubmit(title,body,tags){
    //this.email = sessionStorage.getItem('email_id')
    this.ds.postQuestion(title,body,tags,this.author).subscribe((result)=>{
      alert(result);
      this.router.navigateByUrl("/home");
    }
    ,(err)=>console.log(err))
  }
} 
 