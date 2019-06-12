export class User {
    _id: string;
    name: string;
    email: string;
    graduation: string;
    enrollment: number;
    password: string;
    hours: number;
    constructor(_id, name, email, graduation, enrollment, password, hours) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.graduation = graduation;
        this.enrollment = enrollment;
        this.password = password;
        this.hours = hours;
    }
}
