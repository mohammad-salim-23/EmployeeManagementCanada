import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const AllProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/products");
      return res.data;
    },
  });

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleUpdate = async (product) => {
    try {
      await axios.patch(`http://localhost:8000/products/${product._id}`, {
        ...product,
        updated: true,
      });
      refetch();
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  const handleDelete = async (product) => {
    try {
      await axios.delete(`http://localhost:8000/products/${product._id}`);
      refetch();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-semibold text-center my-6 text-gray-800">All Products</h2>
      <div className="overflow-x-auto w-full">
        <div className="bg-white/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
          <table className="table-auto w-full text-sm md:text-base">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="py-3 px-4 text-center">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-center">Buying Price</th>
                <th className="py-3 px-4 text-center">Reseller Price</th>
                <th className="py-3 px-4 text-center">Customer Price</th>
                <th className="py-3 px-4 text-center">Update</th>
                <th className="py-3 px-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {displayedProducts.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-3 px-4 text-center">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-md object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{product.productName}</td>
                  <td className="py-3 px-4 text-center text-blue-600 font-semibold">${product.buyingPrice}</td>
                  <td className="py-3 px-4 text-center text-green-600 font-semibold">${product.resellerPrice}</td>
                  <td className="py-3 px-4 text-center text-red-600 font-semibold">${product.customerPrice}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleUpdate(product)}
                      className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 transition text-white shadow-md"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(product)}
                      className="p-2 rounded-md bg-red-500 hover:bg-red-600 transition text-white shadow-md"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md text-white bg-gray-400 hover:bg-gray-500 transition disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-2 rounded-md text-white ${currentPage === index + 1 ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-500 hover:bg-gray-600"
              } transition`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md text-white bg-gray-400 hover:bg-gray-500 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

  );
};

export default AllProduct;
