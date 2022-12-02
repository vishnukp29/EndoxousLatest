import React, { useEffect, useState } from "react";
import "./Page11.css";
// import logo from "../../Assets/Images/logo3.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearErrors,
  getAllCategories,unBlockCategory,blockCategory
} from "../../redux/actions/categoryAction";
import Loader from "../../Components/SideBar/Loader/Loader";
import { getAllNurseries } from "../../redux/actions/nurseryAction";
import { BLOCK_CATEGORY_RESET, UNBLOCK_CATEGORY_RESET } from "../../constants/categoryConstants";
import { getAdminProducts } from "../../redux/actions/productAction";
function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { error, loading, categoryList } = useSelector((state) => state.allCategories );
  const { nurseries } = useSelector( (state) => state.allNurseries);

  const {error:blockError,isBlocked,message} = useSelector( (state) => state.categoryBlock)
  const {error:unblockError,isActive,message:unblockMessage} = useSelector( (state) => state.categoryUnblock)

  const { products } = useSelector((state) => state.products);

  const [state, setState] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (unblockError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (blockError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (isBlocked) {
      toast.success(message);
      dispatch({type:BLOCK_CATEGORY_RESET})
    }
    if (isActive) {
      toast.success(unblockMessage);
      dispatch({type:UNBLOCK_CATEGORY_RESET})
      
    }
    
    dispatch(getAdminProducts());
    dispatch(getAllCategories());
    dispatch(getAllNurseries());

  }, [dispatch, error,isActive,unblockMessage,isBlocked,message,unblockError,blockError]);

  const addCategoryHandler = () => {
    navigate("/category/new");
  };

  const nurseryDropDownHandler = (e) => {
    const nursery = e.target.value;
    const nuserysproducts =
      categoryList &&
      categoryList.filter((category) => category.seller === nursery);
    setFilteredCategories(nuserysproducts);
    setState(true);
    if (nursery === 1) {
      setFilteredCategories();
    }
  };

  const toggleSwitch = (id,status)=>{
    console.log(id,status,"======= inside func");
    if(status===true){
      dispatch(unBlockCategory(id))
    }else if(!status){
      dispatch(blockCategory(id))
    }else if(status===false){
      dispatch(blockCategory(id))
    } 
  }

  return (
    <div className="mainsection">
      <div className="section2 ">
        <nav
          className="s2-navabar navbar navbar-expand-lg "
          style={{ backgroundColor: "white" }}>
          <div className="container-fluid px-5">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <NavLink className="fw-bold navbar-brand" to="/">
              Catagories
            </NavLink>
            <button
              className="btn btn-outline-success btnround"
              type="submit"
            ></button>
          </div>
          <hr />
        </nav>
        <div className="d-flex flex-wrap justify-content-between align-items-center px-2 py-1">
          <div className="px-5 py-4 filterInput">
            <input
              className="form-control px-4"
              type="text"
              placeholder="Search for catagories here..."
              aria-label="input example"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div>
            <div className="d-flex flex-wrap px-5 ">
              <button
                type="button"
                className="categoryBtn btn btn-sm btn-link me-5"
              >
                Reorder Catagory
              </button>
              <div className="categorySelection p2-selection mx-2">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  onChange={nurseryDropDownHandler}
                >
                  <option selected value="1">
                    All nurseries
                  </option>
                  {nurseries &&
                    nurseries.map((nursery, index) => (
                      <option value={nursery._id} key={index}>
                        {nursery?.name + " " + nursery?.address}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="button"
                className="btn-page4 categorySelection btn btn-success btn-md"
                onClick={addCategoryHandler}
              >
                + Add New Category
              </button>
            </div>
          </div>
        </div>

        <div className="tableForAll s2-table mx-5 ">
          <div className="s2-table subTableForAll">
            {loading ? (
              <Loader />
            ) : (
              <table
                className="table table-borderless"
                style={{
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: ".5rem",
                  backgroundColor: "white",
                }}>
                <thead style={{ backgroundColor: "#eaeaea" }}>
                  <tr>
                    <th scope="col">IMG</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Products</th>
                    <th scope="col">Status</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Nursery Name</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider  my-5">
                  {categoryList &&
                    categoryList
                      .filter((val) => {
                        if (keyword === "") {
                          return val;
                        } else if (
                          val.name
                            ?.toLowerCase()
                            .includes(keyword?.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((category, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <div
                              style={{
                                backgroundColor: "#ececec",
                                borderRadius: ".5rem",
                                width: "70px",
                                height: "70px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                className="bg-primary img-fluid rounded-start"
                                src={category?.avatar[0]?.url}
                                alt="img"
                              />
                            </div>
                          </th>
                          <td>{category?.name}</td>
                          <td>{(products&&products.filter((product)=>product.category === category?.name)).length}</td>
                          <td>
                            <div>
                              <span
                                className="form-check form-switch d-inline me-2"
                                style={{
                                  position: "absolute",
                                }}
                              >
                                {category?.isBlock === true ? (
                                  <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                  onClick={()=>toggleSwitch(category?._id,category?.isBlock,category)}
                                  checked
                                />
                                ) : (
                                  <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                  onClick={()=>toggleSwitch(category?._id,category?.isBlock,category)}
                                />
                                )}
                              </span>
                              {/* <span className="mx-5">Pending</span> */}
                            </div>
                          </td>
                          <td>Rs 320</td>
                          <td>Nursery Name</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
