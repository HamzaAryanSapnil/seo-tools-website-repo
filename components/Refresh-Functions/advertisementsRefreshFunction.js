"use client";
import axios from "axios";

export const refreshAds = async () => {
  const res = await axios("http://localhost:3000/api/api/plans");
  const ad = res?.data || [];
  return ad;
};
