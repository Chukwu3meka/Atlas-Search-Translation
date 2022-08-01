exports.signin = async (req, res) => {
  try {
    if (process.env.NODE === "production") throw { message: "Server error" };
    const { password, email } = req.body;

    validate({ type: "email", value: email });
    validate({
      type: "password",
      value: password,
      attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
    });

    // verify that account exist, else throw an error
    const profileData = await Profiles.findOne({ email });
    if (!profileData) throw { message: "Invalid Email/Password" };

    const {
      _id,
      name,
      auth: {
        password: dbPassword,
        wrongAttempts,
        accountLocked,
        emailVerified,
        session,
        role,
        verification: { code, time },
      },
    } = profileData;

    const rightPassword = await bcrypt.compare(password, dbPassword);

    if (rightPassword) {
      // check if account has been locked for 3 hours
      const accountTempLocked = differenceInHour(accountLocked) <= 3;

      if (wrongAttempts >= 5 && accountTempLocked) throw { message: "Account is temporarily locked, Please try again later" };

      if (!emailVerified) {
        return await resendVerification({
          name,
          email,
          ref: _id,
          code: differenceInHour(time) <= 24 ? code : null,
          errMsg: "Email not verified! We just sent another verification mail",
        });
      }

      // reset wrongPassword counter
      await Profiles.updateOne({ email }, { $set: { "auth.wrongAttempts": 0 } });

      const token = jwt.sign({ session, name, role }, process.env.JWT_SECRET, { expiresIn: "120 days" });

      //       SameSite=None must be secure #
      // Rejected

      // Set-Cookie: widget_session=abc123; SameSite=None
      // Setting a cookie without Secure will be rejected.
      // Accepted

      // Set-Cookie: widget_session=abc123; SameSite=None; Secure
      // You must ensure that you pair SameSite=None with the Secure attribute.
      // You can test this behavior as of Chrome 76 by enabling about://flag

      res
        .status(202)
        // .cookie("token", token, {
        //   path: "/",
        //   // httpOnly: true,
        //   // sameSite: "lax",
        //   secure: process.env.NODE === "production",
        //   // sameSite: process.env.NODE === "production" ? "none" : "lax",
        //   expires: new Date(new Date().getTime() + 3600000 * 24 * 120), // <= expires in 120 days,
        // })
        .json({ name, role, token });
    } else {
      await Profiles.updateOne(
        { email },
        {
          $inc: { "auth.wrongAttempts": 1 }, // <= increment wrong attempts
          $set: { "auth.accountLocked": new Date() }, // <= set new time to track account locked
        }
      );

      throw { message: "Invalid Email/Password" };
    }
  } catch (err) {
    return catchError({ res, err, message: err.message || "A signin error occured" });
  }
};
