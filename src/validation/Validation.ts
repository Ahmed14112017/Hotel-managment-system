export interface Registervalidation {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
  role?: string;
}
interface Loginvalidation {
  email: string;
  password: string;
}
interface IResetvalidation {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.)(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

{
  /* reset validate */
}
export const Resetvalidate = ({
  email,
  password,
  confirmPassword,
  seed,
}: IResetvalidation) => {
  const error = {
    email: "",
    password: "",
    confirmPassword: "",
    seed: "",
  };
  if (!email.trim()) {
    error.email = "email is required";
  } else if (!emailRegex.test(email)) {
    error.email = "Please enter a valid email address";
  }
  if (!passwordRegex.test(password)) {
    error.password =
      "Password must be at least 8 characters, lowercase, number, and special character.";
  } else if (!password.trim()) {
    error.password = "Password is required";
  }
  if (confirmPassword !== password) {
    error.confirmPassword = "Passwords do not match";
  }
  if (!seed.trim()) {
    error.seed = "seed is required";
  }
  return error;
};

{
  /* login validate */
}

export const Loginvalidate = ({ email, password }: Loginvalidation) => {
  const error = {
    email: "",
    password: "",
  };
  if (!emailRegex.test(email)) {
    error.email = "Please enter a valid email address";
  } else if (!email.trim()) {
    error.email = "email is required";
  }
  if (!passwordRegex.test(password)) {
    error.password =
      "Password must be at least 8 characters, lowercase, number, and special character.";
  } else if (!password.trim()) {
    error.password = "Password is required";
  }
  return error;
};
{
  /* register validate */
}
export const registerValidate = ({
  userName,
  email,
  password,
  confirmPassword,
  country,
  phoneNumber,
  role,
}: Registervalidation) => {
  const error = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    country: "",
    role: "",
    profileImage: "",
  };
  if (!userName.trim()) {
    error.userName = "User name is required";
  } else if (userName.length < 10) {
    error.userName = "User name must be at least 10 characters";
  }

  if (!emailRegex.test(email)) {
    error.email = "Please enter a valid email address";
  } else if (!email.trim()) {
    error.email = " email is required";
  }

  if (!passwordRegex.test(password)) {
    error.password =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
  } else if (!password.trim()) {
    error.password = "Password is required";
  }
  if (confirmPassword !== password) {
    error.confirmPassword = "Passwords do not match";
  }

  if (!country) {
    error.country = "please select country";
  }
  if (!phoneNumber) {
    error.phoneNumber = "phoneNumber is require";
  } else if (isNaN(Number(phoneNumber))) {
    error.phoneNumber = "Phone number must contain only digits";
  }
  //   const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

  if (!role?.trim()) {
    error.role = "please inter your role";
  }
  return error;
};
