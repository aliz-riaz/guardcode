import { io } from "socket.io-client";

export let socket = {};
const USER_TYPE = "EMPLOYER";

export const createConneciton = (
  userToken,
  organistaionId,
  isFullAccess,
  organisationName
) => {
  socket = io(`https://${process.env.SOCKET_API}`, {
    transports: ["websocket"],
    autoConnect: true,
    query: {
      token: userToken,
      userType: USER_TYPE,
      organisationId: organistaionId,
      accessLevel: isFullAccess,
      organisationName,
      // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuZ2V0LXN0YWZmaW5nLmxvY2FsXC92YW50YWdlXC9hcGlcL2F1dGhcL2NvZGVcL3ZlcmlmeSIsImlhdCI6MTY0Nzg1NjU3OSwibmJmIjoxNjQ3ODU2NTc5LCJqdGkiOiI3djR3a0RZOHB1RU9xcDJSIiwic3ViIjoxLCJwcnYiOiJjNzMyNDdmNzAxMGU3NDIxM2ZkNGRiMGVkMjRhZTlhNjBlMzUzMjRkIiwiaWQiOjEsInR5cGUiOiJFTVBMT1lFUiJ9.ivrSfDBM9KQx9dPVRJ5VntUwS28W5jhP6vk9BRG842U"
    },
  });
};
