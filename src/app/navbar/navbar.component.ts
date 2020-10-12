import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  loginOrLogout : string;
  session: Boolean;
  sessionUser : String;
  constructor(private ds : DataService , private router : Router) {}
  
  ngOnInit(): void { 
    setInterval(()=>{
      this.ds.getSession().subscribe((data)=>this.session = data);
      if(this.session===false){
        this.loginOrLogout = "Login";
      }
      else{
        //this.ds.changeLoginLogout();
        this.loginOrLogout = "Log Out";
      }
    },1000)
    
  }

  searchQuestion(searchString):void{
    this.router.navigateByUrl(`search/${searchString}`);
  }
 
  myQuestions():void{
    //this.user_id = sessionStorage.getItem('user_id');
    this.ds.getSessionUser().subscribe((data)=>{
      this.sessionUser = data
      if(this.sessionUser != "false"){
        this.router.navigateByUrl(`/myQuestions/${this.sessionUser}`) 
      }
      else{
        alert('Please Login to view your questions');
        this.router.navigateByUrl('/login');
      }
    });
  }

  logout(){
    this.ds.logoutUser().subscribe((result)=>{
      if(result==="Destroyed") this.router.navigateByUrl('/login');
    }
    ,(err)=>console.log(err));
    //this.loginOrLogout = "Login";
  }

  }

  

 


