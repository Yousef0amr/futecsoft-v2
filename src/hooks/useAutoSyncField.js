import { useEffect, useRef, useState } from "react";

export const useAutoSyncField = ({
  watch,
  sourceField,
  targetField,
  setValue,
  delay = 300,
}) => {
  const hasUserEditedTarget = useRef(false);
  const [sourceValue, setSourceValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [shouldSync, setShouldSync] = useState(false);

//   useEffect(() => {
//     const subscription = watch((values) => {
//       const src = values?.[sourceField] ?? "";
//       const tgt = values?.[targetField] ?? "";

//       setSourceValue(src);
//       setTargetValue(tgt);

//       // If user types into target → stop syncing
//       if (!hasUserEditedTarget.current && tgt && tgt !== src) {
//         hasUserEditedTarget.current = true;
//         setShouldSync(false);
//       }

//       // If target is empty and source has value → start syncing
//       if (!hasUserEditedTarget.current && !tgt && src) {
//         setShouldSync(true);
//       }
//     });

//     return () => subscription.unsubscribe?.();
//   }, [watch, sourceField, targetField]);

//   useEffect(() => {
//     if (!shouldSync) return;

//     const timer = setTimeout(() => {
//       setValue(targetField, sourceValue);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [sourceValue, shouldSync, setValue, targetField, delay]);
};
