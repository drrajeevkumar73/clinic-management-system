"use client";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "@/components/ui/table";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { addtaskUsernameSchema, AddtaskUsernameValue } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
interface UserData {
  createdAt: string;
  task1: string;
  task2: string;
  task3: string;
  task4: string;
  task5: string;
  task6: string;
  task7: string;
  task8: string;
  task9: string;
  task10: string;
  task11: string;
  task12: string;
  task13: string;
  task14: string;
  task15: string;
  task16: string;
  task17: string;
  task18: string;
  task19: string;
  task20: string;
}

interface ClientResponse {
  userdata: UserData[];
}

export default function Seetask() {
  const form = useForm<AddtaskUsernameValue>({
    resolver: zodResolver(addtaskUsernameSchema),
    defaultValues: {
      monthname: "",
    },
  });
  const [loding, setloding] = useState(false);
  const [client, setclient] = useState<ClientResponse | null>(null);

  console.log(client);

  const onSubmit = async (monthname: AddtaskUsernameValue) => {
    try {
      setloding(true);
      const { data } = await axios.post<ClientResponse>("/api/seetask", {
        monthname,
      });
      setclient(data);
    } catch (error) {
      console.error(error);
    } finally {
      setloding(false);
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
            name="monthname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work history</FormLabel>
                <Select
                  onValueChange={(monthname: any) => onSubmit(monthname)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select by month or today" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Today Work</SelectLabel>
                      <SelectItem value="Today">Toady</SelectItem>
                      <SelectLabel>Select Month Work</SelectLabel>
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
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>

      <Table>
        <TableHeader className="border border-primary">
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px]">Date</TableHead>

            <TableHead>Work</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>

        {loding ? (
          <TableBody>
            <TableRow>
              <TableCell className="w-full">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : client?.userdata?.length ? (
          client.userdata.map((v: any, i) => (
            <TableBody className="border border-primary" key={i}>
              <TableRow>
                <TableCell className="font-medium">
                  {formatRelativeMonthDate(v.createdAt)}
                </TableCell>
                <TableCell className="space-y-3 whitespace-pre-line break-words">
                  {/* Map tasks dynamically */}
                  {Object.keys(v).map((key, index) =>
                    key.startsWith("task") ? (
                      <p key={index}>
                        <span className="text-muted-foreground">
                          {index + 1}) &nbsp;
                        </span>{" "}
                        {v[key]}
                      </p>
                    ) : null,
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {formatRelativeTime(v.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        ) : (
          <TableBody>
            <TableRow>
              <TableCell className="w-full">No any task</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </>
  );
}
