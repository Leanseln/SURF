"use client"
import { toast, Toaster } from 'sonner';
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormLabel, FormMessage, FormField, FormItem } from "@/components/ui/form"
import { CiLocationOn, CiPhone, CiMail } from "react-icons/ci"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import emailjs from "@emailjs/browser"
import { addMessage } from "../services/MessageService" // Import the Firebase service

emailjs.init("buWFsEdX3RiydhvN0")

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = async (data) => {
    if (isSubmitting) return // Prevent multiple submissions
    setIsSubmitting(true)

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        toast.error("Please enter a valid email address.");
        setIsSubmitting(false)
        return
      }

      // Send email to admin using EmailJS
      const adminTemplateParams = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
      }

      const adminResponse = await emailjs.send(
        "service_sayw23a", // Your EmailJS Service ID
        "template_9s2gch2", // Your Admin Notification Template ID
        adminTemplateParams,
      )

      // Send auto-reply to user
      const userTemplateParams = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
      }

      const userResponse = await emailjs.send(
        "service_sayw23a", // Your EmailJS Service ID
        "template_h2tx2i4", // Your Auto-Reply Template ID
        userTemplateParams,
      )

      // Store message in Firebase
      await addMessage({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });

      // Check if both emails were sent successfully
      if (adminResponse.status === 200 && userResponse.status === 200) {
        toast.success("Message sent successfully! Check your email for a confirmation.");
        form.reset() // Reset the form after successful submission
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email or saving message:", error)
      toast.error("An error occurred while sending the message.");
    } finally {
      setIsSubmitting(false) // Re-enable the submit button
    }
  }

  // Rest of the Contact component remains the same
  return (
    <>
    <section id="contact" className="py-16 flex items-center bg-transparent">
      <div className="container mx-auto px-20">
        <div className="mb-6 space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-blue-800">
            Contact Us
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm">
            Have questions about S.U.R.F or want to learn more? We&apos;re here to help. Reach out to us!
          </p>
        </div>

        {/* Form and contact info - keeping the same structure */}
        <div className="flex flex-wrap -mx-2 sm:-mx-4">
          {/* Form section */}
          <div className="w-full lg:w-2/3 px-2 sm:px-4 mb-4 sm:mb-6 lg:mb-0">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md h-full">
              <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-blue-800">Send us a Message</h3>
              <FormProvider {...form}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    {/* Form fields remain the same */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        rules={{ required: "First Name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm text-black">First Name <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                              <Input {...field} className="text-xs sm:text-sm" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        rules={{ required: "Last Name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm text-black">Last Name <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                              <Input {...field} className="text-xs sm:text-sm" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm text-black">Email Address <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                              <Input type="email" {...field} className="text-xs sm:text-sm" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        rules={{
                          required: "Phone number is required",
                          pattern: { value: /^[9]{1}[0-9]{9}$/, message: "Invalid phone number" },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm text-black">Phone Number <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                              <div className="flex items-center border rounded-md">
                                <span className="text-xs sm:text-sm px-2 sm:px-3 py-2 h-full flex items-center text-black bg-gray-100">
                                  +63
                                </span>
                                <Input className="border-none text-xs sm:text-sm" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel className="text-xs sm:text-sm text-black">Message <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <textarea
                          name="message"
                          className="min-h-[30px] sm:min-h-[70px] border p-2 w-full rounded-md text-xs sm:text-sm"
                          {...form.register("message", { required: true })}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm py-2 h-auto sm:h-10"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              </FormProvider>
            </div>
          </div>
          
          {/* Contact information section - keep the same */}
          <div className="w-full lg:w-1/3 px-2 sm:px-4">
            <div className="bg-blue-600 text-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md h-full flex flex-col relative overflow-hidden">
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Contact Information</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <CiLocationOn size={20} className="flex-shrink-0 mt-1 sm:w-6 sm:h-6" />
                    <p className="text-xs sm:text-sm">Biglang Awa St., 12th Avenue East Caloocan City</p>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <CiPhone size={20} className="sm:w-6 sm:h-6" />
                    <p className="text-xs sm:text-sm">+63 917 956 1531</p>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <CiMail size={20} className="sm:w-6 sm:h-6" />
                    <p className="text-xs sm:text-sm break-all">pioneer.bscs.2024@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                <p className="font-semibold text-xs sm:text-sm">Follow Us On</p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200 transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebook size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200 transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={20} className="sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-16 -right-16 sm:-bottom-20 sm:-right-20 w-48 h-48 sm:w-72 sm:h-72 bg-orange-500 rounded-full opacity-50"></div>
              <div className="absolute -bottom-24 -right-24 sm:-bottom-32 sm:-right-32 w-40 h-40 sm:w-64 sm:h-64 bg-yellow-900 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Toaster className="fixed top-4 right-4 z-50" />
    </>
  )
}

export default Contact