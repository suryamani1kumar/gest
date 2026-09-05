export const Tfn1: string = "+91 92133 32134";
export const Tfn2: string = "+91 83682 80443";
export const email: string = "abhi982114@gmail.com";

export const generateCustomerId = (email: string): string => {
  const prefix = email
    .split("@")[0]
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 5);

  const random = Math.floor(1000 + Math.random() * 9000);

  return `cus-${prefix}-${random}`;
};
