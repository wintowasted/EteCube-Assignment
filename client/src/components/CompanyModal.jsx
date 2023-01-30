import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { createCompany, updateCompany } from "../api/axios";

const defCompany = { name: "", legalNumber: "", country: "", website: "" };

const CompanyModal = ({
  isModalOpen,
  setIsModalOpen,
  record,
  setRecord,
  dataSource,
  setDataSource,
}) => {
  const [company, setCompany] = useState(defCompany);

  useEffect(() => {
    setCompany({ ...record });
  }, [record]);

  const saveCompany = async () => {
    // create company
    if (checkEmptyRecord()) {
      const { data: newCompany } = await createCompany(company);
      setDataSource([...dataSource, newCompany]);
    }
    // update company
    else {
      const { data: updatedCompany } = await updateCompany(
        company._id,
        company
      );
      const newDataSource = dataSource.map((company) => {
        if (company._id === updatedCompany._id) {
          return { ...updatedCompany };
        }
        return company;
      });
      setDataSource([...newDataSource]);
      setRecord(defCompany);
    }

    hideModal();
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setRecord(defCompany);
  };

  const checkEmptyRecord = () => {
    return Object.values(record).every((v) => v === "");
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={saveCompany}
      onCancel={hideModal}
      okText="Save"
      okType="primary"
      title={checkEmptyRecord() ? "Create Company" : "Update Company"}
    >
      <Input
        value={company.name}
        placeholder={checkEmptyRecord() ? "Company Name..." : ""}
        onChange={(e) => {
          setCompany({ ...company, name: e.target.value });
        }}
      />
      <Input
        value={company.legalNumber}
        placeholder={checkEmptyRecord() ? "Legal Number..." : ""}
        type="number"
        onChange={(e) => {
          setCompany({ ...company, legalNumber: e.target.value });
        }}
      />
      <Input
        value={company.country}
        placeholder={checkEmptyRecord() ? "Country..." : ""}
        onChange={(e) => {
          setCompany({ ...company, country: e.target.value });
        }}
      />
      <Input
        value={company.website}
        placeholder={checkEmptyRecord() ? "Website..." : ""}
        onChange={(e) => {
          setCompany({ ...company, website: e.target.value });
        }}
      />
    </Modal>
  );
};

export default CompanyModal;
