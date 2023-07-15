import useToggleValue from "hooks/useToggleValue";
import React from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "components/common/FormGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Label } from "components/label";
import { Input } from "components/input";
import { IconEyeToggle } from "components/icons";
import { Button } from "components/button";
import { useDispatch } from "react-redux";
import { authLogin } from "store/auth/auth-slice";

const schema = yup.object({
  email: yup.string().email("").required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character "),
});
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const dispatch = useDispatch();
  const handleSignIn = (values) => {
    dispatch(authLogin(values));
  };

  // const { user } = useSelector((state) => state.auth);
  // const userRole = user?.permissions || [];
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (user && user.id && userRole.includes("admin")) {
  //     navigate("/admin-dashboard");
  //     return;
  //   }

  //   if (user && user.id && userRole.includes("manager")) {
  //     navigate("/manager-dashboard");
  //     return;
  //   }

  //   navigate("/login");
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  return (
    <LayoutAuthentication heading="KNS OJT Management">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Dont have an account?{" "}
        <Link to="/register" className="font-medium underline text-primary">
          Sign up here
        </Link>
      </p>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            name="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Enter Password"
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <FormGroup>
          <div className="text-right">
            <span className="inline-block text-sm font-medium text-primary underline hover:underline-offset-2">
              Forgot password
            </span>
          </div>
        </FormGroup>
        <Button
          className="w-full hover:bg-green-600"
          kind="primary"
          type="submit"
        >
          Sign in
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
