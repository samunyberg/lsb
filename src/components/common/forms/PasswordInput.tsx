import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CustomInput from './CustomInput';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const PasswordInput = ({ label, error, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomInput
      type={showPassword ? 'text' : 'password'}
      label={label}
      error={error}
      icon={
        <div onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </div>
      }
      {...rest}
    />
  );
};

export default PasswordInput;
