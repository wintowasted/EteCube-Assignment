import React, { useState, useEffect } from "react";
import { Button, Modal, Space, Table, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CompanyModal from "../components/CompanyModal";
import { getCompanies, deleteCompany } from "../api/axios";

const Companies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [record, setRecord] = useState({
    name: "",
    legalNumber: "",
    country: "",
    website: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getAllCompanies = async () => {
      const { data: companies } = await getCompanies();
      setDataSource(companies);
      setIsLoading(false);
    };
    getAllCompanies();
  }, []);

  const columns = [
    {
      key: "1",
      title: "Company Name",
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
        multiple: 2,
      },
    },
    {
      key: "2",
      title: "Legal Number",
      align: "center",
      width: 150,
      dataIndex: "legalNumber",
    },
    {
      key: "3",
      title: "Incorporation Country",
      align: "center",
      width: 100,
      dataIndex: "country",
      sorter: {
        compare: (first, second) => {
          if (first.country < second.country) {
            return -1;
          }
          if (first.country > second.country) {
            return 1;
          }
          return 0;
        },
        multiple: 1,
      },
    },
    {
      key: "4",
      title: "Website",
      dataIndex: "website",
      align: "center",
      width: 150,
      render: (website) => (
        <a href={website} target="_blank">
          {website}
        </a>
      ),
    },
    {
      key: "5",
      title: "Actions",
      align: "center",
      width: 150,
      render: (entity) => {
        return (
          <div className="flex justify-center gap-x-4 text-md">
            <EditOutlined
              className="cursor-pointer"
              onClick={() => handleEditCompany(entity)}
            />
            <DeleteOutlined
              className="text-red-700 cursor-pointer"
              onClick={() => handleDeleteCompany(entity._id)}
            />
          </div>
        );
      },
    },
  ];

  // Add Company
  const handleAddCompany = () => {
    setIsModalOpen(true);
  };

  // Update Company
  const handleEditCompany = (record) => {
    setRecord({ ...record });
    setIsModalOpen(true);
  };

  // Delete Company
  const handleDeleteCompany = (id) => {
    Modal.confirm({
      title: "Are you sure do you want to delete this company?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        // delete company
        await deleteCompany(id);
        const filtered = dataSource.filter((company) => company._id !== id);
        setDataSource([...filtered]);
      },
    });
  };

  return (
    <Space direction="vertical" className="w-full py-6">
      <Button
        className="bg-teal-600 flex items-center mx-auto hover:bg-teal-500 text-white mb-4 "
        onClick={handleAddCompany}
        icon={<PlusOutlined />}
        shape="round"
        type="ghost"
        size="large"
      >
        Add Company
      </Button>
      <Input
        size="large"
        placeholder="Company Name..."
        prefix={<SearchOutlined className="mr-2" />}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={dataSource.filter((c) => {
          return searchValue === ""
            ? c
            : c.name.toLowerCase().includes(searchValue.toLowerCase());
        })}
        rowKey={(row) => row._id}
        bordered
        tableLayout="fixed"
        loading={isLoading}
        style={{height: "100%"}}
      />
      <CompanyModal
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

export default Companies;
