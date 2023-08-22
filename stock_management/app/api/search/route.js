import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const query = request.nextUrl.searchParams.get("query")
    console.log(query);
    // Replace the uri string with your connection string.
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        const database = client.db('stock_management');
        const inventory = database.collection('stocks');

        const products = await inventory.aggregate([{
            $match: {
                $or: [
                    { name: { $regex: query, $options: "i" } }, //Case-insensitivename search
                    // { quantity: { $regex: "", $options: "i" } },
                    // { price: { $regex: "", $options: "i" } }
                ]
            }
        }
        ]).toArray()
        return NextResponse.json({ success: true, products })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

}
