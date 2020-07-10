import React, { useState, useCallback } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import { GeneralFormErrors } from "./Components/GeneralErrors";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const StyledForm = styled.div`
    padding: 21px;
    box-shadow: 11px 12px 40px 8px rgba(0,0,0,0.75);
    border-radius: 20px;
`;

const StyledFormEnhanced = StyledForm.withComponent(Form);

const getPositionTemplate = ({ row, column }) => `${row.value}-${column.value}`;

const getFieldsValidations = () => {
    const isInRange = val => val > 0 && val <= 8;
    const isValid = val => val && !Number.isNaN(val) && isInRange(val);

    return {
        column: { errorTerm: val => !isValid(val), errorMessage: "Please enter a valid column number between 1-8" },
        row: { errorTerm: val => !isValid(val), errorMessage: "Please enter a valid row number between 1-8"}
    };
}

const GENERAL_VALIDATIONS = {
    numberOfSoldiers: {
        errorTerm: ({isAdd, totalSoldiers}) => !(totalSoldiers <= 22 && totalSoldiers >= 0), 
        errorMessage: "There should be 0-22 soldiers on board"
    },
    soldierAlreadyExists: {
        errorTerm: ({formState, isAdd, soldiersPosition}) => isAdd && !!soldiersPosition[getPositionTemplate(formState)],
        errorMessage: "Soldier already exists..."
    },
    soldierNotExists: { 
        errorTerm: ({formState, isAdd, soldiersPosition}) => !isAdd && !soldiersPosition[getPositionTemplate(formState)],
        errorMessage: "Soldier not exists..."
    }
};

const INITIAL_STATE = {
    column: { value: '', errorMessage: ''},
    row: { value: '', errorMessage: ''},
}

const VALIDATIONS = getFieldsValidations();


const SoldierPositionForm = ({ onSoldiersPositionChange }) => {
    const [formState, setFormState] = useState(INITIAL_STATE);
    const [soldiersPosition, setSoldiersPosition] = useState({});
    const [generalErrors, setGeneralErrors] = useState([]);

    const onPropChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: { ...formState[name], value: Number(value) }
        });
    };

    const verifyFormValidation = useCallback(() => {
        const isFormValid = (state) => Object.keys(state).every(propName => !state[propName].errorMessage);
        
        const newFormState = Object.keys(formState).reduce((prev, propName) => {
            const propObj = formState[propName];
            const { errorTerm, errorMessage } = VALIDATIONS[propName];
            
            prev[propName] = {
                ...propObj,
                errorMessage: errorTerm(propObj.value) ? errorMessage : ''  
            };
            
            return prev;
        }, {});

        setFormState(newFormState);

        return isFormValid(newFormState);
    },[formState]);

    const modifySoldiersPosition = ({ isAdd, soldiersPosition, formState }) => {
        const soldierPositionKeys = Object.keys(soldiersPosition);
        const newKey = getPositionTemplate(formState);

        if (isAdd) return ({...soldiersPosition, [newKey]: [formState.row, formState.column]})

        // Remove from obj
        return soldierPositionKeys.reduce((prev, key) => {
            if (!prev[key]) prev[key] = soldierPositionKeys[key];
            return prev;
        }, {});
    };

    const getTotalSoldiers = useCallback(() => Object.keys(soldiersPosition).length, [soldiersPosition]);

    const validateGeneralRules = ({ isAdd, totalSoldiers, soldiersPosition, formState }) => {
        return Object.keys(GENERAL_VALIDATIONS).reduce((prev, ruleKey) => {
            const validationRule = GENERAL_VALIDATIONS[ruleKey];
            const data = { formState, totalSoldiers, isAdd, soldiersPosition };

            if (validationRule.errorTerm(data)) prev.push(validationRule.errorMessage);
            return prev;
        }, []);
    };

    const verifyGeneralValidationRules = ({ isAdd, totalSoldiers, soldiersPosition, formState }) => {
        const errorMessages = validateGeneralRules({ isAdd, totalSoldiers, soldiersPosition, formState  });

        setGeneralErrors(errorMessages);

        return !errorMessages.length;
    }

    const isPositionChanged = ({ formState, isAdd }) => {
        return isAdd !== !!soldiersPosition[getPositionTemplate(formState)] 
    };

    const getKeyValueColRaw = (formState) => {
        return Object.keys(formState).reduce((prev, propName) => {
            prev[propName] = formState[propName].value - 1;
            return prev;
        }, {});
    }

    const verifyAllValid = (...conditions) => conditions.every(isValid => isValid);

    const onActionButtonsClick = ({ isAdd }) => () => {

        const isAllValid = verifyAllValid(
            verifyGeneralValidationRules({ isAdd, formState, soldiersPosition, totalSoldiers: getTotalSoldiers()}),
            verifyFormValidation(formState),
            isPositionChanged({ formState, isAdd})
        )

        if (isAllValid){
            const newSoldiersPosition = modifySoldiersPosition({ isAdd, soldiersPosition, formState });

            setSoldiersPosition(newSoldiersPosition);

            const changedSoldierPosition = { ...getKeyValueColRaw(formState), isAdd };

            //CB function
            onSoldiersPositionChange({ soldiersPosition: newSoldiersPosition, changedSoldierPosition })
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
                </Form.Group>
                <Button onClick={onActionButtonsClick({isAdd: true})}>Add</Button>{' '}
                <Button onClick={onActionButtonsClick({isAdd: false})}>Remove</Button>
                {
                    generalErrors.length && <GeneralFormErrors generalErrors={generalErrors} /> || null
                }
            </StyledFormEnhanced>
        </Container>
    )
};

export default SoldierPositionForm;