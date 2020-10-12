import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ds : DataService,private router : Router) { }
  //data : any;
  ngOnInit(): void {
    
  }
 
  validateLogin(email:string,password:string){
      this.ds.validateLogin(email,password).subscribe((result)=>
      {
        //alert(result);
        if(result=='Wrong Password'){
          alert('Password seems to be wrong , please try again!');
        }
        else if(result=='Invalid Email ID'){
          alert('Invalid Email ID');
        }
        else{
          //sessionStorage.setItem('user_id',result);
          //sessionStorage.setItem('email_id',email);
          alert('Login Success!');
          //this.ds.changeLoginLogout();
          this.router.navigateByUrl('/home');
        }
      } ,
        (error)=>alert(error)); 
    }
  }
