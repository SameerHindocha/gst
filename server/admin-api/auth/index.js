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


    let Email = req.body.Email;
    let Password = req.body.Password;

    db.User.findOne({ email: Email, password: Password })
      .then(function (userData) {
        if (userData) {
          session = req.session;
          session.email = userData.email;
          session.mobile1 = userData.mobile1;
          console.log("session", session);

          return res.status(200).send({ message: "Login successful" })
        } else {
          return res.status(404).send({ message: "Incorrect Email or Password" })
        }
      }).catch(function (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" })
      });
  }

  Logout(req, res) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("session", session);

        return res.status(200).send({ message: "Logged out" })
      }
    })
  }
}
