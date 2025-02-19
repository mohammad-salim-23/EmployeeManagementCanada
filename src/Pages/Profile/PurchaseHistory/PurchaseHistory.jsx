import React from "react";
import usePurchaseHistory from "../../../Component/hooks/usePurchaseHistory";
import { FcOk } from "react-icons/fc";

const PurchaseHistory = () => {
    const [purchaseHistory] = usePurchaseHistory();

    // Grouping orders by Transaction ID
    const groupedOrders = purchaseHistory.reduce((acc, order) => {
        if (!acc[order.paymentIntentId]) {
            acc[order.paymentIntentId] = [];
        }
        acc[order.paymentIntentId].push(order);
        return acc;
    }, {});

    return (
        <div className="overflow-x-auto flex flex-col items-center">
            <h2 className="text-xl font-bold my-4">----Orders----</h2>
            {purchaseHistory?.length === 0 ? (
                <div className="text-center my-20 w-[60%]">
                    <h3 className="text-lg font-semibold">No products found for your orders.</h3>
                </div>
            ) : (
                <div className="w-full overflow-x-auto shadow-lg rounded-lg my-20">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead className="bg-base-200 text-gray-600">
                            <tr>
                                {["Transaction ID", "Product", "Status", "Total Amount", "Date"].map(header => (
                                    <th key={header} className="border border-gray-300 px-4 py-2 text-center">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(groupedOrders).map(([transactionId, orders], index) => (
                                <React.Fragment key={index}>
                                    {orders.map((order, orderIndex) => (
                                        <tr key={orderIndex}>
                                            {orderIndex === 0 && (
                                                <td rowSpan={orders.length} className="border border-gray-300 px-4 py-2 text-center font-semibold">
                                                    {transactionId}
                                                </td>
                                            )}
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                {order.productName}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center font-bold text-green-500">
                                                <div className="flex items-center justify-center">
                                                    Paid <FcOk className="ml-2" />
                                                </div>
                                            </td>
                                            {orderIndex === 0 && (
                                                <td rowSpan={orders.length} className="border border-gray-300 px-4 py-2 text-center">
                                                    {orders.reduce((sum, item) => sum + item.productPrice, 0).toFixed(2)} BDT
                                                </td>
                                            )}
                                            {orderIndex === 0 && (
                                                <td rowSpan={orders.length} className="border border-gray-300 px-4 py-2 text-center">
                                                    {new Date(order.date).toISOString().split('T')[0]}
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PurchaseHistory;
