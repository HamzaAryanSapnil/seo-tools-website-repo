"use client";
import axios from "axios";

export const refreshContacts = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/getContacts");
    const contacts = res?.data?.contacts || [];
  return contacts;
};
