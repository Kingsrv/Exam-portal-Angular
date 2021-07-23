import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  // public Editor = ClassicEditor;

  qId:any;
  qTitle: any;

  question = {
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qId:'',
    },
  };

  constructor(
    private _route : ActivatedRoute,
    private _question:QuestionService,
  ) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    console.log(this.qId);

    this.question.quiz['qId']= this.qId;
    
  }

  formSubmit(){
    
    if(this.question.content.trim()==''|| this.question.content==null){
      return;
    }

    if(this.question.option1.trim()==''|| this.question.option1==null){
      return;
    }

    if(this.question.option2.trim()==''|| this.question.option2==null){
      return;
    }

    //form submit

    this._question.addQuestion(this.question).subscribe((data:any)=>{
      Swal.fire('success !','Question added !!','success');
    },(error)=>{
      Swal.fire('error !','Error in adding question','error');
    });
  }
}
