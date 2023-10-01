import React from 'react'
import AddShiftList from './AddShiftList'

const AddShifts = (props) => {
  return (
    <>
      <AddShiftList
        setPostShiftActiveStep={props.setPostShiftActiveStep}
        postShiftActiveStep={props.postShiftActiveStep}
        values={props.values.shifts}
        arrayHelpers={props.arrayHelpers}
        setFieldValue={props.setFieldValue}
      />
    </>
  );
}

export default AddShifts