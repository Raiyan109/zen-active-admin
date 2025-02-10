import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../../assets/images/login.png";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
// import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values) => {
    navigate(location.state ? location.state : "/");

    try {
      const response = await login(values);
      console.log(response);
      if (response?.data?.status == 200) {
        if (response?.data?.data?.user?.role === "ADMIN") {
          localStorage.setItem("token", response?.data?.data?.token);
          dispatch(
            setUser({
              user: response?.data?.data?.user,
              token: response?.data?.data?.token,
            })
          );
          // navigate(from, { replace: true });
          navigate(location.state ? location.state : "/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed!!",
            text: "You are not a Valid",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title:
            response?.data?.message ||
            response?.error?.data?.message ||
            "Login Failed!!",
          text: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!!",
        text: "Something went wrong. Please try again later.",
      });
    }
  };
  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-primary mx-auto w-full lg:p-[15%] lg:pr-[20%] ">
        <img src={image} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px]">
          <div className="pb-[30px] space-y-2">
            <h1 className="text-[33px] text-center text-[#3A3A3A]">Sign in</h1>

          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            requiredMark={false}
            className="text-start"

          >
            <Form.Item
              // label={<span className="font-medium text-base">Email</span>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input a valid Email!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input size="large" placeholder="Email" style={{ border: '1px solid #2781B5', borderRadius: '7px' }} />
            </Form.Item>
            <Form.Item
              // label={<span className="font-medium text-base">Password</span>}
              className="mt-6"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Password" style={{ border: '1px solid #2781B5', borderRadius: '7px' }} />
            </Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="text-base font-medium">
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => navigate("/auth/forgot-password")}
                  type="link"
                  className="text-base font-medium text-info"
                >
                  Forget password?
                </Button>
              </Form.Item>
            </div>
            <div className="w-full flex justify-center ">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="px-8 bg-[#174C6B] text-white hover:bg-[#174C6B]/90 rounded-xl font-semibold h-11 min-w-[400px]"
              >
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
