class User{
    uid
    fname;
    lname;
    email;
    phone;

    constructor(uid,fname,lname,email,phone){
        this.uid = uid;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phone = phone;
    }
    
    displayInfo(){
        return JSON.stringify(this);
    }

}

export class Client extends User{
    role;
    company;
    constructor(uid,fname, lname, email, phone, company){
        super(uid,fname, lname,email,phone);
        this.role = "c";
        this.company = company;
    }
}

export class Staff extends User{
    role;
    company;
    constructor(uid,fname, lname, email, phone){
        super(uid,fname, lname, email, phone);
        this.company = "Staff";
        this.role = "s";
    }
}

export class Admin extends User{
    role;
    company;
    constructor(uid,fname, lname, email, phone){
        super(uid,fname, lname, email, phone);
        this.company = 'Staff';
        this.role = "a";
    }
}