import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { User } from './user';
import { Answer } from './answer';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http : HttpClient) { }

  getSession():Observable<Boolean>{
    return this.http.get<Boolean>('http://localhost:3000/session');
  }

  getSessionUser():Observable<String>{
    return this.http.get<String>('http://localhost:3000/sessionUser');
  }

  getQuestions():Observable<Question[]>{
    return this.http.get<Question[]>('http://localhost:3000/getQuestions');
  }

  getQuestion(question_id):Observable<Question>{
    return this.http.get<Question>(`http://localhost:3000/question/${question_id}`);
  }

  getMyQuestions(user_id):Observable<Question[]>{
    return this.http.get<Question[]>(`http://localhost:3000/myQuestions/${user_id}`);
  }

  getAnswers(question_id):Observable<Answer[]>{
    return this.http.get<Answer[]>(`http://localhost:3000/getAnswers/${question_id}`);
  }

  getAnswer(answer_id):Observable<Answer>{
    return this.http.get<Answer>(`http://localhost:3000/answer/${answer_id}`);
  }

  postAnswer(answer,question_id):Observable<Answer[]>{
    return this.http.post<Answer[]>('http://localhost:3000/postAnswer',{'answer':answer,'question_id':question_id});
  }

  postQuestion(title,body,tags,author):Observable<String>{
    //this.question_id += 1;
    //let author = this.getAuthor(email);
    return this.http.post<String>('http://localhost:3000/addQuestion',{'title':title,'body':body,'tags':tags,'author':author});
  }

  editQuestion(question_id,title,body,tags):Observable<Question[]>{
    return this.http.put<Question[]>(`http://localhost:3000/editQuestion/${question_id}`,{'title':title,'question_body':body,'tags':tags});
  }

  editAnswer(answer_id,answer_body):Observable<Answer[]>{
    return this.http.put<Answer[]>(`http://localhost:3000/editAnswer/${answer_id}`,{'answer':answer_body});
  }

  validateLogin(email,password):Observable<String>{
    return this.http.post<String>('http://localhost:3000/login',{'email':email,'password':password});
  }

  signUpUser(username,email,password):Observable<String>{
    return this.http.post<String>('http://localhost:3000/signup',{'username':username,'email':email,'password':password});
  }

  logoutUser():Observable<String>{
    return this.http.get<String>('http://localhost:3000/logout');
  }

  deleteQuestion(question_id):Observable<Question[]>{
    return this.http.delete<Question[]>(`http://localhost:3000/deleteQuestion/${question_id}`);
  }

  deleteAnswer(answer_id,question_id):Observable<Answer[]>{
    return this.http.delete<Answer[]>(`http://localhost:3000/deleteAnswer/${answer_id}/${question_id}`);
  }

  reportQuestion(question_id,user):Observable<Question>{
    return this.http.put<Question>(`http://localhost:3000/reportQuestion/${question_id}`,{'user':user});
  }

  reportAnswer(answer_id,user):Observable<Answer>{
    return this.http.put<Answer>(`http://localhost:3000/reportAnswer/${answer_id}`,{'user':user});
  }

  searchQuestion(searchString):Observable<Question[]>{
    return this.http.get<Question[]>(`http://localhost:3000/searchQuestion/${searchString}`);
  }

  // voteQuestion(vote,question_id,voted):Observable<any>{
  //   return this.http.put(`http://localhost:3000/voteQuestion/${question_id}`,{'vote':vote,'voted':voted});
  // }


  //changeLoginLogout(){
    //this.loggedIn = !(this.loggedIn);
 // }

}
