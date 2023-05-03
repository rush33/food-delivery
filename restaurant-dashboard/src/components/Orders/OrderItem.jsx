const OrderItem = ({ date, id, total, status, lastName, firstName }) => {
  const orderTimeStamp = date.toDate();
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = orderTimeStamp.toLocaleString("en-US", options);

  return (
    <>
      <td className="pr-6 py-4 text-base whitespace-nowrap">{formattedDate}</td>
      <td className="pr-6 py-4 text-base whitespace-nowrap">{id}</td>
      <td className="pr-6 py-4 text-base whitespace-nowrap">
        {firstName} {lastName}
      </td>
      <td className="pr-6 py-4 text-base whitespace-nowrap">{total}</td>
      <td className="pr-6 py-4 text-base whitespace-nowrap">
        <span
          className={`p-2 rounded-xl font-semibold text-xs border-l-4 border-b-4
                      ${
                        status == "PENDING" &&
                        "border border-yellow-400 text-yellow-600 bg-yellow-50"
                      }
                     ${
                       status == "DECLINED" &&
                       "border border-red-400  text-red-600 bg-red-50"
                     }
                     ${
                        status == "PREPARING" &&
                        "border border-yellow-400 text-yellow-600 bg-yellow-50"
                      }
                      ${
                        status == "READY" &&
                        "border border-orange-400 text-orange-600 bg-orange-50"
                      }
                     ${
                       status == "COMPLETE" &&
                       "border border-green-500  text-green-600 bg-green-50"
                     }
                  `}
        >
          {status}
        </span>
      </td>
    </>
  );
};

export default OrderItem;
