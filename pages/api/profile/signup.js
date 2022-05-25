export default async (req, res) => {
  try {
    const { password, email: initEmail, name } = req.body;
    const email = initEmail && `${initEmail}`.toLowerCase();
    // const email = String(initEmail).toLowerCase();

    // password, email, name

    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

    const validMail = emailRegex.test(email) || null;

    console.log({ password, email, name, validatedMail });

    const { Profile } = await require("@db").default();

    // console.log("hete", Suggestion);

    // await Profile.insertOne({password, email, name,});

    res.status(200).json({ status: "success" });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({
      error: ["eMail taken", "Invalid mail", "Password must be between 6-13 characters"].includes(error)
        ? error
        : "Internal Server error",
    });
  }
};
