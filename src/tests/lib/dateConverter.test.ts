import { DateConverter, type IEventDate } from "@/app/lib/dateConverter";

describe('DateConverter', () => {
  it('should convert event date that has different day and month', () => {
    const eventDate = "29 Feb - 02 Mar 2024";
    const convertedEventDate: EventDate = DateConverter.convertEventDate(eventDate);

    expect(convertedEventDate.start.getMonth()).toBe(1);
    expect(convertedEventDate.start.getDate()).toBe(29);
    expect(convertedEventDate.start.getFullYear()).toBe(2024);
    expect(convertedEventDate.end.getMonth()).toBe(2);
    expect(convertedEventDate.end.getDate()).toBe(2);
    expect(convertedEventDate.end.getFullYear()).toBe(2024);
  });

  it('should convert event date that has different day', () => {
    const eventDate = "07 - 09 Mar 2024";
    const convertedEventDate: EventDate = DateConverter.convertEventDate(eventDate);

    expect(convertedEventDate.start.getMonth()).toBe(2);
    expect(convertedEventDate.start.getDate()).toBe(7);
    expect(convertedEventDate.start.getFullYear()).toBe(2024);
    expect(convertedEventDate.end.getMonth()).toBe(2);
    expect(convertedEventDate.end.getDate()).toBe(9);
    expect(convertedEventDate.end.getFullYear()).toBe(2024);
  });

  it('should convert single day event date', () => {
    const eventDate = "13 May 1950";
    const convertedEventDate: EventDate = DateConverter.convertEventDate(eventDate);

    expect(convertedEventDate.start.getMonth()).toBe(4);
    expect(convertedEventDate.start.getDate()).toBe(13);
    expect(convertedEventDate.start.getFullYear()).toBe(1950);
    expect(convertedEventDate.end.getMonth()).toBe(4);
    expect(convertedEventDate.end.getDate()).toBe(13);
    expect(convertedEventDate.end.getFullYear()).toBe(1950);
  });
});
