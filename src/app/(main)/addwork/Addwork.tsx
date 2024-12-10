"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addtaskSchema, AddtaskValue } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";
export default function Addwork() {
  const { toast } = useToast();
  const form = useForm<AddtaskValue>({
    resolver: zodResolver(addtaskSchema),
    defaultValues: {
      username: "",
      task1: "",
      task2: "",
      task3: "",
      task4: "",
      task5: "",
      task6: "",
      task7: "",
      task8: "",
      task9: "",
      task10: "",
      task11: "",
      task12: "",
      task13: "",
      task14: "",
      task15: "",
      task16: "",
      task17: "",
      task18: "",
      task19: "",
      task20: "",
    },
  });

  const [count, setcount] = useState(5);
  const [client, setclient] = useState<[]>();
  const selctor = async () => {
    const { data } = await axios.get("/api/allclient");
    setclient(data);
  };
  useEffect(() => {
    selctor();
  }, []);

  const createInputePlushHandler = () => {
    if (count === 20) {
      setcount(20);
    } else {
      setcount(count + 5);
    }
  };
  const createInputeMinusHandler = () => {
    if (count === 5) {
      setcount(5);
    } else {
      setcount(count - 5);
    }
  };
  const submithandler = async (values: AddtaskValue) => {
    try {
      const { data } = await axios.post("/api/taskforsatff", {
        username: values.username,
        task1: values.task1,
        task2: values.task2,
        task3: values.task3,
        task4: values.task4,
        task5: values.task5,
        task6: values.task6,
        task7: values.task7,
        task8: values.task8,
        task9: values.task9,
        task10: values.task10,
        task11: values.task11,
        task12: values.task12,
        task13: values.task13,
        task14: values.task14,
        task15: values.task15,
        task16: values.task16,
        task17: values.task17,
        task18: values.task18,
        task19: values.task19,
        task20: values.task20,
      });
      console.log(data);
      toast({
        description: data.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        toast({
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <div className="space-y-5">
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
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
          {count === 5 ? (
            <>
              <FormField
                control={form.control}
                name="task1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 1" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 2</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 3</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 4</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task5"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 5</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : count === 10 ? (
            <>
              <FormField
                control={form.control}
                name="task6"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 6</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 6" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task7"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 7</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task8"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 8</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task9"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 9</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 9" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 10</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : count === 15 ? (
            <>
              <FormField
                control={form.control}
                name="task11"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 11</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task12"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 12</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task13"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 13</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 13" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task14"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 14</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 14" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task15"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 15</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : count === 20 ? (
            <>
              <FormField
                control={form.control}
                name="task16"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 16</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 16" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task17"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 17</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 17" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task18"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 18</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 18" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task19"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 19</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 19" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task20"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 20</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Task 20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            ""
          )}

          <Button type="submit">submit</Button>
        </form>
      </Form>

      <div className="flex gap-4">
        <Button type="button" className="" onClick={createInputePlushHandler}>
          <PlusIcon />
        </Button>
        <Button type="button" className="" onClick={createInputeMinusHandler}>
          <MinusIcon />
        </Button>
      </div>
    </div>
  );
}
