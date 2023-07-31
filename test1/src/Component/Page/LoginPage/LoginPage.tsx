import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(1111);
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
              <input type="email" />
            </div>
            <div className="login_input_password">
              <label>Mật khẩu:</label>
              <input type="password" />
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
