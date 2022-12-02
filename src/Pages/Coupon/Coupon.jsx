import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCoupon, clearErrors, getAllCoupons } from "../../redux/actions/couponAction";
import { ADD_COUPON_RESET } from "../../constants/couponConstants";

const Coupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [couponName, setCouponName] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [limit, setLimit] = useState("");
    const [discount, setDiscount] = useState("");
    const [expirationTime, setExpirationTime] = useState("");
    const [message, setMessage] = useState("");

    const { error,success,message:couponMessage } = useSelector((state) => state.addCoupon);


    useEffect(() => {
        if (error) {
            toast.error(error.message);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success(couponMessage);
            dispatch({type:ADD_COUPON_RESET});
            navigate(`/couponlist`)
        }
        
        dispatch(getAllCoupons())
    }, [dispatch,error,couponMessage,success,navigate]); 

    
    const createCouponSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("couponName", couponName);
        myForm.set("couponCode", couponCode.toUpperCase());
        myForm.set("limit", limit);
        myForm.set("discount", discount);
        myForm.set("expirationTime", expirationTime);
        myForm.set("message", message);
      
        dispatch(addCoupon(myForm));
      };







  return (
    <div
      className="conatiner-sm d-flex justify-content-center flex-column align-items-center w-100 bg-light"
      style={{ height: "100vh" }}>
      <div className="bg-white rounded px-5 mt-5 py-2"> 
        <h2 className="">Add New Coupon</h2>
        <form action="" encType="multipart/form-data" className="mt-4" onSubmit={createCouponSubmitHandler}>
            <div className="mb-2 ">
            <label htmlFor="exampleInputNumber" className="form-label">
                Coupon Name
            </label>
            <input
                type="text"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                onChange={(e) => setCouponName(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label htmlFor="exampleInputNumber" className="form-label">
                Coupon Code
            </label>
            <input
                type="text"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                onChange={(e) => setCouponCode(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label htmlFor="exampleInputNumber" className="form-label">
                Limit
            </label>
            <input
                type="number"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                onChange={(e) => setLimit(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label htmlFor="exampleInputNumber" className="form-label">
                Discount
            </label>
            <input
                type="number"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                onChange={(e) => setDiscount(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label htmlFor="exampleInputNumber" className="form-label">
                Expiration Time
            </label>
            <input
                type="datetime-local"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                onChange={(e) => setExpirationTime(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label htmlFor="exampleInputNumber" className="form-label">
                Message
            </label>
            <input
                type="text"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                onChange={(e) => setMessage(e.target.value)}
            />
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3 mb-5">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Coupon;
