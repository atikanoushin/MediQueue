import { dynamoDb } from "@/lib/dynamodb";
import { PutCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const appointment = {
      id: crypto.randomUUID(),
      patientName: body.patientName,
      doctorName: body.doctorName,
      specialty: body.specialty,
      date: body.date,
      time: body.time,
      status: "Booked",
      queuePosition: body.queuePosition || 1,
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

export async function GET() {
  try {
    const result = await dynamoDb.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_APPOINTMENTS_TABLE,
      })
    );

    return Response.json({
      success: true,
      appointments: result.Items || [],
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
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        {
          success: false,
          error: "Appointment id is required",
        },
        { status: 400 }
      );
    }

    await dynamoDb.send(
      new DeleteCommand({
        TableName: process.env.DYNAMODB_APPOINTMENTS_TABLE,
        Key: {
          id,
        },
      })
    );

    return Response.json({
      success: true,
      deletedId: id,
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