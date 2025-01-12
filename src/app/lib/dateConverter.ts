export interface EventDate {
	start: Date;
	end: Date;
}

export class DateConverter {
	public static convertEventDate(eventDate: string): EventDate {
		const cleanedDate = eventDate.replaceAll("- ", "").split(" ");
		const startDate = DateConverter._convertToDate(
			cleanedDate[cleanedDate.length - 1],
			cleanedDate.length === 5 ? cleanedDate[1] : (cleanedDate.length === 4) ? cleanedDate[2] : cleanedDate[1],
			cleanedDate[0],
		);
		const endDate = (cleanedDate.length === 3) ? startDate : DateConverter._convertToDate(
			cleanedDate[cleanedDate.length - 1],
			cleanedDate[cleanedDate.length - 2],
			cleanedDate[cleanedDate.length - 3]
		);

		return {
			start: startDate,
			end: endDate
		}
	}

	private static _convertToDate(year: string, month: string, day: string): Date {
		return new Date(`${year}-${month}-${day}`);
	}
}
