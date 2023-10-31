

export interface SocketJoinSession {
  roomjoin: string;
  userAvatar: string;
  userPseudo: string;
}

export interface SocketJoinTeamCard {
  gameKey: string;
  teamTag: string;
  userAvatar: string;
  userPseudo: string;
  position: number;
}

export interface SocketFormatModel {
  date: string;
  room: string;
  data?: any;
  message: string;
  code: number;
  error: any;
}
