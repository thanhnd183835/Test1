import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { signIn } from "../../../Service/Redux/login/login.slice";
import { Account } from "../../../Model/AccountType";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const handleLogin = async () => {
    const body: Account = {
      email: email,
      password: password,
    };
    // const res = await dispatch(signIn(body));
  };

  return (
    <>
      <div className="overviewPage">
        <div className="imageLogin">
          <img
            src="https://res.cloudinary.com/dzjtdpc4h/image/upload/v1684258216/DATN/jxsgkbhlugpg21kfnzqc.png"
            alt=""
          />
        </div>
        <div className="login_right">
          <div className="main_login">
            <h3>Đăng Nhập</h3>
            <div className="login_input_email">
              <label>Email đăng nhập:</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login_input_password">
              <label>Mật khẩu:</label>
              <input
                type="password"
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
            <div className="button_login">
              <button type="submit" onClick={handleLogin}>
                <span>ĐĂNG NHẬP</span>
              </button>
            </div>
            <div className="login_text">
              Chưa có tài khoản? {""}
              <a>Đăng Ký</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
