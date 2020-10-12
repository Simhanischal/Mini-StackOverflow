import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  session : Boolean;
  constructor(private router : Router , private ds : DataService) { }

  ngOnInit(): void {
  }

  askQuestion(){
    //let email_id = sessionStorage.getItem('email_id');
    this.ds.getSession().subscribe((data)=>{
      this.session=data;
      if(this.session == true){ 
        alert(this.session);
        this.router.navigateByUrl('/askQuestion');
      } 
      else{
        alert(this.session);
        this.router.navigateByUrl('/login');
      }
    });
  } 

}