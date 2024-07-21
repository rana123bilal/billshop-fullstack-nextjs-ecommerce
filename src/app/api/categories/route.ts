import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/configs/dbConfig";
import Category from "@/models/categoryModel";
import { validateJWT } from "@/app/helpers/validateJWT";
import { message } from "antd";

connectDB();

export async function POST(request: NextRequest) {
    try {
      const userId = await validateJWT(request);
      // check if category already exists
      const reqBody = await request.json();
      const categoryExists = await Category.findOne({
        name: reqBody.name,
      });
      if (categoryExists) {
        throw new Error("Category already exists");
      }
  
      reqBody.createdBy = userId;
      const category = new Category(reqBody);
      await category.save();
  
      return NextResponse.json({
        message: "Category created successfully",
      });
    } catch (error: any) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }
  }

  export async function GET(request :NextRequest) {
    try{
        await validateJWT(request)
        const categories  = await Category.find()
        return NextResponse.json({
            data: categories
        })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            {
                status: 500,
            }
        );
    }
    
  }