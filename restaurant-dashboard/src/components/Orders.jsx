const Orders = () => {
  const tableItems = [
    {
      name: "Solo learn app",
      date: "Oct 9, 2023",
      price: "$35.000",
      plan: "Monthly subscription",
      status: "Pending",
    },
    {
      name: "Window wrapper",
      date: "Oct 12, 2023",
      price: "$12.000",
      plan: "Monthly subscription",
      status: "Active",
    },
    {
      name: "Unity loroin",
      date: "Oct 22, 2023",
      price: "$20.000",
      plan: "Annually subscription",
      status: "Declined",
    },
    {
      name: "Background remover",
      date: "Jan 5, 2023",
      price: "$5.000",
      plan: "Monthly subscription",
      status: "Active",
    },
    {
      name: "Colon tiger",
      date: "Jan 6, 2023",
      price: "$9.000",
      plan: "Annually subscription",
      status: "Active",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto pt-8 px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-3xl font-bold sm:text-3xl">
            Orders
          </h3>
        </div>
      </div>
      <div className="mt-12 relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">Date</th>
              <th className="py-3 pr-6">Order ID</th>
              <th className="py-3 pr-6">Dishes</th>
              <th className="py-3 pr-6">Total</th>
              <th className="py-3 pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="pr-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.plan}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  <span
                    className={`p-2 rounded-xl font-semibold text-xs border-l-4 border-b-4
                     ${
                       item.status == "Active" &&
                       "border border-green-400  text-green-600 bg-green-50"
                     }
                     ${
                       item.status == "Pending" &&
                       "border border-yellow-400 text-yellow-600 bg-yellow-50"
                     }
                     ${
                       item.status == "Declined" &&
                       "border border-red-400  text-red-600 bg-red-50"
                     }
                  `}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
