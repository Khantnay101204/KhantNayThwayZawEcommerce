import { useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    description: "Description",
    category: "Category 1",
    stock: 10,
    imgArr: [
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
      "pizzas/spinaci.jpg",
      "pizzas/prosciutto.jpg",
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
    ],
  },
  {
    id: 2,
    name: "Product 1",
    price: 100,
    description: "Description",
    category: "Category 1",
    stock: 10,
    imgArr: [
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
      "pizzas/spinaci.jpg",
      "pizzas/prosciutto.jpg",
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
    ],
  },
  {
    id: 3,
    name: "Product 1",
    price: 100,
    description: "Description",
    category: "Category 1",
    stock: 10,
    imgArr: [
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
      "pizzas/spinaci.jpg",
      "pizzas/prosciutto.jpg",
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
    ],
  },
  {
    id: 4,
    name: "Product 1",
    price: 100,
    description: "Description",
    category: "Category 1",
    stock: 10,
    imgArr: [
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
      "pizzas/spinaci.jpg",
      "pizzas/prosciutto.jpg",
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
    ],
  },
  {
    id: 5,
    name: "Product 1",
    price: 100,
    description: "Description",
    category: "Category 1",
    stock: 10,
    imgArr: [
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
      "pizzas/spinaci.jpg",
      "pizzas/prosciutto.jpg",
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
    ],
  },
  {
    id: 6,
    name: "Product 1",
    price: 100,
    description: "Description",
    category: "Category 1",
    stock: 10,
    imgArr: [
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
      "pizzas/spinaci.jpg",
      "pizzas/prosciutto.jpg",
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
    ],
  },
  {
    id: 7,
    name: "Product 1",
    description: "Description",
    price: 100,
    category: "Category 1",
    stock: 10,
    imgArr: [
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
      "pizzas/spinaci.jpg",
      "pizzas/prosciutto.jpg",
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
    ],
  },
  {
    id: 8,
    name: "Product 1",
    description: "Description",
    price: 100,
    category: "Category 1",
    stock: 10,
    imgArr: [
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
      "pizzas/spinaci.jpg",
      "pizzas/prosciutto.jpg",
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
    ],
  },
  {
    id: 9,
    name: "Product 1",
    description: "Description",
    price: 100,
    category: "Category 1",
    stock: 10,
    imgArr: [
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
      "pizzas/spinaci.jpg",
      "pizzas/prosciutto.jpg",
      "pizzas/focaccia.jpg",
      "pizzas/funghi.jpg",
    ],
  },
];

export default function App() {
  return <DashboardContainer />;
}
function DashboardContainer() {
  const [nevOpen, setNevOpen] = useState(true);

  const location = useLocation();
  const { hash, pathname, search } = location;

  return (
    <div className="dashboardContainer">
      <ModelBox>
        <EditBox />
      </ModelBox>
      <DashboardNevigation
        className={nevOpen ? "" : "dashboardNevigation--closed"}
      >
        <NevItems pathname={pathname} path="/" itemName={"Home"} />
        <NevItems pathname={pathname} path="/product" itemName={"Product"} />
        <NevItems pathname={pathname} itemName={"Customers"} />
        <NevItems pathname={pathname} itemName={"Orders"} />
      </DashboardNevigation>
      <Dashboard setNevOpen={setNevOpen} nevOpen={nevOpen}>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/product" element={<ProductDashboard />} />
        </Routes>
      </Dashboard>
    </div>
  );
}

function DashboardNevigation({ children, className }) {
  return (
    <div className={`dashboardNevigation ${className}`}>
      <DashboardNevigationLogo />
      {children}
    </div>
  );
}
function Dashboard({ setNevOpen, nevOpen, children }) {
  return (
    <div className="dashboard">
      <DashboardHeader setNevOpen={setNevOpen} nevOpen={nevOpen} />
      {children}
    </div>
  );
}

function DashboardNevigationLogo() {
  return <div className="dashboardNevigationLogo"></div>;
}

function NevItems({ itemName, path, pathname }) {
  function handleOnclick() {
    navigate(path);
  }
  const navigate = useNavigate();
  return (
    <div
      className={`nevItems ${pathname === path ? "nevSelected" : ""}`}
      onClick={handleOnclick}
    >
      <p>{itemName}</p>
    </div>
  );
}

function DashboardHeader({ setNevOpen, nevOpen }) {
  return (
    <div className="dashboardHeader">
      <MenuBtn setNevOpen={setNevOpen} nevOpen={nevOpen} />
    </div>
  );
}

function MenuBtn({ setNevOpen, nevOpen }) {
  return (
    <div className="menuBtn">
      <svg
        onClick={() => setNevOpen(!nevOpen)}
        xmlns="http://www.w3.org/2000/svg"
        color="black"
        width="40"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu-icon lucide-menu"
      >
        <path d="M4 12h16" />
        <path d="M4 18h16" />
        <path d="M4 6h16" />
      </svg>
    </div>
  );
}

function ProductDashboard() {
  return (
    <div className="productDashboard">
      <ProductDashboardHeading />
      <ProductControlBar />
      <ProductList />
    </div>
  );
}
function ProductDashboardHeading() {
  return (
    <div className="productDashboardHeading">
      <p>
        PRODUCTS<span>{products.length}</span>
      </p>
    </div>
  );
}
function ProductControlBar() {
  return (
    <div className="productControlBar">
      <ProductSearchBar />
      <ProductCreateBtn />
    </div>
  );
}
function ProductSearchBar() {
  return (
    <div className="productSearchBarContainer">
      <input type="text" placeholder="Search" className="productSearchBar" />
      <button>Search</button>
    </div>
  );
}

function ProductCreateBtn() {
  return (
    <div className="productCreateBtn">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-plus-icon lucide-plus"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>{" "}
        Create
      </button>
    </div>
  );
}

function HomeDashboard() {
  return <div className="homeDashboard"></div>;
}

function ProductList() {
  return (
    <div className="productList">
      <div className="productTable">
        <table>
          <thead>
            <tr className="productTableHeader">
              <th>Images</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>
        <div className="productRowImages">
          {product.imgArr.map((img) => (
            <img src={img}></img>
          ))}
        </div>
      </td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>
      <td>
        <div className="productRowActionsBtn">
          <EditnDelete />
        </div>
      </td>
    </tr>
  );
}
function EditnDelete() {
  return (
    <div className="editnDelete">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        cursor={"pointer"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-square-pen-icon lucide-square-pen"
      >
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        cursor={"pointer"}
        height="26"
        color="red"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-trash2-icon lucide-trash-2"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
      </svg>
    </div>
  );
}
function ModelBox({ children }) {
  return <div className="modelBox">{children}</div>;
}

function EditBox() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="editBox">
      <h1>Edit Product</h1>
      <br />
      <form>
        <label>Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)}></input>
        <label>Category:</label>
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
        ></input>
        <label>Description:</label>
        <textarea
          rows={5}
          style={{ resize: "none" }}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price:</label>
        <input type="number" onChange={(e) => setPrice(e.target.value)}></input>
        <label>Stock:</label>
        <input type="number" onChange={(e) => setStock(e.target.value)}></input>
        <label>Images:</label>
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        ></input>
        <button onClick={handleSubmit}>Save</button>

        <button>Cancle</button>
      </form>
    </div>
  );
}
