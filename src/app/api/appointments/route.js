import { dynamoDb } from "@/lib/dynamodb";
import { PutCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await dynamoDb.send(
  new ScanCommand({
    TableName: process.env.DYNAMODB_APPOINTMENTS_TABLE,
  })
);

const currentAppointments = result.Items || [];

    const appointment = {
  id: crypto.randomUUID(),
  patientName: body.patientName,
  userEmail: body.userEmail,
  doctorName: body.doctorName,
  doctorEmail: body.doctorEmail,
  specialty: body.specialty,
  date: body.date,
  time: body.time,
  status: "Booked",
  queuePosition: currentAppointments.length + 1,
  createdAt: new Date().toISOString(),
};

    await dynamoDb.send(
      new PutCommand({
        TableName: process.env.DYNAMODB_APPOINTMENTS_TABLE,
        Item: appointment,
      })
    );

    return Response.json({
      success: true,
      appointment,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const doctorEmail = searchParams.get("doctorEmail");
    const userEmail = searchParams.get("userEmail");

    const result = await dynamoDb.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_APPOINTMENTS_TABLE,
      })
    );

    let items = result.Items || [];

    if (doctorEmail) {
      items = items.filter(
        (item) => item.doctorEmail === doctorEmail
      );
    }

    if (userEmail) {
      items = items.filter(
        (item) => item.userEmail === userEmail
      );
    }

    return Response.json({
      success: true,
      appointments: items,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const userEmail = searchParams.get("userEmail");

  if (!id || !userEmail) {
    return Response.json({
      success: false,
      error: "Missing parameters",
    });
  }

  const result = await dynamoDb.send(
    new ScanCommand({
      TableName: process.env.DYNAMODB_APPOINTMENTS_TABLE,
    })
  );

  const appointment = result.Items?.find((item) => item.id === id);

  if (!appointment) {
    return Response.json({
      success: false,
      error: "Appointment not found",
    });
  }

  if (appointment.userEmail !== userEmail) {
    return Response.json({
      success: false,
      error: "Unauthorized action",
    });
  }

  await dynamoDb.send(
    new DeleteCommand({
      TableName: process.env.DYNAMODB_APPOINTMENTS_TABLE,
      Key: { id },
    })
  );

  return Response.json({
    success: true,
    message: "Appointment cancelled successfully",
  });
}