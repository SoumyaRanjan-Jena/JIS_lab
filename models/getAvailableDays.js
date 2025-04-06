'use server';
import mongoose from "mongoose";
import Case from "./caseModel";


async function getAvailableDays(year, month) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect("mongodb://localhost:27017/TestDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    }

    const daysCount = new Date(year, month, 0).getDate();
    const availableDays = [];

    for (let d = 1; d <= daysCount; d++) {
        const date = new Date(Date.UTC(year, month-1, d));
        date.setUTCHours(0, 0, 0, 0);
        const isAvailable = await Case.findOne({
            nextHearingDate: {
            $gte: date,
            $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
            },
        });

        if (!isAvailable) {
            availableDays.push(d);
        }
    }

    return availableDays;
}

export default getAvailableDays;