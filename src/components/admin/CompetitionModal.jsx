/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Category options from the schema
const categories = [
  "Sports",
  "Technology",
  "Cultural",
  "Art",
  "Music",
  "Dance",
  "Fitness",
  "Education",
];

// Type options from the schema
const typeOptions = [
  "Inter Corporates",
  "Inter College",
  "Intra College",
  "State Level",
  "National Level",
];

// Status options from the schema
const statusOptions = ["active", "inactive"];

// Indian states (sample list - can be expanded)
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
];

Modal.setAppElement("#root");

// Validation schema for step 1
const step1ValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  category: Yup.string().required("Category is required"),
  time: Yup.string().required("Time is required"),
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Date must be today or a future date"),
  place: Yup.string().required("Place is required"),
  images: Yup.array()
    .of(Yup.mixed())
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true;
      return value.every((file) => file && file.size <= 5000000);
    }),
});

// Validation schema for step 2
const step2ValidationSchema = Yup.object({
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  town: Yup.string().required("Town is required"),
  duration: Yup.number()
    .typeError("Duration must be a number")
    .positive("Duration must be a positive number")
    .required("Duration is required"),
  type: Yup.string().required("Type is required"),
});

// Validation schema for step 3
const step3ValidationSchema = Yup.object({
  cost: Yup.number()
    .typeError("Cost must be a number")
    .min(0, "Cost must be non-negative")
    .required("Cost is required"),
  maxRegistrations: Yup.number()
    .typeError("Max registrations must be a number")
    .positive("Max registrations must be a positive number")
    .required("Max registrations is required"),
  description: Yup.string()
    .max(500, "Description must not exceed 500 characters")
    .required("Description is required"),
  status: Yup.string()
    .oneOf(["active", "inactive"], "Invalid status")
    .required("Status is required"),
});

