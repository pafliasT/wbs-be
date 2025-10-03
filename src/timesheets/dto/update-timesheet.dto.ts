import { IsDateString, IsDecimal, IsEnum, IsOptional, IsString } from 'class-validator';
import { EntryType } from '@prisma/client';

export class UpdateTimesheetDto {
    @IsOptional() @IsDateString()
    date?: string;

    @IsOptional() @IsDecimal({ decimal_digits: '1,2' })
    hours?: string;

    @IsOptional() @IsEnum(EntryType)
    type?: EntryType;

    @IsOptional() @IsString()
    projectId?: string;

    @IsOptional() @IsString()
    note?: string;
}
