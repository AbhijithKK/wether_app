import React, { useState } from "react";
import "./Wether.css";
import Search from "../../Assets/7xm2_1v9x_230103-removebg-preview.png";
import Humudity from "../../Assets/humidity.png";
import wind from "../../Assets/wind.png";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";
function Wether() {
  const [data, setData] = useState({});
  const [serch, SetSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const Searching = (e) => {
    SetSearch(e.target.value);
  };
  const GetWether = () => {
    if (serch.trim()) {
      setLoader(true);
      let URL = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WETHER_API}&q=${serch}`;
      // http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WETHER_API}&query=${serch}`
      fetch(URL)
        .then((responce) => responce.json())
        .then((data) => {
          console.log(data);
          setData(data);
          setLoader(false);
        })
        .catch((err) => {
          console.log("eerr", err);
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "Enter A Location Name",
        timer: 1800,
        customClass: {
          popup: "custom-popup-class", // Apply custom class to the popup
        },
        width: "300px", // Set the width of the popup
        heightAuto: false, // Disable auto height adjustment
        showConfirmButton: false, // Hide the confirm button for this alert
      });
    }
  };

  return (
    <>
      <div className="Wether-mail">
        <div className="OuterDiv">
          <div className="SearchBar">
            <input
              type="text"
              placeholder=" Enter Location"
              onChange={(e) => Searching(e)}
              value={serch}
            />
            <button type="button" onClick={GetWether}>
              Search
            </button>
          </div>
          {loader === true ? (
            <div className="wetherImage2">
              <Hourglass
                visible={loader}
                height="100"
                width="100"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#ffff", "gray"]}
              />
            </div>
          ) : (
            <>
              <div
                className={
                  data?.current?.condition?.icon
                    ? "wetherImage"
                    : "wetherImage1"
                }
              >
                <img
                  src={
                    data?.current?.condition?.icon
                      ? data?.current?.condition?.icon
                      : Search
                  }
                  alt="Not found"
                />
              </div>
              <div className="temp">
                {data?.current?.condition?.text
                  ? data?.current?.condition?.text
                  : ""}
              </div>
              <div className="wetherPlace">
                <div className="celsious">
                  {data?.current?.temp_c ? data?.current?.temp_c + "°C" : ""}
                </div>
                <br />
                <h3>
                  {data?.location?.name
                    ? data?.location?.name
                    : data?.error
                    ? data?.error?.message
                    : "Search a location to check wether status."}
                </h3>
              </div>
              <div className="footer">
                <div className="humudity">
                  {data?.current?.humidity ? (
                    <>
                      <img src={Humudity} alt="" />
                      &nbsp;
                      <b style={{ fontSize: "40px" }}>
                        {data?.current?.humidity}
                      </b>
                      % <br /> Humudity
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="wind">
                  {data?.current?.wind_kph ? (
                    <>
                      <img src={wind} alt="" />
                      &nbsp;
                      <b style={{ fontSize: "40px" }}>
                        {data?.current?.wind_kph}
                      </b>{" "}
                      km/h <br /> wind speed
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Wether;
