import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import "../styles/LocationBar.css";

export default function UserLanding({ user }) {
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  // redflag
  const [categoryBtn, setCategoryBtn] = useState("redflag");
  const [displayy, setDisplayy] = useState("none");

  // ************* Map Location Functionality *************
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    // componentRestrictions: { country: "ke" },
    fields: ["address_components", "geometry", "icon", "name"],
    // types: ["establishment"],
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
    });
  }, []);
  // ************* Map Location Functionality *************

  function handleSubmitRedflag(e) {
    e.preventDefault();
    const formData = {
      location,
      image,
      video,
      description,
      status: "under investigation",
      user_id: 1,
    };
    console.log("Red Flag");
    console.log(formData);
    setDisplayy("none");
  }

  function handleSubmitIntervention(e) {
    e.preventDefault();
    const formData = {
      location,
      image,
      video,
      description,
      status: "under investigation",
      user_id: 1,
    };
    console.log("Intervention");
    console.log(formData);

    setDisplayy("none");
  }

  return (
    <>
      <Navbar />
      <Logo>Welcome, {user?.name}!</Logo>
      <div>
        <div class="row justify-content-center">
          <div class="col-sm-5 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">What is a Red-Flag Incident?</h5>
                <img
                  class="card-img-top"
                  src="https://2456764.fs1.hubspotusercontent-na1.net/hub/2456764/hubfs/2102%20Blogs/red-flags-1200-627.jpg?width=680&name=red-flags-1200-627.jpg"
                  alt="Redflag"
                />
                <h5>
                  A red-flag is an incident linked to corruption and/or
                  corruption-related activities.
                </h5>
                <div class="text-center">
                  <button
                    class="btn btn-danger mt-3"
                    onClick={() => {
                      setCategoryBtn("redflag");
                      setDisplayy("block");
                    }}
                  >
                    Report A Red-Flag Incident
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-5 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">What is an Intervention Incident?</h5>
                <img
                  class="card-img-top"
                  src="https://thumbs.dreamstime.com/b/intervention-grungy-wooden-headline-maple-d-rendered-royalty-free-stock-image-can-be-used-online-website-86488320.jpg"
                  alt="Redflag"
                />
                <h5>
                  An intervention is a call for a government agency to intervene
                  e.g repair bad roads, collapsed bridges.
                </h5>
                <div class="text-center">
                  <button
                    class="btn btn-danger mt-4"
                    onClick={() => {
                      setCategoryBtn("intervention");
                      setDisplayy("block");
                    }}
                  >
                    Report An Intervention Incident
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: displayy }}>
        <div class="d-flex justify-content-center">
          <div class="col-sm-10 ">
            <div class="shadow p-3 mb-5 bg-white rounded">
              <form
                onSubmit={(e) =>
                  categoryBtn === "redflag"
                    ? handleSubmitRedflag(e)
                    : handleSubmitIntervention(e)
                }
              >
                <div class=" text-center">
                  <h2>
                    {categoryBtn === "redflag"
                      ? "Report a Red-Flag Incident"
                      : "Report an Intervention Incident"}
                  </h2>
                </div>
                <div>
                  {/* ********* */}
                  {/* <label>Location :</label>
                  <input ref={inputRef} /> */}
                  {/* ********** */}
                  <label htmlFor="Location" className="form-label">
                    Location
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    value={location}
                    placeholder="Add Location"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="Image" className="form-label">
                    Image
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={image}
                    placeholder="Upload Image"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="Video" className="form-label">
                    Video
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={video}
                    placeholder="Upload Video"
                    onChange={(e) => setVideo(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="Description" className="form-label">
                    Incident Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    placeholder="Add Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div class="text-center">
                  <input
                    class="btn btn-danger mt-3"
                    type={"submit"}
                    value={
                      categoryBtn === "redflag"
                        ? "Submit Red-Flag Incident"
                        : "Submit Intervention Incident "
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Logo = styled.h1`
  font-family: "Permanent Marker", serif;
  font-size: 2.5rem;
  color: teal;
  margin: 20px 0;
  padding-top: 80px;
  padding-left: 40px;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;