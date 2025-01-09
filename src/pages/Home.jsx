import React from "react";
import Banner from "../components/Banner";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import { Helmet } from "react-helmet-async";
import AvailableAssignments from "../components/AvailableAssignments";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>StudyCircle | Home</title>
      </Helmet>
      <Banner></Banner>
      <Features></Features>
      <AvailableAssignments></AvailableAssignments>
      <FAQ></FAQ>
      <Newsletter></Newsletter>
    </div>
  );
}
