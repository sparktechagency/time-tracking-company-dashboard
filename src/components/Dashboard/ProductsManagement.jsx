import { useState } from "react";
import {
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Dialog,
  TablePagination,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import ProductDetailsModal from "../Modals/ProductDetailsModal";

const sampleProducts = [
  {
    id: 1,
    productName: "Cheddar Cheese",
    category: "Dairy Products",
    vendorName: "DairyCo",
    stock: 10,
    price: 5.6,
    status: "active",
    additionDate: "2023-01-15",
    description: "A rich, sharp, and creamy cheese made from cow's milk.",
  },
  {
    id: 2,
    productName: "Milk",
    category: "Dairy Products",
    vendorName: "FarmFresh",
    stock: 3,
    price: 2.5,
    status: "active",
    additionDate: "2023-02-10",
    description: "Fresh whole milk from dairy cows.",
  },
  {
    id: 3,
    productName: "Butter",
    category: "Dairy Products",
    vendorName: "DairyCo",
    stock: 25,
    price: 4.0,
    status: "inactive",
    additionDate: "2022-12-05",
    description: "Churned from cream, perfect for cooking and baking.",
  },
  {
    id: 4,
    productName: "Chicken",
    category: "Meat",
    vendorName: "MeatMasters",
    stock: 8,
    price: 6.0,
    status: "active",
    additionDate: "2023-03-15",
    description: "Fresh chicken cuts, perfect for grilling or roasting.",
  },
  {
    id: 5,
    productName: "Beef",
    category: "Meat",
    vendorName: "MeatMasters",
    stock: 30,
    price: 7.0,
    status: "inactive",
    additionDate: "2023-02-22",
    description: "Grass-fed beef, ideal for steaks and roasts.",
  },
  {
    id: 6,
    productName: "Apple",
    category: "Fruits",
    vendorName: "FreshHarvest",
    stock: 13,
    price: 1.5,
    status: "active",
    additionDate: "2023-04-01",
    description: "Crisp and juicy apples, perfect for snacks or baking.",
  },
  {
    id: 7,
    productName: "Banana",
    category: "Fruits",
    vendorName: "FreshHarvest",
    stock: 19,
    price: 1.2,
    status: "inactive",
    additionDate: "2023-03-10",
    description: "Sweet and nutritious bananas, rich in potassium.",
  },
];

export default function Products() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [productDetails, setProductDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterProducts(e.target.value, selectedCategory, selectedStatus);
  };

  const handleFilterCategory = (e) => {
    setSelectedCategory(e.target.value);
    filterProducts(searchText, e.target.value, selectedStatus);
  };

  const handlefilterStatus = (e) => {
    setSelectedStatus(e.target.value);
    filterProducts(searchText, selectedCategory, e.target.value);
  };

  const filterProducts = (search, category, status) => {
    let filtered = sampleProducts;

    if (search) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category && category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (status && status !== "all") {
      filtered = filtered.filter((product) => product.status === status);
    }

    setFilteredProducts(filtered);
  };

  const openProductDetails = (product) => {
    setProductDetails(product);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setProductDetails(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="px-10 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#1c1c1c] font-medium text-2xl">
            Products Management
          </p>
          <p className="text-[#7d7d7d] text-lg">Manage your Products</p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="flex items-center justify-between gap-5 mt-5">
        {/* Search Bar */}
        <div className="flex items-center border rounded-lg w-3/4">
          <InputBase
            sx={{
              ml: 1,
              width: "100%",
              height: "48px",
              flex: 1,
              px: "10px",
            }}
            placeholder="Search Products"
            value={searchText}
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            }
          />
          <IconButton
            type="button"
            sx={{
              p: "12px",
              backgroundColor: "#e7e7e7",
              borderRadius: "0 10px 10px 0",
            }}
            aria-label="search"
          >
            <FaSearch />
          </IconButton>
        </div>

        <div className="flex items-center gap-5">
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>All Status</InputLabel>
            <Select
              label="All Status"
              value={selectedStatus}
              onChange={handlefilterStatus}
              sx={{
                height: "50px",
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          {/* Category Filter */}
          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel>All Categories</InputLabel>
            <Select
              label="All Categories"
              value={selectedCategory}
              onChange={handleFilterCategory}
              sx={{
                height: "50px",
              }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Dairy Products">Dairy Products</MenuItem>
              <MenuItem value="Meat">Meat</MenuItem>
              <MenuItem value="Fruits">Fruits</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="mt-6">
        <TableContainer
          component={Paper}
          sx={{
            border: "1px solid #e6e6e6",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#6B6B6B",
                    textAlign: "center",
                  }}
                >
                  Product Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#6B6B6B",
                    textAlign: "center",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{
                    color: "#6B6B6B",
                    textAlign: "center",
                  }}
                >
                  Vendor Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#6B6B6B",
                    textAlign: "center",
                  }}
                >
                  Stock
                </TableCell>
                <TableCell
                  sx={{
                    color: "#6B6B6B",
                    textAlign: "center",
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    color: "#6B6B6B",
                    textAlign: "center",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "#6B6B6B",
                    textAlign: "center",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {product.productName}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {product.category}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontWeight: "500",
                        textTransform: "capitalize",
                      }}
                    >
                      {product.vendorName}
                    </TableCell>

                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {product.stock}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      ${product.price}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <p
                        className={`mx-auto font-medium text-sm text-center w-20 py-2 rounded-lg text-white ${
                          product.status === "active"
                            ? "bg-[#1279b4]"
                            : "bg-[#d81919]"
                        }`}
                      >
                        {product.status.charAt(0).toUpperCase() +
                          product.status.slice(1)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-3">
                        <Button
                          sx={{
                            border: "1px solid #b3b3b3",
                            textTransform: "none",
                            color: "#333333",
                          }}
                          onClick={() => openProductDetails(product)}
                        >
                          <div className="flex items-center gap-1">
                            <FaEye fontSize={20} />
                            <p>View</p>
                          </div>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <ProductDetailsModal
        open={openModal}
        onClose={closeModal}
        productDetails={productDetails}
      />
    </div>
  );
}
