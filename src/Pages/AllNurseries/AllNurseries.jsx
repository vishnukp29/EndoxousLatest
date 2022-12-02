import React, { useEffect, useState } from "react";
import "./Page4.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  clearErrors,
  getAllNurseries,
} from "../../redux/actions/nurseryAction";
import { toast } from "react-toastify";
import Loader from "../../Components/SideBar/Loader/Loader";

function AllNurseries() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const { error, loading, nurseries } = useSelector(
    (state) => state.allNurseries
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getAllNurseries());
  }, [dispatch, error, keyword]);

  const addNewNurseryHandler = () => {
    console.log("New Nursery Mode or any popup");
    alert("New Nursery Mode or any popup ?");
  };
  return (
    <div>
      <div className="mainsection" style={{ height: "100vh" }}>
        <div className="section2">
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

              <NavLink className="fw-bold navbar-brand " to="/">
                All Nurseries
              </NavLink>
              <button
                className="btn btn-outline-success btnround"
                type="submit"
              ></button>
            </div>
            <hr />
          </nav>
          <div className="d-flex justify-content-between align-items-center px-2 py-1 filterInputInAllOrders">
            <div className="px-5 py-4 filterInput">
              <input
                className="form-control px-4"
                type="text"
                value={keyword}
                placeholder="ID, phone or name..."
                aria-label="readonly input example"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="addNewNursery d-flex px-5 ">
              <button
                type="button"
                className="btn-AllNurseries btn btn-md"
                onClick={addNewNurseryHandler}
              >
                + Add new nursery
              </button>
            </div>
          </div>
          <div className="tableForAll s2-table m-5 ">
            <div className="subTableForAll s2-table">
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
                  }}
                >
                  <thead style={{ backgroundColor: "#eaeaea" }}>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Nursery Name</th>
                      <th scope="col">Area/Locality</th>
                      <th scope="col">Products</th>
                      <th scope="col">Status</th>
                      <th scope="col">Sales</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider  my-5">
                    {nurseries &&
                      nurseries
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
                        .map((nursery, index) => (
                          <tr>
                            <th scope="row">#{nursery._id}</th>
                            <td>{nursery?.name}</td>
                            <td>{nursery.address} </td>
                            <td> 1 </td>
                            {/* <td>🟢</td> */}
                            <div>
                              <input
                                className="form-check-input s2-radio"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel1"
                                value="Pending"
                                aria-label="..."
                              />
                            </div>
                            <td>Rs 36,320</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllNurseries;
