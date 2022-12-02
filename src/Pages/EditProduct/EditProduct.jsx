import React from "react";
import { NavLink } from "react-router-dom";

const EditProduct = () => {
  return (
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

          <NavLink className="fw-bold navbar-brand" to="/">
            Edit Product
          </NavLink>
          <button
            className="btn btn-outline-success btnround"
            type="submit"
          ></button>
        </div>
        <hr />
      </nav>
      <div className="d-flex gap-4 p-5">
        <div className="w-25">
          <div className="card px-2 py-4">
            <div className="card-body">
              <h6 className="card-title">Quick Notifications</h6>
              <p className="card-text text-success mt-4">Product info</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-secondary">Product Media</li>
              <li className="list-group-item text-secondary">Inventory</li>
              <li className="list-group-item text-secondary">Tags</li>
            </ul>
          </div>
        </div>
        <div className="w-75">
          <div>
            <div className="card px-2 py-4">
              <div className="card-body">
                <h6 className="card-title">Product Information</h6>
              </div>
              <div className="input-group d-flex flex-column px-3">
                <p className="mt-1 mb-2">Product Name</p>
                <input
                  style={{ borderRadius: ".4rem" }}
                  type="text"
                  className="form-control w-100"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group d-flex flex-column px-3">
                <p className="mt-3 mb-2">Product Category</p>
                <input
                  style={{ borderRadius: ".4rem" }}
                  type="text"
                  className="form-control w-100"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="d-flex">
                <div className="input-group d-flex flex-column px-3">
                  <p className="mt-3 mb-2">Price</p>
                  <input
                    style={{ borderRadius: ".4rem" }}
                    type="text"
                    className="form-control w-100"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  <div className="d-flex justify-content-start">
                    <p className="fs-6 text-secondary">Price: Rs 10</p>
                  </div>
                </div>
                <div className="input-group d-flex flex-column px-3">
                  <p className="mt-3 mb-2">Price</p>
                  <input
                    style={{ borderRadius: ".4rem" }}
                    type="text"
                    className="form-control w-100"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-success">
                      20$ OFF
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="input-group w-50 d-flex flex-column px-3">
                  <p className="mt-3 mb-2">Product Unit</p>
                  <div className="input-group mb-3 w-100">
                    <input
                      type="number"
                      className="form-control"
                      aria-label="Text input with dropdown button"
                    />
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Separated link
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="input-group d-flex flex-column px-3">
                <p className="mt-3 mb-2">Product Description</p>
                <input
                  style={{ borderRadius: ".4rem" }}
                  type="text"
                  className="form-control w-100"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>

            <div className="card px-2 py-4 my-5">
              <div className="card-body">
                <h6 className="card-title">Product Images</h6>
              </div>
              <div className="input-group d-flex gap-5 px-3">
                <div
                  className="card"
                  style={{
                    width: "7rem",
                    height: "8rem",
                    borderRadius: ".3rem",
                  }}
                >
                  <img src="..." className="card-img-top" alt="..." />
                </div>
                <div
                  className="card"
                  style={{
                    width: "7rem",
                    height: "8rem",
                    borderRadius: ".3rem",
                  }}
                >
                  <img src="..." className="card-img-top" alt="..." />
                </div>
                <div
                  className="card"
                  style={{
                    width: "7rem",
                    height: "8rem",
                    borderRadius: ".3rem",
                  }}
                >
                  <img src="..." className="card-img-top" alt="..." />
                </div>
              </div>
            </div>

            <div className="card px-2 py-4 my-5">
              <div className="card-body">
                <h6 className="card-title">Inventory</h6>
              </div>
              <div className="input-group d-flex flex-column px-3">
                <p className="mt-1 mb-2">Quantity</p>
                <input
                  style={{ borderRadius: ".4rem" }}
                  type="text"
                  className="form-control w-100"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
            <div className="card px-2 py-4 my-5">
              <div className="card-body">
                <h6 className="card-title">Add tags to the product</h6>
              </div>
              <div className="input-group d-flex flex-column px-3">
                <p className="mt-1 mb-2">Quantity</p>
                <input
                  style={{ borderRadius: ".4rem" }}
                  type="text"
                  className="form-control w-100"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Add"
                />
                <div className="section2-btn mt-3">
                  <button
                    className=" btn btn-secondary fs-6 py-0 me-4"
                    style={{ borderRadius: "100px" }}
                  >
                    Gulab
                  </button>
                  <button
                    className=" btn btn-secondary fs-6 py-0 me-4"
                    style={{ borderRadius: "100px" }}
                  >
                    Gulab
                  </button>
                  <button
                    className=" btn btn-secondary fs-6 py-0"
                    style={{ borderRadius: "100px" }}
                  >
                    Gulab
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 bg-white d-flex justify-content-end px-5 py-2">
        <button
          type="button"
          className="btn btn-lg px-5 text-white"
          style={{ backgroundColor: "#ff6700" }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
