
const Menu = () => {
    const members = [
    {
        avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        name: "John lorin",
        email: "john@example.com"
    }, {
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        name: "Chris bondi",
        email: "chridbondi@example.com"
    }, {
        avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
        name: "yasmine",
        email: "yasmine@example.com"
    }, {
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
        name: "Joseph",
        email: "joseph@example.com"
    },
    ]
    return (
      <div className="max-w-4xl pt-8 px-4 md:px-8">
        <div className="items-start justify-between sm:flex">
          <div>
            <h4 className="text-gray-800 text-3xl font-bold">Menu</h4>
          </div>
          <a
            href="javascript:void(0)"
            className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-gray-700 bg-green-100 border-l-4 border-b-4 border-green-500 hover:bg-green-100 active:bg-green-400 duration-150 rounded-xl sm:mt-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            Add Dish
          </a>
        </div>
        <ul className="mt-12 divide-y">
          {members.map((item, idx) => (
            <li key={idx} className="py-5 flex items-start justify-between">
              <div className="flex gap-3">
                <img
                  src={item.avatar}
                  className="flex-none w-12 h-12 rounded-full"
                />
                <div>
                  <span className="block text-sm text-gray-700 font-semibold">
                    {item.name}
                  </span>
                  <span className="block text-sm text-gray-600">
                    {item.email}
                  </span>
                </div>
              </div>
              <a
                href="javascript:void(0)"
                className="p-2 text-sm font-semibold text-red-600 bg-red-100 border-l-4 border-b-4 border-red-400 hover:bg-red-100 active:bg-red-400 duration-150 rounded-xl"
              >
                Remove
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default Menu;