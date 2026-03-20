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

      return {
        ...currentValues,
        [field]: formattedValue,
      };
    });

    setErrors((currentErrors) => {
      if (!currentErrors[field]) return currentErrors;

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFieldValue(name, value);
  }

  function resetForm(nextInitialValues = initialValues) {
    setValues(nextInitialValues);
    setErrors({});
    setSubmitError("");
    setIsSubmitting(false);
  }

  async function handleSubmit(event, submitter = onSubmit) {
    event.preventDefault();
    setSubmitError("");

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
    submitError,
    isSubmitting,
    setValues,
    setErrors,
    setSubmitError,
    setFieldValue,
    handleChange,
    handleSubmit,
    resetForm,
    fieldNames,
  };
}
