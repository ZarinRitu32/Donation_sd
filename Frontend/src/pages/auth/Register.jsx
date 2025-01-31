import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span className="text-red-600">{alert(error)}</span>}

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex min-h-screen">
          {/* Left Side Banner */}
          <div
            className="w-full md:w-2/3 bg-cover bg-center"
            style={{ backgroundImage: "url('assests/images/banner2.jpg')" }}
          >
            <div className="h-full flex items-center justify-center bg-black bg-opacity-40">
              <h2 className="text-white text-4xl font-semibold">Join the Blood Bank</h2>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-1/3 bg-white p-8 flex flex-col justify-center">
            <Form
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
