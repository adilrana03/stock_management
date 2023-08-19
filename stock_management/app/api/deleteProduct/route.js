import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request) {

    let body = await request.json()
    const uri = "mongodb+srv://adilrana03:0p5LiREP79mrJbsI@cluster1.u50gzns.mongodb.net/";
    const client = new MongoClient(uri);
    try {
        const database = client.db('stock_management');
        const stocks = database.collection('stocks');
        const product = await stocks.deleteOne(`ObjectId_${body}`)
        return NextResponse.json({ product, ok: true })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}