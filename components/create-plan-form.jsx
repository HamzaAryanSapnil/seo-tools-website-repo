"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { planFormSchema } from "@/schemas/planFormSchema";
import { TOOLS_CONFIG } from "@/data/toolConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreatePlanForm = () => {
  const form = useForm({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      description: "",
      yearlyPrice: 0,
      monthlyPrice: 0,
      allow_api: false,
      no_ads: false,
      dailyUsage: 10,
      wordCount: 100,
      fileSize: 10,
      numberOfImage: 10,
      numberOfDomain: 10,
      tools: TOOLS_CONFIG.reduce(
        (acc, tool) => ({
          ...acc,
          [tool.slug]: tool.fields.reduce(
            (toolAcc, field) => ({
              ...toolAcc,
              [field.name]: field.defaultValue,
            }),
            {}
          ),
        }),
        {}
      ),
    },
    // defaultValues: {
    //   name: "",
    //   description: "",
    //   yearlyPrice: 0,
    //   monthlyPrice: 0,
    //   allow_api: false,
    //   no_ads: false,
    //   tools: TOOLS_CONFIG.reduce(
    //     (acc, tool) => ({
    //       ...acc,
    //       [tool.slug]: tool.fields.reduce(
    //         (toolAcc, field) => ({
    //           ...toolAcc,
    //           [field.name]: field.defaultValue,
    //         }),
    //         {}
    //       ),
    //     }),
    //     {}
    //   ),
    // },
  });

  function onSubmit(values) {
    console.log(values);
    try {
      planFormSchema.parse(values);
      console.log("Validation success!", values);
    } catch (error) {
      console.error("Validation errors:", error.errors);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* form first section design */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* create new form */}

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Create New Plan</h2>
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Plan Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Plan Description" {...field} />
                  </FormControl>
                  <FormDescription>Plan Description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
              {/* Yearly Price */}
              <FormField
                control={form.control}
                name="yearlyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yearly Price</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        className={"max-w-sm"}
                        placeholder="Enter Yearly Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Monthly Price */}
              <FormField
                control={form.control}
                name="monthlyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Price</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        className={"max-w-sm"}
                        placeholder="Enter Monthly Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="allow_api"
                render={({ field }) => (
                  <FormItem className="flex flex-col  rounded-lg border p-3 shadow-sm max-w-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Allow Api</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="no_ads"
                render={({ field }) => (
                  <FormItem className="flex flex-col  rounded-lg border p-3 shadow-sm max-w-sm">
                    <div className="space-y-0.5">
                      <FormLabel>No Ads</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className={"xl:hidden block my-4"} />
          {/* options form */}

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Options</h2>
            {/* options form fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* daily usage */}
              <FormField
                control={form.control}
                name="dailyUsage"
                render={({ field }) => (
                  <FormItem className={"max-w-sm"}>
                    <FormLabel>Daily Usage</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder="Enter Daily Usage"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Daily usage restrictions refer to the limitations placed
                      on the number of requests that a user can perform within a
                      24-hour period.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* word count */}
              <FormField
                control={form.control}
                name="wordCount"
                render={({ field }) => (
                  <FormItem className={"max-w-sm"}>
                    <FormLabel>Word Count</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder="Enter Word Count"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Word count limitation refers to the maximum number of
                      words allowed in a text, such as in a article rewrite or
                      form field.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* File Size */}
              <FormField
                control={form.control}
                name="fileSize"
                render={({ field }) => (
                  <FormItem className={"max-w-sm"}>
                    <FormLabel>File Size</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder="Enter File Size"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      File size limitation refers to the maximum size of a file
                      that can be uploaded in tools, the size is in megabytes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Number Of Image */}
              <FormField
                control={form.control}
                name="numberOfImage"
                render={({ field }) => (
                  <FormItem className={"max-w-sm"}>
                    <FormLabel>Number Of Image</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder="Enter Number Of Image"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Image limitation refers to the maximum number of images
                      that can be uploaded on supported tools.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Number Of Domain */}
              <FormField
                control={form.control}
                name="numberOfDomain"
                render={({ field }) => (
                  <FormItem className={"max-w-sm"}>
                    <FormLabel>Number Of Domain</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder="Enter Number Of Domain"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Domain limitation refers to the maximum number of domains
                      that can be processed in single request.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/*Tools Section */}
        <div className="space-y-6 mt-8  ">
          <h2 className="text-2xl font-semibold">Tools Configuration</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {TOOLS_CONFIG.map((tool) => (
              <Card key={tool.slug} className="space-y-4 p-4 border rounded-lg">
                <CardHeader>
                  <h3 className="text-lg font-medium">{tool.name}</h3>
                </CardHeader>
                <CardContent>
                  {tool.fields.map((field) => (
                    <FormField
                      key={`${tool.slug}.${field.name}`}
                      control={form.control}
                      name={`tools.${tool.slug}.${field.name}`}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>{field.label}</FormLabel>
                          <FormControl>
                            {field.type === "number" ? (
                              <Input
                                type="number"
                                {...formField}
                                onChange={(e) =>
                                  formField.onChange(Number(e.target.value))
                                }
                              />
                            ) : field.type === "text" ? (
                              <Input
                                type="text"
                                {...formField}
                                onChange={(e) =>
                                  formField.onChange(e.target.value)
                                }
                              />
                            ) : field.type === "select" ? (
                              <Select
                                defaultValue={formField.value}
                                onValueChange={formField.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={`Select ${field.label}`}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {field.options?.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              field.type === "boolean" && (
                                <Switch
                                  checked={formField.value}
                                  onCheckedChange={formField.onChange}
                                />
                              )
                            )}
                          </FormControl>
                          <FormDescription>{field.description}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreatePlanForm;
