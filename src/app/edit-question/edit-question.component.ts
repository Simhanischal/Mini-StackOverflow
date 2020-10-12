import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question';

@Component({
  selector: 'app-edit-question', 
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  question_id : string;
  question : Question;
  constructor(private ds : DataService , private activatedRoute : ActivatedRoute , private router : Router) { }
 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>this.question_id = params.get("id"));
    this.ds.getQuestion(this.question_id).subscribe((result)=>{
      this.question = result;
    },
    (err)=> {console.log(err);}
    );
  }

  editQuestion(title,body,tags){
    this.ds.editQuestion(this.question_id,title,body,tags).subscribe((result)=>{
      alert(result);
      this.router.navigateByUrl(`/questionAnswers/${this.question_id}`)
    },
    (err)=> {console.log(err);}
    );
  }

}
