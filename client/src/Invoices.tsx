"use client"

import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "./store";
import { logout } from "./state/authSlice";
import { useNavigate } from "react-router-dom";
import DataTable from "./components/DataTable";
import { Button } from "./components/ui/button";




export default function Invoices() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user)
  console.log('user', user)

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-start p-6 w-full flex-col ">
      <div className="flex flex-col justify-between w-full gap-24">
        <div className="flex w-full justify-between px-4 ">
          <h1 className="text-2xl">Welcome, {user?.name}</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <DataTable></DataTable>
      </div>
    </div >
  );
}

