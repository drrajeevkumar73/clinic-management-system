"use client";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Seetask() {
  const [client, setclient] = useState<[]>();

  const selctor = async () => {
    const { data } = await axios.get("/api/seetask");
    setclient(data);
  };
  useEffect(() => {
    selctor();
  }, []);

  return (
    <Table>
      <TableHeader className="border border-primary">
        <TableRow className="border border-primary bg-primary">
          <TableHead className="w-[100px]">Date</TableHead>

          <TableHead>Work</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>

      {client?.map((v: any, i) => (
        <TableBody className="border border-primary" key={i}>
          <TableRow>
            <TableCell className="font-medium">
              {formatRelativeMonthDate(v.createdAt)}
            </TableCell>

            <TableCell className="whitespace-pre-line break-words space-y-3">
              <p>
                <span className="text-muted-foreground">1) &nbsp;</span>{" "}
                {v.task1}
              </p>
              <p>
                <span className="text-muted-foreground">2) &nbsp;</span>{" "}
                {v.task2}
              </p>
              <p>
                <span className="text-muted-foreground">3) &nbsp;</span>{" "}
                {v.task3}{" "}
              </p>
              <p>
                <span className="text-muted-foreground">4) &nbsp;</span>{" "}
                {v.task4}{" "}
              </p>
              <p>
                <span className="text-muted-foreground">5) &nbsp;</span>{" "}
                {v.task5}{" "}
              </p>
              <p>
                <span className="text-muted-foreground">6) &nbsp;</span>{" "}
                {v.task6}{" "}
              </p>
              <p>
                <span className="text-muted-foreground">7) &nbsp;</span>{" "}
                {v.task7}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">8) &nbsp;</span>{" "}
                {v.task8}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">9) &nbsp;</span>{" "}
                {v.task9}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">10) &nbsp;</span>{" "}
                {v.task10}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">11) &nbsp;</span>{" "}
                {v.task11}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">12) &nbsp;</span>{" "}
                {v.task12}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">13) &nbsp;</span>{" "}
                {v.task13}{" "}
              </p>
              <p>
                <span className="text-muted-foreground">14) &nbsp;</span>{" "}
                {v.task14}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">15) &nbsp;</span>{" "}
                {v.task15}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">16) &nbsp;</span>{" "}
                {v.task16}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">17) &nbsp;</span>{" "}
                {v.task17}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">18) &nbsp;</span>{" "}
                {v.task18}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">19) &nbsp;</span>{" "}
                {v.task19}{" "}
              </p>{" "}
              <p>
                <span className="text-muted-foreground">20) &nbsp;</span>{" "}
                {v.task20}{" "}
              </p>
            </TableCell>
            <TableCell className="text-right">
              {formatRelativeTime(v.createdAt)}
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
}
