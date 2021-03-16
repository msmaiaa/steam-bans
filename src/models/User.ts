export interface TrackedUser{
    steamid: string,
    steamid3: string,
    steamid64: string,
    profileurl: string,
    communityvisibilitystate: number,
    profilestate: number,
    personaname: string,
    commentpermission: number,
    primaryclanid: string,
    avatar: string,
    avatarmedium: string,
    avatarfull: string,
    avatarhash: string,
    lastlogoff: number,
    personastate: number,
    timecreated: number,
    personastateflags: number,
    loccountrycode: string,
    locstatecode: string,
    loccityid: number,
    CommunityBanned: boolean,
    VACBanned: boolean,
    NumberOfVACBans: number,
    DaysSinceLastBan: number,
    NumberOfGameBans: number,
    EconomyBan: string
}

export interface TrackedUserList{
    users?: Array<TrackedUser>
}

export interface ResponseList{
    users: Array<TrackedUser>,
    status: number
}

export interface TrackedUserResponse{
    status?: number,
    user?: TrackedUser
}

export interface UserResponse{
    status: number,
    user: User
}

export interface User{
    steamid: string,
    communityvisibilitystate: number,
    profilestate: number,
    personaname: string,
    commentpermission: number,
    profileurl: string,
    avatar: string,
    avatarmedium: string,
    avatarfull: string,
    lastlogoff: number,
    personastate: number,
    primaryclanid: string,
    timecreated: number,
    personastateflags: number,
    loccountrycode: string,
    locstatecode: string,
    loccityid: number
}

export interface UserProp{
    loggedIn: boolean,
    isLoading: boolean,
    user: User
}