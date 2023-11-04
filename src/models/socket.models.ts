

export interface SocketJoinSession {
  room: string;
  avatar: string;
  pseudo: string;
}

export interface SocketJoinTeamCard {
  room: string;
  avatar: string;
  pseudo: string;
  teamTag: string;
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
