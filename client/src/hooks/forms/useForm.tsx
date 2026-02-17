import * as React from "react";
import { usePostRequest } from "../api/usePostRequest";
import { useGetRequest } from "../api/useGetRequest";

const useForm = (
  initialData: any,
  {
    submit = async (data: any) => {},
    validate = async (data: any) => ({}),
    hydrate = async () => ({}),
  }: {
    submit?: any;
    validate?: any;
    hydrate?: any;
  } = {},
) => {
  const [state, setState] = React.useState({
    values: initialData,
    fieldErrors: {},
    errorMessage: null,
    successMessage: null,
  });

  const {
    response: submitResponse,
    sendRequest: sendSubmitRequest,
    loading: isSubmitting,
    error: submitError,
  } = usePostRequest(submit);
  const { sendRequest: sendValidateRequest, error: fieldError } =
    usePostRequest(validate);
  const { sendRequest: sendHydrateRequest } = useGetRequest(hydrate);

  React.useEffect(() => {
    sendHydrateRequest().then((res: any) => {
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          ...res.data,
        },
      }));
    });
  }, []);

  React.useEffect(() => {
    if (submitResponse?.message) {
      setState((prevState) => ({
        ...prevState,
        successMessage: submitResponse?.message,
      }));
    }
  }, [submitResponse]);

  React.useEffect(() => {
    if (submitError?.status == 422) {
      setState((prevState) => ({
        ...prevState,
        fieldErrors: JSON.parse(submitError?.message),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        errorMessage: submitError?.message,
      }));
    }
  }, [submitError]);

  React.useEffect(() => {
    if (fieldError) {
      setState((prevState: any) => ({
        ...prevState,
        fieldErrors: {
          errors: {
            ...prevState.fieldErrors.errors,
            ...JSON.parse(fieldError?.message).errors,
          },
        },
      }));
    }
  }, [fieldError]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [name]: value },
    }));
  };

  const onChecked = (e: any) => {
    const { name, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: !prevState.values[name],
      },
    }));
  };

  const onSubmit = async () => {
    setState((prevState) => ({
      ...prevState,
      errorMessage: null,
      successMessage: null,
      fieldErrors: {},
    }));
    return sendSubmitRequest(state.values);
  };

  const onBlur = async (fieldName: string) => {
    const response = await sendValidateRequest({
      [fieldName]: state.values[fieldName],
    });
    if (response) {
      // Clear field error if validation passed
      setState((prevState: any) => {
        const updatedFieldErrors = { ...prevState.fieldErrors.errors };
        delete updatedFieldErrors[fieldName];
        return {
          ...prevState,
          fieldErrors: {
            errors: updatedFieldErrors,
          },
        };
      });
      return;
    }
  };

  const check = (fieldName: string) => {
    setState((prevState: any) => ({
      ...prevState,
      values: { ...prevState.values, [fieldName]: true },
    }));
  };

  const addFieldValues = (keys: string[]) => {
    setState((prevState: any) => ({
      ...prevState,
      values: keys.reduce(
        (acc, key) => {
          acc[key] = "";
          return acc;
        },
        { ...prevState.values },
      ),
    }));
  };

  const removeFieldKeys = (keys: string[]) => {
    setState((prevState: any) => {
      const updatedValues = { ...prevState.values };
      const updatedValidationErrors = { ...prevState.fieldErrors.errors };

      keys.forEach((key) => {
        delete updatedValues[key];
        delete updatedValidationErrors[key];
      });
      return {
        ...prevState,
        values: updatedValues,
        fieldErrors: {
          errors: updatedValidationErrors,
        },
      };
    });
  };

  return {
    ...state,
    isSubmitting,
    addFieldValues,
    removeFieldKeys,
    check,
    onChange,
    onChecked,
    onBlur,
    onSubmit,
  };
};

export default useForm;
