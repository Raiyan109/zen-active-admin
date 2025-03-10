import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import image from "../../assets/images/verify.png";
import PageHeading from "../../Components/PageHeading";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useVerifyEmailMutation } from "../../redux/features/auth/authApi";


const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const { id } = useParams();
  const [otp, setOtp] = useState("");
  const [mutation, { isLoading }] = useVerifyEmailMutation();

  const onFinish = async (values) => {
    if (isNaN(otp) || otp.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please enter 6 digits OTP number!!.",
      });
    }
    navigate(`/auth/reset-password`);
    try {
      const response = await mutation({
        email: email,
        code: Number(otp),
      });
      // console.log(response);
      if (response?.data?.status == 200) {
        localStorage.setItem("verify-token", response?.data?.data);
        navigate(`/auth/reset-password`);
      } else {
        Swal.fire({
          icon: "error",
          title: "failed!",
          text:
            response?.data?.message ||
            response?.error?.data?.message ||
            "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        // title: "Login Failed , Try Again...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };
  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-primary mx-auto w-[90%] lg:p-[8%]">
        <img src={image} alt="" />
      </div>
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[64px] lg:px-[44px] space-y-5">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={"/auth/forgot-password"}
              title={"Verify Email"}
              disbaledBackBtn={true}
            />
            <p className=" drop-shadow text-hash mt-5 text-center lg:text-left">
              Please check your email. We have sent a code to {email}
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className="py-3 text-2xl font-semibold flex justify-center lg:justify-start">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputStyle={{
                  height: "70px",
                  width: "60px",
                  margin: "20px",
                  // background: "#ECE8F1",
                  border: "1px solid #174C6B",
                  // marginRight: "auto",
                  outline: "none",
                  borderRadius: "12px",
                  color: "black",
                }}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="w-full flex justify-center pt-5">
              <Button
                // disabled={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2 bg-[#174C6B]"
              >
                Verify Email
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
