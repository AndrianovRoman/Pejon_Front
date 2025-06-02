import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../core/auth/auth.service";
import {UserService} from "../../../shared/services/user.service";
import {CommonType} from "../../../../types/common.type";
import {RoleService} from "../../../shared/services/role.service";

@Component({
  selector: 'app-create-update-user-dialog',
  templateUrl: './create-update-user-dialog.component.html',
  styleUrls: ['./create-update-user-dialog.component.css']
})
export class CreateUpdateUserDialogComponent implements OnInit {

  title: string = 'Добавить пользователя';
  roles: CommonType[] = [];
  roleControl: number = 0;

  constructor(public dialogUserRef: MatDialogRef<CreateUpdateUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string, login: string, password: string, roleId: number},
              private authService: AuthService,
              private userService: UserService,
              private roleService: RoleService,
              ) {
    this.title = data.id ? 'Редактировать пользователя' : 'Добавить пользователя';
    this.roleControl = data.roleId;
  }

  ngOnInit(): void {
    this.roleService.getAllRole().subscribe(data => {
      this.roles = data;
      console.log(this.roles)
    })
  }

  save() {

    const params = {
      name: this.data.name,
      login: this.data.login,
      roleId: this.roleControl,
    }

    if (this.data.id) {
      this.userService.updateUserById(this.data.id, params).subscribe(data => {
        this.dialogUserRef.close('update')
      })
    } else {
      this.authService.signup(this.data.name, this.data.login, this.data.password, this.roleControl).subscribe(data => {
        this.dialogUserRef.close('add')
      })
    }
  }

}
