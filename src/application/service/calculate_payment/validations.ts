import {ValidationError} from '../common/domain.error';

export class Validations {
    static validateDate(month: number, year: number): void {
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
        const currentYear = now.getFullYear();

        if (year !== currentYear) {
            throw new ValidationError('Year must be current year', 'INVALID_YEAR', {
                expectedYear: currentYear,
                receivedYear: year,
            });
        }

        if (Math.abs(month-currentMonth) > 1) {
            throw new ValidationError('Month must be different', 'INVALID_MONTH', {
                currentMonth,
                receivedMonth: month,
            });
        }
    }
}