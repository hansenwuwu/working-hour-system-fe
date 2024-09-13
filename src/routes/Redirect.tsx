import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Redirect() {
  const location = useLocation();

  const redirectToNewPage = () => {
    const searchParams = location.search;
    const externalUrl = `https://main.dcconp3j9dw2n.amplifyapp.com/timecard/${searchParams}`;
    window.location.href = externalUrl;
    console.log("externalUrl: ", externalUrl);
  };

  useEffect(() => {
    redirectToNewPage();
  }, []);

  return <></>;
}

export default Redirect;
