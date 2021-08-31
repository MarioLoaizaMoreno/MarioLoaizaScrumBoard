import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  taskData: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _boardService: BoardService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {
    this.taskData = {};
    this.message = '';
  }

  ngOnInit(): void {
    this._boardService.listTaks().subscribe(
      (res) => {
        console.log(res);
        this.taskData = res.board;
      },
      (err) => {
        console.log(err);
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  updateTask(task: any, status: string) {
    let tempStatus = task.taskStatus;
    task.taskStatus = status;
    this._boardService.updateTask(task).subscribe(
      (res) => {
        task.status = status;
      },
      (err) => {
        task.status = tempStatus;
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  deleteTask(task: any) {
    this._boardService.deleteTask(task).subscribe(
      (res) => {
        let index = this.taskData.indexOf(task);
        if (index > -1) {
          this.taskData.splice(index, 1);
          this.message = res.message;
          this.openSnackbarSuccessfull();
        } else {
          
        }
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    )
  }

  openSnackbarSuccessfull() {
    this._snackbar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }
  openSnackBarError() {
    this._snackbar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
