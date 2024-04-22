// InputField.tsx
import { FunctionComponent, InputHTMLAttributes } from 'react';

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {}

const InputField: FunctionComponent<IInputField> = ({ ...rest }) => {
  return <input {...rest} />;
};

export default InputField;
