import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParkingLots } from "./Redux/Action/parkingLots";
import ReactPaginate from "react-paginate";
import "./styles.css";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import bg from "./images/background.png";

function App() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const yelpData = useSelector((state) => state.parkingLots);
  console.log(yelpData);
  // const API_KEY = "mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx"
  //   const ENDPOINT = "https://api.yelp.com/v3/businesses/search?term=parking&location=SanFrancisco&limit=50&sort_by=rating"
  // console.log(location);
  useEffect(() => {
    // const fetchingYelpFx = async () => {
    //   try {
    //     const raw_data = await fetch(`/cors-proxy/${ENDPOINT}`, {
    //       headers: {
    //         Authorization: `Bearer ${API_KEY}`,
    //         Origin: 'localhost',
    //         withCredentials: true
    //       }
    //     });
    //     //const raw_data = await fetch('/api/yelp');
    //     //console.log(raw_data);
    //     const json_data = await raw_data.json();
    //     console.log(json_data);
    //   } catch(err) {
    //     console.error(err);
    //   }
    // };
    // fetchingYelpFx();
  }, []);
  const send = () => {
    dispatch(getParkingLots(location));
  };
  return (
    <div className="App bg-gray-200">
      {/* <h1>Henry Countries</h1> */}
      <div className="grid grid-cols-2 py-4">
        <div>
          <img src={logo} width="200px" className="pl-4"></img>
        </div>
        <div className="flex justify-center">
          <input
            style={{ backgroundColor: `rgb(250, 131, 75)` }}
            className="rounded-l-full w-1/3 pl-3 text-black placeholder-black"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search Location"
          ></input>
          <button
            className="bg-red-300 rounded-r-full pr-4"
            style={{ backgroundColor: `rgb(250, 131, 75)` }}
            onClick={() => send()}
          >
            🔍
          </button>
        </div>
      </div>
      {/* {yelpData && yelpData?.businesses
        ? yelpData.businesses.map((e) => {
            let a = e.review_count * e.rating;
            let b = e.review_count + 1;
            let c = a / b; */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 mb-4">
        {/* <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-4 py-3 grid-cols-1 justify-center justify-items-center content-center items-center"> */}
        {yelpData?.businesses ? (
          yelpData.businesses.map((e, key) => {
            let a = e.review_count * e.rating;
            let b = e.review_count + 1;
            let c = a / b;
            c = c.toString();
            c = c.slice(0, 4);
            // if (!e.custom) {
            return (
              // <Link
              //   key={key}
              //   style={{ textDecoration: "none", outline: "none" }}
              //   to={`/product/${e._id}`}
              // >
              <div key={key} className="card bg-white w-auto mb-5 px-4 py-4">
                <div className="flex justify-center w-96">
                  {e.image_url ? (
                    <img
                      src={e.image_url}
                      alt="Parking Lot Image"
                      style={{ height: "300px", width: "320px" }}
                    />
                  ) : (
                    <img
                      src="https://i.stack.imgur.com/y9DpT.jpg"
                      alt="No Image"
                      style={{ height: "300px", width: "320px" }}
                    />
                  )}
                </div>
                <div className="bg-gray-200" style={{ height: "1px" }}></div>
                <div className="p-4">
                  <p className="text-black text-xl">{e.name}</p>
                  {/* {e.stock === 0 && (
                      <h4 className="text-red-500">No Stock</h4>
                    )} */}
                  <p className="text-gray-700 text-l">
                    {e.location.display_address.map((e) => e + " ")}
                  </p>
                  <p className="text-gray-700 text-l">
                    Rating:{" "}
                    <StarRatings
                      rating={e.rating}
                      starRatedColor="gold"
                      // changeRating={this.changeRating}
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="0px"
                    />{" "}
                    ({e.review_count} reviews)
                  </p>
                  <p className="text-black text-xl">Score: {c}</p>
                  <p className="text-black  bg-green-400 text-l overflow-ellipsis overflow-hidden">
                    <button onClick={() => window.open(e.url)}>
                      Learn More on Yelp
                    </button>
                  </p>
                </div>
              </div>

              //</Link>
            );
          })
        ) : (
          <div className="">
            <h1 className="mt-4 font-bold text-3xl">
              Please Enter a Location Above To Find The Worst Rated Parking Lots
            </h1>
            <div className="flex justify-center items-center">
              <img className="h-full mt-24" src={bg}></img>
            </div>
          </div>
        )}
      </div>
      {yelpData && yelpData.businesses ? (
        <div className="pagination flex justify-center pb-14 bg-gray-200 w-full">
          {yelpData && (
            <ReactPaginate
              previousLabel={"← Previous"}
              previousClassName={"px-4 font-bold"}
              nextLabel={"Next →"}
              nextClassName={"px-4 font-bold"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              // pageCount={barbersLoaded.length / barbersToShow}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              // onPageChange={handlePaginate}
              containerClassName={
                "flex container px-4 bg-red-300 py-2 justify-around list-none cursor-pointer absolute "
              }
              activeClassName={
                "active bg-red-400 px-4 rounded text-white font-semibold"
              }
            />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
    // </div>
  );
}

export default App;
