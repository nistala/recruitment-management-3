"use client";

import { useFieldArray, Control } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  control: Control<any>;
};

export default function WorkExperienceSection({ control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_experience",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Work Experience</CardTitle>
        <CardDescription>Add your past employment history</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 relative">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={control}
                name={`work_experience.${index}.company_name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="TCS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`work_experience.${index}.designation`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation *</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`work_experience.${index}.location`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="Hyderabad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`work_experience.${index}.start_date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date *</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`work_experience.${index}.end_date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date *</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`work_experience.${index}.responsibilities`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Responsibilities *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Worked on React, Node.js, APIs..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Remove
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              company_name: "",
              designation: "",
              location: "",
              start_date: "",
              end_date: "",
            responsibilities: "",
            })
          }
        >
          <PlusCircle className="h-4 w-4 mr-1" /> Add Work Experience
        </Button>
      </CardContent>
    </Card>
  );
}
