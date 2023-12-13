import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/interfaces/job';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private user:UserService, private fb:FormBuilder){}

  jobOptions:Job[]=[];

  registrationForm !:FormGroup;


  fetchJobOptions(){
    this.user.getJobOptions().subscribe({
      next:(response)=>{console.log(response)
        this.jobOptions=response
      
      },
      error:(error)=> {console.log(error)}
    })
  }


  createForm(){
    this.registrationForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(3)]],
      confirmPassword:['',Validators.required],
      jobId:['',Validators.required],
    });
  }



  registerUser(){
    if(this.registrationForm.valid){
      const{confirmPassword,jobId, ...userData}= this.registrationForm.value;
      
      const job=jobId as Job;

      this.user.registerUser({...userData,jobId:job.id}).subscribe({
        next:(res)=>{
          console.log(res);
          console.log("registration was unseccessfull")
        },

        error:(error)=>{console.log("registration failed",+error)      ;}
      })
    }

  }
}
