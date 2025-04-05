"use client";
import axios from "axios";

export const refreshAds = async () => {
  const res = await axios.get("http://localhost:3000/api/admin/advertisements");
  const allAd = res?.data || [];
  return allAd;
};
