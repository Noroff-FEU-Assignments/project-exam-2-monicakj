import React from "react";
// import SearchProfiles from "./SearchProfiles";
import ViewProfiles from "./ViewProfiles";
import SubNav from "../layout/SubNav";

export default function ProfilesPage() {
  document.title = "Social Media Company | Find Friends";
  return (
    <>
    <SubNav />
    <ViewProfiles />
    </>
  );
}