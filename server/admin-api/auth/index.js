let session;
module.exports = class AuthController {
  constructor(app) {
    app.get('/checkLogin', this.IsLoogedIn);
    app.post('/login', this.Login);
    app.get('/logout', this.Logout);
  }

  IsLoogedIn(req, res) {
    session = req.session;
    if (session.email) {
      res.status(200).send({ message: 'You have already logged in' });
    } else {
      res.status(401).send({ message: 'User is not Logged in' });
    }
  }

  Login(req, res) {
    console.log("UNDER API----");

    let Email = req.body.Email;
    console.log("Email", Email);
    let Password = req.body.Password;
    console.log("Password", Password);

    db.User.findOne({ email: Email, password: Password })
      .then(function(userData) {
        console.log("DATA FOUND---");
        if (userData) {
          session = req.session;
          session.email = userData.email;
          session.mobile1 = userData.mobile1;
          console.log("session", session);

          return res.status(200).send({ message: "Login successful", userData: userData })
        } else {
          return res.status(404).send({ message: "Incorrect Email or Password" })
        }
      }).catch(function(error) {
        console.log("DATA NOT FOUND---");

        console.error(error);
        return res.status(500).send({ message: "Internal server error" })
      });
  }

  Logout(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("session", session);

        return res.status(200).send({ message: "Logged out" })
      }
    })
  }
}
