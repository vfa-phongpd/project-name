import { IsNotEmpty, IsNumber } from "class-validator"


export class UserUsedVouchersDTO {
    @IsNotEmpty({ message: 'User_id is required' })
    @IsNumber()
    User_id: number


    @IsNumber()
    @IsNotEmpty({ message: 'Voucher_id is required' })
    Voucher_id: number
}