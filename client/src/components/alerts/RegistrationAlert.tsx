
import * as React from "react";
import InformationAlert from "./InformationAlert";
import { useAuth } from "../../context/auth";

const RegistrationAlert = () => {
    const { user } = useAuth();
    return !user?.account_verified ? <InformationAlert message={ "Registration in in progress, once completed you will be notified through email! Some of the features will be unavailable untill approved by Carelick team" } /> : null
};

export default RegistrationAlert;

