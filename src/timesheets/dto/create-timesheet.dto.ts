import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsDecimal } from 'class-validator';
import { EntryType } from '@prisma/client';

export class CreateTimesheetDto {
    @IsDateString()
    date!: string; // ISO string

    @IsDecimal({ decimal_digits: '1,2' })
    hours!: string; // accept string; we'll convert to Decimal

    @IsEnum(EntryType)
    type!: EntryType;

    @IsString() @IsNotEmpty()
    projectId!: string; // cuid; basic string check

    @IsOptional() @IsString()
    note?: string;
}
