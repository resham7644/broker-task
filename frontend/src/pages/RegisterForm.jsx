import React,{ useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function RegisterForm() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gst, setGST] = useState("");
    const [selected, setSelected] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [gstError, setGstError] = useState(false);

    

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        setEmailError(false);
        setGstError(false);


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

      if (!name || !email || !gst || !selected) {
        setError("Please fill in all fields");
        return;
        }

      const isEmailValid = emailRegex.test(email);
      const isGstValid = gstRegex.test(gst);

      if (!isEmailValid || !isGstValid) {
        setEmailError(!isEmailValid);
        setGstError(!isGstValid);
        setError("Invalid format");
        return;
      }


      

      try{
        let url = "http://localhost:5000/api/customers";
        let data = {name:name, email:email, gstin:gst, type:selected};
        let resp = await axios.post(url,data);

        if(resp.status===201){
          setError("");
           alert("Registed Successfully");
           navigate("/dashboard");
           setName("");
           setEmail("");
           setGST("");
           setSelected("");
        }
      }
      catch(err){
        console.error(err);
        if (err.response?.status === 409) {
          setError("This email or GSTIN is already registered.");
          alert("User already exists!");
        } 
        else{
         alert("Server Error");
         setError(err.message);
        }
      }

    }
  return (
  <div className="min-h-screen absolute inset-0 bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registration Form
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-left ml-3 mb-1 text-l font-bold text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Name"
            />
          </div>

          <div>
            <label className="block text-left ml-3 mb-1 text-l font-bold text-gray-700">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border ${
                emailError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 ${emailError ? "focus:ring-red-400" : "focus:ring-blue-400"}`}
              placeholder="Enter your Email"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1 ml-3">Please enter a valid email address</p>
            )}
          </div>

          <div>
            <label className="block text-left ml-3 mb-1 text-l font-bold text-gray-700">GST Number</label>
            <input
              type="text"
              value={gst}
              onChange={(e) => setGST(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border ${
                gstError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 ${gstError ? "focus:ring-red-400" : "focus:ring-blue-400"}`}
              placeholder="Enter your GST No."
            />
            {gstError && (
              <p className="text-red-500 text-sm mt-1 ml-3">Please enter a valid 15-character GSTIN</p>
            )}
          </div>

           <div>
            <label className="block text-left ml-3 mb-2 text-l font-bold text-gray-700">Select Type</label>
                <div className="flex items-center mb-2 ml-2">
                    <input
                    type="radio" value="importer" name="importer"
                    checked={selected === "importer"}
                    onChange={() => setSelected("importer")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 ">
                    Importer
                    </label>
                </div>

                <div className="flex items-center ml-2">
                    <input
                    type="radio" value="exporter" name="exporter"
                    checked={selected === "exporter"}
                    onChange={() => setSelected("exporter")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                    />
                    <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium text-gray-900"
                    >
                    Exporter
                    </label>
                </div>
    </div>

          <button
            type="submit"           
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}


export default RegisterForm