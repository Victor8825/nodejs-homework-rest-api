const { userLoginController } = require("../src/controllers/usersController");
// const { User } = require("../src/db/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { userLogin } = require("../src/models/users");

const mockUserLogin = jest.fn();
jest.mock("../src/models/users.js", () => {
  return {
    userLogin: () => mockUserLogin(),
  };
});

describe("userLoginController test in userController", () => {
  test("should return token in response, status 200 and object user with two keys and string values inside", async () => {
    const mockUser = {
      email: "test_email@mail.com",
      password: "test_password",
      _id: 1,
    };

    const mockApprovedUser = mockUserLogin.mockImplementation(() => {
      const token = jwt.sign({ _id: mockUser._id }, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });

      const approvedUser = {
        token,
        user: {
          email: mockUser.email,
          subscription: mockUser.subscription,
        },
      };
      return approvedUser;
    });

    // jest.spyOn(User, "findOne").mockImplementationOnce(() => mockUser);
    // jest
    //   .spyOn(User, "findByIdAndUpdate")
    //   .mockImplementationOnce(async () => mockApprovedUser);
    const mockReq = {};
    const mockRes = {
      status: 200,
      token: mockApprovedUser.token,
      user: {
        email: mockUser.email,
        subscription: mockUser.subscription,
      },
    };

    userLoginController(mockReq, mockRes);
    expect(mockRes.token).toEqual(mockApprovedUser.token);
    expect(mockRes.status).toEqual(200);
    expect(mockRes.user).toBe(mockApprovedUser.user);
  });
});
