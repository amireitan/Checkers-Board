import React, { useState, useCallback } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import { GeneralFormErrors } from "./Components/GeneralErrors";
import styled from "@emotion/styled";

const StyledForm = styled.div`
    padding: 21px;
    box-shadow: 1px 1px 15px -1px rgba(0,0,0,0.75);
    border-radius: 20px;
`;

const StyledFormEnhanced = StyledForm.withComponent(Form);


const getFieldsValidations = () => {
    const isInRange = val => val > 0 && val <= 8;
    const isValid = val => val && !Number.isNaN(val) && isInRange(val);

    return {
        column: { errorTerm: val => !isValid(val), errorMessage: "Please enter a valid column number between 1-8" },
        row: { errorTerm: val => !isValid(val), errorMessage: "Please enter a valid row number between 1-8"}
    };
}

const INITIAL_STATE = {
    formState: {
        column: { value: '', errorMessage: ''},
        row: { value: '', errorMessage: ''},
    },
    generalErrors: []
}

const VALIDATIONS = getFieldsValidations();


/***************************
 *   SoldierPositionForm     
 ***************************/

const SoldierPositionForm = ({ 
    onSoldiersPositionChange, 
    checkForGeneralValidationErrors
}) => {
    const [{ formState, generalErrors }, setFormState] = useState(INITIAL_STATE);

    const onPropChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            formState: {
                ...formState,
                [name]: { ...formState[name], value: Number(value) }
            },
            generalErrors
        });
    };

    const checkFieldsValidation = useCallback(() => {
        return Object.keys(formState).reduce((prev, propName) => {
            const propObj = formState[propName];
            const { errorTerm, errorMessage } = VALIDATIONS[propName];
            
            prev[propName] = {
                ...propObj,
                errorMessage: errorTerm(propObj.value) ? errorMessage : ''  
            };
            
            return prev;
        }, {});

    },[formState]);

    const isFormValid = (state) => Object.keys(state).every(propName => !state[propName].errorMessage);

    const getKeyValueColRaw = (formState) => {
        return Object.keys(formState).reduce((prev, propName) => {
            prev[propName] = formState[propName].value - 1;
            return prev;
        }, {});
    }

    const onActionButtonsClick = ({ isAdd }) => () => {
        const position = {
            column: formState.column.value - 1,
            row: formState.row.value - 1,
        };
        
        const generalErrors = checkForGeneralValidationErrors({ position, isAdd });
        const isGeneralErrosValid = !generalErrors.length;

        const newFormState = checkFieldsValidation(formState);
        const isAllValid = isGeneralErrosValid && isFormValid(newFormState);

        setFormState({
            formState: newFormState,
            generalErrors
        })

        if (isAllValid){
            const { column, row } = getKeyValueColRaw(formState);

            //CB function
            onSoldiersPositionChange({ 
                column, 
                row, 
                isSoldier: isAdd 
            });
        };
    };

    return (
        <Container fluid>
            <StyledFormEnhanced>
                <Form.Group controlId="column"> 
                    <Form.Label>Column Number</Form.Label>
                    <Form.Control type="number" onChange={onPropChange} value={formState.column.value} name="column" placeholder="Enter column number" />
                    <Form.Text className="text-warning">{formState.column.errorMessage}</Form.Text>
                </Form.Group>
                <Form.Group controlId="row"> 
                    <Form.Label>Row Number</Form.Label>
                    <Form.Control type="number" onChange={onPropChange} value={formState.row.value} name="row" placeholder="Enter row number" />
                    <Form.Text className="text-warning">{formState.row.errorMessage}</Form.Text>
                 </Form.Group>
                <Form.Group controlId="buttons">   
                    <Button  style={{marginRight: "10px"}} onClick={onActionButtonsClick({isAdd: true})}>Add</Button>
                    <Button  onClick={onActionButtonsClick({isAdd: false})}>Remove</Button>       
                </Form.Group>
                {
                    (generalErrors.length && <GeneralFormErrors generalErrors={generalErrors} />) || null
                }
            </StyledFormEnhanced>
        </Container>
    )
};

export default SoldierPositionForm;