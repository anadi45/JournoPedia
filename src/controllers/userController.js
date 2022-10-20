const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../models/user");
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

//@route    POST /signup
//@descr    Signup an user
//@access   Public

const signup = async (req, res) => {
  try {
    const { name, email, phone, password, institute, country, expertise } = req.body;

    if (!name || !email || !phone || !password || !institute || !country || !expertise) {
      return res.send({
        message: "Fill all details",
      });
    }

    const findEmail = await User.findOne({ email: email });
    const findPhone = await User.findOne({ phone: phone });

    if (findEmail) {
      return res.send({
        message: "Email already registered",
      });
    }

    if (findPhone) {
      return res.send({
        message: "Phone already registered",
      });
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.error("Password unable to be hashed");
      } else {
        const newUser = new User({
          name: name,
          email: email,
          phone: phone,
          password: hash,
          institute: institute,
          country: country,
          expertise: expertise
        });
        const signedUp = await newUser.save();

        if (signedUp) {
          req.body.loginCred = email;
          req.body.password = password;
          login(req, res);
        } else {
          return res.send({
            message: "Sign up failed",
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

//@route    POST /login
//@descr    Login an user
//@access   Public

const login = async (req, res) => {
  try {
    const { loginCred, password } = req.body;

    if (!loginCred || !password) {
      return res.send({
        message: "Fill all details",
      });
    }

    const findUser = await User.findOne({
      $or: [{ email: loginCred }, { phone: loginCred }],
    });

    if (findUser) {
      const match = await bcrypt.compare(password, findUser.password);

      if (match) {
        let token = jwt.sign({ _id: findUser._id }, jwtSecret);

        const saveToken = await findUser.save();

        if (saveToken) {
          return res
            .cookie("jwtoken", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
            })
            .send({ token });
        } else {
          return res.send({
            message: "Error",
          });
        }
      } else {
        return res.send({
          message: "Invalid credentials",
        });
      }
    } else {
      return res.send({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//@route    GET /logout
//@descr    Logout user
//@access    Public

const logout = (req, res) => {
  try {
    res.clearCookie("jwtoken", { path: "/" });
    return res.send({
      message: "User logged out",
    });
  } catch (error) {
    console.log(error);
  }
};

//@route	GET /userDetails/id
//@descr	Get user details from id
//@access	Public

const userDetails = async (req,res) => {
	try {
		const {id} = req.params;
		const user = User.findById(id);

		if(user) {
			res.send(user);
		} else {
			res.send({
				message: "User not found"
			});
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = { signup, login, logout, userDetails };
