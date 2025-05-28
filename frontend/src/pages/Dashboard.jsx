import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customers");
        setCustomers(res.data.customers);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch customer data.");
      }
    };

    fetchCustomers();
  }, []);

  // Filtered and searched customers
  const filteredCustomers = customers
    .filter((c) => {
      if (filter === "importer" && !c.is_importer) return false;
      if (filter === "exporter" && !c.is_exporter) return false;
      return true;
    })
    .filter((c) =>
      [c.name, c.email, c.gstin]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen absolute inset-0 bg-gradient-to-br from-gray-100 to-white">
      {/* Header */}
      <div className="bg-blue-950 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white p-6">
          Customer Onboarding Dashboard
        </h1>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or GSTIN"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div className="flex gap-2">
          {["all", "importer", "exporter"].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setFilter(type)}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-center text-red-600 font-semibold mb-4">
          {error}
        </div>
      )}

      {/* No Data */}
      {filteredCustomers.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-20">
          No matching customers found.
        </div>
      ) : (
        <div className="flex flex-col gap-6 px-4 max-w-4xl mx-auto pb-12">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-3xl text-blue-600" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {customer.name}
                  </h2>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">GSTIN:</span> {customer.gstin}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Customer Type:</span>{" "}
                  <span className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {customer.is_importer && customer.is_exporter
                      ? "Importer & Exporter"
                      : customer.is_importer
                      ? "Importer"
                      : "Exporter"}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  Registered on:{" "}
                  {new Date(customer.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
