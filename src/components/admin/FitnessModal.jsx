/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Fitness Categories
const categories = [
  "Cardio",
  "Strength",
  "Flexibility",
  "Endurance",
  "Balance",
  "Yoga",
  "Pilates",
  "HIIT",
  "Functional Training",
];

// Difficulty Levels
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

// Equipment Options
const equipmentOptions = [
  "None",
  "Dumbbells",
  "Barbell",
  "Resistance Bands",
  "Kettlebell",
  "Medicine Ball",
  "Pull-Up Bar",
  "Treadmill",
  "Yoga Mat",
  "Bicycle",
];

// Target Muscle Groups
const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Abdominals",
  "Quadriceps",
  "Hamstrings",
  "Glutes",
  "Calves",
];

Modal.setAppElement("#root");

// Validation Schema for Step 1 (Basic Info)
const step1ValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string()
    .max(500, "Max 500 characters")
    .required("Description is required"),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one category")
    .required("Category is required"),
  difficulty: Yup.string().required("Difficulty level is required"),
  duration: Yup.number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Duration is required"),
});

// Validation Schema for Step 2 (Media & Details)
const step2ValidationSchema = Yup.object({
  videoUrl: Yup.string()
    .url("Enter a valid video URL")
    .required("Video URL is required"),
  equipment: Yup.array().of(Yup.string()),
  targetMuscles: Yup.array().of(Yup.string()),
  caloriesBurned: Yup.number()
    .nullable()
    .typeError("Must be a number")
    .min(1, "Must be positive"),
});

const FitnessModal = ({ isOpen, onClose, onSubmit, fitness }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: fitness?.name ?? "",
    description: fitness?.description ?? "",
    categories: fitness?.categories ?? [],
    difficulty: fitness?.difficulty ?? "",
    duration: fitness?.duration ?? "",
    videoUrl: fitness?.videoUrl ?? "",
    equipment: fitness?.equipment ?? [],
    targetMuscles: fitness?.targetMuscles ?? [],
    caloriesBurned: fitness?.caloriesBurned ?? "",
  });

  useEffect(() => {
    if (fitness) {
      setFormData({
        name: fitness.name || "",
        description: fitness.description || "",
        categories: fitness.categories || [],
        difficulty: fitness.difficulty || "",
        duration: fitness.duration || "",
        videoUrl: fitness.videoUrl || "",
        equipment: fitness.equipment || [],
        targetMuscles: fitness.targetMuscles || [],
        caloriesBurned: fitness.caloriesBurned || "",
      });
    }
  }, [fitness]);

  const nextStep = (values) => {
    setFormData((prevData) => ({ ...prevData, ...values }));
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleFinalSubmit = (values) => {
    const finalData = {
      ...formData,
      ...values,
      duration: Number(values.duration),
      caloriesBurned: values.caloriesBurned
        ? Number(values.caloriesBurned)
        : null,
    };
    onSubmit(finalData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto mt-20 overflow-auto max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {fitness ? "Edit Fitness Activity" : "Add Fitness Activity"}
      </h2>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2].map((step) => (
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
                {step === 1 ? "Basic Info" : "Media & Details"}
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-1">
          <div className="absolute h-1 bg-gray-200 w-full"></div>
          <div
            className="absolute h-1 bg-indigo-600 transition-all"
            style={{ width: `${(currentStep - 1) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Steps */}
      {currentStep === 1 ? (
        <Formik
          initialValues={formData}
          validationSchema={step1ValidationSchema}
          onSubmit={nextStep}
        >
          <Form className="space-y-4">
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className="input-field"
            />
            <ErrorMessage name="name" component="div" className="error-text" />

            <Field
              as="textarea"
              name="description"
              placeholder="Description"
              className="input-field"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error-text"
            />

            <Field as="select" name="categories" className="input-field">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="categories"
              component="div"
              className="error-text"
            />

            <Field as="select" name="difficulty" className="input-field">
              <option value="">Select Difficulty</option>
              {difficultyLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="difficulty"
              component="div"
              className="error-text"
            />

            <Field
              name="duration"
              type="number"
              placeholder="Duration (in minutes)"
              className="input-field"
            />
            <ErrorMessage
              name="duration"
              component="div"
              className="error-text"
            />

            <button type="submit" className="btn-primary">
              Next
            </button>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={formData}
          validationSchema={step2ValidationSchema}
          onSubmit={handleFinalSubmit}
        >
          <Form className="space-y-4">
            <Field
              name="videoUrl"
              type="text"
              placeholder="Video URL"
              className="input-field"
            />
            <ErrorMessage
              name="videoUrl"
              component="div"
              className="error-text"
            />

            <Field as="select" name="equipment" className="input-field">
              <option value="">Select Equipment</option>
              {equipmentOptions.map((eq) => (
                <option key={eq} value={eq}>
                  {eq}
                </option>
              ))}
            </Field>

            <Field as="select" name="targetMuscles" className="input-field">
              <option value="">Select Target Muscles</option>
              {muscleGroups.map((muscle) => (
                <option key={muscle} value={muscle}>
                  {muscle}
                </option>
              ))}
            </Field>

            <Field
              name="caloriesBurned"
              type="number"
              placeholder="Calories Burned"
              className="input-field"
            />

            <button type="button" onClick={prevStep} className="btn-secondary">
              Back
            </button>
            <button type="submit" className="btn-primary">
              Submit
            </button>
          </Form>
        </Formik>
      )}
    </Modal>
  );
};

export default FitnessModal;
