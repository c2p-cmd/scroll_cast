import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const PasswordComponent = ({
  label,
  value,
  setValue,
  showPassword,
  togglePassword,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      type={showPassword ? "text" : "password"}
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePassword}>
                {showPassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordComponent;
