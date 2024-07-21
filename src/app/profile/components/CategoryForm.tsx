import { getRulesForForm } from "@/app/helpers/validations";
import { Form, message, Modal } from "antd";
import axios from "axios";
import { set } from "mongoose";
import React from "react";

function CategoryForm({
  showCategoryForm,
  setShowCategoryForm,
  reloadData,
  setSelectedCategory,
  selectedCategory,
}: CategoryFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if(selectedCategory){
        await axios.put(`/api/categories/${selectedCategory._id}`, values);
        message.success("Category updated successfully");
      } else {
        axios.post("/api/categories", values);
        message.success("Category added successfully");
      }
      setShowCategoryForm(false);
      setSelectedCategory(null);
      reloadData();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={showCategoryForm}
      onCancel={() => {
        setShowCategoryForm(false)
        setSelectedCategory(null)
      }}
      centered
      title={
        <div className="text-2xl font-bold text-grey-300">
          <h2>{selectedCategory ? "Edit Category" : "Add Category"}</h2>
        </div>
      }
      closable={false}
      okText="Save"
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
    >
      <Form
        layout="vertical"
        className="flex flex-col gap-5 md-5"
        form={form}
        onFinish={onFinish}
        initialValues={selectedCategory}
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={getRulesForForm("Category is required!")}
        >
          <input type="text" />
        </Form.Item>
        <Form.Item label="Category Description" name="description">
          <textarea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CategoryForm;

interface CategoryFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: (show: boolean) => void;
  reloadData: () => void;
  selectedCategory: any;
  setSelectedCategory: (category: any) => void;
}
