import React from 'react';
import { Form } from "react-bootstrap";

export const GeneralFormErrors = ({ generalErrors }) => {
    return (
        <ul>
            {
                generalErrors.map(errorMessage => (
                    <Form.Text className="text-warning">{errorMessage}</Form.Text>
                ))
            }
        </ul>
    );
};