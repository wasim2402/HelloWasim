import { data } from "autoprefixer";
import { NextResponse } from "next/server";
import { ContactModel } from "../../../lib/model/contactModel";
import {connectDB} from '../../../lib/DB/connection'
export async function POST(req){
  try{
await connectDB();
    let payload=await req.json();
    if(!payload.name || !payload.email || !payload.message){
      throw new Error('fill all data field');
    }
    let newContact=new ContactModel(payload);

   await newContact.save();

 return NextResponse.json({
       data:newContact,
      success:true,
      error:false
    })
  }
  catch(e){
    return NextResponse.json({
      mess:"data not come",
      success:false,
      error:true
    })
  }
}


export async function GET(req){
  try{
 await connectDB();
 let data=await ContactModel.find();
 return NextResponse.json({
       data:data,
      success:true,
      error:false
    })
  }
  catch(e){
    return NextResponse.json({
      mess:"data not come",
      success:false,
      error:true
    })
  }
}