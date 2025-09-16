import * as React from "react";
import { Outlet } from "react-router-dom";
import PublicHeader from "../components/header/PublicHeader";
import Footer from "../components/Footer";
import Space from "../components/Space";

const PublicLayout = () => {
  console.log("public layout print!");
  return (
    <div className="background">
      <PublicHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
