import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function TextInput({ tooltip, dataType, value, onChange }) {
  const placeholderText = "Enter your " + dataType;
  return (
    <FormControl className="mb-4" margin="normal">
      {tooltip}
      <TextField
        placeholder={placeholderText}
        name={dataType}
        value={value}
        onChange={onChange}
        required
        sx={{ width: 350 }}
      />
    </FormControl>
  );
}