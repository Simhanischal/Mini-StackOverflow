import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  help:string;
  constructor(private ar : ActivatedRoute) {
  }
  ngOnInit(): void { 
      
  }

  

}
