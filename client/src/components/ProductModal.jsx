import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../api/axios";

const defProduct = {
  name: "",
  category: "",
  amount: "",
  amountUnit: "",
  companyName: "",
};

const ProductModal = ({
  isModalOpen,
  setIsModalOpen,
  record,
  setRecord,
  dataSource,
  setDataSource,
}) => {
  const [product, setProduct] = useState(defProduct);

  useEffect(() => {
    setProduct({ ...record });
  }, [record]);

  const saveProduct = async () => {
    // create product
    if (checkEmptyRecord()) {
      const { data: newProduct } = await createProduct(product);
      setDataSource([...dataSource, newProduct]);
    }
    // update product
    else {
      const { data: updatedProduct } = await updateProduct(
        product._id,
        product
      );

      const newDataSource = dataSource.map((product) => {
        if (product._id === updatedProduct._id) {
          return { ...updatedProduct };
        }
        return product;
      });
      setDataSource([...newDataSource]);
      setRecord(defProduct);
    }

    hideModal();
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setRecord(defProduct);
  };

  const checkEmptyRecord = () => {
    return Object.values(record).every((v) => v === "");
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={saveProduct}
      onCancel={hideModal}
      okText="Save"
      okType="primary"
      title={checkEmptyRecord() ? "Create Product" : "Update Product"}
    >
      <Input
        value={product.name}
        placeholder={checkEmptyRecord() ? "Product Name..." : ""}
        onChange={(e) => {
          setProduct({ ...product, name: e.target.value });
        }}
      />
      <Input
        value={product.category}
        placeholder={checkEmptyRecord() ? "Category..." : ""}
        onChange={(e) => {
          setProduct({ ...product, category: e.target.value });
        }}
      />
      <Input
        value={product.amount}
        placeholder={checkEmptyRecord() ? "Amount..." : ""}
        type="number"
        onChange={(e) => {
          setProduct({ ...product, amount: e.target.value });
        }}
      />
      <Input
        value={product.amountUnit}
        placeholder={checkEmptyRecord() ? "Amount Unit..." : ""}
        onChange={(e) => {
          setProduct({ ...product, amountUnit: e.target.value });
        }}
      />
      <Input
        value={product.companyName}
        placeholder={checkEmptyRecord() ? "Company Name..." : ""}
        onChange={(e) => {
          setProduct({ ...product, companyName: e.target.value });
        }}
      />
    </Modal>
  );
};

export default ProductModal;
