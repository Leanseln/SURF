import { useForm, FormProvider } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormLabel, FormMessage, FormField, FormItem } from "@/components/ui/form"
import { CiLocationOn, CiPhone, CiMail } from "react-icons/ci"
import { FaFacebook, FaInstagram } from "react-icons/fa"

function Contact() {
    const form = useForm({
        defaultValues: {
          name: "",
          email: "",
          phone: "",
          message: "",
        },
      })
    
      const onSubmit = (data) => {
        console.log(data)
      }

      return (
        <section id="contact" className="py-20 bg-sky-50">
          <div className="container mx-auto px-4">
            <div className="mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-800">Contact Us</h2>
              <p className="text-center text-gray-600 max-w-2xl mx-auto">
                Have questions about S.U.R.F or want to learn more? We&apos;re here to help. Reach out to us!
              </p>
            </div>
    
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
                <div className="bg-white p-8 rounded-lg shadow-md h-full">
                  <h3 className="text-2xl font-bold mb-6 text-blue-800">Send us a Message</h3>
                  <FormProvider {...form}>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                rules={{ required: "Name is required" }}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                rules={{ required: "Email is required" }}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Email" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="phone"
                                rules={{
                                    required: "Phone number is required",
                                    pattern: { value: /^[9]{1}[0-9]{9}$/, message: "Invalid phone number" },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center border-none rounded-md w-1/2">
                                        <span className="text-sm px-3 h-full flex items-center rounded-l-md">
                                            +63
                                        </span>
                                        <Input className="border mr-3" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <textarea
                                placeholder="Your message"
                                className="min-h-[120px] border p-2 w-full rounded-md"
                                {...form.register("message", { required: true })}
                                />
                            </FormControl>
                            <FormMessage />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Submit
                        </Button>
                      </form>
                    </Form>
                  </FormProvider>
                </div>
              </div>
              <div className="w-full lg:w-1/3 px-4">
                <div className="bg-blue-600 text-white p-8 rounded-lg shadow-md h-full flex flex-col ">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <CiLocationOn size={24} className="flex-shrink-0 mt-1" />
                        <p>Biglang Awa St., 12th Avenue East Caloocan City</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <CiPhone size={24} />
                        <p>+63 917 956 1531</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <CiMail size={24} />
                        <p>pioneer_bscs2021@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4">
                    <p className="font-semibold">Follow Us On</p>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.facebook.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-200 transition-colors"
                      >
                        <FaFacebook size={24} />
                      </a>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-200 transition-colors"
                      >
                        <FaInstagram size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
}

export default Contact;