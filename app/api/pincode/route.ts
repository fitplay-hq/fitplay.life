import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get("pincode");

  if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
    return NextResponse.json(
      { error: "Invalid pincode provided" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const data = await response.json();

    if (data && data[0] && data[0].Status === "Success") {
      const postOffice = data[0].PostOffice[0];
      return NextResponse.json({
        city: postOffice.District,
        state: postOffice.State,
      });
    } else {
      return NextResponse.json({ error: "Pincode not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching pincode data:", error);
    return NextResponse.json(
      { error: "Error fetching pincode data" },
      { status: 500 }
    );
  }
}
