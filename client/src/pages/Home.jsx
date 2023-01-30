import { Table, Typography, Col, Row, Statistic } from "antd";
import React, { useState, useEffect } from "react";
import { getCompanies, getProducts } from "../api/axios.js";
const { Paragraph } = Typography;

const Home = () => {
  const [companyDataSource, setCompanyDataSource] = useState([]);
  const [productDataSource, setProductDataSource] = useState([]);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);

  const companyColumns = [
    { key: "1", title: "Company Name", dataIndex: "name" },
    { key: "2", title: "Legal Number", dataIndex: "legalNumber" },
    { key: "3", title: "Incorporation Country", dataIndex: "country" },
    {
      key: "4",
      title: "Website",
      dataIndex: "website",
      render: (website) => (
        <a href={website} target="_blank">
          {website}
        </a>
      ),
    },
  ];

  const productColumns = [
    { key: "1", title: "Product Name", width: 150, dataIndex: "name" },
    { key: "2", title: "Category", width: 150, dataIndex: "category" },
    { key: "3", title: "Amount", width: 100, dataIndex: "amount" },
    { key: "4", title: "Amount Unit", dataIndex: "amountUnit", width: 150 },
    { key: "5", title: "Company", dataIndex: ["company", "name"], width: 150 },
  ];

  useEffect(() => {
    const getAllCompanies = async () => {
      const { data: companies } = await getCompanies();
      setCompanyDataSource(companies);
      setCompanyLoading(false);
    };
    const getAllProducts = async () => {
      const { data: products } = await getProducts();
      setProductDataSource(products);
      setProductLoading(false);
    };
    getAllCompanies();
    getAllProducts();
  }, []);

  const findMostValue = (array, value, second = null) => {
    let obj = {};
    let maxNum, maxVal;

    for (let item of array) {
      if (typeof item[value] === "string" && item[value] !== null) {
        obj[item[value]] = ++obj[item[value]] || 1;
        if (maxVal === undefined || obj[item[value]] > maxVal) {
          maxNum = item[value];
          maxVal = obj[item[value]];
        }
      } else if (typeof item[value] === "object" && item[value] !== null) {
        obj[item[value][second]] = ++obj[item[value][second]] || 1;
        if (maxVal === undefined || obj[item[value][second]] > maxVal) {
          maxNum = item[value][second];
          maxVal = obj[item[value][second]];
        }
      }
    }
    return maxNum && maxVal ? `${maxNum} (${maxVal})` : "-";
  };

  return (
    <div className="pt-6 pb-12">
      <div className="w-[100%] ">
        <Row gutter={16} justify="center">
          <Col span={6}>
            <Statistic
              title="Total Companies"
              value={companyDataSource.length}
              loading={companyLoading}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Most Incorporated Country"
              value={findMostValue(companyDataSource, "country")}
              loading={companyLoading}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Total Products"
              value={productDataSource.length}
              loading={productLoading}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Company Has Most Products"
              value={findMostValue(productDataSource, "company", "name")}
              loading={productLoading}
            />
          </Col>
        </Row>
      </div>
      <Paragraph className="mt-12" strong>
        Companies added lately:
      </Paragraph>
      <Table
        dataSource={companyDataSource.slice(companyDataSource.length - 3)}
        columns={companyColumns}
        tableLayout="fixed"
        rowKey={(row) => row._id}
        pagination={false}
        bordered={true}
        loading={companyLoading}
      />
      <Paragraph className="mt-12" strong>
        Products added lately:
      </Paragraph>
      <Table
        dataSource={productDataSource.slice(productDataSource.length - 3)}
        columns={productColumns}
        tableLayout="fixed"
        rowKey={(row) => row._id}
        pagination={false}
        bordered={true}
        loading={productLoading}
      />
    </div>
  );
};

export default Home;
