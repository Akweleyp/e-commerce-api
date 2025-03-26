import { UserModel } from "../models/user.js";
import { mailTransporter } from "../utils/mail.js";
import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from "../validators/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  // Steps to be taken
  // Validate user Information
  const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // Check if user does not exist already
  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (user) {
    return res.status(409).json("User already exists!");
  }
  // Hash plaintext password
  // hashSync does the same work as the async and with this you have to pass in a data and saltorRounds as written in the code below
  const hashedPassword = bcrypt.hashSync(value.password, 10);
  // Create user record in database
  const result = await UserModel.create({
    ...value,
    password: hashedPassword,
  });
  // Send registration email to user


  await mailTransporter.sendMail({
    from: 'patriciaakweleyn@gmail.com',
    to: value.email,
    subject:'Checking  out nodemiler ',
    // text: ` Dear ${value.username}, \nA  new account has been created for you! \nThank you!`
    html: registerUserTemplate.replace("{{username}}", value.username),

  })
  //(optionally) Generate access token for user
  // Return response
  res.status(201).json("User registered successfully!");
};

export const loginUser = async (req, res, next) => {
  // Validate user information
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  // Find matching user record in database

  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (!user) {
    return res.status(404).json("User does not exist");
  }
  // Compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json("Invalid Credentials");
  }
  // Generate acess token for user
  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  // Return response

  res.status(200).json({ accessToken });
};

export const updateUser = async (req, res, next) => {
  // Validate request body
  const { error, value } = updateUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // Update User in database
  const result = await UserModel.findByIdAndUpdate(
    req.params.id, 
    value,
    {new: true}
  );

  // Return response
  res.status(200).json('User successfully update');
};
