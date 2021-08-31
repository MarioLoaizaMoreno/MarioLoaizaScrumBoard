import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {
  registerData: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  selectedFile: any

  constructor(
    private _boardService: BoardService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {
    this.registerData = {};
    this.message = '';
    this.selectedFile = null
  }

  ngOnInit(): void {
  }
   
  saveTaks(){
    if (
      !this.registerData.name ||
      !this.registerData.description
    ) {
      console.log('failed process: incomplete data');
      this.message = 'failed process: incomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      this._boardService.saveTaks(this.registerData).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['/listTaks']);
          this.message = 'task create';
          this.openSnackbarSuccessfull();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  uploadImg(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  saveTaskImg(){
    if (
      !this.registerData.name ||
      !this.registerData.description
    ) {
      console.log('failed process: incomplete data');
      this.message = 'failed process: incomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      const data = new FormData();
      data.append('image', this.selectedFile, this.selectedFile.name);
      data.append('name', this.registerData.name);
      data.append('description', this.registerData.description);

      this._boardService.saveTaksimg(data).subscribe(

        (res) => {
          console.log(res);
          this._router.navigate(['/listTaks']);
          this.message = 'task create';
          this.openSnackbarSuccessfull();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  openSnackbarSuccessfull() {
    this._snackbar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue']
    });
  }
  openSnackBarError() {
    this._snackbar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse']
    });
  }
}
