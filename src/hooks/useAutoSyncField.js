import { useState } from "react";


export const useAutoSyncField = ({
  sourceField,
  targetField,
  setValue,
}) => {
  const [isTargetBlurred, setIsTargetBlurred] = useState(false);
  const onChange = (e) => {
    if (e.target.name === sourceField && !isTargetBlurred) {
      setValue(targetField, e.target.value);
      setValue(sourceField, e.target.value);
    } else if (e.target.name === sourceField) {
      setValue(sourceField, e.target.value);
    } else {
      setValue(e.target.name, e.target.value);
    }
  }

  const onBlur = (e) => {
    if (e.target.name === targetField) {
      setIsTargetBlurred(true)
    }
  }


  return {
    onChange,
    onBlur
  }

};
