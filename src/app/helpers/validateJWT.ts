import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const validateJWT = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        if (!token) {
            throw new Error('No token found');
        }
        const decryptedToken: any = jwt.verify(token, process.env.jwt_secret!);
        return decryptedToken.id;
    } catch (error) {
        throw new Error('No token found !eror');
    }
}