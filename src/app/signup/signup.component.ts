import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  constructor(private ds : DataService  , private router: Router) { }

  ngOnInit(): void {
  }

onSubmit(username:string,email:string,password:string,rePassword:string){ 
  if(password != rePassword){
    alert('Passwords do not match , please enter again!');
  }
  else{
    this.ds.signUpUser(username.toLowerCase(),email,password).subscribe((result)=>{
      alert(result);
      if(result=="User Successfully registered , please sign in with your credentials"){
        this.router.navigateByUrl('/login');
      }
    }, (err)=>{
      console.log(err);
    });
}

}

}
