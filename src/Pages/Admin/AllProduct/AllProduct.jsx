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
    <div className="px-4 py-6">
      <h2 className="text-2xl md:text-3xl text-center my-4">All Products</h2>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full text-xs md:text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>BuyingPrice</th>
              <th>ResellerPrice</th>
              <th>CustomerPrice</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td className="whitespace-nowrap">{product.productName}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 md:w-16 md:h-16 rounded object-cover"
                  />
                </td>
                <td>${product.buyingPrice}</td>
                <td>${product.resellerPrice}</td>
                <td>${product.customerPrice}</td>
                <td>
                  <button onClick={() => handleUpdate(product)} className="btn btn-xs md:btn-sm btn-info">
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(product)} className="btn btn-xs md:btn-sm btn-danger">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-xs md:btn-sm btn-outline mx-1"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-xs md:btn-sm mx-1 ${currentPage === index + 1 ? "btn-active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-xs md:btn-sm btn-outline mx-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProduct;
