/**
 * MockRepository.ts
 * project-name
 * Created by duynk <duynk@vitalify.asia> on 08/14/2023
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */

export const mockJwtService = {
    signAsync: jest.fn(),
    verify: jest.fn(),
};