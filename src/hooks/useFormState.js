import { useMemo, useState } from "react";

function hasErrors(errors) {
  return Object.keys(errors || {}).length > 0;
}

export function useFormState({
  initialValues,
  validate,
  formatters = {},
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldNames = useMemo(() => Object.keys(initialValues), [initialValues]);

  function validateValues(nextValues) {
    if (!validate) return {};
    return validate(nextValues);
  }

  function setFieldValue(field, value) {
    setValues((currentValues) => {
      const formatter = formatters[field];
      const formattedValue = formatter
        ? formatter(value, currentValues)
        : value;

      const nextValues = {
        ...currentValues,
        [field]: formattedValue,
      };

      if (touched[field] || isSubmitted) {
        setErrors(validateValues(nextValues));
      }

      return nextValues;
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFieldValue(name, value);
  }

  function handleBlur(event) {
    const fieldName = event.target.name;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [fieldName]: true,
    }));

    setErrors(validateValues(values));
  }

  function getFieldError(fieldName) {
    if (!(touched[fieldName] || isSubmitted)) {
      return "";
    }

    return errors[fieldName] || "";
  }

  function resetForm(nextInitialValues = initialValues) {
    setValues(nextInitialValues);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setSubmitError("");
    setIsSubmitting(false);
  }

  async function handleSubmit(event, submitter = onSubmit) {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitted(true);
    setTouched((currentTouched) => {
      const nextTouched = { ...currentTouched };
      fieldNames.forEach((fieldName) => {
        nextTouched[fieldName] = true;
      });
      return nextTouched;
    });

    const validationErrors = validateValues(values);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    if (!submitter) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitter(values, {
        setValues,
        setErrors,
        setSubmitError,
        resetForm,
        fieldNames,
      });
    } catch (error) {
      setSubmitError(error?.message || "Não foi possível enviar o formulário.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    values,
    errors,
    touched,
    isSubmitted,
    submitError,
    isSubmitting,
    setValues,
    setErrors,
    setTouched,
    setIsSubmitted,
    setSubmitError,
    setFieldValue,
    handleChange,
    handleBlur,
    getFieldError,
    handleSubmit,
    resetForm,
    fieldNames,
  };
}
