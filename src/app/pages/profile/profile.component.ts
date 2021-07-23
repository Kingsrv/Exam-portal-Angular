import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any
  
  constructor(private login:LoginService) { }

  ngOnInit(): void {
    //load data from localstorage

    this.user = this.login.getUser();

    //if you want to load data from the server

    // this.login.getCurrentUser().subscribe(
    //   (user:any)=>{
    //     this.user= user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }  
    // )
  
  }

}
