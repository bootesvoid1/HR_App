export class User{
  name:string;
  password:string;
  isAdmin:boolean;
  constructor(name:string,password:string,isAdmin:boolean){
    this.name = name;
   this.isAdmin=isAdmin;
   this.password=password;

}
}
