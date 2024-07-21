"use client";

import { Button, message, Table } from "antd";
import React from "react";
import CategoryForm from "./CategoryForm";
import axios from "axios";
import moment from "moment";

function CategoriesList() {
  const [showCategoryForm, setShowCategoryForm] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [loadingForDelete, setLoadingForDelete] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  const onDeleteCategory = async (categoryId: string) => {
    try {
      setLoadingForDelete(true);
      await axios.delete(`/api/categories/${categoryId}`);
      message.success("Category deleted successfully");
      getCategories();
      setSelectedCategory(null);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoadingForDelete(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: string) => moment(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (action: any, params: any) => {
        return (
          <div className="flex gap-3 items-center ">
            <Button
              type="default"
              className="btn-small"
              onClick={() => {
                setSelectedCategory(params);
                onDeleteCategory(params._id);
              }}
              loading={loadingForDelete && selectedCategory?._id === params._id}
            >
              Delete
            </Button>
            <Button
              type="primary"
              className="btn-small"
              onClick={() => {
                setSelectedCategory(params);
                setShowCategoryForm(true);
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setShowCategoryForm(true)}>
          Add Category
        </Button>
      </div>
      <div className="mt-5">
        <Table
          dataSource={categories}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </div>
      {showCategoryForm && (
        <CategoryForm
          showCategoryForm={showCategoryForm}
          setShowCategoryForm={setShowCategoryForm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          reloadData={() => getCategories()}
        />
      )}
    </div>
  );
}

export default CategoriesList;
