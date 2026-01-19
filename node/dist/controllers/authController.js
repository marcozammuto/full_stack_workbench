import { generateRecoveryToken, hashPassword, isMatch, } from "../services/authService.js";
import { signToken } from "../services/jwtService.js";
import prisma from "../db/db.js";
import { RESPONSE_MESSAGES, NODE_ENV_ENUM, QUERY_PARAMS, } from "../types/constants.js";
import { URL } from "node:url";
export const handleSignup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user || user === null) {
            const user = {
                email: email,
                code: crypto.randomUUID(),
                hash: await hashPassword(password),
            };
            await prisma.user.create({
                data: user,
            });
            return res.status(201).json({
                message: RESPONSE_MESSAGES.SIGNUP_SUCCESS,
            });
        }
        else {
            return res
                .status(409)
                .json({ message: RESPONSE_MESSAGES.SIGNUP_EMAIL_ALREADY_TAKEN });
        }
    }
    catch (error) {
        return next(error);
    }
};
export const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user === null) {
            return res.status(401).json({
                message: RESPONSE_MESSAGES.LOGIN_INVALID,
            });
        }
        if (!(await isMatch(password, user.hash))) {
            return res.status(401).json({ message: RESPONSE_MESSAGES.LOGIN_INVALID });
        }
        const token = signToken({ email: user.email, code: user.code });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === NODE_ENV_ENUM.PROD,
            sameSite: "strict",
            maxAge: 360000,
        });
        return res.status(200).json({
            message: "Logged in",
            user: { email: user.email, code: user.code },
        });
    }
    catch (error) {
        return next(error);
    }
};
export const handleLogout = (req, res, next) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "logged out" });
    }
    catch (err) {
        return next(err);
    }
};
export const handleGetMe = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: String(req.user.email),
                code: String(req.user.code),
            },
        });
        if (!user === null) {
            return res.json(404).json({ message: "User not found" });
        }
        res.status(200).json({ user: { email: user?.email, code: user?.code } });
    }
    catch (err) {
        return next(err);
    }
};
export const issuePasswordChangeToken = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user === null) {
            return res.status(200).json({
                message: RESPONSE_MESSAGES.RECOVERY_EMAIL_OK,
            });
        }
        else {
            await prisma.passwordRecovery.delete({
                where: {
                    userId: user.id,
                },
            });
            const recoveryCredentials = await generateRecoveryToken();
            await prisma.passwordRecovery.create({
                data: {
                    token: recoveryCredentials.hash,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                    userId: user.id,
                },
            });
            const endpoint = new URL("http://localhost:3000/auth/password/reset");
            endpoint.searchParams.append(QUERY_PARAMS.code, user.code);
            endpoint.searchParams.append(QUERY_PARAMS.token, recoveryCredentials.plain);
            res.status(200).json({
                message: RESPONSE_MESSAGES.RECOVERY_EMAIL_OK,
                endpoint: endpoint.href,
            });
        }
    }
    catch (err) {
        return next(err);
    }
};
export const handlePasswordChange = async (req, res, next) => {
    const { tkn, code } = req.query;
    const { password } = req.body;
    if (!password || !tkn || !code) {
        return next({ status: 500, message: "a" });
    }
    const user = await prisma.user.findUnique({
        where: {
            code: String(code),
        },
    });
    if (user === null) {
        return next({ message: "User not found", status: 500 });
    }
    const passwordRecoveryRequest = await prisma.passwordRecovery.findUnique({
        where: {
            userId: user.id,
        },
    });
    if (passwordRecoveryRequest === null) {
        return next({ message: "Request not found", status: 500 });
    }
    const isTokenMatch = await isMatch(String(tkn), passwordRecoveryRequest.token);
    if (isTokenMatch) {
        const newHash = await hashPassword(password);
        await prisma.user.update({
            where: { code: String(code) },
            data: { hash: newHash },
        });
        await prisma.passwordRecovery.delete({
            where: {
                userId: user.id,
            },
        });
        return res.status(200).json({
            message: RESPONSE_MESSAGES.RECOVERY_SUCCESS,
        });
    }
};
//# sourceMappingURL=authController.js.map