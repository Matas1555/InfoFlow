import "../css/login.css";

export default function ForgotPass() {
  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
        <label htmlFor="tab-1" className="tab">
          Type in your email
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label htmlFor="tab-2" className="tab"></label>
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                Email
              </label>
              <input id="user" type="text" className="input" name="email" />
            </div>
            <div className="group">
              <input
                type="submit"
                // onClick={() => handleLogIn()}
                className="button"
                value="Submit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
