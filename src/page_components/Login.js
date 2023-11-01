export default function Login() {
  return (
    <>
      <div className="loginForm">
        <h1>Sign into InfoFlow</h1>
        <form>
          <div>
            <label>Username:</label>
            <input />
          </div>

          <div>
            <label>Password:</label>
            <input />
          </div>

          <div>
            <button>Sign in</button>
          </div>

          <div>
            <p>
              Don't have an account? <a href="/Register">Create one!</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
