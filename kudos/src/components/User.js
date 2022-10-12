export class User {
    constructor(id, user, pass, first, last, pos, rep, bal) {
      this.user_id = id;
      this.username = user;
      this.password = pass;
      this.first_name = first;
      this.last_name = last;
      this.position = pos;
      this.reports_to = rep;
      this.balance = bal;
    }
  }