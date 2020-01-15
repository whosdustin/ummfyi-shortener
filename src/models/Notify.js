export default class Notify {
  constructor(
    message = '',
    state = 'is-danger'
  ) {
    this.message = message
    this.state = state
  }
}