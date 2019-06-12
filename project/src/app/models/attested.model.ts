export class Attested {
    _id: string;
    user;
    title: string;
    type: string;
    hours: number;
    _file;
    constructor(_id, user, title, type, hours, _file) {
        this._id = _id;
        this.user = user;
        this.title = title;
        this.type = type;
        this.hours = hours;
        this._file = _file;
    }
}
