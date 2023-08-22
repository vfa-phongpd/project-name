import { IsNotEmpty, IsNumber } from "class-validator"


export class UserUsedVouchersDTO {

    @IsNumber()
    @IsNotEmpty({ message: 'Voucher_id is required' })
    Voucher_id: number
}