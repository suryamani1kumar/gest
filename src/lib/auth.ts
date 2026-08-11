import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET = new TextEncoder().encode(secret);

export async function createSession(
  userId: string,
) {
  return await new SignJWT({
    userId,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifySession(
  token: string,
) {
  try {
    const { payload } = await jwtVerify(
      token,
      JWT_SECRET,
    );

    return {
      userId: payload.userId as string,
    };
  } catch {
    return null;
  }
}