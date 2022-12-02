import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants";
import {
  clearErrors,
  craeteCategory,
} from "../../redux/actions/categoryAction";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, message } = useSelector(
    (state) => state.newCategory
  );

  const [name, setName] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  console.log(name, "===== Name", avatar);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      navigate("/catagories");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, error, success, message, navigate]);

  const categoryDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("avatar", avatar);
    myForm.set("name", name);
    dispatch(craeteCategory(myForm));
  };

  return (
    <div
      className="conatiner-sm d-flex justify-content-center flex-column align-items-center w-100"
      style={{ height: "100vh" }}
    >
      <h2 className="mb-5">Add New Category</h2>
      <form
        action=""
        encType="multipart/form-data"
        onSubmit={createCategorySubmitHandler}
      >
        <div className="mb-2">
          <label htmlFor="exampleInputNumber" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputNumber"
            aria-describedby="numberHelp"
            onChange={(e) => setName(e.target.value)}
            // value={phone}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="exampleInputNumber" className="form-label">
            Select Image
          </label>
          <input
            type="file"
            className="form-control"
            id="exampleInputNumber1"
            aria-describedby="numberHelp"
            name="avatar"
            accept="image/*"
            onChange={categoryDataChange}
          />
          <img src={avatarPreview} alt="" />
        </div>
        <button type="submit" className="btn btn-success w-100 mt-3">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
