import { ComponentProps, useState } from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
type TPassworInput = ComponentProps<"input">;
const PasswordInput = ({id,name,value,onChange,placeholder,className}:TPassworInput) => {
    
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  return (
    
    <div className="relative flex items-center">
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        maxLength={10}
        minLength={8}
        
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute left-2"
      >
        {showPassword ? (
          <VisibilityOutlinedIcon fontSize="small" className="text-gray-300" />
        ) : (
          <VisibilityOffOutlinedIcon fontSize="small" className="text-gray-300" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
