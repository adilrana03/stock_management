import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    let { action, name, initialQuantity } = await request.json()
    // Replace the uri string with your connection string.
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        const database = client.db('stock_management');
        const inventory = database.collection('stocks');
        const filter = { name: name };

        let newQuantity = action == "plus" ? (parseInt(initialQuantity) + 1) : (parseInt(initialQuantity) - 1)
        const updateDoc = {
            $set: {
                quantity: newQuantity
            },
        };
        const result = await inventory.updateOne(filter, updateDoc, {});

        return NextResponse.json({ success: true, message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)` })
    }
    catch {
        return NextResponse.json({ success: false, message: `Some error occurred` })
    }
    finally {
        await client.close();
    }
}