export class User {
    constructor(id, user, pass, first, last, pos, rep, sent, received) {
      this.user_id = id;
      this.username = user;
      this.password = pass;
      this.first_name = first;
      this.last_name = last;
      this.role = pos;
      this.reports_to = rep;
      this.sent = sent;
      this.received = received;
    }
  }