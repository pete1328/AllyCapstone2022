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

// http://www.linuxhint.com/javascript-hash-function/
export function Hash(password) {
  var hash = 0;
  if (password.length === 0) return hash;
  for (var x = 0; x < password.length; x++) {
    var ch = password.charCodeAt(x)
    hash = ((hash << 5) - hash) + ch;
    hash = hash & hash;
  }
  return hash;
}