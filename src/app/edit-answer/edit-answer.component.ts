import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../answer';
import { Question } from '../question';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css']
})
export class EditAnswerComponent implements OnInit {
  answer_id :string;
  answer_to_edit :Answer;
  question :Question;
  constructor(private ds : DataService , private activatedRoute : ActivatedRoute , private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>this.answer_id = params.get("id"));

    this.ds.getAnswer(this.answer_id).subscribe((result)=>{
      this.answer_to_edit = result;
    },
      (err)=> {console.log(err);} 
    ); 

    // this.ds.getQuestion(this.answer_to_edit.question_id).subscribe((result)=>{
    //   this.question = result;
    //   alert(result.author);
    // },
    // (err)=>{console.log(err);}
    // );
  }

  editAnswer(answer_body){
    this.ds.editAnswer(this.answer_id,answer_body).subscribe((result)=>{
      alert(result);
      this.router.navigateByUrl('/home');
    },
      (err)=>{console.log(err);}
    );
  }

}