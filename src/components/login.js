function Login({usernameChange, usernameSubmit}) {
  console.log("in login comp");
return (
	<div className="login-container">
      <p>Let's Chat Login</p>
			<div className="login">
       <form className="login-form" onSubmit={usernameSubmit}>
         <label className="username-label" htmlFor="username">
           Username:
         </label>
         <input
           id="username"
           className="username-input"
           autoFocus
           onChange={usernameChange}
           type="text"
           name="userId"
           placeholder="Enter your username to continue"
         />
         <button type="submit" className="submit-btn">
           Continue
         </button>
       </form>
     </div>
	</div>
);
}

export default Login;
