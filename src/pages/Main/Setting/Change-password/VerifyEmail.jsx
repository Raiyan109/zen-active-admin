import { Input } from "antd"
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6"
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../../../../redux/features/auth/authApi";
import Swal from "sweetalert2";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const { id } = useParams();
    const [otp, setOtp] = useState(0);
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

    // Handle OTP input change
    const handleOtpChange = (value) => {
        setOtp(value); // Update state with OTP input
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(otp);
        if (otp.length < 6 || isNaN(Number(otp))) {
            return Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Please enter a valid 6-digit OTP.",
            });
        }

        console.log("OTP: ", otp);
        console.log("Email: ", email);

        try {
            const response = await verifyEmail({
                email: id, // Assuming ID contains email
                code: Number(otp),
            });

            if (response?.data?.statusCode === 200) {
                localStorage.setItem("verify-token", response?.data?.data);
                navigate(`/settings/change-password/forgot-password/reset-password`);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Verification Failed!",
                    text:
                        response?.data?.message ||
                        response?.error?.data?.message ||
                        "Something went wrong. Please try again later.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something went wrong. Please try again later.",
            });
        }

        if (isNaN(otp) || otp.length < 6) {
            return Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Please enter 4 digits OTP number!!.",
            });
        }
        navigate(`/settings/change-password/forgot-password/reset-password`);
        try {
            const response = await verifyEmail({
                email: email,
                code: Number(otp),
            });
            // console.log(response);
            if (response?.data?.statusCode == 200) {
                localStorage.setItem("verify-token", response?.data?.data);
                navigate(`/settings/change-password/forgot-password/reset-password`);
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

    const handleBackButtonClick = () => {
        navigate(-1); // This takes the user back to the previous page
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-[#F4F9FB] rounded-lg shadow-lg mt-8 w-[610px] h-[468px] mx-auto py-10 px-8">
                <div className="flex flex-col  w-full max-w-xl mx-auto mt-10 p-4 rounded-lg space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackButtonClick}>
                            <div className="w-[24px] h-[24px]">
                                <HiOutlineArrowLeft className="text-[19px]" />
                            </div>
                            <h1 className="text-[26px] text-[#525252] font-semibold">Verify Email</h1>
                        </div>
                        <h1 className="text-[16px] text-[#525252] font-semibold">Please enter the OTP we have sent you in your email. </h1>

                    </div>
                    <Input.OTP
                        value={otp}
                        onChange={handleOtpChange}
                        // formatter={(str) => str.toUpperCase()} {...sharedProps}
                        size="large"
                        style={{ gap: '20px' }}
                        className="custom-otp-input" />

                    <div className="flex justify-between items-center">
                        <h1 className="text-[16px] text-[#525252] font-semibold">Didn’t receive the code?</h1>
                        <h1 className="text-[#32A5E8]">Resend</h1>
                    </div>
                    {/* Send OTP Button */}
                    <button className="mt-6 w-full bg-[#174C6B] text-white py-2 rounded-lg hover:bg-[#174C6B]/80 h-[56px] text-[20px]"
                        //  onClick={(e) => navigate(`verify-email`)}
                        onClick={handleSubmit}
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
