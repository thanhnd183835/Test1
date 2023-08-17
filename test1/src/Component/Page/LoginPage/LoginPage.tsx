import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { Account } from "../../../Model/AccountType";
import axios from "axios";
import { BASE_URL } from "../../../Ultils/constant";
import { auth } from "../../../Service/Redux/login/login.slice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const handleLogin = async () => {
    const body = {
      email: email,
      password: password,
    };
    axios({
      method: "post",
      url: `${BASE_URL}/api/auth/sign-in`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: body,
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            auth({
              _id: response.data.data._id,
              email: response.data.data.email,
              avatar: response.data.data.avatar,
              userName: response.data.data.userName,
            })
          );
          navigate("/todos");
        }
      })
      .catch((error) => {
        alert(
          "Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra email và mật khẩu của bạn"
        );
      });
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
              <label style={{ color: "#000" }}>Email đăng nhập:</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login_input_password">
              <label style={{ color: "#000" }}>Mật khẩu:</label>
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
              <span style={{ color: "#000" }}>Chưa có tài khoản?</span>
              <a style={{ color: "blue" }}>Đăng Ký</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
