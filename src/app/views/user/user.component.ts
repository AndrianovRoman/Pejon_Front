import { Component, OnInit } from '@angular/core';
import {UserType} from "../../../types/user.type";
import {UserService} from "../../shared/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LineType} from "../../../types/line.type";
import {
  CreateUpdateLineDialogComponent
} from "../warehouse/lines/create-update-line-dialog/create-update-line-dialog.component";
import {CreateUpdateUserDialogComponent} from "./create-update-user-dialog/create-update-user-dialog.component";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: UserType[] = [];
  role: string | undefined;

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
    this.authService.getIsRole().subscribe(data => {
      this.role = data.name
    });
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.users.sort((a, b) => a.id - b.id);
      console.log(this.users);
    })
  }

  openUserDialog(user: UserType | null) {
    console.log('create user');
    const dialogUserRef = this.dialog.open(CreateUpdateUserDialogComponent, {
      data: {
        id: user ? user.id : null,
        name: user ? user.name : null,
        login: user ? user.login : null,
        roleId: user ?  user.role.id : null
      }
    });

    dialogUserRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'update') {
          this._snackBar.open('Пользователь успешно обновлена')
        } else {
          this._snackBar.open('Пользователь успешно добавлена')
        }
        this.loadUsers();
      }
    });
  }

  deleteUser(user: UserType) {
    if (confirm('Вы уверены что хотите удалить пользователя: ' + user.name)) {
      console.log('Удаление')
      this._snackBar.open(user.name + ' успешно удален')
      // this.linaService.deleteLineById(user.id).subscribe(data => {
      //   this.loadLines();
      // });
    } else {
      this._snackBar.open('Удаление отменено')
    }
  }

  back() {
    window.history.back()
  }

}
