import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { MyquestionsComponent } from './myquestions/myquestions.component';
import { RulesComponent } from './rules/rules.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule }   from '@angular/forms';
import { FaqComponent } from './faq/faq.component';
import { ReportBugComponent } from './report-bug/report-bug.component';
import { HttpClientModule } from '@angular/common/http';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { QuestionAnswersComponent } from './question-answers/question-answers.component';
import { DummyComponent } from './dummy/dummy.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { EditAnswerComponent } from './edit-answer/edit-answer.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    HelpComponent,
    MyquestionsComponent,
    RulesComponent,
    LoginComponent,
    SignupComponent,
    FaqComponent,
    ReportBugComponent,
    AskQuestionComponent,
    QuestionAnswersComponent,
    DummyComponent,
    EditQuestionComponent,
    EditAnswerComponent,
    SearchComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
