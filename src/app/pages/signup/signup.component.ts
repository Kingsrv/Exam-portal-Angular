import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };

  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username == null){
      // alert('username is required!')
      this._snackBar.open("username is required !!",'',{
        duration:3000,
        verticalPosition:'top'
      })
      return;
    }

    //adduser
    this.userService.addUser(this.user).subscribe(
      (data: any)=>{
        //success
        console.log(data);
        // alert('success');
        Swal.fire('Successfully Registered','user id is '+data.id,'success')
      },
      (error)=>{
        //error
        console.log(error);
        // alert('something went wrong');
        this._snackBar.open('Ssomething went wrong !!','',{
          duration:2000
        })
      }
    )
  }

}
