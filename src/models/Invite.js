export default class Invite {
  constructor(
    email,
    invited = false
  ) {
    this.email = email,
    this.invited = invited
  }
}