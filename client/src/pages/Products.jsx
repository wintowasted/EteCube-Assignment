import React, { useState, useEffect } from "react";
import { Modal, Table, Space, Button, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getProducts, deleteProduct } from "../api/axios";
import ProductModal from "../components/ProductModal";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [record, setRecord] = useState({
    name: "",
    category: "",
    amount: "",
    amountUnit: "",
    companyName: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      const { data: products } = await getProducts();
      setDataSource(products);
      setIsLoading(false);
    };
    getAllProducts();
  }, []);

  const columns = [
    {
      key: "1",
      title: "Product Name",
      align: "center",
      width: 150,
      dataIndex: "name",
      sorter: {
        compare: (first, second) => {
          if (first.name < second.name) {
            return -1;
          }
          if (first.name > second.name) {
            return 1;
          }
          return 0;
        },
        multiple: 3,
      },
    },
    {
      key: "2",
      title: "Category",
      align: "center",
      width: 150,
      dataIndex: "category",
    },
    {
      key: "3",
      title: "Amount",
      align: "center",
      width: 100,
      dataIndex: "amount",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 1,
      },
    },
    {
      key: "4",
      title: "Amount Unit",
      dataIndex: "amountUnit",
      align: "center",
      width: 150,
    },
    {
      key: "5",
      title: "Company",
      dataIndex: ["company", "name"],
      align: "center",
      width: 150,
      sorter: {
        compare: (first, second) => {
          if (first.company.name < second.company.name) {
            return -1;
          }
          if (first.company.name > second.company.name) {
            return 1;
          }
          return 0;
        },
        multiple: 2,
      },
    },
    {
      key: "6",
      title: "Actions",
      align: "center",
      width: 150,
      render: (entity) => {
        return (
          <div className="flex justify-center gap-x-4 text-md">
            <EditOutlined
              className="cursor-pointer"
              onClick={() => handleEditProduct(entity)}
            />
            <DeleteOutlined
              className="text-red-700 cursor-pointer"
              onClick={() => handleDeleteProduct(entity._id)}
            />
          </div>
        );
      },
    },
  ];

  // Add Product
  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  // Update Product
  const handleEditProduct = (record) => {
    console.log(record);
    setRecord({ ...record, companyName: record.company.name });
    setIsModalOpen(true);
  };

  // Delete Product
  const handleDeleteProduct = (id) => {
    Modal.confirm({
      title: "Are you sure do you want to delete this Product?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        // delete Product
        await deleteProduct(id);
        const filtered = dataSource.filter((product) => product._id !== id);
        setDataSource([...filtered]);
      },
    });
  };

  return (
    <Space direction="vertical" className="w-full py-6">
      <Button
        className="bg-teal-600 flex items-center mx-auto hover:bg-teal-500 text-white mb-4 "
        onClick={handleAddProduct}
        icon={<PlusOutlined />}
        shape="round"
        type="ghost"
        size="large"
      >
        Add Product
      </Button>
      <Input
        size="large"
        placeholder="Product Name..."
        prefix={<SearchOutlined className="mr-2" />}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={dataSource.filter((p) => {
          return searchValue === ""
            ? p
            : p.name.toLowerCase().includes(searchValue.toLowerCase());
        })}
        rowKey={(row) => row._id}
        bordered
        loading={isLoading}
      />
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        record={record}
        setRecord={setRecord}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </Space>
  );
};

export default Products;
