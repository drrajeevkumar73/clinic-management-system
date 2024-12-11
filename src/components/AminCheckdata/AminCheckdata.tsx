"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "../ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SerchValue, serchSchema } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import LodingButton from "../LodingButton";
import { useToast } from "@/hooks/use-toast";

export default function AminCheckdata() {
  const form = useForm<SerchValue>({
    resolver: zodResolver(serchSchema),
    defaultValues: {
      username: "",
      monthname: "",
    },
  });

  const [client, setclient] = useState<[]>();
  const selctor = async () => {
    const { data } = await axios.get("/api/allclient");
    setclient(data);
  };
  useEffect(() => {
    selctor();
  }, []);

  const [data, setdaat] = useState<[]>();

  const [totalpresent, setprrsent] = useState({
    displayname: "",
    dipartment: "",
    totalwork: "",
  });

  const { toast } = useToast();
  const [ispending, setispending] = useState(false);
  const onSubmit = async (value: SerchValue) => {
    try {
      setispending(true);
      const data = await axios.post("/api/adminchekr", {
        username: value.username,
        monthname: value.monthname,
      });

      setdaat(data.data.userdata);
      setprrsent({
        displayname: data.data.displanem,
        dipartment: data.data.department,
        totalwork: data.data.totalwork,
      });
    } catch (error) {
      toast({
        description: "Faild to check user data",
        variant: "destructive",
      });
    } finally {
      setispending(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serch by name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select by name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Staff name</SelectLabel>
                        {client?.map((v: any, i) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check client work history</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Today Work</SelectLabel>
                      <SelectItem value="Today">Toady</SelectItem>
                      <SelectLabel>Select By Month</SelectLabel>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="August">August</SelectItem>
                      <SelectItem value="September">September</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                      <SelectItem value="November">November</SelectItem>
                      <SelectItem value="December">December</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <LodingButton loding={ispending} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>

      <Card>
        <CardHeader>
          <CardTitle>
            Full Name: &nbsp;&nbsp;
            <span className="text-primary">{totalpresent.displayname}</span>
          </CardTitle>
        </CardHeader>
        <CardHeader>
          <CardTitle>
            Department : &nbsp;&nbsp;
            <span className="text-primary">{totalpresent.dipartment}</span>
          </CardTitle>
        </CardHeader>
        <CardHeader>
          <CardTitle>
            Total present in this month : &nbsp;&nbsp;
            <span className="text-primary">{totalpresent.totalwork}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Table>
        <TableHeader className="border border-primary">
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Work</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>

        {/* Loading State */}
        {ispending ? (
          <tbody>
            <TableRow>
              <TableCell colSpan={3} >
                Loading...
              </TableCell>
            </TableRow>
          </tbody>
        ) : data && data.length > 0 ? (
          /* Data Rows */
          data.map((v: any, i) => (
            <TableBody className="border border-primary" key={i}>
              <TableRow>
                <TableCell className="font-medium">
                  {formatRelativeMonthDate(v.createdAt)}
                </TableCell>
                <TableCell className="whitespace-pre-line break-words">
                  {v.content || "No Content"}
                </TableCell>
                <TableCell className="text-right">
                  {formatRelativeTime(v.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        ) : (
          /* No Data State */
          <tbody>
            <TableRow>
              <TableCell colSpan={3} >
                No data available
              </TableCell>
            </TableRow>
          </tbody>
        )}
      </Table>
    </>
  );
}