const CompetitionModal = ({ isOpen, onClose, onSubmit, competition }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    name: competition?.name ?? "",
    category: competition?.category ?? "",
    time: competition?.time ?? "",
    date: competition?.date
      ? new Date(competition.date).toISOString().split("T")[0]
      : "",
    place: competition?.place ?? "",
    state: competition?.state ?? "",
    district: competition?.district ?? "",
    town: competition?.town ?? "",
    duration: competition?.duration ?? "", // Changed from 0 to empty string
    type: competition?.type ?? "",
    cost: competition?.cost ?? "", // Changed from 0 to empty string
    maxRegistrations: competition?.maxRegistrations ?? "", // Changed from 0 to empty string
    // description: competition?.description ?? "",
    status: competition?.status ?? "inactive",
    images: [],
  });
  useEffect(() => {
    setCurrentStep(1); // Reset to step 1 when modal opens
  }, [isOpen]);

  useEffect(() => {
    if (competition) {
      setFormData({
        name: competition.name || "",
        category: Array.isArray(competition.category)
          ? competition.category[0] // ✅ Extract first value if it's an array
          : competition.category || "",
        time: competition.time || "",
        date: competition.date
          ? new Date(competition.date).toISOString().split("T")[0]
          : "",
        place: competition.place || "",
        state: competition.state || "",
        district: competition.district || "",
        town: competition.town || "",
        duration: competition.duration || "",
        type: Array.isArray(competition.type)
          ? competition.type[0]
          : competition.type || "", // ✅ Fix for type as well
        cost: competition.cost || "",
        maxRegistrations: competition.maxRegistrations || "",
        description: competition.description || "",
        status: competition.status || "inactive",
        images: competition.images || [],
      });
    }
  }, [competition]);

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    setFieldValue("images", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };
  const nextStep = (values) => {
    console.log("NextStep called with values:", values);
    console.log("Current step before increment:", currentStep);
    setFormData((prevData) => {
      console.log("Previous form data:", prevData);
      return { ...prevData, ...values };
    });
    setCurrentStep((prevStep) => {
      console.log("Incrementing step from:", prevStep);
      return prevStep + 1;
    });
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinalSubmit = (values) => {
    // Combine all form data from previous steps with current values
    const finalData = {
      ...formData, // Data from previous steps
      ...values, // Data from final step
      images: formData.images, // Ensure images are included
    };

    // Convert numeric fields to numbers
    const processedData = {
      ...finalData,
      cost: Number(finalData.cost),
      maxRegistrations: Number(finalData.maxRegistrations),
      duration: Number(finalData.duration),
    };

    // Log the final data being submitted
    console.log("Submitting final data:", processedData);

    // Call the onSubmit prop with processed data
    onSubmit(processedData);
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              <div className="text-xs mt-1">
                {step === 1
                  ? "Basic Info"
                  : step === 2
                  ? "Location & Type"
                  : "Costs & Details"}
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-1">
          <div className="absolute h-1 bg-gray-200 w-full"></div>
          <div
            className="absolute h-1 bg-indigo-600 transition-all"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Formik
            initialValues={{
              name: formData.name,
              category: formData.category,
              time: formData.time,
              date: formData.date,
              place: formData.place,
              images: formData.images,
            }}
            validationSchema={step1ValidationSchema}
            onSubmit={(values) => {
              console.log(values, "Form data after 1st page");
              nextStep(values);
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <Field
                      as="select"
                      name="category"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Time Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <Field
                      name="time"
                      type="time"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Date Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <Field
                      name="date"
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Place Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Place *
                    </label>
                    <Field
                      name="place"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="place"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Images
                    </label>
                    <input
                      type="file"
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
                      multiple
                      accept="image/*"
                      className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                    />
                    <ErrorMessage
                      name="images"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                    {previewImages.length > 0 && (
                      <div className="mt-2 flex space-x-2 overflow-x-auto">
                        {previewImages.map((preview, index) => (
                          <img
                            key={index}
                            src={preview || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="h-20 w-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Next
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        );

      // In your CompetitionModal component, replace the case 2 return statement with this:
      case 2:
        return (
          <Formik
            initialValues={{
              state: formData.state || "",
              district: formData.district || "",
              town: formData.town || "",
              duration: formData.duration || "",
              type: formData.type || "",
            }}
            validationSchema={step2ValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              try {
                console.log("Form Step 2 submitted with values:", values);
                // Convert duration to number before passing it on
                const processedValues = {
                  ...values,
                  duration: values.duration ? Number(values.duration) : "",
                };
                nextStep(processedValues);
              } catch (error) {
                console.error("Error in step 2 submission:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, values, errors, touched }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* State Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <Field
                      as="select"
                      name="state"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select a state</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* District Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      District *
                    </label>
                    <Field
                      name="district"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="district"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Town Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Town *
                    </label>
                    <Field
                      name="town"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="town"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Duration Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (hours) *
                    </label>
                    <Field
                      name="duration"
                      type="number"
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Type Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <Field
                      as="select"
                      name="type"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select a type</option>
                      {typeOptions.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    // disabled={isSubmitting || Object.keys(errors).length > 0}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        );

      case 3:
        return (
          <Formik
            initialValues={{
              cost: formData.cost || "",
              maxRegistrations: formData.maxRegistrations || "",
              description: formData.description || "",
              status: formData.status || "inactive",
            }}
            validationSchema={step3ValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              try {
                handleFinalSubmit(values);
              } catch (error) {
                console.error("Error in final submission:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, values, errors, touched }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Cost Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost (₹) *
                    </label>
                    <Field
                      name="cost"
                      type="number"
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="cost"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Max Registrations Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Registrations *
                    </label>
                    <Field
                      name="maxRegistrations"
                      type="number"
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="maxRegistrations"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                Description Textarea
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description * (max 500 characters)
                  </label>
                  <Field
                    name="description"
                    as="textarea"
                    rows="4"
                    maxLength="500"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {/* <div className="text-sm text-gray-500 mt-1">
                    {values.description}
                  </div> */}
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {competition ? "Update" : "Add"} Competition
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto mt-20 overflow-auto max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {competition ? "Edit Competition" : "Add Competition"}
      </h2>
      {renderStepIndicator()}

      {renderStep()}
    </Modal>
  );
};

export default CompetitionModal;
