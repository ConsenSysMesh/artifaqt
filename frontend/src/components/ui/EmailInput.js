import React from 'react';

export class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValid: false,
      emailTouched: false,
      submitSuccessFul: false,
      validityCheck: this.checkIfValid.bind(this),
    };
  }

  static validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(email);
  }

  checkIfValid() {
    if (this.constructor.validateEmail(this.email.value)) {
      this.setState({ emailTouched: true, emailValid: true });
    } else {
      this.setState({ emailTouched: true, emailValid: false });
    }
  }

  submitForm() {
    this.setState({ submitSuccessful: true });
  }

  render() {
    const errorInput = this.state.emailTouched && !this.state.emailValid;
    const errorClass = errorInput ? 'error' : '';
    return (
      <div className="posted-section section">
        <form action="https://qonsensys.us19.list-manage.com/subscribe/post?u=64c55947f95ea787a984b7805&amp;id=120d7bfd26" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" novalidate>
          <input
            type="email"
            name="EMAIL"
            class="email"
            id="mce-EMAIL"
            placeholder="email address"
            ref={c => (this.email = c)}
            onKeyUp={this.state.validityCheck}
            onBlur={this.state.validityCheck}
            required
          />
          <p className={`error-message text-center ${errorClass}`}>Use a valid email address.</p>

          <button
            disabled={this.state.submitSuccessFul || errorInput}
            onClick={() => this.submitForm()}
          >{this.state.submitSuccessful ? 'Thank You' : 'Siqn Me Up'}</button>
        </form>
      </div>
    );
  }
}

export default EmailInput;