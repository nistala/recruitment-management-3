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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  control: Control<any>;
};

export default function EducationSection({ control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Education Information</CardTitle>
        <CardDescription>Add your educational qualifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 relative">
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={control}
                name={`education.${index}.education_type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10th">10th</SelectItem>
                        <SelectItem value="12th">12th</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Graduation">Graduation</SelectItem>
                        <SelectItem value="Post Graduation">
                          Post Graduation
                        </SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.course_name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="B.Tech" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.specialization`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization *</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.university_or_board`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University/Board *</FormLabel>
                    <FormControl>
                      <Input placeholder="Osmania University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.school_or_college`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School/College *</FormLabel>
                    <FormControl>
                      <Input placeholder="CBIT Hyderabad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.education_location`}
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
                name={`education.${index}.start_year`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year *</FormLabel>
                    <FormControl>
                      <Input placeholder="2015" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.end_year`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Year *</FormLabel>
                    <FormControl>
                      <Input placeholder="2019" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.cgpa`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CGPA *</FormLabel>
                    <FormControl>
                      <Input placeholder="8.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.percentage`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Percentage *</FormLabel>
                    <FormControl>
                      <Input placeholder="85%" {...field} />
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
              education_type: "",
              course_name: "",
              specialization: "",
              university_or_board: "",
              school_or_college: "",
              education_location: "",
              start_year: "",
              end_year: "",
              cgpa: "",
              percentage: "",
            })
          }
        >
          <PlusCircle className="h-4 w-4 mr-1" /> Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
