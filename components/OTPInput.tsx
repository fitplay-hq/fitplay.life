"use client";

import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled = false,
}: OTPInputProps) {
  const [internalValues, setInternalValues] = useState<string[]>(
    Array(length).fill("")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync external value with internal state
  useEffect(() => {
    const newValues = value.split("").slice(0, length);
    // Pad array with empty strings if value is shorter than length
    while (newValues.length < length) {
      newValues.push("");
    }
    setInternalValues(newValues);
  }, [value, length]);

  const triggerChange = (newValues: string[]) => {
    onChange(newValues.join(""));
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;

    // Only allow numbers
    if (!/^[0-9]*$/.test(val)) return;

    // Use only the last character entered (limits to 1 char)
    const char = val.slice(-1);

    const newValues = [...internalValues];
    newValues[index] = char;
    setInternalValues(newValues);
    triggerChange(newValues);

    // Auto-focus next input if a character was entered
    if (char !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();

      const newValues = [...internalValues];

      if (internalValues[index] !== "") {
        // If current box has a value, clear it
        newValues[index] = "";
        setInternalValues(newValues);
        triggerChange(newValues);
      } else if (index > 0) {
        // If current box is empty, clear previous box and focus it
        newValues[index - 1] = "";
        setInternalValues(newValues);
        triggerChange(newValues);
        inputRefs.current[index - 1]?.focus();
      }
    }

    // Support left/right arrow navigation
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste events (e.g. pasting a full 6-digit code)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/[^0-9]/g, "")
      .slice(0, length);

    if (pastedData) {
      const newValues = [...internalValues];
      for (let i = 0; i < pastedData.length; i++) {
        newValues[i] = pastedData[i];
      }
      setInternalValues(newValues);
      triggerChange(newValues);

      // Focus the next empty input, or the last input if full
      const nextFocusIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextFocusIndex]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {internalValues.map((val, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          value={val}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          maxLength={2} // Allows catching continuous "22" typing to extract just "2"
          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-gray-50 border-gray-200 text-emerald-900 rounded-xl focus-visible:ring-emerald-500 focus-visible:border-emerald-500 focus-visible:bg-white transition-all shadow-sm"
          disabled={disabled}
          autoComplete="off"
        />
      ))}
    </div>
  );
}
