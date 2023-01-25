import React, { useEffect, useState } from "react";
import ojimage from "../../../images/oj-small.png";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import Cookies from "universal-cookie";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { AiOutlineMail } from "react-icons/ai";
import "./Login.css";

const ClientLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const [isLoading, setLoading] = useState(false);
  const cookies = new Cookies();

  const handleSubmit = async (values) => {
    const Email = values["email"];
    setLoading(true);
    if (!isEmail(Email)) {
      message.error("Please Enter a valid Email");
      setLoading(false);
      return;
    }

    var data = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    var config = {
      method: "post",
      url: "/api/recruitment/client/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200 && response.data.token) {
          message.success(response.data.ok);
          cookies.set("token", response.data.token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
          });
          navigate("/client/dashboard");
          setLoading(false);
        } else {
          if (response.status === 201) {
            message.error(response.data.error);
            setLoading(false);
          } else {
            message.error(`Ouch, Something went terribly wrong`);
            setLoading(false);
          }
        }
      })
      .catch(function (response) {
        setLoading(false);
        message.error(
          response.response.data.error || "Something went terribly wrong"
        );
      });
  };

  return (
    <m.div
      className="login-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <div className="login-image-container">
          <img className="oj-image" src={ojimage} alt={"Oman Jobs"} />
        </div>
        <p className="login-welcome-message">Client Login</p>
        <div className="name-bodies">
          <p className="name-title">Email</p>
          <Form.Item
            className="input-primary"
            name="email"
            rules={[
              {
                required: true,
                message: "Email Required",
              },
              {
                pattern:
                  // eslint-disable-next-line
                  /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/,
                message: "Invalid email",
              },
            ]}
            normalize={(value, _prevVal, _prevVals) => value.trim()}
          >
            <Input
              prefix={<AiOutlineMail className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
        </div>
        <div className="name-bodies">
          <p className="name-title">Password</p>
          <Form.Item
            className="input-primary"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
            normalize={(value, _prevVal, _prevVals) => value.trim()}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="small-margin-top bold"
          size="large"
          loading={isLoading}
        >
          {isLoading ? (
            <m.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Authenticating
            </m.span>
          ) : (
            "Login"
          )}
        </Button>
        {/* <div className="flex-center small-margin-top flex-small-gap text-grey">
          Don't have an account?
          <span
            className="primary-color bold pointer"
            onClick={() => navigate("/client/register")}
          >
            Sign up
          </span>
        </div> */}
      </Form>
    </m.div>
  );
};

export default ClientLogin;
