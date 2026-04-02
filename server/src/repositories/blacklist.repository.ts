import Blacklist from "@/models/blacklist.model";

export const createBlacklistToken = async (token: string) => {
  return Blacklist.create({ token });
};

export const checkBlacklist = async (token: string) => {
  const blacklistedToken = await Blacklist.findOne({ token });
  return !!blacklistedToken;
};
