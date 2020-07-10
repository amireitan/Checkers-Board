import React, { useState, useCallback } from 'react';
import { Form, Button, Container } from "react-bootstrap";

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