import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, login, verifyOTP } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
import Loader from "../../Components/SideBar/Loader/Loader";

const VarifyOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const { error, message, loading, success, user } = useSelector(
    (state) => state.verifyUser
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success(message);
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, message, success, navigate]);

  const VerifyPhoneSubmit = async (e) => {
    e.preventDefault();
    const phone = await JSON.parse(localStorage.getItem("Uphone"));

    dispatch(verifyOTP(otp, phone));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="d-flex justify-content-center flex-column align-items-center w-100"
          style={{ height: "100vh" }}
        >
          <h2 className="mb-5">Varify your OTP</h2>
          <form action="" onSubmit={VerifyPhoneSubmit}>
            <div className="mb-2">
              <label for="exampleInputOTP" className="form-label">
                Enter your OTP
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputOTP"
                aria-describedby="OTPHelp"
                onChange={(e) => setOtp(e.target.value)}
              />
              <div id="OTPHelp" className="form-text">
                Do not share your OTP with anyone.
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100 mt-3">
              Verify
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VarifyOTP;
