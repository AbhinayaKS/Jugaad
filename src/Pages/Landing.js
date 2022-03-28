import Banner from "../Components/Banner";
import FeatureProduct from "../Components/FeatureProduct";
import ScrollToTopOnMount from "../Components/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ref, onChildAdded, onValue } from "firebase/database";
import { database } from "../firebase";
import { useEffect, useState } from "react";

const prodListRef = ref(database, "products/");

function Landing() {
  var [prodList, setProdList] = useState({});
  onValue(prodListRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      prodList[childSnapshot.key] = childSnapshot.val();
    });
  }, {
    onlyOnce: true
  });
  console.log(prodList);
  // useEffect(() => {
  //  
  // },[]);
  onChildAdded(prodListRef, (data) => {
    prodList[data.key] = data.val();
    console.log(prodList);
  }); 
  
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          We help accelerate your business
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Browse products
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {
            Object.keys(prodList).map((key, index) => (
              <FeatureProduct key = {index} prodName = {key} prodDesc = {prodList[key]["desc"]} prodPrice = {prodList[key]["price"]}/>
              // <p key={index}> this is my key {key} and this is my value {prodList[key]["desc"]}</p>
            ))
            // Array.from({ length: 6 }, (_, i) => {
            //   return <FeatureProduct key={i} />;
            // })
          }
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
