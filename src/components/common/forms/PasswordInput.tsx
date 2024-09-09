import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from './Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const PasswordInput = ({ placeholder, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
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
