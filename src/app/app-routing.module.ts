import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { MyquestionsComponent } from './myquestions/myquestions.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FaqComponent } from './faq/faq.component';
import { ReportBugComponent } from './report-bug/report-bug.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { QuestionAnswersComponent } from './question-answers/question-answers.component';
import { DummyComponent } from './dummy/dummy.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { EditAnswerComponent } from './edit-answer/edit-answer.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
 {path : '' , redirectTo:'/home' , pathMatch:'full'},
  {path : 'home' , component : HomeComponent},
  {path : 'rules' , component : RulesComponent},
  {path : 'help' , component : HelpComponent },
  {path : 'help/faq' , component : FaqComponent} ,
  {path : 'help/reportBug' , component :ReportBugComponent},
  {path : 'about' , component : AboutComponent},
  {path : 'myQuestions/:user_id' , component : MyquestionsComponent},
  {path : 'signup' , component : SignupComponent},
  {path : 'login' , component : LoginComponent} ,
  {path : 'askQuestion' , component : AskQuestionComponent},
  {path : 'questionAnswers/:id' , component : QuestionAnswersComponent},
  {path : 'dummmy' , component : DummyComponent},
  {path : 'editQuestion/:id' , component : EditQuestionComponent},
  {path : 'editAnswer/:id' , component : EditAnswerComponent},
  {path : 'search/:searchString' , component : SearchComponent},
  {path : '**' , component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 