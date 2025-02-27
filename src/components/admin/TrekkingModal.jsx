/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// Trekking Categories
const categories = ["Adventure", "Nature", "Fitness", "Exploration"];
// Difficulty Levels
const difficultyLevels = ["Easy", "Moderate", "Difficult", "Expert"];
// Indian States (Sample List)
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

// Step 1 Validation Schema
const step1ValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  category: Yup.string().required("Category is required"),
  trekDistance: Yup.number().positive().required("Distance is required"),
  trekDuration: Yup.string()
    .matches(
      /^[0-9]+ (hour|hours|day|days)$/,
      "Enter duration like '3 hours' or '1 day'"
    )
    .required("Duration is required"),
  difficulty: Yup.string().required("Difficulty level is required"),
  costPerPerson: Yup.number().min(0).required("Cost per person is required"),
});

// Step 2 Validation Schema
const step2ValidationSchema = Yup.object({
  place: Yup.string().required("Place is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  startDate: Yup.date()
    .min(new Date(), "Start date must be today or later")
    .required("Start date is required"),
  maxParticipants: Yup.number()
    .typeError("Max participants must be a number")
    .positive("Max participants must be a positive number")
    .required("Max participants is required"),
});

// Step 3 Validation Schema
const step3ValidationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  // image: Yup.mixed()
  //   .required("Image is required")
  //   .test("fileSize", "File size too large", (value) => {
  //     return value && value.size <= 5 * 1024 * 1024; // ✅ 5MB max size
  //   })
  //   .test("fileType", "Only image files are allowed", (value) => {
  //     return (
  //       value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
  //     );
  //   }),
});

const TrekkingModal = ({ isOpen, onClose, onSubmit, trek }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    name: trek?.name ?? "",
    category: trek?.category ?? "",
    trekDistance: trek?.trekDistance ?? "",
    trekDuration: trek?.trekDuration ?? "",
    difficulty: trek?.difficulty ?? "",
    costPerPerson: trek?.costPerPerson ?? "",
    place: trek?.place ?? "",
    state: trek?.state ?? "",
    district: trek?.district ?? "",
    startDate: trek?.startDate
      ? new Date(trek.startDate).toISOString().split("T")[0]
      : "",
    maxParticipants: trek?.maxParticipants ?? "",
    description: trek?.description ?? "",
    // images: [],
  });

  useEffect(() => {
    if (trek) {
      setFormData({
        name: trek.name || "",
        category: trek.category || "",
        trekDistance: trek.trekDistance || "",
        trekDuration: trek.trekDuration || "",
        difficulty: trek.difficulty || "",
        costPerPerson: trek.costPerPerson || "",
        place: trek.place || "",
        state: trek.state || "",
        district: trek.district || "",
        startDate: trek.startDate
          ? new Date(trek.startDate).toISOString().split("T")[0]
          : "",
        maxParticipants: trek.maxParticipants || "",
        description: trek.description || "",
        image: trek.images || [],
      });
    }
  }, [trek]);

  useEffect(() => {
    setCurrentStep(1); // Reset to step 1 when modal opens
  }, [isOpen]);

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setFieldValue("image", files[0]); // ✅ Ensure Formik sees the image
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const nextStep = (values, { setSubmitting }) => {
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
    setSubmitting(false);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinalSubmit = (values) => {
    console.log("reached here");
    // Combine all form data from previous steps with current values
    const finalData = {
      ...formData, // Data from previous steps
      ...values, // Data from final step
      images: formData.images, // Ensure images are included
    };
    // Log the final data being submitted
    console.log("Submitting final data:", finalData);

    // Call the onSubmit prop with processed data
    onSubmit(finalData);
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
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              <div className="text-xs mt-1">
                {step === 1
                  ? "Basic Info"
                  : step === 2
                  ? "Location"
                  : "Details"}
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-1">
          <div className="absolute h-1 bg-gray-200 w-full"></div>
          <div
            className="absolute h-1 bg-blue-600 transition-all"
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
              trekDistance: formData.trekDistance,
              trekDuration: formData.trekDuration,
              difficulty: formData.difficulty,
              costPerPerson: formData.costPerPerson,
            }}
            validationSchema={step1ValidationSchema}
            onSubmit={nextStep}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <Field
                      as="select"
                      name="category"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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

                  <div>
                    <label
                      htmlFor="trekDistance"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Trek Distance (km)
                    </label>
                    <Field
                      name="trekDistance"
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage
                      name="trekDistance"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="trekDuration"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Trek Duration
                    </label>
                    <Field
                      name="trekDuration"
                      type="text"
                      placeholder="e.g. 3 hours or 2 days"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage
                      name="trekDuration"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="difficulty"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Difficulty
                    </label>
                    <Field
                      as="select"
                      name="difficulty"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="">Select difficulty</option>
                      {difficultyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="difficulty"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="costPerPerson"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cost per Person (₹)
                    </label>
                    <Field
                      name="costPerPerson"
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage
                      name="costPerPerson"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        );

      case 2:
        return (
          <Formik
            initialValues={{
              place: formData.place || "",
              state: formData.state || "",
              district: formData.district || "",
              startDate: formData.startDate || "",
              maxParticipants: formData.maxParticipants || "",
            }}
            validationSchema={step2ValidationSchema}
            onSubmit={nextStep}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="place"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Place
                    </label>
                    <Field
                      name="place"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage
                      name="place"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <Field
                      as="select"
                      name="state"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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

                  <div>
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium text-gray-700"
                    >
                      District
                    </label>
                    <Field
                      name="district"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage
                      name="district"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <Field
                      name="startDate"
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="maxParticipants"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Max Participants
                    </label>
                    <Field
                      name="maxParticipants"
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage
                      name="maxParticipants"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              description: formData.description || "",
              // image: null,
            }}
            validationSchema={step3ValidationSchema}
            onSubmit={handleFinalSubmit}
          >
            {({ isSubmitting, setFieldValue, errors }) => (
              <>
                <pre className="text-red-500 text-sm">
                  {JSON.stringify(errors, null, 2)}
                </pre>
                <Form className="space-y-4">
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="md:w-1/2">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Image
                      </label>
                      <div className="mt-1 flex flex-col items-center space-y-2">
                        <input
                          type="file"
                          onChange={(event) =>
                            handleImageChange(event, setFieldValue)
                          }
                          accept="image/*"
                          className="hidden"
                          id="image-upload"
                        />
                        <Field name="image" type="hidden" />{" "}
                        {/* ✅ Ensures Formik tracks it */}
                        <ErrorMessage
                          name="image"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Choose file
                        </label>
                        {/* ✅ Bigger Fixed Image Box */}
                        {previewImages && (
                          <div className="w-52 h-52 border border-gray-300 rounded-lg overflow-hidden">
                            <img
                              src={previewImages}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <Field
                        name="description"
                        as="textarea"
                        rows="8"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {trek ? "Update Trek" : "Add Trek"}
                    </button>
                  </div>
                </Form>
              </>
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
      className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mx-auto mt-20 overflow-auto"
      style={{
        content: {
          height: "calc(100% - 100px)",
          maxHeight: "700px",
        },
      }}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {trek ? "Edit Trek" : "Add Trek"}
      </h2>
      {renderStepIndicator()}
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100% - 120px)" }}
      >
        {renderStep()}
      </div>
    </Modal>
  );
};

export default TrekkingModal;
