import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;

  question=[{
    quesId:'',
    answer:'',
    content:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    qid:'',
  }];

  constructor(

    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack: MatSnackBar,
  ) { }



  ngOnInit(): void {

    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;

    console.log(this.qId);
    console.log(this.qTitle);

    this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      console.log(data);
      this.question = data;
    },(error)=>{
      console.log(error);
      
    })
    
  }

  //delete question

  deleteQuestion(qid: any){

    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, you want to delete this question ?'
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._question.deleteQuestion(qid).subscribe(
          (data:any)=>{ 
            this._snack.open('Qustion Deleted !!','',{
              duration:3000,
            });
            this.question = this.question.filter((q)=>q.quesId != qid);

        },(error)=>{
          this._snack.open('Error in deleting question','',{
            duration:3000,
          });
          console.log(error);
          
        });
      }
    })  
  }

}
