"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "@/assets/web_logo_2.png";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";

interface MenuBarProps {
  className?: string;
}

export default function Menubar({ className }: MenuBarProps) {
  const { value } = useAppSelector((state) => state.hmenuSlice);

  return (
    <div className={`${value ? "block " : 'hidden'} ${className}`}>
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
          className="flex items-center justify-start gap-3"
          title="Attendance"
          asChild
        >
          <Link href={"/attendance"}>Attendance </Link>
        </Button>
        
        <Button
          className="flex items-center justify-start gap-3"
          title="Admin"
          asChild
        >
          <Link href={"/admin"}>Admin</Link>
        </Button>
      </div>
    </div>
  );
}
