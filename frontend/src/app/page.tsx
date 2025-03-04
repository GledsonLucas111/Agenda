"use client";

import { UserService } from "@/services/userService";
import { useEffect, useState } from "react";

export default function Home() {
  const [date, setDate] = useState("");
  const userService = new UserService()

  useEffect(()=>{
    userService.list().then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])
  
  function formatDate() {
    var date = new Date(),
      day = date.getDate().toString().padStart(2, "0"),
      month = (date.getMonth() + 1).toString().padStart(2, "0"),
      year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }

  function handleChange(e: any) {
    setDate(e.target.value);
  }
  return (
    <div className="flex justify-center">
      <input
        type="date"
        min={formatDate()}
        id="data_inicio"
        onChange={handleChange}
      ></input>
    </div>
  );
}
