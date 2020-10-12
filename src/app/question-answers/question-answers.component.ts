import { Component, OnInit , Input} from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute , Params, Router } from '@angular/router';
import { Question } from '../question';
import { Answer } from '../answer';
import { report } from 'process';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.css']
})
export class QuestionAnswersComponent implements OnInit {
  question_id : string;
  question : Question;
  answers : Answer[]; 
  toggle : boolean = true;
  session : Boolean;
  sessionUser : String;
  //reports : String[];
  //vote:any; 
  //upvote:boolean = false;
  constructor(private ds : DataService , private activatedRoute : ActivatedRoute , private router : Router) { }
 
  ngOnInit(): void {
    //sessionStorage.setItem('voted','false');
    this.activatedRoute.paramMap.subscribe((params)=>this.question_id = params.get("id"));
    this.ds.getQuestion(this.question_id).subscribe((result)=>{
      console.log(result)
      this.question = result; 
    },
    (err)=>{console.log(err);}
    );
    this.ds.getAnswers(this.question_id).subscribe((result)=>{
      console.log(result);
      this.answers = result;
    },
    (err)=>{console.log(err);}
    );
  } 

  wait(ms){
    return new Promise((resolve)=>{
      setTimeout(resolve,ms);
    });
  }
 
  postAnswer(answer){
    //let user_id = sessionStorage.getItem('user_id');
    this.ds.getSession().subscribe((data)=>{
      this.session = data;
      if(this.session === true){
        return this.ds.postAnswer(answer,this.question_id).subscribe((result)=>{
          alert(result);
          //this.router.navigateByUrl('/questionAnswers/'+this.question_id,);
          this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl(`/questionAnswers/${this.question_id}`);
        });
      },
        (err)=> {console.log(err);}
    ); 
    }
    else{
      alert('Please Login to proceed further');
      this.router.navigateByUrl('/login');
    }
  });
  }

  editQuestion(question_id,author){
    //let user_id = sessionStorage.getItem('user_id');
    this.ds.getSessionUser().subscribe((data)=>{
      alert(data);
      this.sessionUser = data;
      if(this.sessionUser === author){
        this.router.navigateByUrl(`/editQuestion/${question_id}`);
      }
      else{
        alert('You can only edit your questions');
      }
    }); 
  }

  editAnswer(answer_id,author){
    this.ds.getSessionUser().subscribe((data)=>{
      alert(data);
      this.sessionUser = data;
      if(this.sessionUser === author){
        this.router.navigateByUrl(`/editAnswer/${answer_id}`);
      }
      else{
        alert('You can only edit your answers');
      }
    }); 
  }

  deleteQuestion(author){
    this.ds.getSessionUser().subscribe((data)=>{
      alert(data);
      this.sessionUser = data;
      if(this.sessionUser === author){
        if(confirm("Are you sure you want to delete this question?")===true){
          this.ds.deleteQuestion(this.question_id).subscribe((result)=>{
            alert(result);
            this.router.navigateByUrl('/home');
          },(err)=>console.log(err));
        }
      }
      else{
        alert('You can only delete questions posted by you!');
    }
  });
}

  deleteAnswer(answer_id,author){
    this.ds.getSessionUser().subscribe((data)=>{
      alert(data);
      this.sessionUser = data;
      if(this.sessionUser === author){
        if(confirm("Are you sure you want to delete this answer?")===true){
          this.ds.deleteAnswer(answer_id,this.question_id).subscribe((result)=>{
            alert(result);
            this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
              this.router.navigateByUrl(`/questionAnswers/${this.question_id}`);
            });
        } ,
        (err)=>console.log(err));
        }
      }
      else{
        alert('You can only delete answers posted by you');
    }
  });
  }

  reportQuestion(author){
    //let user_id = sessionStorage.getItem('user_id');
    this.ds.getSessionUser().subscribe((data)=>{
      alert(data);
      this.sessionUser = data;
      if(this.sessionUser === author){
        alert('You cannot report your own questions');
      }
      else if(this.sessionUser === "false"){
        alert('Please login to report this question');
        this.router.navigateByUrl('/login');
      }
      else if(this.question.reports.includes(this.sessionUser)){
        alert('You have already reported this question. We are investigating this and will soon take a decision!');
      }
      else{
        if(confirm('Are you sure you want to report this Answer? Once reported , you cant undo the report!')===true){
          this.ds.reportQuestion(this.question_id,this.sessionUser).subscribe((result)=>{
            alert(result);
            this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
              this.router.navigateByUrl(`/questionAnswers/${this.question_id}`);
            });
          } ,
          (err)=>{console.log(err);}
          );
        }
      }
    });
  }

  reportAnswer(answer_id,author){
    let reports:String[];
    this.answers.forEach((answer)=>{
      if(answer._id === answer_id){ 
        reports = answer.reports;
        //console.log(answer.reports);
      }
    });
    // let reports:String[];
    // this.ds.getAnswer(answer_id).subscribe((data)=>{
    //   reports = data.reports;
    // });
    //let user_id = sessionStorage.getItem('user_id');
    // await this.wait(100);
    this.ds.getSessionUser().subscribe((data)=>{
      alert(data);
      // console.log('reports'+reports);
      this.sessionUser = data;
      if(this.sessionUser === author){
        alert('You cannot report your own answers');
      }
      else if(this.sessionUser === "false"){
        alert('Please login to report this answer');
        this.router.navigateByUrl('/login');
      }
      else if(reports.includes(this.sessionUser)){
        alert('You have already reported this question. We are investigating this and will soon take a decision!');
      }
      else{
        alert('in else');
        if(confirm('Are you sure you want to report this Answer? Once reported , you cant undo the report!')===true){
          this.ds.reportAnswer(answer_id,this.sessionUser).subscribe((result)=>{
            alert(result);
            this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
              this.router.navigateByUrl(`/questionAnswers/${this.question_id}`);
            });
          } ,
          (err)=>{console.log(err);}
          );
        }
      }
    });
  }

  // voteQuestion(vote,question_id,author){
  //   let user_id = sessionStorage.getItem('user_id');
  //   if(user_id == author){
  //     alert("You can't vote on your question");
  //   }
  //   else if(user_id == null){
  //     alert('Please login to proceed further');
  //     this.router.navigateByUrl('/login');
  //   }
  //   else{
  //     if(sessionStorage.getItem('voted') == 'true'){
  //       sessionStorage.setItem('voted','false');
  //     }
  //     else{ 
  //       sessionStorage.setItem('voted','true');
  //     }
  //       //sessionStorage.setItem('voted','false');
  //     let voted = sessionStorage.getItem('voted');
  //     console.log('Voted'+voted);
  //     this.ds.voteQuestion(vote,question_id,voted).subscribe((result)=>{
  //       //this.isUpDisabled = true;
  //       // this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
  //       //   this.router.navigateByUrl(`/questionAnswers/${this.question_id}`);
  //       // });
  //       console.log('Question voted successfully');
  //     },
  //     (err)=>{console.log(err);}
  //     );
  //   }

  // }

}
 