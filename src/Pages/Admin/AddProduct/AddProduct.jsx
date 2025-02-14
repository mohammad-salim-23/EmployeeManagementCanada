import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = new FormData();
    imageFile.append("image", data.image[0]);

    try {
      const imgRes = await axios.post(image_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imgRes.data.success) {
        const newProduct = {
          productName: data.productName,
          image: imgRes.data.data.display_url,
          buyingPrice: parseFloat(data.buyingPrice),
          resellerPrice: parseFloat(data.resellerPrice),
          customerPrice: parseFloat(data.customerPrice),
          quantity: parseInt(data.quantity, 10),
          status: "available",
        };

        const response = await axios.post("https://your-api.com/products", newProduct);
        
        if (response.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Product "${data.productName}" added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/products");
        }
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
        Add a New Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block font-semibold">Product Name*</label>
          <input
            type="text"
            {...register("productName", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Product Name"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Buying Price*</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
            <input
              type="number"
              step="0.01"
              {...register("buyingPrice", { required: true })}
              className="w-full p-2 pl-7 border rounded"
              placeholder="Enter Buying Price"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Reseller Price*</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
            <input
              type="number"
              step="0.01"
              {...register("resellerPrice", { required: true })}
              className="w-full p-2 pl-7 border rounded"
              placeholder="Enter Reseller Price"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Customer Price*</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
            <input
              type="number"
              step="0.01"
              {...register("customerPrice", { required: true })}
              className="w-full p-2 pl-7 border rounded"
              placeholder="Enter Customer Price"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Quantity*</label>
          <input
            type="number"
            {...register("quantity", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Quantity"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Product Image*</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
