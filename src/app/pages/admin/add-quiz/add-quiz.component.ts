import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[
    {
      cid:23,
      title:'proggramming',
    },
  ];

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    },
  };

  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quizService:QuizService) { }

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any)=>{
        //categories loaded
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        // console.log(error);
        Swal.fire('Error !!','Error in loading data from server !','error');
      }
    )
  }

  addQuiz(){
    console.log(this.quizData);

    if(this.quizData.title.trim()=='' || this.quizData.title == null){
      this._snack.open("Title required !!",'',{
        duration:3000,
      });
      return;
    }

    //validation...

    //call server
    this._quizService.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success','Quiz is added !!','success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:''
          },
        };
      },
      (error)=>{
        Swal.fire('Error !','Error while adding Quiz','error');
        console.log(error);
      });   
  }
}
