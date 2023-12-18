export class UserDTO {
  username:string;
  password:string;
  isAdmin:boolean;
  constructor(name:string,password:string,isAdmin:boolean){
    this.username = name;
   this.isAdmin=isAdmin;
   this.password=password;

}
}
