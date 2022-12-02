import React, { Fragment, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../redux/actions/productAction";
import Loader from "../../Components/SideBar/Loader/Loader";
import { toast } from "react-toastify";
import { useState } from "react";
import { getAllNurseries } from "../../redux/actions/nurseryAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { BsGrid, BsList } from "react-icons/bs";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams();

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState(false);
  const [lowStockStatus, setLowStockStatus] = useState(false);
  const [state, setState] = useState(false);

  const { loading, error, products } = useSelector((state) => state.products);
  const {
    error: deleteError,
    message: deleteMsg,
    isDeleted,
    loading: DeleteLoading,
  } = useSelector((state) => state.product);
  const { error: nurseriesError, nurseries } = useSelector(
    (state) => state.allNurseries
  );

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (nurseriesError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (products) {
      setFilteredProducts(products);
    }

    if (deleteError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast(deleteMsg);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAllNurseries());
    dispatch(getAdminProducts());
  }, [
    dispatch,
    error,
    keyword,
    deleteMsg,
    isDeleted,
    nurseriesError,
    deleteError,
  ]);

  const AddProductHandler = () => {
    navigate("/product/new");
  };

  const ProductDetailsHandler = (id) => {
    navigate(`/product/edit/${id}`);
  };

  const lowStockHandler = () => {
    setLowStockStatus(!lowStockStatus);
    if (lowStockStatus === false) {
      const lowStockProduct =
        products && products.filter((product) => product.stock <= 4);

      setFilteredProducts(lowStockProduct);
      setState(true);
    } else {
      const Allproducts = products && products.filter((product) => product);
      setFilteredProducts(Allproducts);
      setState(true);
    }
  };

  const nurseryDropDownHandler = (e) => {
    const nursery = e.target.value;
    const nuserysproducts =
      products && products.filter((product) => product.seller === nursery);
    setFilteredProducts(nuserysproducts);
    setState(true);
    if (nursery == 1) {
      setFilteredProducts();
    }
  };

  const gridHandler = () => {
    setStatus(true);
  };
  const listHandler = () => {
    setStatus(false);
  };

  return (
    <div className="section2 ">
      <nav
        className="s2-navabar navbar navbar-expand-lg "
        style={{ backgroundColor: "white" }}
      >
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
            All Products
          </NavLink>
          <button
            className="btn btn-outline-success btnround"
            type="submit"
          ></button>
        </div>
        <hr />
      </nav>
      <div className="d-flex flex-wrap justify-content-between align-items-center px-2 py-1">
        <div className="px-5 py-4 filterInput" onClick={(e) => setState(false)}>
          <input
            className="form-control px-4"
            type="text"
            placeholder="Search for catagories here..."
            aria-label="readonly input example"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="px-5 allOptions">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="modeHolder d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={lowStockHandler}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckDefault"
                  style={{ fontSize: "12px", marginRight: "50px" }}
                >
                  Show low/Out of stock products
                </label>
              </div>
              <div className="gridHandler">
                <BsGrid
                  onClick={gridHandler}
                  style={{ cursor: "pointer", color: "#296148" }}
                ></BsGrid>
                <BsList
                  className="mx-2 fs-5 pointer"
                  style={{ cursor: "pointer", color: "#296148" }}
                  onClick={listHandler}
                ></BsList>
              </div>
            </div>
            <div className="p2-selection filterInput filterOption mx-2">
              <select
                className="form-select"
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
              className="btn-page4 btn btn-success addNewNursery btn-md"
              onClick={AddProductHandler}
            >
              + Add New Product
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* List View */}
          {status == false ? (
            <div className="tableForAll s2-table m-5 ">
              <div
                className="subTableForAll s2-table"
                style={{ width: "100%" }}
              >
                <table
                  className="table table-borderless"
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: ".5rem",
                    backgroundColor: "white",
                  }}
                >
                  <thead style={{ backgroundColor: "#eaeaea" }}>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Product Name</th>
                      {/* <th scope="col">Option</th> */}
                      <th scope="col">Stock</th>
                      <th scope="col">Status</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Nursery Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state === false ? (
                      <Fragment>
                        {products &&
                          products
                            .filter((val) => {
                              if (keyword === "") {
                                return val;
                              } else if (
                                val.fullName
                                  ?.toLowerCase()
                                  .includes(keyword?.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((product, index) => (
                              <tr key={index}>
                                <td>
                                  <div
                                    style={{
                                      backgroundColor: "#ececec",
                                      borderRadius: ".5rem",
                                      width: "70px",
                                      height: "70px",
                                      overflow: "hidden",
                                    }}
                                    scope="row"
                                  >
                                    <img
                                      className="bg-primary img-fluid rounded-start"
                                      src={product.images[0]?.url}
                                      alt="img"
                                    />
                                  </div>
                                </td>
                                <td>{product.name}</td>
                                {/* <td><button type="button" className="btn btn-outline-danger"
                             onClick={()=> dispatch(deleteProduct(product._id))}  >Delete</button></td> */}
                                <td>{product.stock}</td>
                                <td>...</td>
                                <td>Rs {product.price}</td>
                                <td>Nursery Name</td>
                              </tr>
                            ))}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {filteredProducts &&
                          filteredProducts
                            .filter((val) => {
                              if (keyword === "") {
                                return val;
                              } else if (
                                val.fullName
                                  ?.toLowerCase()
                                  .includes(keyword?.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((product, index) => (
                              <tr key={index}>
                                <td>
                                  <div
                                    style={{
                                      backgroundColor: "#ececec",
                                      borderRadius: ".5rem",
                                      width: "70px",
                                      height: "70px",
                                      overflow: "hidden",
                                    }}
                                    scope="row"
                                  >
                                    <img
                                      className="bg-primary img-fluid rounded-start"
                                      src={product.images[0]?.url}
                                      alt="img"
                                    />
                                  </div>
                                </td>
                                <td>{product.name}</td>
                                {/* <td><button type="button" className="btn btn-outline-danger"
                             onClick={()=> dispatch(deleteProduct(product._id))}  >Delete</button></td> */}
                                <td>{product.stock}</td>
                                <td>...</td>
                                <td>Rs {product.price}</td>
                                <td>Nursery Name</td>
                              </tr>
                            ))}
                      </Fragment>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <Fragment>
              <div className="container-lg d-flex justify-content-between px-5 py-2">
                <div className="container-md p-0">
                  <div
                    style={{ borderRadius: ".5rem" }}
                    className="container-sm d-flex flex-wrap gap-5 px-0 py-2"
                  >
                    {state === false ? (
                      <Fragment>
                        {products &&
                          products
                            .filter((val) => {
                              if (keyword === "") {
                                return val;
                              } else if (
                                val.fullName
                                  ?.toLowerCase()
                                  .includes(keyword?.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((product, index) => (
                              <div
                                className="card"
                                style={{ width: "30%" }}
                                key={index}
                              >
                                <div className="row g-0 d-flex justify-content-center">
                                  <div
                                    className="col-md-4 cardView"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      className="cardBox"
                                      style={{
                                        backgroundColor: "#ececec",
                                        borderRadius: ".5rem",
                                        width: "70px",
                                        height: "70px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <img
                                        src={product.images[0]?.url}
                                        className=" bg-primary img-fluid rounded-start"
                                        alt="img"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="card-body">
                                      <h5 className="card-title text-capitalize">
                                        {product.name}
                                      </h5>
                                      <p className="card-text">
                                        <small className="text-muted text-capitalize">
                                          per piece
                                        </small>
                                      </p>
                                      <span className="card-text fs-5">
                                        Rs {product.mrp}
                                      </span>

                                      <span
                                        className="form-check form-switch d-inline me-2"
                                        style={{
                                          position: "absolute",
                                          right: "0",
                                        }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="flexSwitchCheckDefault"
                                        />
                                      </span>
                                    </div>
                                  </div>
                                  <hr style={{ width: "95%" }} />
                                  <div className="d-flex p-2 justify-content-between align-items-center">
                                    <h5>In Stock: {product.stock}</h5>
                                    <button
                                      type="button"
                                      className="btn  btn-danger btn-md"
                                      onClick={() =>
                                        dispatch(deleteProduct(product._id))
                                      }
                                    >
                                      Delete
                                    </button>
                                    <button
                                      type="button"
                                      className="btn bg-success btn-success btn-md"
                                      onClick={() =>
                                        ProductDetailsHandler(product._id)
                                      }
                                    >
                                      Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {filteredProducts &&
                          filteredProducts
                            .filter((val) => {
                              if (keyword === "") {
                                return val;
                              } else if (
                                val.fullName
                                  ?.toLowerCase()
                                  .includes(keyword?.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((product, index) => (
                              <div
                                className="card"
                                style={{ width: "30%" }}
                                key={index}
                              >
                                <div className="row g-0 d-flex justify-content-center">
                                  <div
                                    className="col-md-4"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      className="cardBox"
                                      style={{
                                        backgroundColor: "#ececec",
                                        borderRadius: ".5rem",
                                        width: "70px",
                                        height: "70px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <img
                                        src={product.images[0]?.url}
                                        className=" bg-primary img-fluid rounded-start"
                                        alt="img"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="card-body">
                                      <h5 className="card-title text-capitalize">
                                        {product.name}
                                      </h5>
                                      <p className="card-text">
                                        <small className="text-muted text-capitalize">
                                          per piece
                                        </small>
                                      </p>
                                      <span className="card-text fs-5">
                                        Rs {product.mrp}
                                      </span>

                                      <span
                                        className="form-check form-switch d-inline me-2"
                                        style={{
                                          position: "absolute",
                                          right: "0",
                                        }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="flexSwitchCheckDefault"
                                        />
                                      </span>
                                    </div>
                                  </div>
                                  <hr style={{ width: "95%" }} />
                                  <div className="d-flex p-2 justify-content-between align-items-center">
                                    <h5>In Stock: {product.stock}</h5>
                                    {/* <button
                              type="button"
                              className="btn  btn-danger btn-md"
                              onClick={()=> dispatch(deleteProduct(product._id))}
                            >
                              Delete
                            </button> */}
                                    <button
                                      type="button"
                                      className="btn bg-success btn-success btn-md"
                                      onClick={() =>
                                        ProductDetailsHandler(product._id)
                                      }
                                    >
                                      Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          {/* Grid view */}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
