"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "@/assets/web_logo_2.png";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface MenuBarProps {
  className?: string;
}

export default function Menubar({ className }: MenuBarProps) {
  const { value } = useAppSelector((state) => state.hmenuSlice);
  const [dropdown, setdropdown] = useState(false);
  const [dropdowna, setdropdowna] = useState(false);
  const dropHandler = () => {
    setdropdown(!dropdown);
  };

  const dropHandlerad = () => {
    setdropdowna(!dropdowna);
   
  };
  return (
    <div className={`${value ? "block" : "hidden"} ${className}`}>
      <Image src={logo} alt="" />
      <div className="space-y-5 p-6">
        <Button
          className="flex items-center justify-start gap-3"
          title="Dashboard"
          asChild
        >
          <Link href={"/"}>Dashboard</Link>
        </Button>
        <Button
          className="flex cursor-pointer items-center justify-start gap-3"
          title="Attendance"
          asChild
          onClick={dropHandlerad}
        >
          <p>Attendance </p>
        </Button>
        <div
          className={`space-y-5 rounded-md border p-3 shadow-lg ${dropdowna ? "block" : "hidden"}`}
        >
          <Button
            className="flex items-center justify-start gap-3"
            title="Admin"
            asChild
          >
            <Link href={"/attendance"}>Add Work for Attendance</Link>
          </Button>
          <Button
            className="flex items-center justify-start gap-3"
            title="Admin"
            asChild
          >
            <Link href={"/setask"}>See Task</Link>
          </Button>
        </div>

        <Button
          className="flex cursor-pointer items-center justify-start gap-3"
          title="Admin"
          asChild
          onClick={dropHandler}
        >
          <p>Admin</p>
        </Button>
        <div
          className={`space-y-5 rounded-md border p-3 shadow-lg ${dropdown ? "block" : "hidden"}`}
        >
          <Button
            className="flex items-center justify-start gap-3"
            title="Admin"
            asChild
          >
            <Link href={"/admin"}>Work History</Link>
          </Button>
          <Button
            className="flex items-center justify-start gap-3"
            title="Admin"
            asChild
          >
            <Link href={"/addwork"}>Add task</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
